#!/usr/bin/env node

/**
 * This script generates a daily briefing for today.
 * Run it to manually create a briefing note with a Giphy GIF and a Pexels image.
 */

// Import the createDailyBriefing function from the main script
import { createDailyBriefing } from './createDailyBriefing.js';

console.log('📝 Generating today\'s daily briefing...');

// Call the function with a callback to handle completion
createDailyBriefing()
  .then(() => {
    console.log('✅ Daily briefing successfully generated!');
    console.log('📋 Check your homepage and the content/daily directory for the new content.');
  })
  .catch((error) => {
    console.error('❌ Error generating daily briefing:', error);
    console.log('Make sure you have set your GIPHY_API_KEY and PEXELS_API_KEY in the .env file.');
    process.exit(1);
  });