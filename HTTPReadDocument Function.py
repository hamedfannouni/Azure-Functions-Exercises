import json
import redis

def HTTPReadDocument(request):
    try:
        # Extract document id from request
        doc_id = request.args.get("id")

        # Replace placeholders with actual values
        redis_host = "MyLab2Hamed.redis.cache.windows.net"
        redis_port = 6380
        redis_password = "zTDRHqCegkUcByR64U6cVjg1uzimKmyzmAzCaJqGPCY="
        
        # Connect to Redis
        redis_client = redis.StrictRedis(
            host=redis_host,
            port=redis_port,
            password=redis_password,
            decode_responses=True,
            ssl=True
        )

        # Check if document is in Redis cache
        cached_document = redis_client.get(doc_id)

        if cached_document:
            return {
                "document": json.loads(cached_document),
                "status": "success",
                "message": "Document retrieved from Redis cache"
            }
        else:
            
            cosmos_connection_string = "mongodb://hamedfannouni:BLtl6LOINgpTM2sZXqKFm76Z5Dff9gzzc2ZfgR572YwE6zVZSrMZe9CZU6RIRvxcSTdX8TNGIISrACDbGZMpEg==@hamedfannouni.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@hamedfannouni@"
            db_name = "HamedMongoDB"
            collection_name = "Hamed Collection1"
            
            # Connect to MongoDB
            client = MongoClient(cosmos_connection_string)
            db = client[db_name]
            collection = db[collection_name]

            # Retrieve document from MongoDB
            document = collection.find_one({"_id": doc_id})

            if document:
                # To save document to Redis cache for later retrieval
                redis_client.set(doc_id, json.dumps(document))

                return {
                    "document": document,
                    "status": "success",
                    "message": "Document retrieved from MongoDB"
                }
            else:
                return {
                    "status": "fail",
                    "message": "Document not found"
                }
    except Exception as e:
        return {
            "status": "fail",
            "message": f"Error: {str(e)}"
        }
