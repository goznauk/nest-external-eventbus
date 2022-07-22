# example

```sh
git clone git@github.com:goznauk/nest-external-eventbus.git
cd nest-external-eventbus
npm install

docker run -d  -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

cd examples/simpleCqrs/
npm run start

pip3 install redis asyncio
python3 test.py
```
