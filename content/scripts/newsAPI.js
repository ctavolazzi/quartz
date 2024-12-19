// News API Integration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2';

async function getAINews(pageSize = 5) {
    try {
        const url = `${NEWS_API_ENDPOINT}/everything`;
        const params = new URLSearchParams({
            q: 'artificial intelligence OR machine learning OR AI technology',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: pageSize.toString(),
            apiKey: NEWS_API_KEY
        });

        const response = await fetch(`${url}?${params}`);
        const data = await response.json();

        if (data.status === 'ok') {
            const formattedNews = data.articles.map(article => {
                return `## ${article.title}\n${article.description || ''}\n[Read more](${article.url})\n`;
            }).join('\n');

            return formattedNews || 'No AI news available at the moment.';
        } else {
            return `Error: ${data.message || 'Failed to fetch AI news'}`;
        }
    } catch (error) {
        return `Error getting AI news: ${error.message}`;
    }
}

module.exports = getAINews;