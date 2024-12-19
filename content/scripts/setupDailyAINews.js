const http = require('http');
const https = require('https');

async function setupDailyAINews() {
    return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            if (req.url === '/api/news') {
                try {
                    const today = new Date();
                    const dateStr = today.toISOString().split('T')[0];
                    const [year, month, day] = dateStr.split('-');

                    const prevDay = new Date(today);
                    prevDay.setDate(today.getDate() - 1);
                    const nextDay = new Date(today);
                    nextDay.setDate(today.getDate() + 1);

                    const prevDateStr = prevDay.toISOString().split('T')[0];
                    const nextDateStr = nextDay.toISOString().split('T')[0];

                    // First API call for latest AI news
                    const newsApiUrl = 'https://newsapi.org/v2/everything';
                    const params = new URLSearchParams({
                        q: 'artificial intelligence',
                        language: 'en',
                        sortBy: 'relevancy',
                        pageSize: '5',
                        apiKey: '51e31e1aada647c19f316bbfb4dfbff4'
                    });

                    // Second API call for company-specific news
                    const companyParams = new URLSearchParams({
                        q: '(OpenAI OR "Google DeepMind" OR Anthropic OR Microsoft AI)',
                        language: 'en',
                        sortBy: 'relevancy',
                        pageSize: '3',
                        apiKey: '51e31e1aada647c19f316bbfb4dfbff4'
                    });

                    const options = {
                        headers: {
                            'User-Agent': 'ObsidianAINewsCollector/1.0'
                        }
                    };

                    // Make both API calls
                    const [mainNews, companyNews] = await Promise.all([
                        new Promise((resolve) => {
                            https.get(`${newsApiUrl}?${params}`, options, (apiRes) => {
                                let data = '';
                                apiRes.on('data', (chunk) => data += chunk);
                                apiRes.on('end', () => {
                                    try {
                                        resolve(JSON.parse(data));
                                    } catch (error) {
                                        resolve({ status: 'error', message: error.message });
                                    }
                                });
                            }).on('error', (error) => resolve({ status: 'error', message: error.message }));
                        }),
                        new Promise((resolve) => {
                            https.get(`${newsApiUrl}?${companyParams}`, options, (apiRes) => {
                                let data = '';
                                apiRes.on('data', (chunk) => data += chunk);
                                apiRes.on('end', () => {
                                    try {
                                        resolve(JSON.parse(data));
                                    } catch (error) {
                                        resolve({ status: 'error', message: error.message });
                                    }
                                });
                            }).on('error', (error) => resolve({ status: 'error', message: error.message }));
                        })
                    ]);

                    server.close();

                    try {
                        let mainNewsContent = '';
                        let companyNewsContent = '';
                        let trendingTopics = new Set();

                        if (mainNews.status === 'ok' && mainNews.articles) {
                            mainNewsContent = mainNews.articles.map(article => {
                                // Extract potential trending topics from titles
                                const topics = article.title.match(/\b(?:AI|ML|GPT-\d|LLM|Transformer|Neural|Robot\w*)\b/g) || [];
                                topics.forEach(topic => trendingTopics.add(topic));

                                return `## ${article.title}\n${article.description || ''}\n[Read more](${article.url})\n`;
                            }).join('\n');
                        }

                        if (companyNews.status === 'ok' && companyNews.articles) {
                            companyNewsContent = companyNews.articles.map(article => {
                                return `### ${article.title}\n${article.description || ''}\n[Read more](${article.url})\n`;
                            }).join('\n');
                        }

                        const template = `[[AI News/AI-News-${prevDateStr}|⬅️ Previous Day]] | [[AI News/index|📚 Archive]] | [[${dateStr}|📝 Daily Note]] | [[AI News/AI-News-${nextDateStr}|Next Day ➡️]]

# 🤖 AI News for ${month}/${day}/${year}

## 📈 Story Tracking
- [[OpenAI Developments]]
- [[Google DeepMind Progress]]
- [[Anthropic Updates]]
- [[AI Safety Initiatives]]
- [[AI Regulation News]]
- [[Open Source AI]]

## 📈 Today's Highlights
${mainNewsContent}

## 🏢 Major Company Updates
${companyNewsContent}

## 🌟 Trending Topics
${Array.from(trendingTopics).map(topic => `- [[${topic}]]`).join('\n')}

## 📊 Market Pulse
- **AI Company Stock Updates:** [Updates]
- **Funding Rounds:** [Recent Funding]
- **Market Trends:** [Trends]

## 🔬 Research & Development
### Recent Papers
- [Paper Title 1]
- [Paper Title 2]

### Breakthroughs
- [Breakthrough 1]
- [Breakthrough 2]

## 🎯 Product Launches
- [Product 1]
- [Product 2]

## 🚨 Critical Updates
- **Safety:** [Safety Updates]
- **Regulation:** [Regulatory Updates]
- **Ethics:** [Ethics Concerns]

## 📝 Analysis & Insights
- [Analysis Point 1]
- [Analysis Point 2]

## 🔄 Ongoing Stories
- [[Story 1]] - [Update]
- [[Story 2]] - [Update]

## 📊 Weekly Summary
- **Total Stories Tracked:** [Number]
- **Key Developments:** [List]
- **Emerging Trends:** [Trends]
- **Areas to Watch:** [Areas]

---

#ai-news #daily #week-${Math.ceil(today.getDate() / 7)} #q${Math.floor(today.getMonth() / 3) + 1}

[[AI News/AI-News-${prevDateStr}|⬅️ Previous Day]] | [[AI News/index|📚 Archive]] | [[${dateStr}|📝 Daily Note]] | [[AI News/AI-News-${nextDateStr}|Next Day ➡️]]`;

                        resolve(template);
                    } catch (error) {
                        resolve(`Error formatting news data: ${error.message}`);
                    }
                } catch (error) {
                    server.close();
                    resolve(`Server error: ${error.message}`);
                }
            }
        });

        server.listen(0, 'localhost', async () => {
            const port = server.address().port;
            try {
                const response = await fetch(`http://localhost:${port}/api/news`);
                const data = await response.text();
                return data;
            } catch (error) {
                server.close();
                resolve(`Error connecting to local server: ${error.message}`);
            }
        });

        server.on('error', (error) => {
            resolve(`Server error: ${error.message}`);
        });
    });
}

module.exports = setupDailyAINews;