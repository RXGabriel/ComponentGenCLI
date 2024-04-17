
import RunService from '../service/runService.js'
import RunRepository from '../repository/runRepository.js'

export default class RunFactory {
    static getInstance() {
        const repository = new RunRepository()
        const service = new RunService({ repository })
        return service
    }
}