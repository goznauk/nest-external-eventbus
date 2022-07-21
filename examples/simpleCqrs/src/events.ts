import { Logger } from '@nestjs/common';
import { StandardEvent, StandardEventPayload } from 'nest-external-eventbus';


export class HeroKilledDragonEventPayload implements StandardEventPayload {
	id: string;
	enemyId: string;

	constructor(id: string, enemyId: string) {
		this.id = id;
		this.enemyId = enemyId;
	}
}

export class HeroFoundItemEventPayload implements StandardEventPayload {
	id: string;
	enemyId: string;

	constructor(id: string, enemyId: string) {
		this.id = id;
		this.enemyId = enemyId;
	}
}

export class HeroKilledDragonEvent extends StandardEvent<HeroKilledDragonEventPayload> {
	public constructor(public readonly payload: HeroKilledDragonEventPayload) {
		super(payload);
		Logger.log(`event ${ this.eventName } occurred!`);
	}
}

export class HeroFoundItemEvent extends StandardEvent<HeroFoundItemEventPayload> {
	public constructor(public readonly payload: HeroFoundItemEventPayload) {
		super(payload);
		Logger.log(`event ${ this.eventName } occurred!`);
	}
}
