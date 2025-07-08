import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class EventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<T>(event: string, ...args: T[]): void {
    this.eventEmitter.emit(event, ...args);
  }

  emitActivity(
    event: string | string[],
    input: Record<string, any>,
  ): void {
    if (Array.isArray(event)) {
      event.forEach((e) => this.emit<Record<string, any>>(e, input));
      return;
    }
    this.emit<Record<string, any>>(event, input);
  }
}
