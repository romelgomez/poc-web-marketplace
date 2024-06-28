import { Injectable } from '@nestjs/common';
import type {
  DocumentOptions,
  DocumentsQuery,
  EnqueuedTask,
  MeiliSearch,
  SearchParams,
  SearchResponse,
} from 'meilisearch';
import { InjectMeiliSearch } from './meilisearch.decorator';

@Injectable()
export class MeiliSearchService {
  constructor(
    @InjectMeiliSearch() private readonly meiliSearchClient: MeiliSearch,
  ) {}

  async search(
    index: string,
    query: string,
    options?: SearchParams,
  ): Promise<SearchResponse> {
    const result = await this.meiliSearchClient
      .index(index)
      .search<SearchResponse>(query, options);

    return result;
  }

  async addDocuments(
    index: string,
    documents: Array<Record<string, unknown>>,
    options?: DocumentOptions,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient
      .index(index)
      .addDocuments(documents, options);
  }

  async getDocuments(
    index: string,
    parameters?: DocumentsQuery<Record<string, unknown>>,
  ): Promise<unknown> {
    return await (await this.meiliSearchClient.getIndex(index)).getDocuments(
      parameters,
    );
  }

  async updateDocuments(
    index: string,
    documents: Array<Partial<Record<string, unknown>>>,
  ): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.index(index).updateDocuments(documents);
  }

  async deleteDocument(index: string, docId: string): Promise<EnqueuedTask> {
    return await this.meiliSearchClient.index(index).deleteDocument(docId);
  }

  async initializeIndex(listingId: string): Promise<void> {
    const indexUID = `${listingId}`;

    const FACETS = ['facets.categories', 'facets.locations'];

    try {
      await this.meiliSearchClient.createIndex(indexUID);

      await this.meiliSearchClient
        .index(indexUID)
        .updateFilterableAttributes(FACETS);
    } catch (error) {
      console.error('Error initializing Meilisearch index:', error.message);
    }
  }

  async findIndex(index: string) {
    return await this.meiliSearchClient.getIndex(index);
  }
}
