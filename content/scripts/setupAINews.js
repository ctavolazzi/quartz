module.exports = async function() {
    const template = `---
title: '<% tp.date.now("MMMM D, YYYY") %> • AI News'
date: '<% tp.date.now("YYYY-MM-DD") %>'
type: ai-news
tags:
  - ai-news
  - daily-notes
  - week-<% tp.date.now("ww") %>
  - q<% tp.date.now("Q") %>
work_efforts:
  - '[[Work-Efforts/WE<% tp.date.now("0001-MMDDYYYY") %>]]'
related_notes: '[[<% tp.date.now("YYYY-MM-DD") %>|📝 Daily Note]]'
---
[[AI News/AI-News-<% tp.date.yesterday("YYYY-MM-DD") %>|⬅️ Previous Day]] | [[AI News/index|📚 Archive]] | [[<% tp.date.now("YYYY-MM-DD") %>|📝 Daily Note]] | [[AI News/AI-News-<% tp.date.tomorrow("YYYY-MM-DD") %>|Next Day ➡️]]

# 🤖 AI News for <% tp.date.now("MMMM D, YYYY") %>

## 📈 Today's Focus
*<% await tp.user.templateTest().then(data => data.dayContent) %>*

## 📰 Top Stories

### Article ID: <% tp.date.now("YYYYMMDD") %>-001
- **Title:** [Title]
- **Date:** <% tp.date.now("YYYY-MM-DD") %>
- **Source:** [Source]
- **Author(s):** [Author]
- **URL:** [URL]
- **Category:** [Primary]
- **Secondary Categories:** [Secondary]
- **Companies Mentioned:** [Companies]
- **Key Technologies:** [Technologies]
- **Summary:** [2-3 sentences]
- **Key Points:**
  - [Point 1]
  - [Point 2]
  - [Point 3]
- **Potential Impact:** [Impact]
- **Credibility Score:** [1-5]

## 🔬 Research & Developments
[Research articles using the same format as above]

## 💼 Industry Updates
[Industry articles using the same format as above]

## 🎯 Product Launches
[Product launch articles using the same format as above]

## 💡 Interesting Reads
[Interesting articles using the same format as above]

## 🤔 Opinion & Analysis
[Opinion pieces using the same format as above]

## 📊 Daily Summary
- **Total Articles:** [Number]
- **Top Categories:** [List top 3]
- **Key Trends:** [Brief observation]
- **Sources Covered:** [List]
- **Geographic Focus:** [Regions]
- **Priority Area:** <% await tp.user.templateTest().then(data => data.priority) %>

---

#ai-news #daily #week-<% tp.date.now("ww") %> #q<% tp.date.now("Q") %>

[[AI News/AI-News-<% tp.date.yesterday("YYYY-MM-DD") %>|⬅️ Previous Day]] | [[AI News/index|📚 Archive]] | [[<% tp.date.now("YYYY-MM-DD") %>|📝 Daily Note]] | [[AI News/AI-News-<% tp.date.tomorrow("YYYY-MM-DD") %>|Next Day ➡️]]`;

    try {
        await app.vault.create('static/templates/AI News Template.md', template);
        return '✅ AI News template created successfully';
    } catch (error) {
        return `❌ Error creating AI News template: ${error.message}`;
    }
};