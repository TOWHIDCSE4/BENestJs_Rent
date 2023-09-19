### Migration:

1. Create empty migration: `yarn migration:create --name='name'`
2. Generate migration base on differences with database: `npm run migration:generate --name='name'`
3. Run migration: `yarn migration:up`
4. Revert migration: `yarn migration:down`

### Husky:

1. Skip husky with command: git commit -n -m '<commit message>'

### Run redis:

1. docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

### Roadmap:
The following improvements are currently in progress :

 Configuration validation
 Dockerfile improvements and better usage of environment variables
 Project structure documentation
 TypeORM migration support
 Healtcheck support
 Better logging configuration with environment variables
 Working further on examples for production instructions

 
 ### Project goals:
The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with NestJS.