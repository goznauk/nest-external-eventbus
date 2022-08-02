import { DynamicModule, Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { EVENTS, PUB_CHANNEL, PUBLISH, SUB_CHANNEL, SUBSCRIBE } from '../strings';
import { RedisBusOptions } from './redis-bus.options';
import { RedisEventPubsub } from './redis.event.pubsub';


@Module({})
export class RedisBusModule {
  constructor() {}

  static forRoot(
    events: Type[] = [],
    options: RedisBusOptions,
  ): DynamicModule {
    if (!options.pubUrl) {
      options.pubUrl = options.subUrl;
    }
    if (!options.pubChannel) {
      options.pubChannel = options.subChannel;
    }

    return {
      module: RedisBusModule,
      imports: [
        CqrsModule,
        RedisModule.forRoot({
          config: [
            {
              namespace: SUBSCRIBE,
              url: options.subUrl,
            },
            {
              namespace: PUBLISH,
              url: options.pubUrl,
            },
          ],
        }),
      ],
      providers: [
        {
          provide: EVENTS,
          useValue: events,
        },
        {
          provide: SUB_CHANNEL,
          useValue: options.subChannel,
        },
        {
          provide: PUB_CHANNEL,
          useValue: options.pubChannel,
        },
        RedisEventPubsub,
      ],
      exports: [RedisBusModule, RedisEventPubsub, CqrsModule],
    };
  }
}
