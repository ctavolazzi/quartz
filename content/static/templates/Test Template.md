---
title: '<% tp.date.now("MMMM D, YYYY") %> • Test Note'
date: '<% tp.date.now("YYYY-MM-DD") %>'
type: test-note
---
# 🧪 Test Template

## Dynamic Day-Based Content
Today's Focus: <% (await tp.user.templateTest()).dayBasedTitle %>

## Random Priority Generator
Priority for today: <% (await tp.user.templateTest()).randomPriority %>

## Conditional Sections
<% const data = await tp.user.templateTest() %>
<% if (data.isWeekend) { %>
### Weekend Mode Activated! 🎉
Time for review and planning
<% } else { %>
### Weekday Mode 💼
Let's get to work!
<% } %>

## Template Type Specific Content
<% const sections = data.conditionalSections %>
Focus Area: <%= sections.focus %>

### Key Sections
<% sections.sections.forEach(section => { %>
- [ ] <%= section %>
<% }); %>

## Week Information
Current Week Number: <%= data.weekNumber %>

---
#test #week-<% tp.date.now("ww") %>