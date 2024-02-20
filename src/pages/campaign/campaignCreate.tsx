import { App as AntdApp, Button, Col, Form, Image, Input, Row, Spin, message } from 'antd';
import React, { ChangeEvent, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const CAMPAIGN_CREATE: any = [
  {
    name: 'title',
    label: 'title',
    type: 'text',
    isFilterable: false,
    isSortable: false,
  },
  {
    name: 'description',
    label: 'description',
    type: 'text',
    isFilterable: false,
    isSortable: false,
  }
];


const Campaign = () => {
  const { t } = useTranslation();
  // const roles = useSelector((state: RootState) => state.user.roles);

  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate =  useNavigate();
  const id = useId()
  const {
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting, dirtyFields },
    reset,
    resetField,
    setValue,
  } = useForm<any>({
  });


  const onSubmit: SubmitHandler<any> = useCallback(
    async (values) => {
      const campaign = {
        id: id,
        title: values.title,
        description: values.description,
        puan: 0,
        createdDate: new Date()
      }
      const local = JSON.parse(localStorage.getItem("campaigns") || "[]");
      local.push(campaign)
      localStorage.setItem("campaigns", JSON.stringify(local));
      message.success(t('notification.createSuccess'));
      reset();
      navigate(`/campaignList`)
    },
    [],
  );
  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;

  //   const result = value.replace(/[0-9@#]/g, '');
  // };
  return (
    <div className='detail-section-container'>
      <div className='detail-section-card'>
        <Form form={form} onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[16, 8]}>
            {CAMPAIGN_CREATE.map((field: any) => {
              return (
                <Col md={12} sm={24} xs={24} key={field.name} className={'card-content'}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, value, name }, fieldState: { error } }) => {

                      return (
                        <Form.Item
                          className='card-content-info-item'
                          colon={false}
                          labelAlign='left'
                          labelCol={{ span: 11 }}
                          wrapperCol={{ span: 13 }}
                          name={field.name as string}
                          validateStatus={error ? 'error' : undefined}
                          help={error ? error.message : undefined}
                          label={
                            <label className='card-content-info-item-label'>
                              {t(`campaign.create.${field.label}`)}
                            </label>
                          }
                        >
                          <Spin spinning={isSubmitting || loading}>
                            <Input
                              placeholder={t(`campaign.create.placeholder.${field.label}`)}
                              onChange={onChange}
                              value={value}
                              required
                            />
                          </Spin>
                        </Form.Item>
                      );
                    }}
                  />
                </Col>

              );
            })}
          </Row>

          <Button
            type='primary'
            loading={isSubmitting}
            htmlType='submit'
            className='card-button save-button'
          >
            {t('buttons.create-btn')}

          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Campaign;
