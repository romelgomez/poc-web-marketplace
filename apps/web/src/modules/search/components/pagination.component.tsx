import { Pagination } from 'antd';
import type { SearchResponse } from 'meilisearch';
import { useRouter } from 'next/router';
import type React from 'react';

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

interface PublicationsPaginationProps {
  publications?: SearchResponse;
}

export const PublicationsPagination: React.FunctionComponent<
  PublicationsPaginationProps
> = ({ publications }) => {
  const router = useRouter();

  const handleOnChange = (page: number) => {
    const currentQuery = { ...router.query, page: page.toString() };
    const params = convertQueryToParams(currentQuery);
    const newQueryString = new URLSearchParams(params).toString();
    router.push(`${router.pathname}?${newQueryString}`, undefined, {
      shallow: true,
    });
  };

  const totalHits = publications?.totalHits || 0;
  const hitsPerPage = publications?.hitsPerPage || 0;

  return (
    <>
      {totalHits > 0 && totalHits > hitsPerPage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            backgroundColor: 'aquamarine',
            padding: '6px 0',
            margin: '0 0 20px 0',
            borderRadius: '12px',
            border: '1px solid black',
          }}
        >
          <Pagination
            current={router.query.page ? Number(router.query.page) : 1}
            onChange={handleOnChange}
            total={publications?.totalHits || 0}
            hideOnSinglePage={true}
            showSizeChanger={false}
            pageSize={publications?.hitsPerPage || 0}
          />
        </div>
      )}
    </>
  );
};
