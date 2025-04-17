import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: 'securepassword123', // Make sure to hash in production
      posts: {
        create: [
          {
            title: 'Hello World',
            content: 'This is my first post!',
            published: true,
          },
          {
            title: 'Draft Post',
            content: 'This one is still a draft.',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: 'anothersecurepassword',
      posts: {
        create: [
          {
            title: 'Bob’s First Post',
            content: 'Bob writes a lot.',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
