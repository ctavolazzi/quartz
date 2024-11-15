---
title: Welcome 🪴
tags:
  - index
  - ai-education
  - multiverse-school
  - welcome
---
You've found the knowledge garden of [[Christopher Tavolazzi]] and I hope you enjoy your stay 🥰

This website is a living repository of ideas, insights, and information. This digital space is designed to help me nurture my thoughts, share what I learn, and collaborate with others. Feel free to explore, learn, and contribute!

## DAILY NOTE ⭐
<a id="daily-note-link" href="#">Today’s Daily Note</a>

<script>
  function updateDailyNoteLink() {
    const link = document.getElementById('daily-note-link');
    if (link) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      link.href = `/${yyyy}-${mm}-${dd}/`;
      link.innerText = `Daily Note for ${yyyy}-${mm}-${dd}`;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Check if the page was just revisited
    if (sessionStorage.getItem('visited')) {
      updateDailyNoteLink();
    }
    // Clear the marker so it’s fresh on the next load
    sessionStorage.removeItem('visited');
  });

  // Set a marker when leaving the page
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('visited', 'true');
  });
</script>

### How to Navigate 🧭
- Use the **search bar** to find specific topics or keywords
- Browse the **networked notes** to discover interconnected ideas
- Follow **internal links** ([[like this]]) to explore related concepts
- Click on **tags** to surface notes under a common theme

## Featured Notes 🌟
- [[Surviving the Singularity|Surviving the Singularity]] - Preparing for the AI future
- [[NovaSystem|NovaSystem]] - Exploring multi-agent frameworks
- [[intro-to-ai|Intro to AI]] - Comprehensive AI education
- [[Mobile-ALOHA|Mobile ALOHA]] - Bimanual mobile manipulation research

## Learning Paths 📚

> [!note] Suggested Journeys
> 1. **AI Fundamentals**
>    - Start with [[intro-to-ai|Intro to AI]]
>    - Explore [[AI-Ethics|AI ethics considerations]]
>    - Understand the [[Singularity|singularity concept]]
>
> 2. **Knowledge Management**
>    - Learn the [[PKM|basics of PKM]]
>    - See my [[OQ-Guide|Obsidian Quartz guide]]
>    - Use the [[KG-Template|knowledge garden template]]

## Contribution Guidelines 🤝
This is an open digital garden, and I welcome contributions! If you have ideas to share or want to collaborate on a topic, feel free to submit a pull request on GitHub or reach out to me directly. Let's grow this garden together.

## Recent Updates 📣

> [!example] Latest Additions
> - New article on [[AGI-Milestones|AGI Development Milestones]]
> - Expanded [[NovaSystem|NovaSystem documentation]]
> - Added [[Anthropic|Anthropic]] to AI companies list

## Connect With Me 🔗
- [[AI-Coffee|Join my Morning Coffee Hour]]
- Listen to my [[this-is-not-human|"This is not human" AI podcast]]
- Enroll in [[intro-to-ai|The Multiverse School: Intro to AI]]
- Learn more about [[thecoffeejesus|@thecoffeejesus]]

---

<div align="center">

*This knowledge garden is an ever-evolving work in progress.*

[GitHub Repo](https://github.com/ctavolazzi/quartz) | [Contact Me](https://solo.to/thecoffeejesus)

</div>
