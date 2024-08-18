import { Layout } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const { Header } = Layout;

export const SimpleHeader = () => {
  const router = useRouter();

  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    setValue('query', router.query.q ? String(router.query.q) : '');
  }, [router.query, setValue]);

  const navigateToHomePage = () => router.push('/');

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <FormProvider {...methods}>
        <div
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <div
            onClick={navigateToHomePage}
            onKeyUp={() => {}}
            style={{ paddingRight: '60px', cursor: 'pointer' }}
          >
            <span style={{ color: 'white' }}>
              Store
              <span style={{ fontStyle: 'italic', color: 'aquamarine' }}>
                .com
              </span>
            </span>
          </div>
        </div>
      </FormProvider>
    </Header>
  );
};
