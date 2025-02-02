import React from 'react';
import { Layout, Menu, Button } from 'antd';
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
          icon={<LogoutOutlined />} 
          onClick={logout}
          className="text-white"
        >
          Logout
        </Button>
      </Header>
      <Content className="p-6">
        {children}
      </Content>
    </Layout>
  );
};
