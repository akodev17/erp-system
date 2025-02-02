import React from 'react';
import { Layout, Button } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center">
        <div className="text-white text-xl">Company Management</div>
        <Button 
          type="text" 
          onClick={logout}
          className="text-white"
        >
          <div className='text-stone-100'>Logout <LogoutOutlined /></div>
        </Button>
      </Header>
      <Content className="p-6">
        {children}
      </Content>
    </Layout>
  );
};
