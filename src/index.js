#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { createLayersIfNotExists } from "./createlayers.js"
import { createFiles } from './createFiles.js';

const { argv: { componentName } } = yargs(hideBin(process.argv))
    .command('skeleton', 'create project skeleton', (builder) => {
        return builder.option('component-name', {
            alias: 'c',
            demandOption: true,
            describe: 'component\'s name',
            type: 'array'
        })
            .example('skeleton --component-name product', 'create project with a single domain')
            .example('skeleton -c product -c person -c colors ', 'create project with a list of domain')
    })
    .epilog('copyright 2024 - Gabriel Corporation')

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'temp' : 'src'
const layers = ['repository', 'service', 'factory'].sort()
const config = {
    layers,
    defaultMainFolder,
    mainPath: '.',
}

await createLayersIfNotExists(config)
const pendingPromises = []

for (const domain of componentName) {
    const result = createFiles({ ...config, componentName: domain })
    pendingPromises.push(result)
}
await Promise.all(pendingPromises)