
import axios from 'axios';

// ملف Excel ID المأخوذ من رابط جوجل درايف
const SPREADSHEET_ID = '1FmH-BEQeBhAUn31C62_Xo388BjJDxgreW5q17ZnCjlE';
// API Key (في البيئة الحقيقية يجب أن تكون آمنة)
// هذا مفتاح وهمي فقط، يجب استبداله بمفتاح Google Sheets API الخاص بك
const API_KEY = 'AIzaSyB4cWUrt7yGCxgcRYmNqepraMgzaXWZIg0';

const api = {
  // قراءة بيانات الموظفين وكلمات المرور من صفحة Summary
  async fetchUserDetails() {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Summary!B2:P100?key=${API_KEY}`
      );
      return response.data.values || [];
    } catch (error) {
      console.error("Error fetching user details:", error);
      return [];
    }
  },

  // التحقق من بيانات المستخدم وكلمة المرور
  async validateUser(username: string, password: string) {
    const userDetails = await this.fetchUserDetails();
    const user = userDetails.find(row => row[0] === username && row[1] === password);
    return user || null;
  },

  // الحصول على بيانات مستخدم محدد
  async getUserData(username: string) {
    const userDetails = await this.fetchUserDetails();
    return userDetails.find(row => row[0] === username) || null;
  },

  // فتح رابط نموذج جوجل في نافذة جديدة
  openSurveyForm() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScaTnqJgwEFtEpTvWwRc445X9to359HO8I8N9Ah-0PHFia2nw/viewform', '_blank');
  }
};

export default api;
