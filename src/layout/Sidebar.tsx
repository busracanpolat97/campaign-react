import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useActiveMenu } from 'hooks/useActiveMenu';
// import { RootState } from 'redux/store';


// import 'assets/styles/layout/sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadiation } from '@fortawesome/free-solid-svg-icons';
import { MENU_ELEMENTS, createMenuTree } from '../utils/menu';
import { useTranslation } from 'react-i18next';

export const Sidebar = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuTree = createMenuTree(navigate, t);

  return (
    <Sider
      theme='light'
      className='layout-sider'
      collapsible
      onBreakpoint={(broken) => console.log({ broken })}
      width={250}
    >
      <Menu
        inlineIndent={15}
        overflowedIndicator={<FontAwesomeIcon icon={faRadiation} />}
        mode='inline'
        items={menuTree}
      />
    </Sider>
  );
};
