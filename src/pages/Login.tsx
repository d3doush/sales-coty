
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Key, Lock } from "lucide-react";
import api from '@/services/api';

const Login = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const userData = await api.fetchUserDetails();
        const usernames = userData.map((user: string[]) => user[0]).filter(Boolean);
        setUsers(usernames);
      } catch (error) {
        console.error("Error loading users:", error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل بيانات المستخدمين. يرجى المحاولة لاحقًا.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleLogin = async () => {
    if (!selectedUser) {
      toast({
        title: "تنبيه",
        description: "يرجى اختيار اسم المستخدم",
        variant: "default"
      });
      return;
    }

    if (!password) {
      toast({
        title: "تنبيه",
        description: "يرجى إدخال كلمة المرور",
        variant: "default"
      });
      return;
    }

    setLoading(true);
    try {
      const user = await api.validateUser(selectedUser, password);
      if (user) {
        // تخزين اسم المستخدم في localStorage للاستخدام في صفحة النتائج
        localStorage.setItem('currentUser', selectedUser);
        navigate('/results');
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">تسجيل الدخول لعرض النتائج</h1>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">اختر اسمك</label>
              <Select
                disabled={loading}
                value={selectedUser}
                onValueChange={setSelectedUser}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="اختر اسمك" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10"
                  placeholder="أدخل كلمة المرور"
                  disabled={loading}
                />
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
              {!loading && <Lock className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <Button 
        variant="link" 
        onClick={() => navigate('/')}
        className="mt-4 text-indigo-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> العودة للصفحة الرئيسية
      </Button>
    </div>
  );
};

export default Login;
