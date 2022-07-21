import { DynamicModule, Logger, Module, OnModuleInit, Type } from '@nestjs/common';
import {  CqrsModule, EventBus, IEvent } from '@nestjs/cqrs';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisBusEventSubscriber } from './redis-bus.event.subscriber';
import { RedisBusEventPublisher } from './redis-bus.event.publisher';
import { RedisBusOptions } from './redis-bus.options';
import { EVENTS, PUB_CHANNEL, PUBLISH, SUB_CHANNEL, SUBSCRIBE } from '../strings';
import { StandardEvent } from '../standard-event';


@Module({})
export class RedisBusModule implements OnModuleInit {
	constructor(
		private readonly eventBus: EventBus<StandardEvent<any>>,
		private readonly publisher: RedisBusEventPublisher<StandardEvent<any>>,
		private readonly subscriber: RedisBusEventSubscriber<StandardEvent<any>>,
	) {
		Logger.log('f')
	}

	onModuleInit() {
		console.log('omi');
		this.subscriber.connect();
		this.subscriber.bridgeEventsTo(this.eventBus.subject$);

		this.publisher.connect();
		this.eventBus.publisher = this.publisher;

	}

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
				RedisBusEventPublisher,
				RedisBusEventSubscriber,
			],
			exports: [RedisBusModule, RedisBusEventPublisher, RedisBusEventSubscriber, CqrsModule],
		};
	}
}
