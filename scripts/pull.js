const crypto = require('crypto')
const download = require('download')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const ent = require('ent')

const commitMessagesTxt = 'https://raw.githubusercontent.com/ngerakines/commitment/master/commit_messages.txt'
const humansTxt = 'https://raw.githubusercontent.com/ngerakines/commitment/master/static/humans.txt'
const template = (json) => `"use strict";\nmodule.exports = ${JSON.stringify(json, null, ' ')};\n`

// Behaves like Python's `f.readlines()`.
const readlines = (string) => string.split(/\r\n|\r|\n/g).map(line => `${line}\n`)

// Behaves like Python's `hashlib.md5(line).hexdigest()`.
const hexdigest = (string) => crypto.createHash('md5').update(string).digest('hex')

// Promisify `Download`.
const getContentString = (url) => {
  return download(url, './downloads')
}

const transformMessages = (buffer) => {
  const string = buffer.toString()
  let json = {}
  readlines(string).forEach(line => {
    let message = ent.decode(line.replace(/\n/g, '').replace(/<br\/>/g, '\n'))
    if (message.length) { json[hexdigest(line)] = message }
  })
  return json
}

const transformHumans = (buffer) => {
  const string = buffer.toString()
  return [
    'Nick', 'Steve', 'Andy', 'Qi', 'Fanny', 'Sarah', 'Cord', 'Todd',
    'Chris', 'Pasha', 'Gabe', 'Tony', 'Jason', 'Randal', 'Ali', 'Kim',
    'Rainer', 'Guillaume', 'Kelan', 'David', 'John', 'Stephen', 'Tom',
    'Steven', 'Jen', 'Marcus', 'Edy', 'Rachel'
  ].concat(
    string.split('\n')
      .filter(line => line.indexOf('Name: ') === 0)
      .map(line => line.substring(6))
      .map(data => (data.indexOf('github:') === 0) ? data.substring(7) : data.split(' ')[0])
  )
}

async function update(file, url, transform) {
  console.log(`Updating ${file}...`)
  try {
    const content = await getContentString(url)
    const store = memFs.create()
    const fs = editor.create(store)
    fs.write(file, template(transform(content)))
    fs.commit(() => console.log(`All done updating ${file}.`))
  } catch (err) {
    console.log(`Failed updating ${file}.`)
    console.log(`Error: ${err}.`)
  }
}

(async function() {
  try {
    await update('./commit_messages.js', commitMessagesTxt, transformMessages)
    await update('./humans.js', humansTxt, transformHumans)
  } catch (err) {
    console.log(`Error: ${err}.`)
  }
}())
