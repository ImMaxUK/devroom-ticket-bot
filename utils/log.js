var bunyan = require('bunyan')
; bformat = require('bunyan-format')  
; formatOut = bformat({ outputMode: 'short' })

module.exports.log = bunyan.createLogger({ name: 'BOT', stream: formatOut, level: 'debug' } );