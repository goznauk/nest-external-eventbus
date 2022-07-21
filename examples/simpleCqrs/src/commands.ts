export class KillDragonCommand {
	constructor(public readonly heroId: string, public readonly enemyId: string) {}
}

export class DropAncientItemCommand {
	constructor(public readonly heroId: string, public readonly itemId: string) {}
}
