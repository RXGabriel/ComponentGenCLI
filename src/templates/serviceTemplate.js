const template = `
export default class $$componentNameService {
  constructor({ repository: $$repositoryName }) {
    $$currentContext = $$repositoryName
  }

  create(data) {
    return $$currentContext.create(data)
  }

  read(query) {
    return $$currentContext.read(query)
  }

  update(id, data) {
    return $$currentContext.update(id, data)
  }

  delete(id) {
    return $$currentContext.delete(id)
  }
}`

export function serviceTemplate(componentName) {
    return {
        fileName: `${componentName}Service`,
        template
    }
}