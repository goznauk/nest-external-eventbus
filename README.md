<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A Cqrs External EventBus module for Nest framework (node.js)
</p>
<p align="center">
  Now available: Redis-EventBus
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nest-external-eventbus"><img src="https://img.shields.io/npm/v/nest-external-eventbus.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/nest-external-eventbus"><img src="https://img.shields.io/npm/l/nest-external-eventbus.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/nest-external-eventbus"><img src="https://img.shields.io/npm/dm/nest-external-eventbus.svg" alt="NPM Downloads" /></a>
</p>

### Installation

#### with npm
```sh
npm install --save nest-external-eventbus
```

#### with yarn
```sh
yarn add nest-external-eventbus
```

### How to use?

#### RedisBusModule.forRoot(events, redisOption)

```ts
import { Module, Type } from '@nestjs/common';
import { HeroKilledDragonEvent, HeroFoundItemEvent } from './events'
import { RedisBusModule, RedisBusOptions } from 'nest-external-eventbus';

const events: Type[] = [HeroKilledDragonEvent, HeroFoundItemEvent];
const redisOption: RedisBusOptions = {
  subUrl: 'redis://localhost:6379',
  subChannel: 'REDIS_CHANNEL_HERE',
};

@Module({
  imports: [
    RedisBusModule.forRoot(events, redisOption),
  ],
  controllers: [],
})
export class AppModule {}
```


#### Event Should extend StandardEvent

```ts
import { StandardEvent } from 'nest-external-eventbus';

export class HeroKilledDragonEvent extends StandardEvent {
  public constructor(public readonly payload: object) {}
}
```

## License

MIT
