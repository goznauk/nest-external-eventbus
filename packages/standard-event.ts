import { IEvent } from '@nestjs/cqrs';

export class StandardEvent<T = any> implements IEvent {
  public eventName = this.constructor.name;
  public payload: T;

  constructor(payload: T) {
    this.payload = payload;
  }
}