# Zenstack prisma REST autogen

Autogenerates a REST API (JSONAPI) from prisma schema with ACL. 

## Features

* [x] Prisma schema is the single source of truth
* [x] ACL is embedded in prisma schema with zmodel from zenstack
* [x] REST API is generated for all CRUD endpoints for models
* [x] Only models with ACL defined (@allow) are accessbile in API

## Todo

* [] Add Zod validation
* [] Generate OpenAPI spec