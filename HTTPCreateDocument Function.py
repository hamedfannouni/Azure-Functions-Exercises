import json

def HTTPCreateDocument(request):
    try:
        # Parse JSON request body
        req_data = request.get_json()
        
       
        cosmos_connection_string = "mongodb://hamedfannouni:BLtl6LOINgpTM2sZXqKFm76Z5Dff9gzzc2ZfgR572YwE6zVZSrMZe9CZU6RIRvxcSTdX8TNGIISrACDbGZMpEg==@hamedfannouni.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@hamedfannouni@"
        db_name = "HamedMongoDB"
        collection_name = "Hamed Collection1"
        
        # Connect to MongoDB
        client = MongoClient(cosmos_connection_string)
        db = client[db_name]
        collection = db[collection_name]
        
        # Insert document into MongoDB
        result = collection.insert_one(req_data)
        
        return {
            "id": str(result.inserted_id),
            "status": "success",
            "message": "Document created successfully"
        }
    except Exception as e:
        return {
            "status": "fail",
            "message": f"Error: {str(e)}"
        }
