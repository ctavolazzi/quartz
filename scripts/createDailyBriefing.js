import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const CONTENT_DIR = path.join(__dirname, '../content');
const DAILY_NOTES_DIR = path.join(CONTENT_DIR, 'daily');
const MEDIA_DIR = path.join(CONTENT_DIR, 'images/daily');
const INDEX_FILE_PATH = path.join(CONTENT_DIR, 'index.md');

// Ensure the directories exist
if (!fs.existsSync(DAILY_NOTES_DIR)) {
  fs.mkdirSync(DAILY_NOTES_DIR, { recursive: true });
}
if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Get a random topic for media search
 */
function getRandomTopic() {
  const topics = [
    'inspiration', 'motivation', 'success', 'creativity', 'ideas',
    'happy', 'innovation', 'learning', 'growth', 'mindfulness',
    'focus', 'productivity', 'nature', 'technology', 'science',
    'art', 'design', 'coding', 'thinking', 'writing'
  ];
  return topics[Math.floor(Math.random() * topics.length)];
}

/**
 * Fetch a random gif from Giphy
 */
async function fetchGiphyGif() {
  if (!GIPHY_API_KEY) {
    throw new Error('Giphy API key is not set. Please set GIPHY_API_KEY in your environment variables.');
  }

  try {
    const topic = getRandomTopic();
    console.log(`Fetching Giphy gif for topic: ${topic}`);

    // Use Giphy's random endpoint
    const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${topic}&rating=g`);

    if (!response.data || !response.data.data || !response.data.data.images) {
      throw new Error('No GIF found in the Giphy API response');
    }

    const gifData = response.data.data;
    return {
      imageUrl: gifData.images.original.url,
      originalUrl: gifData.url,
      username: gifData.username || 'Giphy Artist',
      title: gifData.title || `${topic} GIF`,
      alt: `${topic} GIF from Giphy`,
      topic
    };
  } catch (error) {
    console.error('Error fetching GIF from Giphy:', error.message);
    throw error;
  }
}

/**
 * Fetch a random image from Pexels
 */
async function fetchPexelsImage() {
  if (!PEXELS_API_KEY) {
    throw new Error('Pexels API key is not set. Please set PEXELS_API_KEY in your environment variables.');
  }

  try {
    const topic = getRandomTopic();
    console.log(`Fetching Pexels image for topic: ${topic}`);

    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${topic}&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      }
    );

    if (!response.data || !response.data.photos || response.data.photos.length === 0) {
      throw new Error('No images found in the Pexels API response');
    }

    const photo = response.data.photos[0];
    return {
      imageUrl: photo.src.original,
      originalUrl: photo.url,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      alt: `${topic} image from Pexels`,
      topic
    };
  } catch (error) {
    console.error('Error fetching image from Pexels:', error.message);
    throw error;
  }
}

/**
 * Download media file and save it locally
 */
async function downloadMedia(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    fs.writeFileSync(filename, buffer);
    console.log(`Media downloaded and saved to ${filename}`);
    return filename;
  } catch (error) {
    console.error('Error downloading media:', error.message);
    throw error;
  }
}

/**
 * Generate the daily note markdown content
 */
function generateDailyNoteContent(date, gifInfo, localGifPath, imageInfo, localImagePath) {
  const relativeGifPath = path.relative(CONTENT_DIR, localGifPath).replace(/\\/g, '/');
  const relativeImagePath = path.relative(CONTENT_DIR, localImagePath).replace(/\\/g, '/');
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `---
title: "Daily Briefing - ${formatDate(date)}"
date: ${date.toISOString()}
tags: [daily-briefing, ${gifInfo.topic}, ${imageInfo.topic}]
---

# Daily Briefing - ${formattedDate}

## Today's Inspiration GIF

![${gifInfo.alt}](/${relativeGifPath})

*GIF: "${gifInfo.title}" from [Giphy](${gifInfo.originalUrl})*

## Today's Image

![${imageInfo.alt}](/${relativeImagePath})

*Photo by [${imageInfo.photographer}](${imageInfo.photographerUrl}) on [Pexels](${imageInfo.originalUrl})*

## Today's Highlights

*Write your daily highlights here*

## News Roundup

*Summarize important news here*

## Interesting Facts

*Share some interesting facts here*

## Quote of the Day

*Insert an inspiring quote here*

## Resources and Links

*Add helpful resources and links here*

---

*This daily briefing was automatically generated on ${formattedDate}*
`;
}

/**
 * Generate the homepage content with daily briefing
 */
function generateHomepageContent(date, gifInfo, localGifPath, imageInfo, localImagePath, dailyNoteFilename) {
  const relativeGifPath = path.relative(CONTENT_DIR, localGifPath).replace(/\\/g, '/');
  const relativeImagePath = path.relative(CONTENT_DIR, localImagePath).replace(/\\/g, '/');
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `---
title: Home 🌱
type: index
status: active
created: 2024-02-24
modified: ${date.toISOString().split('T')[0]}
aliases:
  - home
  - start
tags:
  - "#home"
  - "#index"
---

# Welcome to My Digital Garden

This is a fresh start for my digital garden using Quartz. Here I'll be documenting my thoughts, projects, and knowledge.

## Today's Briefing - ${formattedDate}

### Daily GIF

![${gifInfo.alt}](/${relativeGifPath})

*GIF: "${gifInfo.title}" from [Giphy](${gifInfo.originalUrl})*

### Daily Image

![${imageInfo.alt}](/${relativeImagePath})

*Photo by [${imageInfo.photographer}](${imageInfo.photographerUrl}) on [Pexels](${imageInfo.originalUrl})*

### Today's Highlights

*Write your daily highlights here*

[View full briefing →](daily/${dailyNoteFilename.replace('.md', '')})

## Getting Started

- [[projects]] - Current projects I'm working on
- [[notes]] - General notes and thoughts
- [[resources]] - Useful resources and links
- [[daily/index|Daily Briefings]] - Archive of daily briefings

## Recent Updates

- Updated with daily briefing (${formattedDate})
- Created this new digital garden (February 24, 2024)

---

> "The best time to plant a tree was 20 years ago. The second best time is now." — Chinese Proverb
`;
}

/**
 * Create the daily briefing
 */
async function createDailyBriefing() {
  const today = new Date();
  const dateString = formatDate(today);
  const dailyNoteFilename = `${dateString}.md`;
  const dailyNotePath = path.join(DAILY_NOTES_DIR, dailyNoteFilename);

  try {
    // Check if today's note already exists
    if (fs.existsSync(dailyNotePath)) {
      console.log(`Daily note for ${dateString} already exists.`);
      return;
    }

    // Fetch gif from Giphy
    const gifInfo = await fetchGiphyGif();

    // Download the gif
    const gifFilename = `${dateString}-daily-gif.gif`;
    const localGifPath = path.join(MEDIA_DIR, gifFilename);
    await downloadMedia(gifInfo.imageUrl, localGifPath);

    // Fetch image from Pexels
    const imageInfo = await fetchPexelsImage();

    // Download the image
    const imageFilename = `${dateString}-daily-image.jpg`;
    const localImagePath = path.join(MEDIA_DIR, imageFilename);
    await downloadMedia(imageInfo.imageUrl, localImagePath);

    // Create the daily note markdown file
    const dailyMarkdownContent = generateDailyNoteContent(today, gifInfo, localGifPath, imageInfo, localImagePath);
    fs.writeFileSync(dailyNotePath, dailyMarkdownContent);

    console.log(`Daily briefing for ${dateString} created successfully at ${dailyNotePath}`);

    // Update the homepage with the daily briefing content
    const homepageContent = generateHomepageContent(today, gifInfo, localGifPath, imageInfo, localImagePath, dailyNoteFilename);
    fs.writeFileSync(INDEX_FILE_PATH, homepageContent);

    console.log(`Homepage updated with today's briefing content.`);
  } catch (error) {
    console.error('Error creating daily briefing:', error);
  }
}

// Execute the function if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createDailyBriefing().catch(console.error);
}

export { createDailyBriefing };