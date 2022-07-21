import { Inject, Injectable } from '@nestjs/common';
import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { PUB_CHANNEL, PUBLISH } from '../strings';

@Injectable()
export class RedisBusEventPublisher<EventBase extends IEvent> implements IEventPublisher<EventBase> {

	constructor(@InjectRedis(PUBLISH) private readonly redis: Redis,
							@Inject(PUB_CHANNEL) private readonly pubChannel: string) {}

	connect(): void {
		// connect?
	}

	publish<T extends IEvent>(event: T) {
		this.redis.publish(this.pubChannel, JSON.stringify(event));
	}
}