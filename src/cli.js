#!/usr/bin/env node

const pkg = require('../package.json');

require('yargs')
    .describe('client', 'client name')
    .describe('address', 'accessory IP address or hostname')
    .describe('port', 'accessory port')
    .alias({
        'client': 'c',
        'address': 'd',
        'port': 'p'
    })
    .default('client', 'hap-client-tool')
    .demandOption(['address', 'port'])
    .commandDir('cmds')
    .demandCommand()
    .help()
    .argv
