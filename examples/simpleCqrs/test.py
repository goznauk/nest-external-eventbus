import redis
import json
import asyncio
import time

async def main():
    r = redis.Redis(host="localhost", port=6379, db=0)
    while True:
        req = {
            "eventName": "HeroEncounteredDragonEvent",
            "payload": "boom"
        }

        res = r.publish(channel='REDIS_CHANNEL_HERE', message=json.dumps(req))
        print(res)
        await asyncio.sleep(10)


if __name__ == '__main__':
    asyncio.run(main())
