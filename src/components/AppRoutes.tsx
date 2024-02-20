import { PropsWithChildren, lazy, useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import CampaignList from '../pages/campaign/campaignList';
import { RootState } from '../redux/store';
import { withLayout } from '../layout/withLayout';
import { Spin } from 'antd';
import Campaign from '../pages/campaign/campaignCreate';

// import { MainRoles, ROLE_MAPPING, RoleActions, Roles } from 'utils/roles';

// import { useTranslation } from 'react-i18next';

export type ProtectedRouteProps = {
  redirectPath?: string;
  role?: string;
//   env?: ENV_TYPE;
};


export const AppRoutes = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
//   const { t } = useTranslation();
//   const trigger = useSelector((state: RootState) => state.service.count);
//   const [messageApi] = message.useMessage();

//   const {
//     data: userInfo,
//     isLoading,
//     error: somethingErr,
//     refetch,
//   } = useUserInfoQuery(messageApi);




  return (
    <Routes>
      <Route
        path='/'
        element={withLayout(
            <Suspense
              fallback={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Spin spinning={true} />
                </div>
              }
            >
              <Outlet />
            </Suspense>,
          )()}
      >
        <Route path='/campaignList' element={<CampaignList />} />
        <Route path='/campaignCreate' element={<Campaign />} />
      </Route>
    </Routes>
  );
};
