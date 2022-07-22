import { ModuleRef } from '@nestjs/core';
import { Inject, Injectable, Logger, OnModuleInit, Type } from '@nestjs/common';
import { EventBus, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Subject } from 'rxjs';
import Redis from 'ioredis';
import { EVENTS, PUB_CHANNEL, PUBLISH, SUB_CHANNEL, SUBSCRIBE } from '../strings';
import { StandardEvent } from '../standard-event';

@Injectable()
export class RedisEventPubsub<EventBase extends StandardEvent>
	implements IMessageSource<EventBase>, IEventPublisher<EventBase>, OnModuleInit {

	private subject$: Subject<EventBase>;
	private event$: EventBus<EventBase>;

	constructor(
		@InjectRedis(SUBSCRIBE) private readonly subRedis: Redis,
		@InjectRedis(PUBLISH) private readonly pubRedis: Redis,
		@Inject(SUB_CHANNEL) private readonly subChannel: string,
		@Inject(PUB_CHANNEL) private readonly pubChannel: string,
		@Inject(EVENTS) private readonly events: Array<Type>,
		private readonly moduleRef: ModuleRef,
	) {}

	onModuleInit(): any {
		this.event$ = this.moduleRef.get(EventBus, { strict: false });

		this.connect();
		this.bridgeEventsTo(this.event$.subject$);
		this.event$.publisher = this;
	}


	connect() {
		// Logger.log(this.events);
		for (const event of this.events) {
			void this.subRedis.subscribe(this.subChannel);
			this.subRedis.on('message', (_channel: string, message: string) => {
				const { eventName, payload }: { eventName: string, payload: never } = JSON.parse(message);
				if (eventName !== event?.name || !this.subject$) { return; }

				Logger.log(`${ Date.now() }|${ eventName }|RedisEventPubsub`);
				this.subject$.next(new event(payload));
			});
		}
	}

	publish<T extends EventBase>(event: T) {
		// TODO inner process
		// this.subject$?.next(event);
		this.pubRedis?.publish(this.pubChannel, JSON.stringify(event));
	}

	bridgeEventsTo<T extends EventBase>(subject: Subject<T>) {
		this.subject$ = subject;
	}
}

