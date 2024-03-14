const { app } = require('@azure/functions');

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`HTTP function processed request for url "${request.url}"`);

        try {
            const df = require("durable-functions");
            const client = df.getClient(context);
            const urls = ["https://cst8917-lab3-ac-online-hamedfannouni.azurewebsites.net"]; // List of URLs to check

            const instanceId = await client.startNew("DurableFunction", undefined, urls);

            context.log(`Started orchestration with ID = '${instanceId}'.`);

            return client.createCheckStatusResponse(request, instanceId);
        } catch (error) {
            context.log('Error:', error.message);
            return {
                status: 500,
                body: "Internal Server Error"
            };
        }
    }
});
