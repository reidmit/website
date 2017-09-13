const fs = require('fs')
const omelet = require('../omelet/omelet/lib/omelet.js')
const markdown = require('markdown').markdown

const enabled = true

const context = {}

// Omelet compiler options
const options = {
    prettyPrint: false,
    modes: {
        markdown: input => {
            console.log(input)
            return markdown.toHTML(input)
        }
    }
}

const toRender = [
    {
        inputFile: 'templates/index.omelet',
        outputFile: 'index.html',
        context: context,
        options: options
    },
    {
        inputFile: 'templates/about.omelet',
        outputFile: 'about.html',
        context: context,
        options: options
    }
]

if (enabled) {
    toRender.forEach(item => {
        const html = omelet.renderFile(item.inputFile, item.context, item.options)
        fs.writeFile(item.outputFile, html, err => {
            if (err) return console.error(err)

            console.log(`${item.outputFile} written successfully!`)
        })
    })
}
