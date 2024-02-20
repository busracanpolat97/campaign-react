import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

// import 'assets/styles/pages/home.scss';
import { RootState } from '../../redux/store';
import { Empty, Table, message } from 'antd';
import { campaignListTableColumns } from 'table/campaignListTableColumns';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseListContext } from 'providers/baseListProvider';
import { useGetCampaignsList } from 'hooks/useCommonQuery';

const CampaignList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(JSON.parse(localStorage.getItem('campaigns') || '[]'));

  const {
    data: campaignsList,
    refetch
  } = useGetCampaignsList(t, message);

  const handlePlus = useCallback((campaignId: string) => {
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const oldData = campaigns.filter((item: any) => item.id === campaignId);

    if (oldData.length > 0) {
      oldData[0].puan = oldData[0].puan + 1;
      localStorage.setItem("campaigns", JSON.stringify(campaigns));
      refetch()
    } else {
      console.error("Campaign not found with the given id:", campaignId);
    }
  }, [refetch]);

  const handleMinus = useCallback((campaignId: string) => {
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const oldData = campaigns.filter((item: any) => item.id === campaignId);

    if (oldData.length > 0) {
      oldData[0].puan = oldData[0].puan - 1;
      localStorage.setItem("campaigns", JSON.stringify(campaigns));
      refetch()
    } else {
      console.error("Campaign not found with the given id:", campaignId);
    }
  }, [refetch]);
  return (
    <BaseListContext.Provider value={{ refetch }}>
      <div className='home'>
        <Table
          columns={campaignListTableColumns(t,handlePlus, handleMinus)}
          rowKey={'id'}
          bordered
          className='variant-element-table'
          scroll={{ x: 'max-content', y: 500 }}
          size='small'
          locale={{
            emptyText: !loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 400,
                }}
              >
                <Empty description={`NO DATA`} image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            ) : (
              <></>
            ),
          }}
          pagination={false}
          loading={loading}
          dataSource={campaignsList || []}
        />
      </div>
    </BaseListContext.Provider>
  );
};

export default CampaignList;
