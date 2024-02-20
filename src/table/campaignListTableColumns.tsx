import { faEdit, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TFunction } from 'i18next';
import { CampaignDeleteButton } from 'pages/campaign/delete/campaignDeleteButton';
import { CampaignEditButton } from 'pages/campaign/edit/CampaignEditButton';
export const CAMPAIGN_LIST_COLUMNS: any = [
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
  },
  {
    name: 'puan',
    label: 'puan',
    type: 'text',
    isFilterable:false,
    isSortable:false,
  },
  {
    name: 'createdDate',
    label: 'createdDate',
    type: 'text',
    isFilterable:false,
    isSortable:false,
  },
];

export const campaignListTableColumns = (
  t: TFunction<'translation'>,
  handlePlus: (campaignId: string) => void,
  handleMinus: (campaignId: string) => void,
): ColumnsType<any> => {
  return [
    ...CAMPAIGN_LIST_COLUMNS.map((column : any) => ({
      title: (
        t(`campaign.${column.label}`)
      ),
      width: column.width || 200,
      fixed: column.fixed,

      dataIndex: column.name,
      key: column.name,
      className: column.className,
      render: (text: boolean | string, record: any, _index: number) => {
        if (text === null || text === undefined) {
          return '-';
        }

        if (column.name === 'puan') {
          
          return (
            <div>
              <button className='delete' onClick={() => handleMinus(record.id || '')} style={{marginRight: '10px'}}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <Tag color={`#87d068`}>{`${record.puan}`}</Tag>
              <button className='delete' onClick={() => handlePlus(record.id)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          );
        }

        return text;
      },
    })),
    {
      title: <div className='action-column-title'>Actions</div>,
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width:40,
      render: (_text: string, record: any, _index: number) => {
        return (
          <div className='list-button-container'>
            <CampaignEditButton campaignId={record.id + ''} />
            <CampaignDeleteButton campaignId={record.id + ''} />
          </div>
        );
      },
    },
  ];
};
