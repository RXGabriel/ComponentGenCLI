import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import Util from '../../src/util.js'
import { createLayersIfNotExists } from './../../src/createLayers.js'
import { createFiles } from './../../src/createFiles.js'

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
    return layers.map(layer => {
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        return join(mainPath, defaultMainFolder, layer, fileName)
    })
}

function getAllFunctionsFromInstance(instance) {
    return Reflect
        .ownKeys(Reflect.getPrototypeOf(instance))
        .filter(method => method !== 'constructor')
}

describe('#Integration - Files - Files Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        layers: ['service', 'factory', 'repository'].sort((a, b) => a.localeCompare(b)),
        componentName: 'heroes'
    }
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks/', packageJSON)

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON))
        await createLayersIfNotExists(config)
    })
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('Repository class should have create, read, update and delete methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }

        await createFiles(myConfig)
        const [repositoryFile] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        const repositoryInstance = new Repository()
        const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual('method not implemented!')

        await expectNotImplemented(repositoryInstance.create)
        await expectNotImplemented(repositoryInstance.read)
        await expectNotImplemented(repositoryInstance.update)
        await expectNotImplemented(repositoryInstance.delete)
    })

    test('Service should have the same signature of repository and call all its methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }

        await createFiles(myConfig)
        const [repositoryFile, serviceFile] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const repositoryInstance = new Repository()
        const serviceInstance = new Service({ repository: repositoryInstance })
        const allRepositoryMethods = getAllFunctionsFromInstance(repositoryInstance)
        allRepositoryMethods
            .forEach(method => jest.spyOn(repositoryInstance, method).mockReturnValue())

        getAllFunctionsFromInstance(serviceInstance)
            .forEach(method => serviceInstance[method].call(serviceInstance, []))

        allRepositoryMethods
            .forEach(method => expect(repositoryInstance[method]).toHaveBeenCalled())
    })

    test('Factory instance should match layers', async () => {
        const myConfig = {
            ...config
        }

        await createFiles(myConfig)
        const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const { default: Factory } = await import(factoryFile)
        const expectedServiceInstance = new Service({ repository: new Repository() })
        const factoryInstance = Factory.getInstance()

        expect(factoryInstance).toMatchObject(expectedServiceInstance)
        expect(factoryInstance).toBeInstanceOf(Service)
    })
})