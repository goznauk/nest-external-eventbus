import { AggregateRoot } from '@nestjs/cqrs';
import {
  HeroFoundItemEvent,
  HeroFoundItemEventPayload,
  HeroKilledDragonEvent,
  HeroKilledDragonEventPayload,
} from './events';

export class Hero extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  killEnemy(enemyId: string) {
    // logic
    this.apply(new HeroKilledDragonEvent(new HeroKilledDragonEventPayload(this.id, enemyId)));
  }

  addItem(itemId: string) {
    // logic
    this.apply(new HeroFoundItemEvent(new HeroFoundItemEventPayload(this.id, itemId)));
  }
}
