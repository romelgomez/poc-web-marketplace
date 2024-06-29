import { Divider, Form, Input, Space, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useAccount } from '../../../../context/hooks/use-account.hook';
import { useAppContext } from '../../../../context/hooks/use-app-context';
import { useListing } from '../../../../context/hooks/use-listing.hook';
import { ActionEnum } from '../../../../context/types';
import { VisibilityEnum } from '../../listings.types';
import styles from './listing.module.scss';

export const ListinForm = () => {
  const { dispatch, state } = useAppContext();
  const { listing, saveListing, modifyListing } = useListing();
  const { account } = useAccount();
  const { push } = useRouter();

  const methods = useForm({
    defaultValues: {
      name: listing?.name || '',
      description: listing?.description || '',
    },
  });

  const { setValue, resetField, getValues, trigger, handleSubmit } = methods;

  useEffect(() => {
    setValue('name', listing?.name || '');
    setValue('description', listing?.description || '');
  }, [listing, setValue]);

  const clearForm = () => {
    push('/dashboard');

    resetField('name');
    resetField('description');
  };

  const onSubmit = async () => {
    try {
      dispatch({
        type: ActionEnum.SetLoading,
        data: 'Saving listing...',
      });

      const { name, description } = getValues();

      if (!account) {
        return;
      }

      const listingData = {
        id: listing?.id,
        name,
        description,
        account,
        visibility: VisibilityEnum.Public,
      };

      if (listingData.id) {
        await modifyListing(listingData);
      }

      if (!listingData.id) {
        await saveListing(listingData);
      }

      clearForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error?.message);
      } else {
        console.error(error);
      }
    } finally {
      dispatch({
        type: ActionEnum.SetLoading,
        data: '',
      });
    }
  };

  const save = async () => {
    const result = await trigger();
    if (result) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div>
          <Spin spinning={!!state.loading && state.loading.length > 0}>
            <Form layout={'vertical'} autoComplete='off'>
              <div>
                <Space size={[8, 16]} wrap>
                  <button
                    onClick={save}
                    type='button'
                    className='px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50'
                  >
                    Guardar
                  </button>
                </Space>

                <Divider />

                <div>
                  <Controller
                    name='name'
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Form.Item
                          label={''}
                          rules={[
                            {
                              required: true,
                              message: (
                                <span>
                                  El <b>nombre</b>, es un dato requerrido!
                                </span>
                              ),
                            },
                          ]}
                        >
                          <Input
                            placeholder='Nombre'
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        </Form.Item>
                      );
                    }}
                  />

                  <Controller
                    name='description'
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <div className={styles.descriptionContainer}>
                          <Form.Item
                            labelCol={{ flex: 1 }}
                            label={''}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <span>
                                    La <b>descripción</b>, es un dato
                                    requerrido!
                                  </span>
                                ),
                              },
                            ]}
                          >
                            <Input
                              placeholder='Descripción'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </Form.Item>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </Form>
          </Spin>
        </div>
      </FormProvider>
    </div>
  );
};
