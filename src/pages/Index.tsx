// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>

import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChartBar, ListCheck } from "lucide-react";
import api from '@/services/api';

const Index = () => {
  const navigate = useNavigate();

  const handleSaleRegistration = () => {
    api.openSurveyForm();
  };

  const handleTrackResults = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">نظام تتبع المبيعات</h1>
          <p className="text-center text-gray-600 mb-8">قم بتسجيل المبيعات أو تتبع النتائج الخاصة بك</p>
          
          <div className="space-y-4">
            <Button 
              className="w-full h-14 text-lg font-medium bg-purple-600 hover:bg-purple-700" 
              onClick={handleSaleRegistration}
            >
              <ListCheck className="mr-2" /> تسجيل المبيعات
            </Button>
            
            <Button 
              className="w-full h-14 text-lg font-medium bg-indigo-600 hover:bg-indigo-700" 
              onClick={handleTrackResults}
            >
              <ChartBar className="mr-2" /> تتبع النتائج
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
