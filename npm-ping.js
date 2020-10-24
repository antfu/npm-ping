#!/usr/bin/env node
'use strict'

const axios = require('axios')
const chalk = require('chalk')

const name = process.argv[2]

function ping() {
  const template = [
    `https://www.npmjs.com/package/${name}`,
    `https://www.npmjs.com/~${name}`,
  ]

  const pad = Math.max(...template.map((i) => i.length)) + 5

  template.forEach(async (url) => {
    let res
    try {
      res = await axios.get(url)
    } catch (e) {
      res = e.response
    }

    if (res)
      console.log(
        chalk.blue(url.padEnd(pad)) +
          chalk[res.status === 404 ? 'green' : 'yellow'](
            `${res.status} - ${res.statusText}`
          )
      )
  })
}

if (name) ping()
