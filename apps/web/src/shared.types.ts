import type { Moment } from 'moment';
import type { TreeNode } from './modules/search/search.types';

export type Time = Moment | Date;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export enum DateFormat {
  Moment = 'Moment',
  Date = 'Date',
}

export type RouteParameters = {
  [key: string]: TreeNode;
};
