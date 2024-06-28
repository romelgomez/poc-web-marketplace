import type { Time } from '../../shared.types';
import type { MediaDto } from '../media/media.types';

export interface IRepository {
  id?: string;
  created?: Time;
  modified?: Time;
  deleted?: Time;
  media?: MediaDto[];
}
