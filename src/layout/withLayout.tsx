import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { Content } from 'antd/es/layout/layout';
import { CustomHeader } from './CustomHeader';

import React, { ReactNode } from 'react';
import { CustomFooter } from './CustomFooter';


export const withLayout = (PageContent: ReactNode, hideCurrentPath?: boolean) => {
  return function fn() {
    return (
      <>
        <CustomHeader />
        <Layout hasSider>
          <Sidebar />
          <Layout className='page-content-container'>
            {/* <CustomBreadCrumbs hideCurrentPath={hideCurrentPath} /> */}
            <Content className='page-content'>{PageContent}</Content>
            <CustomFooter />
          </Layout>
        </Layout>
        {/* {process.env.REACT_APP_IS_DEV && <TokenDev />} */}
      </>
    );
  };
};
