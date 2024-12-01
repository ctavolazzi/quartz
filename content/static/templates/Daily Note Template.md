---
title: <% tp.date.now("MMMM D, YYYY") %> • Daily Note
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - daily-notes
ai-news: '[[AI News/AI-News-<% tp.date.now("YYYY-MM-DD") %>]]'
ai_convos:
  - '[[AI Chats/Chat<% tp.date.now("0001-MMDDYYYY") %>]]'
work_efforts:
  - '[[Work-Efforts/WE<% tp.date.now("0001-MMDDYYYY") %>]]'
related_notes: '[[AI News/AI-News-<% tp.date.now("YYYY-MM-DD") %>]]'
newsletter: '[[Newsletters/NovaBrew-<% tp.date.now("YYYY-MM-DD") %>]]'
---
# <% tp.date.now("dddd, MMMM D, YYYY") %>
> Week <% tp.date.now("ww") %> of <% tp.date.now("YYYY") %> • Q<% tp.date.now("Q") %>

[[<% tp.date.yesterday("YYYY-MM-DD") %>|⬅️ Previous Day]] | [[index|🏠 Home]] | [[<% tp.date.tomorrow("YYYY-MM-DD") %>|Next Day ➡️]]

## 📊 Day at a Glance
- 🗓️ **Day:** <% tp.date.now("DDD") %> of <% tp.date.now("YYYY") %> (<%*
try {
  const dayOfYear = parseInt(tp.date.now("DDD"));
  const percentageOfYear = Math.round((dayOfYear / 365) * 100);
  tR += `${percentageOfYear}%`;
} catch (error) {
  tR += "Error";
} %>)
- 📅 **Week:** <% tp.date.now("ww") %> of 52
- 📊 **Quarter Progress:** <%*
try {
  const now = moment();
  const quarter = now.quarter();
  const startOfQuarter = moment().quarter(quarter).startOf('quarter');
  const endOfQuarter = moment().quarter(quarter).endOf('quarter');
  const totalDaysInQuarter = endOfQuarter.diff(startOfQuarter, 'days') + 1;
  const currentDayInQuarter = now.diff(startOfQuarter, 'days') + 1;
  const progress = Math.round((currentDayInQuarter / totalDaysInQuarter) * 100);
  tR += `${currentDayInQuarter} of ${totalDaysInQuarter} (${progress}%)`;
} catch (error) {
  tR += "Error calculating progress.";
} %>
- 🎯 **Days until EOY:** <% moment(tp.date.now("YYYY") + "-12-31").diff(moment(), 'days') %>
- 🔄 **Created at:** <% tp.file.creation_date("h:mm A") %>


# 📰 AI News
[[AI News/AI-News-<% tp.date.now("YYYY-MM-DD") %>|Today's AI News]]

---

## 📝 Daily Reflections

< Write Here >

---

## 🐾 Today's Pokémon

<% await tp.user.fetchPokemon() %>

---

## 🤖 GPT Thoughts

"If this works it's gonna be so cool!"
*Please work...*

<% await tp.user.fetchGPTThoughts(tp, "What insights can you provide about my day?") %>


---

## ✅ Quick Actions
- [ ] ☀️ Morning Review
- [ ] 📈 Check Analytics
- [ ] 🤝 Community Engagement
- [ ] 🌙 EOD Reflection

## 📱 Creator Hub
**Content Pipeline**
- [[Content Calendar|📅 Schedule]]
- [[Video Ideas|🎥 Ideas]]
- [[TikTok Scripts|📝 TikTok]]
- [[YouTube Scripts|🎬 YouTube]]

**Latest Analytics**
- [[TikTok Stats|📊 TikTok]]
- [[YouTube Stats|📈 YouTube]]
- [[Instagram Stats|📸 Instagram]]

**Projects**
- [[NovaSystem|🤖 Nova]]
- [[Knowledge Garden|🌳 Garden]]
- [[Multiverse School|🎓 Classes]]

**Connect with Me**
- [Twitter](https://twitter.com/yourusername)
- [GitHub](https://github.com/yourusername)
- [Website](https://yourwebsite.com)

## 🤖 AI Workspace
**Active Prompts**
- [[Prompts/Content|📝 Content]]
- [[Prompts/Research|🔬 Research]]
- [[Prompts/Code|💻 Code]]

**Models**
- [[GPT-4|💬 GPT]]
- [[Claude|🧠 Claude]]
- [[Ollama|🏠 Local]]

---

#daily-note  <% tp.date.now("dddd") %> week-<% tp.date.now("ww") %> q<% tp.date.now("Q") %>

[[<% tp.date.yesterday("YYYY-MM-DD") %>|⬅️ Previous Day]] | [[index|🏠 Home]] | [[<% tp.date.tomorrow("YYYY-MM-DD") %>|Next Day ➡️]]
