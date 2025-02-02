import React from 'react';
import { Table, Button, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { companiesApi } from '../api/companies';
import { Company } from '../types/types';
import { AppLayout } from './Layout';

export const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: companiesApi.getAll,
    select: (response) => response.data,
  });

  const deleteCompany = useMutation({
    mutationFn: companiesApi.delete,
    onSuccess: () => {
      message.success('Company deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Company) => (
        <Dropdown
        // Compare this snippet from node_modules/antd/es/dropdown/dropdown.d.ts:
          menu={
            <Menu>
              <Menu.Item key="edit" onClick={() => navigate(`/companies/edit/${record.id}`)}>
                Edit
              </Menu.Item>
              <Menu.Item 
                key="delete" 
                danger
                onClick={() => deleteCompany.mutate(record.id)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link to="/companies/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Company
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={companies}
        loading={isLoading}
        rowKey="id"
      />
    </AppLayout>
  );
};
