import { Col, Grid, Row } from 'antd';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import { useAccount } from '../../../context/hooks/use-account.hook';
import { PublicationCard } from '../../publications/components/publication-card';
import useFacetQueryUpdate from '../hooks/use-facet-query-update';
import usePublications from '../hooks/use-publications.hook';
import styles from '../search.module.scss';
import { PublicationsPagination } from './pagination.component';

const { useBreakpoint } = Grid;

export const SearchComponent: React.FunctionComponent = () => {
  const router = useRouter();
  const publications = usePublications();
  const { account } = useAccount();
  const screens = useBreakpoint();
  const { convertQueryToParams } = useFacetQueryUpdate();

  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    setValue('query', router.query.q ? String(router.query.q) : '');
  }, [router.query, setValue]);

  const newPublication = () => {
    router.push('/new-publication');
  };

  const handleQueryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentQuery = { ...router.query, q: value };
    const params = convertQueryToParams(currentQuery);
    const newQueryString = new URLSearchParams(params).toString();
    router.push(`${router.pathname}?${newQueryString}`, undefined, {
      shallow: true,
    });
  };

  const hasPublications =
    !!publications?.hits.length && publications.hits.length > 0;

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <FormProvider {...methods}>
          <Controller
            name='query'
            defaultValue={''}
            render={({ field: { value } }) => (
              <Input
                placeholder='Buscar...'
                onChange={handleQueryInputChange}
                size='large'
                prefix={<GoSearch />}
                value={value}
              />
            )}
          />
        </FormProvider>
      </div>

      {hasPublications && (
        <div>
          <div
            style={{
              padding: '20px 0 0 0',
            }}
          >
            <Row gutter={[16, 16]} wrap={true} style={{ marginBottom: 20 }}>
              <Col md={24} span={screens.md ? 18 : 24}>
                <div className={styles.contentContainer}>
                  <div>
                    <Row gutter={[16, 16]} wrap={true}>
                      {publications?.hits.map((publication, index) => (
                        <PublicationCard
                          key={publication.id || index}
                          publication={publication}
                          account={account}
                        />
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>

            <PublicationsPagination publications={publications} />
          </div>
        </div>
      )}

      {!hasPublications && (
        <div
          className={styles.newPublication}
          onClick={newPublication}
          onKeyUp={() => {}}
        >
          {publications?.count && publications?.count > 0
            ? 'Sin publicaciones 😞'
            : 'Sin publicaciones 😞, ¡has click aquí, y crea una!'}
        </div>
      )}
    </div>
  );
};
