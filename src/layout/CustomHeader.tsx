import { Layout } from 'antd';

// import moneytolia from './moneytolia.svg';

import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.svg';

const { Header } = Layout;

export const CustomHeader = () => {
  return (
    <Header className='header'>
      <Link to='/'>
        <div className='header-logo'>
          <h3>
            Moneytolia
          </h3>
          <div className='logo'>
            <img src={logo} alt='Moneytolia' />
          </div>
        </div>
      </Link>
    </Header>
  );
};
