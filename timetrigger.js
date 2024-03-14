const { app } = require('@azure/functions');

app.timer('timerTriggerExample', {
    schedule: '0 0 0 * * *', // Runs once a day
    handler: async (context) => {
        try {
            const axios = require('axios');
            await axios.post('https://cst8917-lab3-ac-online-hamedfannouni.azurewebsites.net');
            context.log('HTTP request sent successfully');
        } catch (error) {
            context.log('Error sending HTTP request:', error.message);
        }
    }
});
