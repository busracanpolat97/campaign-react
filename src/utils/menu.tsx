
import {
  FundOutlined,
} from '@ant-design/icons';
import { NavigateFunction } from 'react-router-dom';
import { TFunction } from 'i18next';
import { Tooltip } from 'antd';

export const createMenuTree = (
  navigate: NavigateFunction,
  t: TFunction<'translation'>,
) => {
  return MENU_ELEMENTS.map((element: any) => {
    const label = `${element.label}`;

    return {
      onClick: () => {
        // If no subs
        if (!element.subs && element.href) {
          navigate(element?.href);
        }
      },
      key: element.key,
      icon: element.icon,
      label: label.length > 18 ? <Tooltip title={label}>{label}</Tooltip> : label,
      children:
        element.subs &&
        element.subs
          .map((subElement : any) => {
            return {
              onClick: (_item: { key: string; domEvent: Event }) => {
                if (!subElement.subs) navigate(subElement.href);
              },
              key: subElement.key,
              icon: subElement.icon,
              label:
                subElement.label.toString().length > 17 ? (
                  <Tooltip title={`${subElement.label}`}>
                    {`${subElement.label}`}
                  </Tooltip>
                ) : (
                  `${subElement.label}`
                ),
              children:
                subElement.subs &&
                subElement.subs.map((subsElement : any) => {
                    return {
                      onClick: (_item: { key: string; domEvent: Event }) => {
                        _item.domEvent.stopPropagation();
                        navigate(subsElement.href);
                      },
                      key: subsElement.key,
                      icon: subsElement.icon,
                      label:
                        subsElement.label.toString().length > 19 ? (
                          <Tooltip
                            placement='top'
                            title={`${subElement.label}`}
                          >
                            {`${subElement.label}`}
                          </Tooltip>
                        ) : (
                          `${subElement.label}`
                        ),
                      children: subsElement.subs,
                    };
                  }),
            };
          }),
    };
  });
};
export const MENU_ELEMENTS: any = [
  {
    key: '/campaignList',
    label: 'Campaign List',
    href: '/campaignList',
    icon: <FundOutlined />,
  },
  {
    key: '/campaignCreate',
    label: 'Campaign Create',
    href: '/campaignCreate',
    icon: <FundOutlined />,
  }
];
