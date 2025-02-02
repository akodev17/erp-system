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
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      />
      
      {/* Content */}
      <Card className="w-full max-w-md z-10 shadow-xl">
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
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              loading={signUp.isPending}
              className="w-full h-10 text-lg"
            >
              Sign Up
            </Button>
          </Form.Item>
          <div className="text-center">
            Already have an account? <Link to="/signin" className="text-blue-600 hover:text-blue-700">Sign In</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};