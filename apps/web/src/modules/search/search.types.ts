import type { SearchResponse } from 'meilisearch';
import type { IPublication } from '../publications/publication.types';

export enum FacetTypeEnum {
  Categories = 'categories',
  Locations = 'locations',
  JobType = 'jobType',
  UserID = 'userID',
  JobRecruiterType = 'jobRecruiterType',
  JobSalaryType = 'jobSalaryType',
  ReHomeFor = 'reHomeFor',
  ReHomeStatus = 'reHomeStatus',
  JobHasBenefits = 'jobHasBenefits',
  JobHasBonus = 'jobHasBonus',
  JobHasCestaTicket = 'jobHasCestaTicket',
}

export type FacetList2 = {
  [k in FacetTypeEnum]: Partial<TreeNode>[];
};

export type FacetType =
  | 'categories'
  | 'locations'
  | 'userID'
  | 'jobType'
  | 'jobRecruiterType'
  | 'jobSalaryType'
  | 'reHomeFor'
  | 'reHomeStatus'
  | 'jobHasBenefits'
  | 'jobHasBonus'
  | 'jobHasCestaTicket';

export type FacetList = {
  [k in FacetTypeEnum]: Partial<TreeNode>[];
};

export type TreeNode = {
  left: number;
  name: string;
  parentId: string;
  right: number;
  slug: string;
  id: string;
  count?: number;
};

export interface Media {
  id: string;
  size: string;
  version: string;
  deleted: boolean;
}

export interface PublicationsResponse extends SearchResponse {
  hits: IPublication[];
  count: number;
}

export interface SearchInput {
  q?: string;
  offset?: number;
  limit?: number;
  attributesToHighlight?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  attributesToCrop?: string[];
  cropLength?: number;
  cropMarker?: string;
  filter?: string[];
  sort?: string[];
  facets?: string[];
  attributesToRetrieve?: string[];
  showMatchesPosition?: boolean;
  matchingStrategy?: string;
  hitsPerPage?: number;
  page?: number;
  facetName?: string;
  facetQuery?: string;
  vector?: number[];
  showRankingScore?: boolean;
  showRankingScoreDetails?: boolean;
  attributesToSearchOn?: string[];
}
