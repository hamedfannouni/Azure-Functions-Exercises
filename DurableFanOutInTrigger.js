const df = require("durable-functions");

const HealthCheckActivity = "HealthCheckActivity";
const SendToServiceBusQueue = "SendToServiceBusQueue";

module.exports = df.orchestrator(function* (context) {
    context.log("Starting DurableFanOutInTrigger orchestration");

    try {
        // Get the input URLs
        const urls = context.df.getInput();

        // Fan out to activity functions for health checks
        const healthChecks = [];
        for (const url of urls) {
            healthChecks.push(context.df.callActivity(HealthCheckActivity, url));
        }

        // Wait for all health check activities to complete
        const healthStatuses = yield context.df.Task.all(healthChecks);

        // Fan in by aggregating the health status results
        const aggregatedStatus = {};
        for (let i = 0; i < urls.length; i++) {
            aggregatedStatus[urls[i]] = healthStatuses[i];
        }

        // Send the aggregated health status message to the Service Bus Queue
        const serviceBusMessage = {
            body: aggregatedStatus
        };
        yield context.df.callActivity(SendToServiceBusQueue, serviceBusMessage);

        return aggregatedStatus;
    } catch (error) {
        // Log any errors and re-throw to let Durable Functions handle retries
        context.log.error("Error in DurableFanOutInTrigger orchestration:", error);
        throw error;
    }
});
