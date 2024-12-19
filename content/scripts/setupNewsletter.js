module.exports = async function() {
    const template = `---
title: "<% tp.date.now('MMMM D, YYYY') %> • Daily Update"
date: <% tp.date.now('YYYY-MM-DD') %>
type: newsletter
tags:
  - newsletter
  - daily-notes
  - week-<% tp.date.now("ww") %>
  - q<% tp.date.now("Q") %>
related_notes:
  - '[[<% tp.date.now("YYYY-MM-DD") %>|📝 Daily Note]]'
---
# 📰 Daily Update • <% tp.date.now("MMMM D, YYYY") %>

## Today's Insights
*<% await tp.user.templateTest().then(data => data.dayContent) %>*
Priority: *<% await tp.user.templateTest().then(data => data.priority) %>*

## Key Updates
- [ ] Update for <% tp.date.now('dddd') %>
- [ ] Week <% tp.date.now('W') %> planning

## Action Items
- [ ] First action
- [ ] Second action

---
#daily #week-<% tp.date.now('ww') %>`;

    try {
        await app.vault.create('static/templates/Newsletter Template.md', template);
        return '✅ Newsletter template created successfully';
    } catch (error) {
        return `❌ Error creating Newsletter template: ${error.message}`;
    }
};