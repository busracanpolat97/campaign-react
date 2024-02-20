import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';


import { useSearchParams } from 'react-router-dom';
import { CampaignEditModal } from './campaignEditModal';

interface CampaignEditButtonProps {
  campaignId: string;
}

export const CampaignEditButton = ({ campaignId }: CampaignEditButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const id = searchParams.get('id');
  const lang = searchParams.get('lang');
  const [modalOpen, setModalOpen] = useState<boolean>(tab === 'detail' && id === campaignId && !lang ? true : false);

  const handleClick = useCallback(() => {
    setModalOpen(true);
    setSearchParams({ tab: 'detail', mode: 'edit', id: campaignId }, { replace: true });
  }, [setSearchParams, campaignId]);

  
  
  const handleClose = useCallback(() => {
    setSearchParams(
      (p) => {
        p.delete('mode');
        return p;
      },
      { replace: true },
    );
    setModalOpen(false);
  }, [setSearchParams]);

  return (
    <>
      <button onClick={handleClick} className='edit'>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      {modalOpen && (
        <CampaignEditModal
          campaignId={campaignId}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          cancelFn={handleClose}
        />
      )}
    </>
  );
};
