import Fastify from 'fastify';
import { enhance } from '@zenstackhq/runtime';
import { ZenStackFastifyPlugin } from '@zenstackhq/server/fastify';
import { getSessionUser } from './auth.ts';
import { prisma } from './prisma/prisma-client';
import { RestApiHandler } from '@zenstackhq/server/api';
import fs from 'fs';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

const fastify = Fastify({ logger: true });

const main = async () => {
  // Register swagger
await fastify.register(fastifySwagger);

// Register Swagger UI
await fastify.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

// Register ZenStack REST API
await fastify.register(ZenStackFastifyPlugin, {
  prefix: '/api/model',
  getPrisma: (request) => enhance(prisma, { user: getSessionUser(request) }),
  handler: (req) => {
    const handler = RestApiHandler({ endpoint: 'http://localhost:3000/api/model' });
    return handler(req);
  },
  zodSchemas: true,
});

// Start the server
fastify.listen({ port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
}

main()
