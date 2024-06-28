
## Invalid facet distribution, I lost the data? 

error

```
// [Nest] 11556  - 05/16/2024, 3:08:40 PM   ERROR [ExceptionsHandler] Invalid facet distribution, this index does not have configured filterable attributes.
// MeiliSearchApiError: Invalid facet distribution, this index does not have configured filterable attributes.
//     at /Users/rg/Desktop/projects/inkadepa-api/node_modules/meilisearch/dist/bundles/meilisearch.cjs.js:378:19
//     at Generator.next (<anonymous>)
//     at fulfilled (/Users/rg/Desktop/projects/inkadepa-api/node_modules/meilisearch/dist/bundles/meilisearch.cjs.js:298:58)
//     at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

solution 

```
curl -X PATCH 'http://localhost:7700/indexes/publications/settings' \
-H 'Content-Type: application/json' \
--data '{
    "filterableAttributes": [
        "facets.categories",
        "facets.locations"
    ]
}'
```