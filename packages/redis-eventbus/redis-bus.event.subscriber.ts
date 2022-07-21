import { Inject, Injectable, Type } from '@nestjs/common';
import { IEvent, IMessageSource } from '@nestjs/cqrs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Subject } from 'rxjs';
import Redis from 'ioredis';
import { EVENTS, SUB_CHANNEL, SUBSCRIBE } from '../strings';

@Injectable()
export class RedisBusEventSubscriber<EventBase extends IEvent> implements IMessageSource<EventBase> {
	private bridge!: Subject<EventBase>;

	constructor(@InjectRedis(SUBSCRIBE) private readonly redis: Redis,
							@Inject(EVENTS) private readonly events: Array<Type>,
							@Inject(SUB_CHANNEL) private readonly subChannel: string) {}

	connect() {
		console.log(this.events);
		for (const event of this.events) {
			void this.redis.subscribe(this.subChannel);
			this.redis.on('message', (_channel: string, message: string) => {

				const { eventName, payload }: { eventName: string, payload: never } = JSON.parse(message);

				if (eventName !== event?.name || !this.bridge) { return; }
				this.bridge.next(new event(payload));
			});
		}
	}

	bridgeEventsTo<T extends EventBase>(subject: Subject<T>): any {

	}

	// bridgeEventsTo<T extends StandardEvent>(subject: Subject<T>) {
	// 	this.bridge = subject;
	// }
}
