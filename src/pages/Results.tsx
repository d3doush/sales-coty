
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import api from '@/services/api';

interface ResultData {
  name: string;
  storeTarget: string;
  storeAchievement: string;
  bjsTarget: string;
  bjsAchievement: string;
  rmlTarget: string;
  rmlAchievement: string;
  mfTarget: string;
  mfAchievement: string;
  fullPersonalTarget: string;
  fullPersonalAchievement: string;
  bjsRanking: string;
  rmlRanking: string;
  mfRanking: string;
}

const ResultCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <Card className="overflow-hidden">
    <div className={`h-2 ${color}`}></div>
    <CardContent className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value || "0"}</p>
    </CardContent>
  </Card>
);

const Results = () => {
  const [userData, setUserData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserResults = async () => {
      const username = localStorage.getItem('currentUser');
      
      if (!username) {
        toast({
          title: "خطأ",
          description: "يجب تسجيل الدخول أولاً",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const data = await api.getUserData(username);
        if (data) {
          setUserData({
            name: data[0] || "",
            storeTarget: data[2] || "0",
            storeAchievement: data[3] || "0",
            bjsTarget: data[4] || "0",
            bjsAchievement: data[5] || "0",
            rmlTarget: data[6] || "0",
            rmlAchievement: data[7] || "0",
            mfTarget: data[8] || "0",
            mfAchievement: data[9] || "0",
            fullPersonalTarget: data[10] || "0",
            fullPersonalAchievement: data[11] || "0",
            bjsRanking: data[12] || "-",
            rmlRanking: data[13] || "-",
            mfRanking: data[14] || "-",
          });
        } else {
          toast({
            title: "خطأ",
            description: "لم يتم العثور على بيانات لهذا المستخدم",
            variant: "destructive"
          });
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user results:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserResults();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              مرحباً بك، {userData?.name}
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">نتائج المعرض</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard title="تارجت المعرض" value={userData?.storeTarget || ""} color="bg-blue-500" />
              <ResultCard title="نتائج المعرض" value={userData?.storeAchievement || ""} color="bg-blue-400" />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">بورجوا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard title="تارجت بورجوا" value={userData?.bjsTarget || ""} color="bg-purple-500" />
              <ResultCard title="المحقق ل بورجوا" value={userData?.bjsAchievement || ""} color="bg-purple-400" />
              <ResultCard title="ترتيب بورجوا" value={userData?.bjsRanking || ""} color="bg-purple-300" />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">ريميل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard title="تارجت ريميل" value={userData?.rmlTarget || ""} color="bg-pink-500" />
              <ResultCard title="المحقق ل ريميل" value={userData?.rmlAchievement || ""} color="bg-pink-400" />
              <ResultCard title="ترتيب ريميل" value={userData?.rmlRanking || ""} color="bg-pink-300" />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">ماكس فاكتور</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard title="تارجت ماكس فاكتور" value={userData?.mfTarget || ""} color="bg-yellow-500" />
              <ResultCard title="المحقق ل ماكس فاكتور" value={userData?.mfAchievement || ""} color="bg-yellow-400" />
              <ResultCard title="ترتيب ماكس فاكتور" value={userData?.mfRanking || ""} color="bg-yellow-300" />
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">النتائج الشخصية الكاملة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard title="التارجت الشخصي الكامل" value={userData?.fullPersonalTarget || ""} color="bg-green-500" />
              <ResultCard title="نتائجي الكاملة" value={userData?.fullPersonalAchievement || ""} color="bg-green-400" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-indigo-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
