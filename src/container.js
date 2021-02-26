const awilix = require('awilix')
const { createContainer, asClass, asFunction, asValue, InjectionMode } = awilix
const config = require('./infra/config')
const getTasks = require('./application/get_tasks')
const db = require('./infra/persistence/pg')
// const repositories = require('./infra/repository')
const taskRepository = require('./infra/repository/task-repository')

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
})
//global
container.register({
    config: asValue(config)
})
// repositories
container.register({
    db: asFunction(db).singleton(),
    taskRepository: asClass(taskRepository)
    // repositories: asFunction(repositories).singleton()
})
//applications
container.register({
    getTasks: asClass(getTasks)
})
module.exports = container