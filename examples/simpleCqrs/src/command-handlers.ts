import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DropAncientItemCommand, KillDragonCommand } from './commands';
import { HeroRepository } from './hero.repository';
import {  HeroKilledDragonEvent, HeroKilledDragonEventPayload } from './events';

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
	implements ICommandHandler<DropAncientItemCommand> {
	constructor(
		private readonly repository: HeroRepository,
		private readonly publisher: EventPublisher,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: DropAncientItemCommand) {
		console.log('Async DropAncientItemCommand...');

		const { heroId, itemId } = command;
		const hero = this.publisher.mergeObjectContext(
			await this.repository.findOneById(+heroId),
		);
		hero.addItem(itemId);
		hero.commit();
	}
}

@CommandHandler(KillDragonCommand)
export class KillDragonHandler
	implements ICommandHandler<KillDragonCommand> {
	constructor(
		private readonly repository: HeroRepository,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: KillDragonCommand) {
		console.log('Async KillDragonCommand...');
		const { heroId, enemyId } = command;
		await new Promise(resolve => setTimeout(resolve, 100));

		this.eventBus.publisher.publish(new HeroKilledDragonEvent(new HeroKilledDragonEventPayload(heroId, enemyId)));

	}
}
