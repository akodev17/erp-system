import React from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '../api/companies';
import { AppLayout } from './Layout';

interface CompanyFormData {
  name: string;
  count: number;
}

export const CompanyForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const isEdit = !!id;

  const { data: company } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companiesApi.getById(id as string),
    enabled: isEdit,
    select: (response) => response.data,
  });

  React.useEffect(() => {
    if (company) {
      form.setFieldsValue(company);
    }
  }, [company, form]);

  const addCompany = useMutation({
    mutationFn: companiesApi.add,
    onSuccess: () => {
      message.success('Company added successfully');
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/companies');
    },
  });

  const updateCompany = useMutation({
    mutationFn: companiesApi.update,
    onSuccess: () => {
      message.success('Company updated successfully');
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/companies');
    },
  });

  const onFinish = (values: CompanyFormData) => {
    if (isEdit && company) {
      updateCompany.mutate({ ...values, id: company.id });
    } else {
      addCompany.mutate(values);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? 'Edit Company' : 'Add Company'}
          </h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ count: 0 }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input company name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Count"
              name="count"
              rules={[{ required: true, message: 'Please input count!' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-end gap-4">
                <Button onClick={() => navigate('/companies')}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={addCompany.isPending || updateCompany.isPending}
                >
                  {isEdit ? 'Update' : 'Add'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AppLayout>
  );
};