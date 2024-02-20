import { Button, Col, Form, Input, Modal, Row, Spin, message } from 'antd';
import { BaseListContext } from 'providers/baseListProvider';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const CAMPAIGN_EDIT_COLUMNS: any = [
  {
    name: 'title',
    label: 'title',
    type: 'text',
    isFilterable:false,
    isSortable:false,
  },
  {
    name: 'description',
    label: 'description',
    type: 'text',
    isFilterable:false,
    isSortable:false,
  }
];


interface CampaignEditModalProps {
  campaignId: string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  cancelFn?: () => void;
}

export const CampaignEditModal = ({
  campaignId,
  modalOpen,
  setModalOpen,
  cancelFn
}: CampaignEditModalProps) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const { refetch } = useContext(BaseListContext);
  const navigate = useNavigate();

  const {
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    resetField,
    setValue,
  } = useForm<any>({
    defaultValues: data
  });

  const queryDetail = useCallback(() => {
    if (campaignId) {
      try {
        const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
        const filteredCampaign = campaigns.find((campaign: any) => campaign.id === campaignId);
        if (filteredCampaign) {
          setData(filteredCampaign);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [campaignId, setData]);

  useEffect(() => {
    queryDetail();
  }, [queryDetail]);

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit: SubmitHandler<any> = useCallback(
    async (values) => {
      const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
      const oldData = campaigns.filter((item : any) => item.id !== values.id);
      oldData.push(values);
      localStorage.setItem("campaigns", JSON.stringify(oldData));
      reset();
      cancelFn && cancelFn();
      refetch();
      message.success(t('notification.updatedSuccess'));
    },
    [refetch, cancelFn, form],
  );

  return (
    <Modal
      style={{ top: 20 }}
      onCancel={() => {
        setSearchParams(
          (p) => {
            p.delete('tab');
            p.delete('id');
            p.delete('mode');
            return p;
          },
          { replace: true },
        );
        setModalOpen(false);
      }}
      open={modalOpen}
      cancelText={t('buttons.cancel-btn')}
      footer={null}
      width={1500}
    >
      <Form form={form} onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[16, 8]}>
          {CAMPAIGN_EDIT_COLUMNS.map((field: any) => {
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
          {t('buttons.save-btn')}
        </Button>
      </Form>
    </Modal>
  );
};
