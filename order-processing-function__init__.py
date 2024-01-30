import logging
import json

def main(myQueueItem: str) -> None:
    logging.info(f"Order Processing function processed order: {myQueueItem}")

    # Deserialize the JSON object
    order = json.loads(myQueueItem)

    # Log each item being ordered
    for item in order["items"]:
        logging.info(f"{item} order processing started")
