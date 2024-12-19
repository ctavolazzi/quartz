module.exports = async function() {
    const template = `---
title: '<% tp.date.now("MMMM D, YYYY") %> • Work Effort'
date: <% tp.date.now('YYYY-MM-DD') %>
type: work-effort
status: in-progress
tags:
  - work-effort
  - week-<% tp.date.now("ww") %>
  - q<% tp.date.now("Q") %>
related_notes:
  - '[[<% tp.date.now("YYYY-MM-DD") %>|📝 Daily Note]]'
---
# 💪 Work Effort • <% tp.date.now("MMMM D, YYYY") %>

## 🎯 Project Overview
### Context
*<% await tp.user.templateTest().then(data => data.dayContent) %>*

### Objectives
- [ ] Primary: <% await tp.user.templateTest().then(data => data.priority) %>
- [ ] Secondary objective
### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## 📋 Task Breakdown
### In Progress
- [ ] Current task
### Completed
- [ ] Completed task
### Blocked
- [ ] Blocked task

## 🛠️ Technical Details
### Implementation Notes
- Note 1
### Dependencies
- Dependency 1
### Environment Setup
- Setup step 1

## 🧪 Testing & Validation
### Test Cases
- [ ] Test 1
### Quality Checks
- [ ] Check 1
### Review Points
- [ ] Review 1

## 📊 Progress Tracking
### Time Spent
- Start Time: <% tp.date.now("HH:mm") %>
- End Time: [End]
- Total Hours: [Total]

### Milestones
- [ ] Milestone 1

## 🚧 Challenges & Solutions
### Issues Encountered
- Issue 1
### Solutions Applied
- Solution 1
### Open Questions
- Question 1

## 📝 Documentation
### Code Changes
- Change 1
### Configuration Updates
- Update 1
### Documentation Updates
- Doc 1

## 🤝 Collaboration
### Team Members Involved
- Member 1
### Communications
- Comm 1
### Feedback Received
- Feedback 1

## 📈 Results & Outcomes
### Achievements
- Achievement 1
### Metrics
- Metric 1
### Next Steps
- [ ] Next step 1

---
#work-effort #week-<% tp.date.now("ww") %> #q<% tp.date.now("Q") %>`;

    try {
        await app.vault.create('static/templates/Work Effort Template.md', template);
        return '✅ Work Effort template created successfully';
    } catch (error) {
        return `❌ Error creating Work Effort template: ${error.message}`;
    }
};