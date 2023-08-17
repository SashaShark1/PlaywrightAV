import log4js from 'log4js'

const baseLogsPath = './logs/'

log4js.configure({
    appenders: {
        fullLog: {type: 'file', filename: baseLogsPath + 'full.log'},

        debug: {type: 'file', filename: baseLogsPath + 'debug.log'},
        debugOnly: {type: 'logLevelFilter', appender: 'debug', level: 'debug'},

        info: {type: 'file', filename: baseLogsPath + 'info.log'},
        infoOnly: {type: 'logLevelFilter', appender: 'info', level: 'info'},

        warn: {type: 'file', filename: baseLogsPath + 'warn.log'},
        warnOnly: {type: 'logLevelFilter', appender: 'warn', level: 'warn'},

        error: {type: 'file', filename: baseLogsPath + 'error.log'},
        errorOnly: {type: 'logLevelFilter', appender: 'error', level: 'error'},
        
        fatal: {type: 'file', filename: baseLogsPath + 'fatal.log'},
        fatalOnly: {type: 'logLevelFilter', appender: 'fatal', level: 'fatal'},
       
        console: {type: 'console'}
    },
    categories: {
        default: {
           appenders: ["fullLog", "debugOnly", "infoOnly", "warnOnly", "errorOnly", "fatalOnly", "console"],
           level: 'debug' 
        }
    }
})

// log4js.configure({
//     appenders: {
//         out: {type: "stdout"},
//         app: {type: "file", filename: `${baseLogsPath}app.log`},
//         multi: {
//             type: 'multiFile',
//             base: baseLogsPath,
//             property: 'categoryName',
//             extension: '.log',
//             maxLogSize: 1024,
//             backup: 3,
//             compress: true
//         }

//     },
//     categories: {
//         default: {
//            appenders: ["app", "out", "multi"],
//            level: 'debug' 
//         }
//     }
// })

const logger = log4js.getLogger()

export {logger}