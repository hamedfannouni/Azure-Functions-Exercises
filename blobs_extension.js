const { app } = require('@azure/functions');

app.storageBlob('blobTriggerExample', {
    connection: 'AzureWebJobsStorage', 
    path: 'lab3containerhamed/{name}',
    handler: async (context, blob) => {
        context.log('Blob trigger function processed blob\n Name:', context.bindingData.name, '\n Blob Size:', blob.length, 'Bytes');

        // Your blob processing logic here
    }
});
