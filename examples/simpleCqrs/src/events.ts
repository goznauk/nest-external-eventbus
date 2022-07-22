import { Logger } from '@nestjs/common';
import { StandardEvent } from 'nest-external-eventbus';


export class HeroKilledDragonEventPayload {
	id: string;
	enemyId: string;

	constructor(id: string, enemyId: string) {
		this.id = id;
		this.enemyId = enemyId;
	}
}

export class HeroFoundItemEventPayload {
	id: string;
	enemyId: string;

	constructor(id: string, enemyId: string) {
		this.id = id;
		this.enemyId = enemyId;
	}
}

export class HeroEncounteredDragonEvent extends StandardEvent<string> {
	public constructor(public readonly payload: string) {
		super(payload);
		Logger.log(`${ Date.now() }|${ this.eventName }|HeroEncounteredDragonEvent`);
	}
}

export class HeroKilledDragonEvent extends StandardEvent<HeroKilledDragonEventPayload> {
	public constructor(public readonly payload: HeroKilledDragonEventPayload) {
		super(payload);
		Logger.log(`${ Date.now() }|${ this.eventName }|HeroKilledDragonEvent`);
	}
}

export class HeroFoundItemEvent extends StandardEvent<HeroFoundItemEventPayload> {
	public constructor(public readonly payload: HeroFoundItemEventPayload) {
		super(payload);
		Logger.log(`${ Date.now() }|${ this.eventName }|HeroFoundItemEvent`);
	}
}
