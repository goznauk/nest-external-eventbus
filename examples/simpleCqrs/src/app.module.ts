import { Module, Type } from '@nestjs/common';
import { RedisBusModule } from 'nest-external-eventbus';
import { HeroRepository } from './hero.repository';
import { HeroKilledDragonEvent, HeroFoundItemEvent, HeroEncounteredDragonEvent } from './events';
import { HeroEncounteredDragonHandler, HeroFoundItemHandler, HeroKilledDragonHandler } from './event-handlers';
import { DropAncientItemHandler, KillDragonHandler } from './command-handlers';


const events: Type[] = [HeroEncounteredDragonEvent, HeroKilledDragonEvent, HeroFoundItemEvent];
const eventsHandlers = [HeroEncounteredDragonHandler, HeroKilledDragonHandler, HeroFoundItemHandler];
const commandHandlers = [KillDragonHandler, DropAncientItemHandler];


@Module({
  imports: [
    RedisBusModule.forRoot(events, {
      subUrl: 'redis://localhost:6379',
      subChannel: 'REDIS_CHANNEL_HERE',
    }),
  ],
  providers: [HeroRepository, ...eventsHandlers, ...commandHandlers],
})
export class AppModule {}
