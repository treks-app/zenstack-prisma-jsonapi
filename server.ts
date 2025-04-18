import { enhance } from '@zenstackhq/runtime';
import { ZenStackFastifyPlugin } from '@zenstackhq/server/fastify';
import { getSessionUser } from './auth.ts';
import Fastify from 'fastify'
import { prisma } from './prisma/prisma-client';
import { RestApiHandler } from '@zenstackhq/server/api';

const fastify = Fastify({
  logger: true
})

// development
const endpoint = 'http://localhost:3000/api/model'

// serve OpenAPI at /api/model
fastify.register(ZenStackFastifyPlugin, {
    prefix: '/api/model',
    // getSessionUser extracts the current session user from the request, its
    // implementation depends on your auth solution
    getPrisma: (request) => enhance(prisma, { user: getSessionUser(request) }),
    handler: (req) => {
      // base url for RESTful resource linkage
      const handler = RestApiHandler({ 
        endpoint
      })
      return handler(req)
    },
    zodSchemas: true
});

fastify.listen({ port: 3000 })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })