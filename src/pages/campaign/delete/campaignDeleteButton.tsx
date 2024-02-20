import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import { BaseListContext } from 'providers/baseListProvider';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';


import { useSearchParams } from 'react-router-dom';

interface CampaignDeleteButtonProps {
  campaignId: string;
}

export const CampaignDeleteButton = ({ campaignId }: CampaignDeleteButtonProps) => {
  const { refetch } = useContext(BaseListContext);
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    console.log("handleClick executed");
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const updatedCampaigns = campaigns.filter((item: any) => item.id !== campaignId);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    refetch();
    message.success(t('notification.deleteSuccess'));
  }, [campaignId, refetch]);


  return (
    <>
      <button onClick={handleClick} className='delete'>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </>
  );
};
