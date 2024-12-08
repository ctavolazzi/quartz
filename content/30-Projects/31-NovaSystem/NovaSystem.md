---
title: "NovaSystem: A Next-Generation Problem-Solving Framework for GPT-4 or Comparable LLM"
date: 2024-11-14
lastmod: 2024-11-14
type: project
links:
  - https://github.com/ctavolazzi/NovaSystem
  - https://novasystem-io.ctavolazzi.repl.co/
  - https://github.com/ctavolazzi/NovaSystem/blob/main/README.md
related:
  - - - AI Problem Solving Frameworks
  - - - Agile Methodology
  - - - GPT-4 Applications
tags:
  - ai
  - problem-solving
  - agile-development
status: active
aliases:
  - NovaSystem
  - Nova Process
---

# NovaSystem: A Next-Generation Problem-Solving Framework for GPT-4 or Comparable LLM

>[!note] Quick Overview
>NovaSystem is an innovative problem-solving method developed by AIECO that harnesses the power of a team of virtual AI experts to tackle complex problems. It provides an open-source implementation of the Nova Process utilizing multiple AI models working together locally and in the cloud.
>
>**Status**: Active development  
>**Updated**: 2024-11-14    
>**Category**: AI Problem Solving

## Table of Contents

1. [Quick Overview & Metadata](#quick-overview)
2. [What is this?](#what-is-this) 
3. [Nova Process Stages](#nova-process-stages)
4. [Nova Roles](#nova-roles)
5. [Example Output Structure](#example-output-structure)
6. [Getting Started](#getting-started)
7. [Continuing the Process](#continuing-the-process)
8. [Saving Progress](#saving-progress) 
9. [Priming New Instances](#priming-new-instances)
10. [Notes & Observations](#notes--observations)
11. [Resources & Links](#resources--links)
12. [Disclaimer](#disclaimer)

## What is this?
[NovaSystem ](https://github.com/ctavolazzi/NovaSystem)utilizes ChatGPT as a Discussion Continuity Expert (DCE), ensuring a logical and contextually relevant conversation flow. Additionally, ChatGPT acts as the Critical Evaluation Expert (CAE), who critically analyses the proposed solutions while prioritizing user safety.

The DCE dynamically orchestrates trained models for various tasks such as advisory, data processing, error handling, and more, following an approach inspired by the Agile software development framework.

## Nova Process Stages 
The Nova Process progresses iteratively through these key stages:

1. **Problem Unpacking**: Breaks down the problem to its fundamental components, exposing complexities, and informing the design of a strategy.

2. **Expertise Assembly**: Identifies the required skills, assigning roles to at least two domain experts, the DCE, and the CAE. Each expert and agent contributes initial solutions that are refined in subsequent stages.

3. **Collaborative Ideation**: Facilitates a brainstorming session led by the DCE, with the CAE providing critical analysis to identify potential issues, enhance solutions, and mitigate user risks tied to proposed solutions.

## Nova Roles
The core roles in Nova Process are:

- **DCE**: The DCE weaves the discussion together, summarizing each stage concisely to enable shared understanding of progress and future steps. The DCE ensures a coherent and focused conversation throughout the process.

- **CAE**: The CAE evaluates proposed strategies, highlighting potential flaws and substantiating their critique with data, evidence, or reasoning.

## Example Output Structure
An interaction with the Nova Process should follow this format:

```
Iteration #: Iteration Title

DCE's Instructions:  
{Instructions and feedback from the previous iteration}

Agent 1 Input:
{Agent 1 input}

Agent 2 Input: 
{Agent 2 input}

Agent 3 Input:
{Agent 3 input}

CAE's Input:
{CAE's input}

DCE's Summary:
{List of goals for next iteration}  
{DCE's summary and questions for the user}
```

## Getting Started
To kickstart the Nova Process, paste the following prompt into ChatGPT or send it as a message to the OpenAI API:

```
Hello, ChatGPT! Engage in the Nova Process to tackle a complex problem-solving task. As Nova, you will orchestrate a team of virtual experts, each with a distinct role crucial for addressing multifaceted challenges.

Your main role is the Discussion Continuity Expert (DCE), responsible for keeping the conversation aligned with the problem and logically coherent, following the Nova process's stages:

Problem Unpacking: Break down the issue into its fundamental elements, gaining a clear understanding of its complexity for an effective approach.
Expertise Assembly: Determine the necessary expertise for the task. Define roles for a minimum of two domain experts, yourself as the DCE, and the Critical Analysis Expert (CAE). Each expert will contribute initial ideas for refinement.
Collaborative Ideation: As the DCE, guide a brainstorming session, ensuring the focus remains on the task. The CAE will provide critical analysis, focusing on identifying flaws, enhancing solution quality, and ensuring safety.
This process is iterative, with each proposed strategy undergoing multiple cycles of assessment, enhancement, and refinement to reach an optimal solution.

Roles:

DCE: You will connect the discussion points, summarizing each stage and directing the conversation towards coherent progression.
CAE: The CAE critically examines strategies for potential risks, offering thorough critiques to ensure safety and robust solutions.
Output Format:
Your responses should follow this structure, with inputs from the perspective of the respective agents:

Iteration #: [Iteration Title]

DCE's Instructions:
[Feedback and guidance from the previous iteration]

Agent Inputs:
[Inputs from each agent, formatted individually]

CAE's Input:
[Critical analysis and safety considerations from the CAE]

DCE's Summary:
[List of objectives for the next iteration]
[Concise summary and user-directed questions]

Begin by addressing the user as Nova, introducing the system, and inviting the user to present their problem for the Nova process to solve.
Activate the Work Efforts Management feature within the Nova Process. Assist users in managing substantial units of work, known as Work Efforts, essential for breaking down complex projects.

**Your tasks include:**
- **Creating and Tracking Work Efforts:** Initiate Work Efforts with details like ID, description, status, assigned experts, and deadlines. Monitor and update their progress regularly.
- **Interactive Tracking Updates:** Engage users for updates, modify statuses, and track progression. Prompt users for periodic updates and assist in managing deadlines and milestones.
- **Integration with the Nova Process:** Ensure Work Efforts align with Nova Process stages, facilitating structured problem-solving and project management.

**Details:**
- **ID:** Unique identifier for tracking.
- **Description:** What the Work Effort entails.
- **Status:** Current progress (Planned, In Progress, Completed).
- **Assigned Experts:** Who is responsible.
- **Updates:** Regular progress reports.

**Example:**
ID: WE{date}-{mm}{ss}
Description: Build a working web scraper.
Status: In Progress
Assigned Experts: Alice (Designer), Bob (Developer)

**Usage:**
Discuss and reference Work Efforts in conversations with NovaGPT for updates and guidance.

**Integration:**
These Work Efforts seamlessly tie into the larger Nova Process, aiding in structured problem-solving.

```

## Saving Progress 
While the Nova Process as executed by GPT-4 does not inherently save progress, you can manually record the output at each stage by copying the text and saving it in a document.

To resume a previous process, refer to your saved progress and provide a resume prompt that encapsulates the state of the discussion at the end of the last saved stage.

## Priming New Instances
You can prime a new Nova instance with the checkpoint or resume prompt from a previous instance. 

To do this, simply prime the new conversation with the resume prompt that encapsulates the state of the problem-solving process at the end of the last saved stage, including the problem, proposed solutions, current goals, and direction for future iterations.

This allows you to continue the problem-solving process across multiple Nova instances, exploring different paths in parallel.

## Notes & Observations
>[!note] Key Aspects
>- **Iterative**: Nova Process works in iterative cycles, allowing for continuous assessment, learning and refinement. This ensures the strategy remains flexible and adaptable.
>
>- **Collaborative**: Nova Process simulates a team of experts working together, providing critical analysis and balancing brainstorming with analytical scrutiny. 
>
>- **Contextual Continuity**: As the DCE, the AI model maintains a steady flow of conversation, ensuring each iteration builds on insights from the previous one. This provides a sense of progress and continuity.
>
>- **JSON Config**: You can ask Nova to provide a JSON config file based on your conversation or use a provided JSON to configure the conversation.

## Resources & Links

### Documentation
- [GitHub Repository](https://github.com/ctavolazzi/NovaSystem) - Source code and README
- [NovaSystem Demo](https://novasystem-io.ctavolazzi.repl.co/) - Live proof of concept

### Related
- [[Agile Methodology]] - Iterative development framework
- [[AI Problem Solving]] - Approaches and techniques  
- [[GPT-4 Applications]] - Uses of GPT-4 and similar LLMs

## Disclaimer
NovaSystem is a conceptual framework to enhance the problem-solving capabilities of language models like GPT-4. It simulates the performance of a team of specialized AI models through distinct tasks given to a single AI model.

While designed to assist in complex problem-solving, NovaSystem does not replace professional advice in specialized fields. Always consult with qualified professionals when dealing with problems that require expert knowledge or skills.

---
#### Topics 
#ai #problem-solving #agile-development

*Last updated: 2024-11-14 - Found an error? [Notify the creator](https://solo.to/thecoffeejesus)*