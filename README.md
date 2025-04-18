# Zenstack prisma REST autogen

Autogenerates a REST API (JSONAPI) from prisma schema with ACL. 

## Features

* [x] Prisma schema is the single source of truth
* [x] ACL is embedded in prisma schema with zmodel from zenstack
* [x] REST API is generated for all CRUD endpoints for models
* [x] Only models with ACL defined (@allow) are accessbile in API

## Todo

* [ ] Add Zod validation
* [ ] Generate OpenAPI spec

## API Features

* /api/model/post - list all posts
* /api/model/post/1 - show post id=1
* /api/model/post?filter[title]=Hello%20World - Get post with title "Hello World"
* /api/model/post?filter[content$contains]=word - find Post.content that contain "word"

Full list of features - https://zenstack.dev/docs/reference/server-adapters/api-handlers/rest#filtering


## Docs

* https://zenstack.dev/docs/reference/server-adapters/api-handlers/rest
* https://zenstack.dev/docs/reference/server-adapters/fastify