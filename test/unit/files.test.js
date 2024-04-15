import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fsPromises from 'fs/promises'
import fs from 'fs'
import { createFiles } from '../../src/createfiles.js'
import templates from '../../src/templates/index.js'

describe('#Layers - Files Structure', () => {
    const defaultLayers = ['service', 'factory', 'repository']
    const config = { mainPath: './', defaultMainFolder: '/src', layers: defaultLayers, componentName: 'heroes' }
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    test('should not create file structure on inexistent templates', async () => {
        const myConfig = {
            ...config,
            layers: ['inexistent']
        }
        const expected = { error: 'the chosen layer does\n have a template' }
        const result = await createFiles(myConfig)
        expect(result).toStrictEqual(expected)
    })

    test('#repository should not add any additional dependencies', async () => {
        jest.spyOn(fsPromises, fs.writeFile.name).mockResolvedValue()
        jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({ fileName: '', template: '' })

        const myConfig = {
            ...config,
            layers: ['repository']
        }
        const expected = { success: true }
        const result = await createFiles(myConfig)

        expect(result).toStrictEqual(expected)
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
        expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
    })
})