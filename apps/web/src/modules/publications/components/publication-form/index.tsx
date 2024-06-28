import { Divider, Form, Input, Select, Space, Spin } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { first } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useAccount } from '../../../../context/hooks/use-account.hook';
import { useAppContext } from '../../../../context/hooks/use-app-context';
import { usePublication } from '../../../../context/hooks/use-publication.hook';
import { ActionEnum } from '../../../../context/types';
import styles from '../../../../styles/Home.module.scss';
import UploadMedia from '../../../media/components/upload-media.component';
const { TextArea } = Input;

export const PublicationForm = () => {
  const { dispatch, state } = useAppContext();
  const { account } = useAccount();
  const router = useRouter();
  const isEditMode = router.pathname === '/edit-publication';

  const listingOptions = account?.listings.map((listing, index) => ({
    value: listing.id,
    label: listing.name || `Listado ${index}`,
  }));

  const {
    publication,
    modifyPublication,
    clearPublication,
    savePublication,
    onRemoveMedia,
    onChangesMedia,
    beforeUploadMedia,
  } = usePublication();

  const methods = useForm({
    defaultValues: {
      title: publication?.title || '',
      description: publication?.description || '',
      listingId: publication?.listingId,
    },
  });

  const { setValue, resetField, getValues, trigger, handleSubmit } = methods;

  const handlebeforeUploadMedia = (file: RcFile) => {
    const { title, description, listingId } = getValues();

    modifyPublication({
      title,
      description,
      listingId,
    });

    return beforeUploadMedia(file);
  };

  useEffect(() => {
    setValue('title', publication?.title || '');
    setValue('description', publication?.description || '');
    setValue('listingId', publication?.listingId || '');
  }, [publication, setValue]);

  const clearPublicationForm = () => {
    router.push(`/listing?i=${publication?.listingId}`);

    resetField('title');
    resetField('description');

    clearPublication();
  };

  const onSubmit = async () => {
    try {
      dispatch({
        type: ActionEnum.SetLoading,
        data: 'Saving publication...',
      });

      const { title, description, listingId } = getValues();

      const publication = modifyPublication({
        title,
        description,
        listingId,
      });

      const errors = publication.getErrors();

      if (errors.length > 0) {
        alert(first(errors));
        return;
      }

      await savePublication(publication);

      clearPublicationForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
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
      <h3
        style={{
          textAlign: 'right',
        }}
      >
        {isEditMode ? 'Editar publicación' : 'Nueva publicación'}
      </h3>
      <FormProvider {...methods}>
        <div>
          <Spin spinning={!!state.loading && state.loading.length > 0}>
            <Form layout={'vertical'} autoComplete='off'>
              <div>
                <div>
                  <Space size={[8, 16]} wrap>
                    <button
                      onClick={save}
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50'
                    >
                      {isEditMode ? 'Guardar' : 'Publicar'}
                    </button>
                  </Space>
                </div>

                <div>
                  <Divider />
                </div>

                <div
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <Controller
                    name='listingId'
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Space direction='vertical' style={{ width: '100%' }}>
                          <Select
                            size={'middle'}
                            placeholder='Selecciona un listado'
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            style={{ width: '100%' }}
                            options={listingOptions}
                          />
                        </Space>
                      );
                    }}
                  />
                </div>

                <div>
                  <Controller
                    name='title'
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Form.Item
                          label={''}
                          rules={[
                            {
                              required: true,
                              message: (
                                <span>
                                  El <b>titulo</b> es un dato requerido!
                                </span>
                              ),
                            },
                          ]}
                        >
                          <Input
                            placeholder='Titulo'
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
                                    La <b>descripción</b> es un dato requerido!
                                  </span>
                                ),
                              },
                            ]}
                          >
                            <TextArea
                              placeholder='Descripción'
                              showCount
                              maxLength={240}
                              style={{ height: 140 }}
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                          </Form.Item>
                        </div>
                      );
                    }}
                  />
                </div>
                <div>
                  <UploadMedia
                    media={publication?.media || []}
                    tagId={publication?.id || ''}
                    onRemove={onRemoveMedia}
                    onChanges={onChangesMedia}
                    beforeUpload={handlebeforeUploadMedia}
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
