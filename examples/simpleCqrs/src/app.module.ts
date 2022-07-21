import { Module, Type } from '@nestjs/common';
import { RedisBusModule } from 'nest-external-eventbus';

import { HeroRepository } from './hero.repository';
import { HeroKilledDragonEvent, HeroFoundItemEvent } from './events';
import { HeroFoundItemEventHandler, HeroKilledDragonEventHandler } from './event-handlers';
import { DropAncientItemHandler, KillDragonHandler } from './command-handlers';


const events: Type[] = [HeroKilledDragonEvent, HeroFoundItemEvent];
const eventsHandlers = [HeroKilledDragonEventHandler, HeroFoundItemEventHandler];
const commandHandlers = [KillDragonHandler, DropAncientItemHandler];


@Module({
	imports: [
		RedisBusModule.forRoot(events, {
			subUrl: 'redis://localhost:6379',
			subChannel: 'DOMAIN_EVENT',
			// subChannel: 'REDIS_CHANNEL_HERE',
		}),
	],
	controllers: [],
	providers: [HeroRepository, ...eventsHandlers, ...commandHandlers],
})
export class AppModule {}
