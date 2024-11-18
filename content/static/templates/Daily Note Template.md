---
title: "<% tp.date.now("MMMM D, YYYY") %> • Daily Note"
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - daily-notes
ai-news: "[[AI News/AI-News-<% tp.date.now("YYYY-MM-DD") %>]]"
---

<%*
await tp.file.create_new(
    tp.file.find_tfile("AI News Template"),
    `AI News/AI-News-${tp.date.now("YYYY-MM-DD")}`,
    false
);
-%>

[[<% tp.date.yesterday("YYYY-MM-DD") %>|⬅️ Previous Day]] | [[index|🏠 Home]] | [[<% tp.date.tomorrow("YYYY-MM-DD") %>|Next Day ➡️]]]]

# <% tp.date.now("dddd, MMMM D, YYYY") %>
> Week <% tp.date.now("ww") %> of <% tp.date.now("YYYY") %> • Q<% tp.date.now("Q") %>

## 📊 Day at a Glance
- 🗓️ **Day:** <% tp.date.now("DDD") %> of <% tp.date.now("YYYY") %>
- 📅 **Week:** <% tp.date.now("ww") %> of 52
- 📊 **Quarter Progress:** <%*
try {
  const now = tp.date.now("DDD");
  const quarter = tp.date.now("Q");
  const startOfQuarter = moment().quarter(quarter).startOf('quarter').dayOfYear();
  const endOfQuarter = moment().quarter(quarter).endOf('quarter').dayOfYear();
  const daysInQuarter = endOfQuarter - startOfQuarter + 1;
  const dayOfQuarter = now - startOfQuarter + 1;
  const progress = Math.round((dayOfQuarter / daysInQuarter) * 100);
  tR += progress;
} catch (error) {
  tR += "Error";
} %>%
- 🎯 **Days until EOY:** <% moment(tp.date.now("YYYY") + "-12-31").diff(moment(), 'days') %>
- 🔄 **Created at:** <% tp.file.creation_date("h:mm A") %>

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
