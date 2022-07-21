import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HeroKilledDragonEvent, HeroFoundItemEvent } from './events';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonEventHandler implements IEventHandler<HeroKilledDragonEvent> {
	handle(event: HeroKilledDragonEvent) {
		Logger.log('OrderFailedEvent called');
		return event;
	}
}

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemEventHandler implements IEventHandler<HeroFoundItemEvent> {
	handle(event: HeroFoundItemEvent) {
		Logger.log('OrderFailedEvent called');
		return event;
	}
}
