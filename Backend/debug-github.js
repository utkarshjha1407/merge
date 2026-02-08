require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function debugGitHub() {
  try {
    // Get user
    const user = await prisma.user.findFirst({
      where: { username: 'utkarshjha1407' }
    });

    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('\n=== GitHub API Debug ===\n');
    console.log('Username:', user.username);
    console.log('GitHub ID:', user.githubId.toString());
    console.log('');

    const octokit = new Octokit({ auth: user.accessToken });

    // Get authenticated user
    const { data: githubUser } = await octokit.users.getAuthenticated();
    console.log('✅ Authenticated as:', githubUser.login);
    console.log('   Public Repos:', githubUser.public_repos);
    console.log('');

    // Get events
    console.log('Fetching recent events...');
    const { data: events } = await octokit.activity.listEventsForAuthenticatedUser({
      username: githubUser.login,
      per_page: 100,
    });

    console.log('Total events found:', events.length);
    console.log('');

    // Group by event type
    const eventTypes = {};
    events.forEach(event => {
      eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
    });

    console.log('Event types:');
    Object.entries(eventTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('');

    // Show push events
    const pushEvents = events.filter(e => e.type === 'PushEvent');
    console.log('Push events:', pushEvents.length);
    
    if (pushEvents.length > 0) {
      console.log('\nRecent push events:');
      pushEvents.slice(0, 5).forEach(event => {
        console.log(`  - ${event.repo.name}`);
        console.log(`    Date: ${event.created_at}`);
        console.log(`    Commits: ${event.payload.commits?.length || 0}`);
      });
    } else {
      console.log('\n⚠️  No push events found in recent activity');
      console.log('This could mean:');
      console.log('  1. No commits pushed recently');
      console.log('  2. Commits are in private repos (check OAuth scopes)');
      console.log('  3. Activity is older than GitHub keeps in the feed');
    }

    await prisma.$disconnect();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

debugGitHub();
