import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import templates from './../../src/templates/index.js'
import { repositoryTemplateMock } from './mocks/index.js'

const { repositoryTemplate, serviceTemplate } = templates

describe('#Codegen 3-layers architecture', () => {
    const componentName = 'product'
    const repositoryName = `${componentName}Repository`

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    test('#should generate repository template', () => {
        const expected = {
            fileName: repositoryName,
            template: repositoryTemplateMock
        }
        const result = repositoryTemplate(componentName)

        expect(result).toStrictEqual(expected)
    })

})