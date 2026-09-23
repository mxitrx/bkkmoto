import axios from 'axios';

// URL ของ Strapi Backend
const API_URL = 'http://localhost:1337/api';

/**
 * ฟังก์ชันสำหรับดึงเนื้อหาหน้าเว็บ (Single Type: Page Content)
 */
export const fetchPageContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/page-content`);
    // ดึงเฉพาะส่วน attributes ที่เก็บข้อมูลที่เราต้องการใช้งาน
    return response.data.data.attributes; 
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อความ:", error);
    return null;
  }
};

/**
 * ฟังก์ชันสำหรับส่งข้อมูลลงทะเบียน (Collection Type: Registrations)
 */
export const submitRegistration = async (userData) => {
  try {
    // ⚠️ กฎสำคัญของ Strapi v4: ข้อมูลที่จะส่ง ต้องถูกห่อด้วย object ที่ชื่อว่า "data" เสมอ
    const response = await axios.post(`${API_URL}/registrations`, {
      data: userData 
    });
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    throw error;
  }
};