module.exports = async function(tp) {
    // Get current date info
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Example 1: Return different content based on day of week
    const getDayBasedContent = () => {
        const dayMap = {
            0: "Weekend Review & Planning",
            1: "Weekly Kickoff",
            2: "Technical Tuesday",
            3: "Midweek Check-in",
            4: "Project Review Day",
            5: "Weekly Wrap-up",
            6: "Weekend Projects"
        };
        return dayMap[dayOfWeek] || "Daily Work";
    };

    // Example 2: Generate random priorities
    const getRandomPriorities = () => {
        const priorities = [
            "Code Review",
            "Documentation",
            "Testing",
            "Feature Development",
            "Bug Fixes",
            "Team Sync",
            "Learning"
        ];
        return priorities[Math.floor(Math.random() * priorities.length)];
    };

    // Example 3: Conditional sections based on template type
    const getConditionalSections = (templateType) => {
        // Default to newsletter type if frontmatter is not available
        const type = templateType || 'newsletter';
        const sections = {
            'newsletter': {
                focus: "Communication and Updates",
                sections: ["Team News", "Project Status", "Upcoming Events"]
            },
            'work-effort': {
                focus: "Technical Implementation",
                sections: ["Code Changes", "Testing Results", "Documentation"]
            }
        };
        return sections[type] || sections['newsletter'];
    };

    // Return an object with all our test data
    return {
        dayBasedTitle: getDayBasedContent(),
        randomPriority: getRandomPriorities(),
        conditionalSections: getConditionalSections(tp?.frontmatter?.type),
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        weekNumber: Math.ceil((now.getDate() + 6 - now.getDay()) / 7)
    };
};