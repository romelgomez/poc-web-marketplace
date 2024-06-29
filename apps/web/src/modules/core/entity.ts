import type { Time } from '../../shared.types';
import type { IRepository } from './types';

export class Entity {
  id?: string;
  tag?: string;
  created?: Time;
  modified?: Time;
  deleted?: Time;

  constructor(i?: Partial<IRepository>) {
    this.id = i?.id;
  }

  protected removeUndefined<T extends object>(
    obj: T,
  ): { [K in keyof T]: Exclude<T[K], undefined> } {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined),
    ) as { [K in keyof T]: Exclude<T[K], undefined> };
  }

  _dto(): IRepository {
    const dto: IRepository = {
      id: this.id,
    };

    return this.removeUndefined(dto);
  }
}
