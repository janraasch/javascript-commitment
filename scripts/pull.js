#!/usr/bin/env babel-node
const crypto = require('crypto')
const Download = require('download')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const ent = require('ent')

const commit_messages_txt = 'https://raw.githubusercontent.com/ngerakines/commitment/master/commit_messages.txt'
const template = (json) => `"use strict";\nmodule.exports = ${JSON.stringify(json, null, ' ')};\n`

const download = new Download({mode: '755'})
    .get(commit_messages_txt)
    .dest('./downloads')

const store = memFs.create()
const fs = editor.create(store)

// Behaves like Python's `f.readlines()`.
const readlines = (file) => file.contents.toString().split(/\r\n|\r|\n/g).map(line => `${line}\n`)

// Behaves like Python's `hashlib.md5(line).hexdigest()`.
const hexdigest = (string) => crypto.createHash('md5').update(string).digest('hex')

console.log('Updating ./commit_messages.js')

download.run((err, files) => {
    if (err || !files.length || !files[0]) { throw err }
    let json = {}

    readlines(files[0]).forEach(line => {
        let message = ent.decode(line.replace(/\n/g, '').replace(/<br\/>/g, '\n'))
        if (message.length) { json[hexdigest(line)] = message }
    })

    fs.write('./commit_messages.js', template(json))
    fs.commit(() => console.log('All done...'))
})
