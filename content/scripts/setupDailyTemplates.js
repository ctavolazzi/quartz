module.exports = async function(tp) {
    // Template configurations
    const templates = {
        newsletter: {
            type: 'newsletter',
            focus: 'Communication and Updates',
            sections: ['Team News', 'Project Status', 'Upcoming Events'],
            priority: ['Documentation', 'Team Sync', 'Planning', 'Review']
        },
        aiNews: {
            type: 'ai-news',
            focus: 'AI Industry Updates',
            sections: ['Research', 'Industry', 'Products', 'Analysis'],
            priority: ['Research', 'Development', 'Industry News', 'Analysis']
        },
        chat: {
            type: 'chat',
            focus: 'AI Interactions',
            sections: ['Morning Session', 'Afternoon Session', 'Summary'],
            priority: ['Model Testing', 'Prompt Engineering', 'Analysis', 'Documentation']
        },
        workEffort: {
            type: 'work-effort',
            focus: 'Technical Implementation',
            sections: ['Code', 'Testing', 'Documentation'],
            priority: ['Development', 'Testing', 'Review', 'Documentation']
        }
    };

    // Get template type from frontmatter or filename
    const getTemplateType = () => {
        const type = tp?.frontmatter?.type || '';
        return templates[type] || templates.newsletter;
    };

    // Get day-based content
    const getDayContent = () => {
        const dayMap = {
            0: "Weekend Review & Planning",
            1: "Weekly Kickoff",
            2: "Technical Tuesday",
            3: "Midweek Check-in",
            4: "Project Review Day",
            5: "Weekly Wrap-up",
            6: "Weekend Projects"
        };
        const day = new Date().getDay();
        return dayMap[day] || "Daily Work";
    };

    // Get random priority for template type
    const getPriority = (template) => {
        const priorities = template.priority;
        return priorities[Math.floor(Math.random() * priorities.length)];
    };

    // Get template data
    const template = getTemplateType();
    const dayContent = getDayContent();
    const priority = getPriority(template);

    // Return template data
    return {
        type: template.type,
        focus: template.focus,
        sections: template.sections,
        dayContent: dayContent,
        priority: priority,
        isWeekend: new Date().getDay() === 0 || new Date().getDay() === 6
    };
};