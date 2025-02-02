import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { SignUpPayload } from '../types/types';

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const signUp = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (response) => {
      localStorage.setItem('data', JSON.stringify(response.data));
      message.success('Successfully signed up!');
      navigate('/companies');
    },
    onError: () => {
      message.error('Failed to sign up. Please try again.');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <Form<SignUpPayload>
          layout="vertical"
          onFinish={(values) => signUp.mutate(values)}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
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
              loading={signUp.isPending}
              className="w-full"
            >
              Sign Up
            </Button>
          </Form.Item>
          <div className="text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};