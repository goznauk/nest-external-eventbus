import { IEvent } from '@nestjs/cqrs';
import { StandardEventPayload } from './standard-event.payload';

export class StandardEvent<T extends StandardEventPayload> implements IEvent {
	public eventName = this.constructor.name;
	public payload: T;

	constructor(payload: T) {
		this.payload = payload;
	}
}