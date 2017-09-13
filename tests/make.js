const fs = require('fs')
const omelet = require('../../omelet/omelet/lib/omelet.js')
// const omelet = require('omeletjs')
const sass = require('node-sass')
const chokidar = require('chokidar')

const watchForChanges = true

// Execution context
const context = {
    lastEditedDate: new Date()
}

// Omelet compiler options
const options = {
    prettyPrint: false,
    modes: {}
}

const omeletToRender = [
    {
        inputFile: 'home.omelet',
        outputFile: 'index.html',
        context: context,
        options: options
    },
    {
        inputFile: 'about.omelet',
        outputFile: 'about.html',
        context: context,
        options: options
    },
    {
        inputFile: 'post1.omelet',
        outputFile: 'post1.html',
        context: context,
        options: options
    },
]

const scssToRender = [
    {
        inputFile: 'main.scss',
        outputFile: 'main.css',
        options: {}
    }
]

const renderOmelet = (inputFile, outputFile, context, options) => {
    const html = omelet.renderFile(inputFile, context, options);

    fs.writeFile(outputFile, html, err => {
        if (err) {
            return console.error(err)
        }

        console.log(`HTML file '${outputFile}' written successfully`)
    })
}

// chokidar.watch("C:\\Users\\reidm\\Code\\omelet\\omelet\\lib").on("change", (path, evt) => {
    // var item = omeletToRender[0]
    // renderOmelet(item.inputFile, item.outputFile, item.context, item.options)
// })

const renderScss = (inputFile, outputFile, options) => {
    sass.render({
        file: inputFile
    }, (err, result) => {
        if (err) {
            return console.error(err)
        }

        fs.writeFile(outputFile, result.css.toString(), err => {
            if (err) {
                return console.error(err)
            }

            console.log(`CSS file '${outputFile}' written successfully`)
        })
    })
}
//
// if (watchForChanges) {
//     const omeletFilesToWatch = omeletToRender.map(f => f.inputFile)
//     const scssFilesToWatch = scssToRender.map(f => f.inputFile)
//     console.log('Watching for changes: ' + [omeletFilesToWatch, scssFilesToWatch])
//
//     chokidar.watch(omeletFilesToWatch).on('change', (path, evt) => {
//         console.log(`File changed: '${path}'`)
//         const item = omeletToRender.filter(i => i.inputFile === path)[0]
//         if (item) {
//             renderOmelet(item.inputFile, item.outputFile, item.context, item.options)
//         }
//     })
//
//     chokidar.watch(scssFilesToWatch).on('change', (path, evt) => {
//         console.log(`File changed: '${path}'`)
//         const item = scssToRender.filter(i => i.inputFile === path)[0]
//         if (item) {
//             renderScss(item.inputFile, item.outputFile, item.options)
//         }
//     })
//
// } else {
    scssToRender.forEach(item =>
        renderScss(item.inputFile, item.outputFile, item.options))

    omeletToRender.forEach(item =>
        renderOmelet(item.inputFile, item.outputFile, item.context, item.options))
// }
