import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Layout, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { usePublication } from '../../context/hooks/use-publication.hook';
import { MenuItem } from '../menu-item';

export const Header = () => {
  const router = useRouter();
  const { clearPublication } = usePublication();

  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    setValue('query', router.query.q ? String(router.query.q) : '');
  }, [router.query, setValue]);

  const navigateToDashboard = () => router.push('/dashboard');
  const navigateToHomePage = () => router.push('/');

  const createNewPublication = async () => {
    clearPublication();

    router.push('new-publication');
  };

  return (
    <Layout.Header
      style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
    >
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
            style={{
              paddingRight: 20,
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            <span style={{ color: 'white' }}>
              Store
              <span style={{ fontStyle: 'italic', color: 'aquamarine' }}>
                .com
              </span>
            </span>
          </div>

          <div style={{ marginLeft: '20px' }}>
            <Space size={[40, 16]} wrap>
              <SignedIn>
                <MenuItem
                  title={'Nueva publicación'}
                  onClick={createNewPublication}
                />
              </SignedIn>

              <SignedIn>
                <MenuItem
                  title={'Tus Listados'}
                  onClick={navigateToDashboard}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button
                    style={{
                      color: 'aquamarine',
                    }}
                    type={'button'}
                  >
                    Entrar
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div
                  style={{
                    position: 'relative',
                    top: 10,
                  }}
                >
                  <UserButton />
                </div>
              </SignedIn>
            </Space>
          </div>
        </div>
      </FormProvider>
    </Layout.Header>
  );
};
