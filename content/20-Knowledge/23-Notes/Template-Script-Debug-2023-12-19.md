---
title: "Template Script Debugging - December 19, 2023"
date: 2023-12-19
type: technical-note
tags:
  - templater
  - debugging
  - obsidian
  - javascript
---

# Template Script Debugging Process

## Context
We needed to add dynamic content generation to the daily accessory files (Newsletter, Work Effort, etc.) using Templater and custom JavaScript.

## Initial Approach
1. Created `templateTest.js` to generate dynamic content:
   - Day-based content
   - Random priorities
   - Conditional sections based on template type
2. Attempted to integrate with Newsletter template

## Issues Encountered

### 1. OpenAI API Error (Red Herring)
```javascript
Failed to load resource: the server responded with a status of 401 ()
Error fetching GPT insights: Error: OpenAI API error: 401
```
This was a separate issue with another script trying to fetch GPT content during file creation.

### 2. Unexpected Token Error
```javascript
unexpected token '='
```
Initial attempt used complex JavaScript syntax that Templater couldn't process:
```javascript
<%* let data = await tp.user.templateTest() %>
```

### 3. Frontmatter Access Error
```javascript
Cannot read properties of undefined (reading 'frontmatter')
```
Script was trying to access `tp.frontmatter` before it was available.

## Solutions Applied

### 1. Template Syntax Simplification
Modified template to use simpler syntax:
```markdown
*<% await tp.user.templateTest().then(data => data.dayBasedTitle) %> - <% await tp.user.templateTest().then(data => data.randomPriority) %>*
```

### 2. Script Robustness
Updated `templateTest.js` to handle undefined frontmatter:
```javascript
conditionalSections: getConditionalSections(tp?.frontmatter?.type)
```

### 3. Default Values
Added fallbacks for when template type isn't available:
```javascript
const type = templateType || 'newsletter';
return sections[type] || sections['newsletter'];
```

## Final Working Solution

### Template Structure
```markdown
---
title: "<% tp.date.now('MMMM D, YYYY') %> • Daily Update"
date: <% tp.date.now('YYYY-MM-DD') %>
type: newsletter
---
# {{title}}

## Today's Insights
*<% await tp.user.templateTest().then(data => data.dayBasedTitle) %> - <% await tp.user.templateTest().then(data => data.randomPriority) %>*

## Key Updates
- [ ] Update for <% tp.date.now('dddd') %>
- [ ] Week <% tp.date.now('W') %> planning

## Action Items
- [ ] First action
- [ ] Second action

---
#daily #week-<% tp.date.now('ww') %>
```

## Output Example
```markdown
# December 19, 2023 • Daily Update

## Today's Insights
*Midweek Check-in - Bug Fixes*

## Key Updates
- [ ] Update for Wednesday
- [ ] Week 51 planning

## Action Items
- [ ] First action
- [ ] Second action

---
#daily #week-51
```

## Key Learnings
1. Templater syntax needs to be kept simple
2. Always handle undefined cases in template scripts
3. Use optional chaining for accessing template properties
4. Test scripts independently before integrating into templates
5. Keep error handling in both scripts and templates

## Next Steps
1. Apply similar patterns to other daily templates
2. Add more dynamic content types
3. Consider adding error logging for debugging
4. Document template script API for future reference