import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { SignInPayload } from '../types/types';

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const signIn = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (response) => {
      localStorage.setItem('data', JSON.stringify(response.data)); // Store the data from the data key
      message.success('Successfully signed in!');
      navigate('/companies');
    },
    onError: () => {
      message.error('Failed to sign in. Please check your credentials.');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <Form<SignInPayload>
          layout="vertical"
          onFinish={(values) => signIn.mutate(values)}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              loading={signIn.isPending}
              className="w-full"
            >
              Sign In
            </Button>
          </Form.Item>
          <div className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
