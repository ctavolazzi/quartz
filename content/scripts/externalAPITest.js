module.exports = async function() {
    try {
        // Using JSONPlaceholder - a free fake API for testing
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }

        return {
            success: true,
            message: '✅ External API test successful',
            data: {
                title: data.title,
                body: data.body
            }
        };
    } catch (error) {
        return {
            success: false,
            message: `❌ External API test failed: ${error.message}`,
            data: null
        };
    }
};