module.exports = async function() {
  try {
    // Get today's date in required formats
    const now = new Date();
    // Ensure we're working with local time
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const yyyymmdd = `${year}-${month}-${day}`;  // YYYY-MM-DD
    const mmddyyyy = `0001-${month}${day}${year}`;  // 0001-MMDDYYYY

    // Define template paths and target locations
    const files = {
      aiNews: {
        template: 'static/templates/AI News Template.md',
        target: `AI News/AI-News-${yyyymmdd}.md`
      },
      chat: {
        template: 'static/templates/Chat Template.md',
        target: `AI Chats/Chat${mmddyyyy}.md`
      },
      workEffort: {
        template: 'static/templates/Work Effort Template.md',
        target: `Work-Efforts/WE${mmddyyyy}.md`
      },
      newsletter: {
        template: 'static/templates/Newsletter Template.md',
        target: `Newsletters/NovaBrew-${yyyymmdd}.md`
      }
    };

    let status = [];

    // Create each file
    for (const [name, file] of Object.entries(files)) {
      try {
        // Get template content
        const templateFile = app.vault.getAbstractFileByPath(file.template);
        if (!templateFile) {
          throw new Error(`Template not found: ${file.template}`);
        }
        const template = await app.vault.read(templateFile);

        // Check if target exists
        const targetExists = app.vault.getAbstractFileByPath(file.target);

        if (!targetExists) {
          await app.vault.create(file.target, template);
          status.push(`✅ Created ${name}: ${file.target}`);
        } else {
          status.push(`⏭️ ${name} already exists: ${file.target}`);
        }
      } catch (error) {
        status.push(`❌ Error with ${name}: ${error.message}`);
      }
    }

    return status.join('\n');
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
};