import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: any) => {
    // In a real application, you would send this token to your backend
    // and get a JWT token back after verification
    const token = credentialResponse.credential;
    
    // For demo purposes, we're using the Google token directly
    login(token);
    toast.success('Login successful!');
    navigate('/');
  };

  const handleGoogleError = () => {
    toast.error('Login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-blue-600">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">CampaignCRM</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                shape="rectangular"
                text="signin_with"
                size="large"
                width="100%"
              />
            </div>
            
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our 
                <a href="#" className="text-blue-600 hover:underline ml-1">Terms of Service</a> and 
                <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;