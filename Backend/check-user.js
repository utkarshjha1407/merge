require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            activities: true,
            dailyStats: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    console.log('\n=== Users in Database ===\n');
    
    if (users.length === 0) {
      console.log('❌ No users found. Please login first:');
      console.log('   http://localhost:8080/auth/github\n');
    } else {
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Username: ${user.username}`);
        console.log(`  GitHub ID: ${user.githubId}`);
        console.log(`  Current Streak: ${user.currentStreak}`);
        console.log(`  Longest Streak: ${user.longestStreak}`);
        console.log(`  Activities: ${user._count.activities}`);
        console.log(`  Daily Stats: ${user._count.dailyStats}`);
        console.log(`  Followers: ${user._count.followers}`);
        console.log(`  Following: ${user._count.following}`);
        console.log(`  Created: ${user.createdAt}`);
        console.log('');
      });
    }

    await prisma.$disconnect();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
