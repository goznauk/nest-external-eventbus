import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HeroKilledDragonEvent, HeroFoundItemEvent, HeroEncounteredDragonEvent } from './events';
import { DropAncientItemCommand, KillDragonCommand } from './commands';

@EventsHandler(HeroEncounteredDragonEvent)
export class HeroEncounteredDragonHandler implements IEventHandler<HeroEncounteredDragonEvent> {
	constructor(private commandBus: CommandBus) {}

	async handle(event: HeroEncounteredDragonEvent) {
		Logger.log(`${ Date.now() }|HeroEncounteredDragonEvent1|HeroEncounteredDragonHandler`);
		await new Promise(resolve => setTimeout(resolve, 1000));
		Logger.log(`${ Date.now() }|HeroEncounteredDragonEvent2|HeroEncounteredDragonHandler`);
		await this.commandBus.execute(new KillDragonCommand('hero0120', 'enemy0123'));
		return event;
	}
}

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler implements IEventHandler<HeroKilledDragonEvent> {
	constructor(private commandBus: CommandBus) {}

	async handle(event: HeroKilledDragonEvent) {
		Logger.log(`${ Date.now() }|HeroKilledDragonEvent|HeroKilledDragonHandler`);
		const { id, enemyId } = event.payload;
		await this.commandBus.execute(new DropAncientItemCommand(id, enemyId));
		return event;
	}
}

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
	handle(event: HeroFoundItemEvent) {
		Logger.log(`${ Date.now() }|HeroFoundItemEvent|HeroFoundItemHandler`);
		return event;
	}
}
