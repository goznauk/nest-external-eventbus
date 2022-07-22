import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DropAncientItemCommand, KillDragonCommand } from './commands';
import { HeroKilledDragonEvent, HeroKilledDragonEventPayload } from './events';
import { HeroRepository } from './hero.repository';



@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
	constructor(
		private readonly repository: HeroRepository,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: KillDragonCommand) {
		Logger.log(`${ Date.now() }|KillDragonCommand1|KillDragonHandler`);

		const { heroId, enemyId } = command;
		await new Promise(resolve => setTimeout(resolve, 1000));

		Logger.log(`${ Date.now() }|KillDragonCommand2|KillDragonHandler`);

		this.eventBus.publish(new HeroKilledDragonEvent(new HeroKilledDragonEventPayload(heroId, enemyId)));

	}
}

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler implements ICommandHandler<DropAncientItemCommand> {
	constructor(
		private readonly repository: HeroRepository,
		private readonly publisher: EventPublisher,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: DropAncientItemCommand) {
		Logger.log(`${ Date.now() }|DropAncientItemCommand|DropAncientItemHandler`);

		const { heroId, itemId } = command;
		const hero = this.publisher.mergeObjectContext(
			await this.repository.findOneById(+heroId),
		);
		hero.addItem(itemId);
		hero.commit();
	}
}


