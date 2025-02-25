# Daily Briefing Feature for Quartz

This feature automatically creates a daily briefing with both a random GIF from Giphy and a random image from Pexels each day. It displays the briefing on your homepage and archives full versions in a dedicated section.

## How It Works

1. A GitHub Actions workflow runs daily at 6:00 AM UTC
2. The script fetches a random GIF from Giphy using a randomly selected topic
3. The script also fetches a random image from Pexels using another randomly selected topic
4. **The main index.md page (homepage) is updated with today's briefing, GIF, and image**
5. A full version of the briefing is archived in `content/daily/` with today's date (YYYY-MM-DD.md)
6. The media files are downloaded to `content/images/daily/`
7. Changes are committed and pushed back to your repository

## Setup Instructions

1. **Get API Keys**:
   - Go to [Giphy API](https://developers.giphy.com/) and sign up for a free API key
   - Go to [Pexels API](https://www.pexels.com/api/) and sign up for a free API key
   - Keep these API keys handy for the next steps

2. **Add your API Keys to GitHub Secrets**:
   - Go to your GitHub repository settings
   - Navigate to "Secrets and variables" > "Actions"
   - Create two new repository secrets:
     - `GIPHY_API_KEY` with your Giphy API key as the value
     - `PEXELS_API_KEY` with your Pexels API key as the value

3. **Local Development**:
   - If you want to run the script locally, create a `.env` file in the root of your Quartz project with:
     ```
     GIPHY_API_KEY=your_giphy_api_key_here
     PEXELS_API_KEY=your_pexels_api_key_here
     ```

## Running Manually

You can trigger the workflow manually by:

1. Going to the "Actions" tab in your GitHub repository
2. Selecting the "Daily Briefing Generator" workflow
3. Clicking "Run workflow"

Or locally:

```bash
# Make sure you have the required dependencies
npm install axios dotenv

# Run the script
node scripts/createDailyBriefing.js
```

## Customizing the Template

You can customize both templates by editing these functions in `scripts/createDailyBriefing.js`:

1. `generateHomepageContent` - Controls how the briefing appears on your homepage
2. `generateDailyNoteContent` - Controls the format of the archived full briefings

## Navigation Structure

This setup provides:

1. A daily briefing right on your homepage with the latest GIF and image
2. A "View full briefing →" link to the complete daily note
3. A link to the archive of all daily briefings
4. The "📆 Daily Briefings" folder in the navigation explorer

## Troubleshooting

- If the GitHub Action fails, check the workflow logs for details
- Ensure your Giphy and Pexels API keys are correctly set up in the repository secrets
- Make sure the repository has the correct permissions to push changes (this should be automatic for the default GitHub Action)
- If only one media type works but not the other, check the respective API key and ensure the API hasn't changed their endpoints