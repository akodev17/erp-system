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
      localStorage.setItem('token', response.data.token);
      message.success('Successfully signed in!');
      navigate('/companies');
    },
    onError: () => {
      message.error('Failed to sign in. Please check your credentials.');
    },
  });

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('./public/background.jpg')`,
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
              loading={signIn.isPending}
              className="w-full h-10 text-lg"
            >
              Sign In
            </Button>
          </Form.Item>
          <div className="text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700">Sign Up</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
