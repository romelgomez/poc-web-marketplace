import { useRouter } from 'next/router';

function useFacetQueryUpdate() {
  const router = useRouter();

  function convertQueryToParams(
    query: Record<string, string | string[] | undefined>,
  ): string[][] {
    const entries: string[][] = [];

    for (const key in query) {
      const value = query[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          entries.push([key, item]);
        }
      } else if (value !== undefined) {
        entries.push([key, value]);
      }
    }

    return entries;
  }

  function updateFacetInQuery(facetType: string, facetSlug: string) {
    const currentQuery = { ...router.query };

    if ('page' in currentQuery) {
      currentQuery.page = '1';
    }

    currentQuery[facetType] = facetSlug;
    const params = convertQueryToParams(currentQuery);
    const newQueryString = new URLSearchParams(params).toString();
    router.push(`${router.pathname}?${newQueryString}`, undefined, {
      shallow: true,
    });
  }

  function resetFacetInQuery(facetType: string) {
    const currentQuery = { ...router.query };

    if ('page' in currentQuery) {
      currentQuery.page = '1';
    }

    delete currentQuery[facetType];
    const params = convertQueryToParams(currentQuery);
    const newQueryString = new URLSearchParams(params).toString();
    router.push(`${router.pathname}?${newQueryString}`, undefined, {
      shallow: true,
    });
  }

  return { updateFacetInQuery, resetFacetInQuery, convertQueryToParams };
}

export default useFacetQueryUpdate;
