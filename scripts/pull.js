#!/usr/bin/env babel-node
const crypto = require('crypto')
const Download = require('download')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const ent = require('ent')

const commitMessagesTxt = 'https://raw.githubusercontent.com/ngerakines/commitment/master/commit_messages.txt'
const humansTxt = 'https://raw.githubusercontent.com/ngerakines/commitment/master/static/humans.txt'
const template = (json) => `'use strict';\nmodule.exports = ${JSON.stringify(json, null, ' ')};\n`

// TODO: remove code dup (`downloadMessages` vs. `downloadHumans`).
const downloadMessages = new Download({mode: '755'}).get(commitMessagesTxt).dest('./downloads')
const downloadHumans = new Download({mode: '755'}).get(humansTxt).dest('./downloads')

// Behaves like Python's `f.readlines()`.
const readlines = (file) => file.contents.toString().split(/\r\n|\r|\n/g).map(line => `${line}\n`)

// Behaves like Python's `hashlib.md5(line).hexdigest()`.
const hexdigest = (string) => crypto.createHash('md5').update(string).digest('hex')

console.log('Updating ./commit_messages.js')

downloadMessages.run((err, files) => {
    if (err || !files.length || !files[0]) { throw err }
    const store = memFs.create()
    const fs = editor.create(store)
    let json = {}

    readlines(files[0]).forEach(line => {
        let message = ent.decode(line.replace(/\n/g, '').replace(/<br\/>/g, '\n'))
        if (message.length) { json[hexdigest(line)] = message }
    })

    fs.write('./commit_messages.js', template(json))
    fs.commit(() => console.log('All done...'))
})

console.log('Updating ./humans.js')

downloadHumans.run((err, files) => {
    if (err || !files.length || !files[0]) { throw err }
    const store = memFs.create()
    const fs = editor.create(store)

    let json = [
      'Nick', 'Steve', 'Andy', 'Qi', 'Fanny', 'Sarah', 'Cord', 'Todd',
      'Chris', 'Pasha', 'Gabe', 'Tony', 'Jason', 'Randal', 'Ali', 'Kim',
      'Rainer', 'Guillaume', 'Kelan', 'David', 'John', 'Stephen', 'Tom',
      'Steven', 'Jen', 'Marcus', 'Edy', 'Rachel'
    ].concat(
      files[0].contents.toString().split('\n')
        .filter(line => line.indexOf('Name: ') === 0)
        .map(line => line.substring(6))
        .map(data => (data.indexOf('github:') === 0) ? data.substring(7) : data.split(' ')[0])
    )

    fs.write('./humans.js', template(json))
    fs.commit(() => console.log('All done...'))
})
