
export default class RunService {
  constructor({ repository: runRepository }) {
    this.runRepository = runRepository
  }

  create(data) {
    return this.runRepository.create(data)
  }

  read(query) {
    return this.runRepository.read(query)
  }

  update(id, data) {
    return this.runRepository.update(id, data)
  }

  delete(id) {
    return this.runRepository.delete(id)
  }
}