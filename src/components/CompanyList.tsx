import React from 'react';
import { Table, Button, Dropdown, Modal, message } from 'antd';
import { PlusOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { companiesApi } from '../api/companies';
import { Company } from '../types/types';
import { AppLayout } from './Layout';

const { confirm } = Modal;

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
    onError: (error) => {
      console.error('Delete error:', error);
      message.error('Failed to delete company. Please try again.');
    },
  });

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this company?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return deleteCompany.mutateAsync(id).catch(() => {
          message.error('Failed to delete company');
        });
      },
    });
  };

  const getDropdownItems = (record: Company): MenuProps['items'] => [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => navigate(`/companies/edit/${record.id}`),
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => showDeleteConfirm(record.id),
    },
  ];

  interface ColumnType {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (_: any, record: Company) => JSX.Element;
  }

  const columns: ColumnType[] = [
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
      render: (_, record: Company) => (
        <Dropdown
          menu={{ items: getDropdownItems(record) }}
          trigger={['click']}
          placement="bottomRight"
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