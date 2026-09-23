import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 1. CONFIG & BACKEND SETUP (TECH THEME)
// ==========================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbzopLs_wCM82zqR_9isoTUusY4Vji-6U8iaSZIPyw49b6d3TZehQnTNp2dsnWd8XEzf/exec";

const defaultConfig = {
  title: "NEXTGEN TECH",
  subtitle: "Summit 2026",
  date: "15 พฤศจิกายน 2026",
  targetDate: "2026-11-15T09:00:00", // สำหรับ Countdown
  location: "True Digital Park Bangkok (Grand Hall ชั้น 6)",
  aboutText: "เวทีระดับภูมิภาคที่รวบรวมผู้นำความคิดด้าน AI, Cloud Computing, และ Cybersecurity มาร่วมเจาะลึกอนาคตดิจิทัล ปลดล็อกศักยภาพธุรกิจและนักพัฒนาไทยสู่เวทีโลกใน 1 วันเต็ม",
  contactEmail: "contact@nextgentech2026.com",
  contactPhone: "097-265-3945",
  
  heroBg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
  marqueeBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  sponsorBg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",

  speakers: [
    { id: 1, name: "ดร. ธนวัฒน์ วงศา", role: "AI Research Director, TechCorp", tag: "AI & ML", color: "#3B82F6", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", desc: "เจาะลึกวิวัฒนาการ Generative AI และการนำ Large Language Models มาปรับใช้เพื่อลดต้นทุนในองค์กรยุคใหม่" },
    { id: 2, name: "คุณศุภรดา กุลภัทรพงศ์", role: "Cloud Solutions Architect", tag: "CLOUD INFRA", color: "#F97316", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", desc: "แนวทางการออกแบบระบบ Multi-Cloud ที่มีความเสถียรสูง ทนทานต่อการล่ม และรองรับผู้ใช้งานหลักล้านพร้อมกัน" },
    { id: 3, name: "คุณอิทธิฤทธิ์ พงษ์ไพบูลย์", role: "Cybersecurity Strategist", tag: "SECURITY", color: "#10B981", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", desc: "รับมือกับภัยคุกคามไซเบอร์ยุค AI (Deepfake Phishing) และมาตรการป้องกันข้อมูลรั่วไหลในระดับ Enterprise" },
    { id: 4, name: "Sarah Jenkins", role: "VP of Web3 Innovations", tag: "WEB3 & BLOCKCHAIN", color: "#EC4899", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", desc: "กรณีศึกษาการนำ Blockchain มาใช้ในระบบ Supply Chain และ Smart Contracts ระดับองค์กร" }
  ],
  
  sponsors: [
    { id: 1, name: "GOOGLE CLOUD" }, { id: 2, name: "AWS THAILAND" },
    { id: 3, name: "MICROSOFT" }, { id: 4, name: "TRUE DIGITAL" }, { id: 5, name: "DEVTOTHEMOON" },
    { id: 6, name: "INTEL" }, { id: 7, name: "NVIDIA" }
  ],

  tickets: [
    { id: 1, name: "Early Bird Dev", price: 1500, type: "early", badge: "🔥 BEST VALUE", features: "สิทธิ์เข้าฟัง Keynote ทุกเซสชัน\nเข้าร่วม Tech Workshop เชิงปฏิบัติการ\nอาหารกลางวันแบบบุฟเฟต์ & Coffee Break\nรับ Digital E-Certificate" },
    { id: 2, name: "Standard Tech Pass", price: 2800, type: "regular", badge: "POPULAR", features: "สิทธิ์เข้าฟัง Keynote ทุกเซสชัน\nเข้าร่วม Tech Workshop เชิงปฏิบัติการ\nอาหารกลางวันแบบบุฟเฟต์ & Coffee Break\nรับ Digital E-Certificate\nสิทธิ์เข้าดูย้อนหลัง Video on Demand 3 เดือน" },
    { id: 3, name: "VIP Innovator Pass", price: 4500, type: "vip", badge: "👑 VIP EXPERIENCE", features: "สิทธิพิเศษบัตร Standard Pass ทั้งหมด\nที่นั่ง Reserved Seat แถวหน้าสุด (Zone A)\nสิทธิ์ร่วม Networking Dinner กับวิทยากร\nชุดของที่ระลึก Tech Gadget Limited Edition\nFast Track ช่องทางลงทะเบียนพิเศษ" }
  ],

  schedule: [
    { id: 1, time: "09:00", title: "Keynote: The Next Era of Artificial Intelligence", desc: "ภาพรวมทิศทางเทคโนโลยีโลกในปี 2026 และผลกระทบต่ออุตสาหกรรมดิจิทัล", tag: "OPENING KEYNOTE", color: "#F97316" },
    { id: 2, time: "10:45", title: "Panel: Scalable Cloud Architectures & DevOps", desc: "เสวนาวิสัยทัศน์การบริหารจัดการโครงสร้างพื้นฐานไอทีเพื่อความยืดหยุ่นสูงสุด", tag: "PANEL DISCUSSION", color: "#3B82F6" },
    { id: 3, time: "12:00", title: "Networking Lunch & Tech Exhibition", desc: "พักรับประทานอาหารกลางวัน และเยี่ยมชมบูธนวัตกรรมจาก Tech Partner", tag: "BREAK", color: "#94A3B8" },
    { id: 4, time: "13:30", title: "Deep Dive Workshops (AI, Security, Cloud)", desc: "แยกย้ายเข้าห้องปฏิบัติการเฉพาะทางเพื่อทดลองเขียนโค้ดและทดสอบระบบจริง", tag: "MASTERCLASS", color: "#10B981" },
    { id: 5, time: "16:00", title: "Future Tech & Closing Remarks", desc: "สรุปประเด็นสำคัญและทิศทางก้าวต่อไปของนักพัฒนาไทย", tag: "CLOSING", color: "#EC4899" }
  ],
  
  faqs: [
    { q: "สามารถออกใบกำกับภาษีได้หรือไม่?", a: "ได้ครับ หลังจากลงทะเบียนเสร็จสิ้น คุณสามารถส่งอีเมลพร้อมแนบหมายเลข E-Ticket มาที่ contact@nextgentech2026.com เพื่อขอรับใบกำกับภาษีเต็มรูปแบบได้ภายใน 7 วันทำการ" },
    { q: "มีที่จอดรถรองรับหรือไม่?", a: "สถานที่จัดงาน True Digital Park มีที่จอดรถรองรับมากกว่า 1,000 คัน ผู้เข้าร่วมงานสามารถนำ E-Ticket มาประทับตราจอดรถฟรีได้ 8 ชั่วโมง" },
    { q: "จำเป็นต้องนำคอมพิวเตอร์มาเองไหม?", a: "สำหรับผู้ที่ต้องการเข้าร่วมช่วง Deep Dive Workshops ในช่วงบ่าย แนะนำให้นำ Laptop ส่วนตัวมาด้วยเพื่อทดลองปฏิบัติจริง (มีปลั๊กไฟและ Wi-Fi ให้บริการทุกที่นั่ง)" }
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [config, setConfig] = useState(() => {
    try { const saved = localStorage.getItem('nextGenTechConfigV2'); return saved ? JSON.parse(saved) : defaultConfig; } 
    catch { return defaultConfig; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try { const saved = localStorage.getItem('nextGenTechRegisV2'); return saved ? JSON.parse(saved) : []; } 
    catch { return []; }
  });

  const pageViews = useMemo(() => registrations.length > 0 ? registrations.length * 14 + 1250 : 1250, [registrations.length]);

  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ticketModal, setTicketModal] = useState({ isOpen: false, name: '', tier: '', qrUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  useEffect(() => { localStorage.setItem('nextGenTechConfigV2', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('nextGenTechRegisV2', JSON.stringify(registrations)); }, [registrations]);

  // Scroll Event for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    if (currentView !== 'customer') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, config]);

  // Typewriter Effect
  useEffect(() => {
    if (currentView !== 'customer') return;
    const fullText = "AI, Cloud Computing, & Future Innovations";
    let i = 0;
    setTypedText('');
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) { setTypedText(fullText.substring(0, i)); i++; } 
      else { clearInterval(typingInterval); }
    }, 70);
    return () => clearInterval(typingInterval);
  }, [currentView]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(config.targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [config.targetDate]);

  // Auto Sync for Admin
  useEffect(() => {
    if (currentView === 'admin') {
      syncWithGoogleSheet(true);
      const interval = setInterval(() => { syncWithGoogleSheet(true); }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedTicket = config?.tickets?.find(t => String(t.id) === String(formData.ticketId)) || config?.tickets?.[0] || { price: 0, name: '-' };
  const subtotal = selectedTicket ? Number(selectedTicket.price) : 0;
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newRegis = {
      id: Date.now(), ...formData, ticketName: selectedTicket.name, ticketId: selectedTicket.id,
      totalPaid: total, timestamp: new Date().toLocaleString('th-TH')
    };

    try {
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRegis)
      });
    } catch (error) { console.error("Sheet API Error:", error); }

    setRegistrations(prev => [newRegis, ...prev]);
    const qrData = encodeURIComponent(`NXTGEN|${formData.name}|${selectedTicket.name}|${Date.now()}`);
    const qrUrl = `https://quickchart.io/qr?text=${qrData}&size=300&margin=1&dark=2563eb`;
    
    setTicketModal({ isOpen: true, name: formData.name, tier: selectedTicket.name, qrUrl });
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || '' });
  };

  const syncWithGoogleSheet = async (isAuto = false) => {
    if(!isAuto) setIsSyncing(true);
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      if(data && Array.isArray(data)) {
        const formattedData = data.map(r => ({
          id: r.id || r.Id || r.ID || Date.now() + Math.random(),
          name: r.name || r.Name || '', email: r.email || r.Email || '',
          phone: r.phone || r.Phone || '', company: r.company || r.Company || '',
          ticketName: r.ticketName || r.TicketName || r.ticket || '',
          ticketId: String(r.ticketId || r.TicketId || ''),
          totalPaid: Number(r.totalPaid || r.TotalPaid || r.total || 0),
          timestamp: r.timestamp || r.Timestamp || ''
        }));
        setRegistrations(formattedData.filter(r => r.name !== ''));
      }
    } catch (error) { console.error("Sync Error:", error); }
    if(!isAuto) setIsSyncing(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleArrayChange = (arr, id, field, value) => setConfig(prev => ({ ...prev, [arr]: (prev[arr]||[]).map(i => i.id === id ? { ...i, [field]: value } : i) }));
  const addSpeaker = () => setConfig(prev => ({ ...prev, speakers: [...(prev.speakers || []), { id: Date.now(), name: "ชื่อวิทยากร", role: "ตำแหน่ง", tag: "TECH", color: "#3B82F6", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", desc: "รายละเอียดวิทยากร" }] }));
  const addSchedule = () => setConfig(prev => ({ ...prev, schedule: [...(prev.schedule || []), { id: Date.now(), time: "00:00", title: "หัวข้อเซสชัน", desc: "รายละเอียดเนื้อหา", tag: "SESSION", color: "#F97316" }] }));
  const addSponsor = () => setConfig(prev => ({ ...prev, sponsors: [...(prev.sponsors || []), { id: Date.now(), name: "ชื่อบริษัท" }] }));
  const addFaq = () => setConfig(prev => ({ ...prev, faqs: [...(prev.faqs || []), { id: Date.now(), q: "คำถาม?", a: "คำตอบ" }] }));
  const removeArrayItem = (arr, id) => setConfig(prev => ({ ...prev, [arr]: (prev[arr]||[]).filter(i => i.id !== id) }));
  const handleImageUpload = (e, arr, id) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => handleArrayChange(arr, id, 'img', reader.result); reader.readAsDataURL(file); } };

  const startEditUser = (user) => { setEditingUserId(user.id); setEditUserForm(user); };
  const saveUserEdit = () => { setRegistrations(prev => prev.map(r => r.id === editingUserId ? editUserForm : r)); setEditingUserId(null); };
  const deleteUser = (id) => { if(window.confirm('คุณต้องการลบข้อมูลผู้เข้าร่วมท่านนี้ใช่หรือไม่?')) setRegistrations(prev => prev.filter(r => r.id !== id)); };

  const totalRevenue = registrations.reduce((sum, r) => sum + (Number(r.totalPaid) || 0), 0);
  const conversionRate = ((registrations.length / pageViews) * 100).toFixed(1);
  const ticketStats = (config?.tickets || []).map(t => {
    const count = registrations.filter(r => String(r.ticketId) === String(t.id) || (r.ticketName && r.ticketName.toLowerCase().includes(t.name.toLowerCase()))).length;
    const percent = registrations.length ? ((count / registrations.length) * 100).toFixed(1) : 0;
    return { ...t, count, percent };
  });

  // ==========================================
  // STYLES: CUSTOMER VIEW (ENHANCED TECH THEME)
  // ==========================================
  const customerCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Kanit:wght@300;400;500;600;700&display=swap');
    :root { 
      --primary: #2563EB; --primary-glow: rgba(37,99,235,0.6); 
      --secondary: #06B6D4; 
      --bg-main: #020617; --bg-card: rgba(15, 23, 42, 0.6); 
      --text-light: #F8FAFC; --text-muted: #94A3B8; 
      --border: rgba(51, 65, 85, 0.5); 
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Kanit', 'Inter', sans-serif; background: var(--bg-main); color: var(--text-light); overflow-x: hidden; margin: 0; }
    
    /* Animations & Utilities */
    .reveal { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; }
    
    @keyframes blink { 50% { border-color: transparent; } }
    .typewriter-text { border-right: 3px solid var(--primary); white-space: nowrap; overflow: hidden; animation: blink 0.7s step-end infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
    @keyframes pulse-glow { 0% { box-shadow: 0 0 0 0 var(--primary-glow); } 70% { box-shadow: 0 0 0 15px rgba(37,99,235,0); } 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); } }

    .glass { background: var(--bg-card); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--border); }
    .glow-text { text-shadow: 0 0 20px rgba(96,165,250,0.5); }
    .glow-box:hover { box-shadow: 0 0 30px rgba(37,99,235,0.3); border-color: #60A5FA; }

    /* Layout */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 120px 0; position: relative; z-index: 2; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .section-alt { background: radial-gradient(circle at 50% 0%, #0F172A 0%, #020617 70%); }
    
    /* Typography */
    .sec-header { text-align: center; margin-bottom: 70px; }
    .sec-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #60A5FA; background: rgba(37,99,235,0.1); border: 1px solid rgba(37,99,235,0.2); padding: 8px 20px; border-radius: 50px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
    .sec-badge::before { content: ''; width: 6px; height: 6px; background: #60A5FA; border-radius: 50%; display: inline-block; animation: pulse-glow 2s infinite; }
    .sec-title { font-size: 46px; font-weight: 800; color: #fff; margin-bottom: 20px; letter-spacing: -1px; }
    .sec-line { width: 80px; height: 4px; background: linear-gradient(90deg, var(--primary), var(--secondary)); margin: 0 auto; border-radius: 2px; }

    /* Buttons */
    .btn { display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: #1E293B; color: #fff; border: 1px solid var(--border); padding: 16px 36px; font-size: 15px; font-weight: 700; border-radius: 50px; cursor: pointer; transition: 0.3s; }
    .btn:hover:not(:disabled) { transform: translateY(-3px); background: #334155; }
    .btn-primary { background: linear-gradient(135deg, #2563EB, #06B6D4); border: none; box-shadow: 0 10px 25px -5px rgba(37,99,235,0.5); }
    .btn-primary:hover:not(:disabled) { background: linear-gradient(135deg, #1D4ED8, #0891B2); box-shadow: 0 15px 30px -5px rgba(37,99,235,0.7); }

    /* Navbar */
    .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 25px 0; transition: all 0.4s ease; border-bottom: 1px solid transparent; }
    .navbar.scrolled { padding: 15px 0; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
    .nav-wrap { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 12px; cursor: pointer; letter-spacing: -1px; }
    .logo-dot { width: 32px; height: 32px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; }
    .nav-links { display: flex; gap: 40px; }
    .nav-links a { color: #CBD5E1; font-weight: 500; cursor: pointer; transition: 0.3s; font-size: 15px; position: relative; }
    .nav-links a:hover { color: #fff; }
    .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #60A5FA; transition: 0.3s; }
    .nav-links a:hover::after { width: 100%; }

    /* Hero */
    .hero { min-height: 100vh; display: flex; align-items: center; position: relative; background-size: cover; background-position: center; background-attachment: fixed; }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.7) 100%); z-index: 0; }
    .hero-content { position: relative; z-index: 1; padding-top: 80px; max-width: 800px; }
    .hero h1 { font-size: 72px; line-height: 1.1; margin-bottom: 25px; color: #fff; font-weight: 900; letter-spacing: -2px; }
    .hero h1 span { color: transparent; background: linear-gradient(90deg, #60A5FA, #34D399); -webkit-background-clip: text; display: block; font-size: 42px; font-weight: 700; margin-top: 10px; letter-spacing: 0; }
    
    /* Countdown */
    .countdown-wrap { display: flex; gap: 20px; margin-bottom: 40px; }
    .cd-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px); border-radius: 16px; width: 90px; height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .cd-num { font-size: 32px; font-weight: 800; color: #fff; line-height: 1; }
    .cd-label { font-size: 11px; color: #94A3B8; text-transform: uppercase; font-weight: 700; margin-top: 5px; letter-spacing: 1px; }

    /* Grids & Cards */
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
    
    .concept-card { padding: 40px 30px; text-align: center; transition: 0.4s; border-radius: 24px; }
    .concept-icon { width: 80px; height: 80px; background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1)); border: 1px solid rgba(37,99,235,0.2); border-radius: 24px; display: flex; justify-content: center; align-items: center; margin: 0 auto 25px; font-size: 36px; animation: float 6s ease-in-out infinite; }
    
    .speaker-card { padding: 20px; transition: 0.4s; cursor: pointer; border-radius: 32px; overflow: hidden; group; }
    .speaker-img-wrap { height: 320px; border-radius: 24px; overflow: hidden; position: relative; margin-bottom: 24px; }
    .speaker-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(80%) contrast(1.2); transition: 0.7s; }
    .speaker-card:hover .speaker-img { filter: grayscale(0%) contrast(1); transform: scale(1.08); }
    .speaker-tag { position: absolute; bottom: 20px; left: 20px; font-size: 10px; font-weight: 800; color: #fff; padding: 8px 16px; border-radius: 50px; letter-spacing: 1px; backdrop-filter: blur(5px); }

    /* Timeline */
    .timeline-wrap { max-width: 850px; margin: 0 auto; position: relative; padding-left: 50px; }
    .timeline-wrap::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--primary), transparent); }
    .time-card { padding: 35px; display: flex; gap: 40px; align-items: center; margin-bottom: 30px; position: relative; transition: 0.3s; border-radius: 24px; }
    .time-dot { position: absolute; left: -43px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border-radius: 50%; background: #020617; border: 4px solid var(--primary); box-shadow: 0 0 15px var(--primary); z-index: 2; }
    .time-left { width: 120px; flex-shrink: 0; }
    .time-text { font-size: 42px; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -1px; }

    /* Tickets */
    .ticket-card { padding: 50px 40px; position: relative; display: flex; flex-direction: column; cursor: pointer; border-radius: 32px; transition: 0.4s; }
    .ticket-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: #1E293B; border: 1px solid var(--border); color: #60A5FA; padding: 8px 24px; font-size: 11px; font-weight: 800; border-radius: 50px; letter-spacing: 2px; white-space: nowrap; }
    .ticket-radio:checked + .ticket-card { border-color: #3B82F6; box-shadow: 0 20px 50px rgba(37,99,235,0.2); transform: translateY(-10px); background: linear-gradient(180deg, rgba(37,99,235,0.05) 0%, transparent 100%); }
    .ticket-radio:checked + .ticket-card .ticket-badge { background: linear-gradient(90deg, #2563EB, #06B6D4); color: #fff; border: none; }
    
    /* FAQ Accordion */
    .faq-item { border-bottom: 1px solid var(--border); padding: 25px 0; cursor: pointer; }
    .faq-q { font-size: 18px; font-weight: 600; color: #fff; display: flex; justify-content: space-between; align-items: center; }
    .faq-a { font-size: 15px; color: #94A3B8; margin-top: 15px; line-height: 1.7; display: none; padding-right: 40px; }
    .faq-item.active .faq-a { display: block; animation: fadeDown 0.3s ease; }
    .faq-item.active .faq-q { color: #60A5FA; }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    /* Form */
    .form-box { padding: 60px; max-width: 850px; margin: 0 auto; border-radius: 32px; }
    .form-group { margin-bottom: 25px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; color: #94A3B8; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .form-input { width: 100%; padding: 18px 24px; background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: #fff; border-radius: 16px; font-size: 16px; transition: 0.3s; }
    .form-input:focus { border-color: #60A5FA; outline: none; box-shadow: 0 0 0 4px rgba(96,165,250,0.15); background: rgba(0,0,0,0.5); }
  `;

  // ==========================================
  // RENDER: CUSTOMER VIEW
  // ==========================================
  if (currentView === 'customer') {
    return (
      <>
        <style>{customerCss}</style>
        
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container nav-wrap">
            <a onClick={() => scrollTo('home')} className="logo"><div className="logo-dot">N</div> <div>{config.title.split(' ')[0]}<span style={{fontWeight:300}}>{config.title.split(' ')[1] || 'TECH'}</span></div></a>
            <div className="nav-links hidden md:flex">
              <a onClick={() => scrollTo('concept')}>ไฮไลท์</a>
              <a onClick={() => scrollTo('speakers')}>วิทยากร</a>
              <a onClick={() => scrollTo('schedule')}>กำหนดการ</a>
              <a onClick={() => scrollTo('faq')}>FAQ</a>
            </div>
            <button className="btn btn-primary" style={{padding: '12px 28px'}} onClick={() => scrollTo('register')}>สำรองที่นั่ง</button>
          </div>
        </nav>

        <section id="home" className="hero" style={{ backgroundImage: `url(${config.heroBg})` }}>
          <div className="container">
            <div className="hero-content reveal">
              <div className="countdown-wrap delay-1">
                <div className="cd-box"><div className="cd-num">{timeLeft.days}</div><div className="cd-label">Days</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.hours}</div><div className="cd-label">Hours</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.minutes}</div><div className="cd-label">Mins</div></div>
                <div className="cd-box"><div className="cd-num">{timeLeft.seconds}</div><div className="cd-label">Secs</div></div>
              </div>
              <h1 className="glow-text">{config.title} <br/><span className={typedText.length < 35 ? "typewriter-text" : ""}>{typedText}</span></h1>
              <p style={{ color: '#CBD5E1', fontSize: '20px', maxWidth: '700px', marginBottom: '50px', lineHeight: 1.6 }} className="delay-1">{config.aboutText}</p>
              
              <div className="flex flex-wrap items-center gap-6 delay-2" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <button className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '18px' }} onClick={() => scrollTo('register')}>ลงทะเบียนเข้าร่วมงาน ➔</button>
                <div style={{ display: 'flex', gap: '15px', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '25px' }}>
                  <div style={{ color: '#60A5FA', fontSize: '24px' }}>📅</div>
                  <div><div style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>{config.date}</div><div style={{ color: '#94A3B8', fontSize: '13px' }}>{config.location}</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <div style={{ background: 'linear-gradient(90deg, #1E293B, #0F172A)', padding: '40px 0', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
          <div className="container grid-4" style={{ textAlign: 'center' }}>
            <div><div style={{ fontSize: '40px', fontWeight: 900, color: '#fff' }}>2,500+</div><div style={{ color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tech Professionals</div></div>
            <div><div style={{ fontSize: '40px', fontWeight: 900, color: '#60A5FA' }}>4</div><div style={{ color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Main Tracks</div></div>
            <div><div style={{ fontSize: '40px', fontWeight: 900, color: '#34D399' }}>20+</div><div style={{ color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Expert Speakers</div></div>
            <div><div style={{ fontSize: '40px', fontWeight: 900, color: '#F472B6' }}>100%</div><div style={{ color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Future Ready</div></div>
          </div>
        </div>

        <section id="concept" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">SUMMIT TRACKS</div>
              <h2 className="sec-title">4 แกนเทคโนโลยีพลิกโลก</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4 reveal delay-1">
              <div className="concept-card glass glow-box"><div className="concept-icon text-blue-500">🤖</div><h3 className="text-xl font-bold text-white mb-3">Artificial Intelligence</h3><p className="text-sm text-slate-400">Generative AI, LLMs และการประยุกต์ใช้ในระดับ Enterprise</p></div>
              <div className="concept-card glass glow-box delay-1"><div className="concept-icon text-cyan-500" style={{ animationDelay: '0.5s' }}>☁️</div><h3 className="text-xl font-bold text-white mb-3">Cloud & DevOps</h3><p className="text-sm text-slate-400">สถาปัตยกรรมระบบคลาวด์ยุคใหม่ที่รวดเร็วและปลอดภัยสูง</p></div>
              <div className="concept-card glass glow-box delay-2"><div className="concept-icon text-emerald-500" style={{ animationDelay: '1s' }}>🔒</div><h3 className="text-xl font-bold text-white mb-3">Cybersecurity</h3><p className="text-sm text-slate-400">รับมือภัยคุกคามไซเบอร์และมาตรฐานความปลอดภัยข้อมูล</p></div>
              <div className="concept-card glass glow-box delay-3"><div className="concept-icon text-pink-500" style={{ animationDelay: '1.5s' }}>🚀</div><h3 className="text-xl font-bold text-white mb-3">Future Tech & Web3</h3><p className="text-sm text-slate-400">นวัตกรรมล้ำอนาคตที่กำลังเปลี่ยนรูปแบบธุรกิจดิจิทัล</p></div>
            </div>
          </div>
        </section>

        <section id="speakers" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">KEYNOTE SPEAKERS</div>
              <h2 className="sec-title">พบกับวิทยากรระดับแถวหน้า</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4">
              {config.speakers?.map((speaker, i) => (
                <div key={speaker.id} className={`speaker-card glass glow-box reveal delay-${i%4}`} onClick={() => setSelectedSpeaker(speaker)}>
                  <div className="speaker-img-wrap"><img src={speaker.img} alt={speaker.name} className="speaker-img" /><span className="speaker-tag" style={{ background: speaker.color }}>{speaker.tag}</span></div>
                  <div><h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{speaker.name}</h3><p style={{ fontSize: '13px', color: '#60A5FA', fontWeight: 600, letterSpacing: '0.5px' }}>{speaker.role}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">EVENT SCHEDULE</div>
              <h2 className="sec-title">กำหนดการงานสัมมนา</h2>
              <div className="sec-line"></div>
            </div>
            <div className="timeline-wrap reveal delay-1">
              {config.schedule?.map((s) => (
                <div key={s.id} className="time-card glass glow-box">
                  <div className="time-dot" style={{ borderColor: s.color }}></div>
                  <div className="time-left"><div className="time-text" style={{ color: s.color }}>{s.time}</div></div>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '800', color: s.color, background: s.color+'20', padding: '6px 14px', borderRadius: '50px', marginBottom: '12px', letterSpacing: '1px' }}>{s.tag}</div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee Sponsors */}
        <div style={{ backgroundImage: `url(${config.sponsorBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', position: 'relative', padding: '80px 0', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.95)' }}></div>
          <div className="container text-center reveal" style={{ position: 'relative', zIndex: 1, marginBottom: '50px' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 800 }}>TRUSTED BY GLOBAL INNOVATORS</h3>
            <div className="sec-line" style={{ marginTop: '20px' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', animation: 'marquee 30s linear infinite' }}>
              {config.sponsors?.map(s => <div key={s.id} style={{ fontSize: '32px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', margin: '0 50px', textTransform: 'uppercase', letterSpacing: '2px' }}>{s.name}</div>)}
              {config.sponsors?.map(s => <div key={s.id+'dup'} style={{ fontSize: '32px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', margin: '0 50px', textTransform: 'uppercase', letterSpacing: '2px' }}>{s.name}</div>)}
            </div>
          </div>
        </div>

        <section id="register" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">SECURE YOUR SEAT</div>
              <h2 className="sec-title">เลือกระดับการเข้าร่วมงาน</h2>
              <div className="sec-line"></div>
            </div>

            <div className="grid-3 reveal delay-1" style={{ marginBottom: '80px', alignItems: 'end' }}>
              {config.tickets?.map(ticket => (
                <label key={ticket.id} style={{ display: 'block' }}>
                  <input type="radio" name="ticketId" className="ticket-radio hidden" value={ticket.id} checked={String(formData.ticketId) === String(ticket.id)} onChange={handleInputChange} />
                  <div className="ticket-card glass glow-box" style={ticket.type === 'vip' ? { transform: 'scale(1.05)', background: 'linear-gradient(180deg, rgba(37,99,235,0.1) 0%, rgba(15,23,42,0.8) 100%)', borderColor: '#3B82F6' } : {}}>
                    {ticket.badge && <div className="ticket-badge" style={ticket.type === 'vip' ? { background: 'linear-gradient(90deg, #3B82F6, #06B6D4)', color: '#fff', border: 'none' } : {}}>{ticket.badge}</div>}
                    <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', textAlign: 'center' }}>{ticket.name}</h3>
                    <div style={{ fontSize: '56px', fontWeight: '900', color: ticket.type === 'vip' ? '#60A5FA' : '#fff', margin: '20px 0 30px', textAlign: 'center', lineHeight: 1 }}>{Number(ticket.price).toLocaleString()} <span style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 600 }}>THB</span></div>
                    <div style={{ flex: 1, marginBottom: '30px' }}>
                      {ticket.features.split('\n').map((f, i) => (
                        <div key={i} style={{ padding: '12px 0', display: 'flex', gap: '15px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '15px', color: '#CBD5E1' }}>
                          <span style={{ color: ticket.type === 'vip' ? '#60A5FA' : '#34D399', fontWeight: 800 }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <div className="btn" style={{ width: '100%', background: String(formData.ticketId) === String(ticket.id) ? 'var(--primary)' : 'rgba(255,255,255,0.05)' }}>
                      {String(formData.ticketId) === String(ticket.id) ? 'เลือกบัตรนี้แล้ว' : 'เลือกบัตรนี้'}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-box glass reveal">
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '40px', color: '#fff', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 10px 20px rgba(37,99,235,0.4)' }}>✍️</span> กรอกข้อมูลส่วนตัว
              </h3>
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group mb-0"><label>ชื่อ-นามสกุล *</label><input type="text" name="name" className="form-input" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" /></div>
                  <div className="form-group mb-0"><label>อีเมล (รับ E-Ticket) *</label><input type="email" name="email" className="form-input" required value={formData.email} onChange={handleInputChange} placeholder="john@company.com" /></div>
                </div>
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div className="form-group mb-0"><label>เบอร์โทรศัพท์ *</label><input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleInputChange} placeholder="089-XXX-XXXX" /></div>
                  <div className="form-group mb-0"><label>บริษัท / องค์กร *</label><input type="text" name="company" className="form-input" required value={formData.company} onChange={handleInputChange} placeholder="Tech Corp Co., Ltd." /></div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border)', padding: '40px', borderRadius: '24px', marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                  <div>
                    <div style={{ fontSize:'12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#60A5FA', marginBottom: '8px' }}>🎟️ {selectedTicket?.name || '-'} (1 ท่าน)</div>
                    <div style={{ color: '#94A3B8', fontSize: '15px' }}>Subtotal: {subtotal.toLocaleString()} ฿ | VAT 7%: {vat.toLocaleString()} ฿</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Total Amount</div>
                      <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', lineHeight: 1 }}>{total.toLocaleString()} <span style={{ fontSize: '16px', fontWeight: 500 }}>฿</span></div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '16px' }} disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : 'ยืนยันการชำระเงิน'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section section-alt">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="sec-header reveal">
              <h2 className="sec-title">คำถามที่พบบ่อย (FAQ)</h2>
              <div className="sec-line"></div>
            </div>
            <div className="reveal delay-1">
              {config.faqs?.map(faq => (
                <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}>
                  <div className="faq-q">{faq.q} <span>{activeFaq === faq.id ? '−' : '+'}</span></div>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ background: '#020617', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px', marginBottom: '40px' }}>
            <div>
              <div className="logo" style={{ marginBottom: '20px' }}><div className="logo-dot" style={{ width: 24, height: 24, fontSize: 14 }}>N</div> {config.title}</div>
              <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '300px', lineHeight: 1.6 }}>{config.aboutText.substring(0, 80)}...</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px' }}>Contact Us</h4>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '10px' }}>✉️ {config.contactEmail}</p>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>📞 {config.contactPhone}</p>
            </div>
          </div>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '12px', color: '#64748B' }}>© 2026 {config.title}. All rights reserved.</p>
            <div onClick={() => setCurrentView('admin')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '11px', cursor: 'pointer', fontWeight: 700, transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color='#60A5FA'} onMouseOut={e => e.currentTarget.style.color='#334155'}>
              ⚙️ SYSTEM ADMIN
            </div>
          </div>
        </footer>

        {/* Modals remain mostly the same but styled better */}
        {selectedSpeaker && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setSelectedSpeaker(null)}>
            <div className="glass" style={{ borderRadius: '32px', width: '100%', maxWidth: '900px', display: 'flex', overflow: 'hidden', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedSpeaker(null)} style={{ position:'absolute', top:'20px', right:'20px', background:'rgba(255,255,255,0.1)', border:'none', width: '40px', height: '40px', borderRadius: '50%', color:'#fff', cursor:'pointer', zIndex:10 }}>✕</button>
              <div style={{ flex: '1', minHeight: '400px' }}><img src={selectedSpeaker.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="speaker" /></div>
              <div style={{ flex: '1.2', padding: '60px' }}>
                <span style={{ display: 'inline-block', background: selectedSpeaker.color+'20', color: selectedSpeaker.color, padding: '6px 16px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', marginBottom: '20px' }}>{selectedSpeaker.tag}</span>
                <h3 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 10px', color: '#fff', letterSpacing: '-1px' }}>{selectedSpeaker.name}</h3>
                <div style={{ fontSize: '16px', color: '#94A3B8', fontWeight: '500', marginBottom: '30px' }}>{selectedSpeaker.role}</div>
                <div style={{ width: '40px', height: '2px', background: 'var(--primary)', marginBottom: '30px' }}></div>
                <p style={{ color: '#CBD5E1', lineHeight: '1.8', fontSize: '15px' }}>{selectedSpeaker.desc}</p>
              </div>
            </div>
          </div>
        )}

        {ticketModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }}>
            <div className="glass glow-box" style={{ borderRadius: '32px', width: '100%', maxWidth: '450px', padding: '50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}></div>
              <div style={{ width: '60px', height: '60px', background: 'rgba(52, 211, 153, 0.1)', color: '#34D399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 20px' }}>✓</div>
              <h2 style={{ marginBottom: '10px', color: '#fff', fontSize: '28px', fontWeight: 900 }}>Registration Success!</h2>
              <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '30px' }}>ระบบส่ง E-Ticket ไปยังอีเมลของท่านแล้ว</p>
              
              <div style={{ background: '#fff', padding: '20px', borderRadius: '24px', display: 'inline-block', margin: '0 auto 30px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}><img src={ticketModal.qrUrl} alt="QR" width="180" style={{ display: 'block' }} /></div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '15px', marginBottom: '30px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{ticketModal.name}</div>
                <div style={{ fontSize: '13px', color: '#60A5FA', fontWeight: 600, marginTop: '5px' }}>{ticketModal.tier}</div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setTicketModal({ isOpen: false, name: '', tier: '', qrUrl: '' })}>ปิดหน้าต่าง</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN VIEW (Tailwind UI Dashboard)
  // ==========================================
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30">
        
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => setCurrentView('customer')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/50 ring-2 ring-slate-800">N</div>
            <div>
              <h1 className="font-extrabold text-white text-lg tracking-tight leading-none">Admin Panel</h1>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Online</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4">Core Platform</div>
            <button onClick={() => setAdminTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/30 shadow-inner' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">📊</span> Overview Dashboard
            </button>
            <button onClick={() => setAdminTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'users' ? 'bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/30 shadow-inner' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">👥</span> Attendees ({registrations.length})
            </button>
            
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4 mt-8">Content Manager</div>
            <button onClick={() => setAdminTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'settings' ? 'bg-slate-800 text-white ring-1 ring-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">⚙️</span> General Config
            </button>
            <button onClick={() => setAdminTab('schedule')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'schedule' ? 'bg-slate-800 text-white ring-1 ring-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">📅</span> Agenda Schedule
            </button>
            <button onClick={() => setAdminTab('speakers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'speakers' ? 'bg-slate-800 text-white ring-1 ring-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">🎤</span> Keynote Speakers
            </button>
            <button onClick={() => setAdminTab('tickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${adminTab === 'tickets' ? 'bg-slate-800 text-white ring-1 ring-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="text-lg">🎟️</span> Ticket Tiers
            </button>
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <button onClick={() => setCurrentView('customer')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-all border border-slate-700 hover:border-slate-600 shadow-md">
              ← Return to Live Site
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-[#020617] relative">
          {/* Background Glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          {adminTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Real-time Dashboard</h2>
                  <p className="text-slate-400 text-sm mt-1">อัปเดตข้อมูลการลงทะเบียนและรายได้แบบสดๆ</p>
                </div>
                <button onClick={() => syncWithGoogleSheet()} disabled={isSyncing} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2 disabled:opacity-50 ring-1 ring-blue-500/50">
                  <span className={isSyncing ? "animate-spin" : ""}>🔄</span> {isSyncing ? "Syncing Data..." : "Force Sync Now"}
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-110 transition-transform">👥</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Attendees</p>
                  <div className="text-4xl font-black text-white">{registrations.length}</div>
                  <div className="text-xs text-emerald-400 font-semibold mt-2">↑ +12% from last week</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-110 transition-transform">💰</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Revenue</p>
                  <div className="text-4xl font-black text-emerald-400">฿{totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 font-medium mt-2">Gross Sales (THB)</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-110 transition-transform">👁️</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Page Views</p>
                  <div className="text-4xl font-black text-white">{pageViews.toLocaleString()}</div>
                  <div className="text-xs text-cyan-400 font-semibold mt-2">Simulated Data</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-110 transition-transform">🎯</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Conversion Rate</p>
                  <div className="text-4xl font-black text-pink-400">{conversionRate}%</div>
                  <div className="text-xs text-slate-400 font-medium mt-2">Avg. Industry: 2.5%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ticket Dist */}
                <div className="lg:col-span-1 bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-6">Sales by Ticket Tier</h3>
                  <div className="space-y-6">
                    {ticketStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-300">{t.name}</span>
                          <span className="text-white">{t.count} <span className="text-slate-500 font-normal">({t.percent}%)</span></span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div className={`h-full rounded-full transition-all duration-1000 ${i===0?'bg-gradient-to-r from-blue-600 to-cyan-400':i===1?'bg-gradient-to-r from-emerald-600 to-teal-400':'bg-gradient-to-r from-pink-600 to-purple-400'}`} style={{ width: `${t.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Logs */}
                <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    <button onClick={() => setAdminTab('users')} className="text-sm font-bold text-blue-400 hover:text-blue-300">View All →</button>
                  </div>
                  {registrations.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm py-12 border-2 border-dashed border-slate-800 rounded-xl">
                      <span className="text-4xl mb-3">📭</span> ไม่มีข้อมูลการลงทะเบียน
                    </div>
                  ) : (
                    <div className="space-y-3 flex-1">
                      {registrations.slice(0, 5).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-800 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase ring-1 ring-slate-700">{r.name.charAt(0)}</div>
                            <div>
                              <div className="font-bold text-white text-sm">{r.name}</div>
                              <div className="text-xs text-slate-400">{r.company || r.email}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 uppercase tracking-wider mb-1">{r.ticketName}</span>
                            <div className="text-sm font-black text-emerald-400">฿{Number(r.totalPaid).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {adminTab === 'users' && (
             <div className="max-w-6xl mx-auto space-y-6">
               <h2 className="text-3xl font-black text-white tracking-tight mb-6">Attendee Management</h2>
               <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                 {registrations.length === 0 ? (
                   <div className="text-center py-20 text-slate-500 text-sm">ยังไม่มีข้อมูลผู้เข้าร่วมงานในระบบ</div>
                 ) : (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                       <thead>
                         <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                           <th className="py-5 px-6">Attendee Info</th>
                           <th className="py-5 px-6">Contact</th>
                           <th className="py-5 px-6">Ticket / Pass</th>
                           <th className="py-5 px-6">Amount</th>
                           <th className="py-5 px-6 text-center">Actions</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800/50 text-sm">
                         {registrations.map(r => (
                           <tr key={r.id} className="hover:bg-slate-800/30 transition-all">
                             {editingUserId === r.id ? (
                               <>
                                 <td className="py-4 px-6 space-y-2">
                                   <input className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} placeholder="ชื่อ" />
                                   <input className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" value={editUserForm.company} onChange={e => setEditUserForm({...editUserForm, company: e.target.value})} placeholder="องค์กร" />
                                 </td>
                                 <td className="py-4 px-6 space-y-2">
                                   <input className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" value={editUserForm.email} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} placeholder="อีเมล" />
                                   <input className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" value={editUserForm.phone} onChange={e => setEditUserForm({...editUserForm, phone: e.target.value})} placeholder="เบอร์โทร" />
                                 </td>
                                 <td className="py-4 px-6"><span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-400">{r.ticketName}</span></td>
                                 <td className="py-4 px-6 font-bold text-emerald-400">฿{Number(r.totalPaid).toLocaleString()}</td>
                                 <td className="py-4 px-6 text-center space-x-2 whitespace-nowrap">
                                   <button onClick={saveUserEdit} className="px-4 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-bold transition-all">Save</button>
                                   <button onClick={() => setEditingUserId(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all">Cancel</button>
                                 </td>
                               </>
                             ) : (
                               <>
                                 <td className="py-4 px-6">
                                   <div className="font-bold text-white text-base">{r.name}</div>
                                   <div className="text-xs text-slate-400 font-medium mt-1">{r.company || '-'}</div>
                                 </td>
                                 <td className="py-4 px-6">
                                   <div className="text-slate-300">{r.email}</div>
                                   <div className="text-xs text-slate-500 mt-1">{r.phone}</div>
                                 </td>
                                 <td className="py-4 px-6">
                                   <span className="px-3 py-1.5 rounded-md text-[11px] font-bold bg-blue-900/30 text-blue-400 border border-blue-800/50 uppercase tracking-wider">{r.ticketName}</span>
                                 </td>
                                 <td className="py-4 px-6 font-black text-emerald-400 text-base">฿{Number(r.totalPaid).toLocaleString()}</td>
                                 <td className="py-4 px-6 text-center space-x-2 whitespace-nowrap">
                                   <button onClick={() => startEditUser(r)} className="p-2 text-slate-400 hover:text-blue-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all" title="Edit">✏️</button>
                                   <button onClick={() => deleteUser(r.id)} className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all" title="Delete">🗑️</button>
                                 </td>
                               </>
                             )}
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 )}
               </div>
             </div>
           )}

           {/* The rest of the Settings/Schedule/Speakers Tabs would follow standard Tailwind form styling similar to previous version, but utilizing bg-slate-900/80 backdrop-blur. For brevity and single-file completeness, here is a polished block for Settings. */}
           {adminTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-white tracking-tight mb-6">General Configuration</h2>
              <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event Title</label>
                    <input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Subtitle / Tagline</label>
                    <input type="text" value={config.subtitle} onChange={(e) => setConfig({...config, subtitle: e.target.value})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event Date (Text Display)</label>
                    <input type="text" value={config.date} onChange={(e) => setConfig({...config, date: e.target.value})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Countdown Target (ISO Format)</label>
                    <input type="datetime-local" value={config.targetDate.slice(0,16)} onChange={(e) => setConfig({...config, targetDate: e.target.value + ":00"})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-blue-400 focus:ring-1 focus:ring-blue-500 outline-none transition-all [color-scheme:dark]" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Location / Venue</label>
                    <input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">About / Description</label>
                    <textarea value={config.aboutText} onChange={(e) => setConfig({...config, aboutText: e.target.value})} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all" rows="4"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'speakers' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-white tracking-tight mb-6">Keynote Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.speakers?.map(speaker => (
                  <div key={speaker.id} className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl relative">
                    <button onClick={() => removeArrayItem('speakers', speaker.id)} className="absolute top-4 right-4 p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all">🗑️</button>
                    <div className="flex gap-4 items-start mb-4">
                      <img src={speaker.img} className="w-20 h-20 rounded-xl object-cover ring-2 ring-slate-800" alt="speaker" />
                      <div className="flex-1 space-y-3">
                        <input type="text" value={speaker.name} onChange={(e) => handleArrayChange('speakers', speaker.id, 'name', e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-bold text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Name" />
                        <input type="text" value={speaker.role} onChange={(e) => handleArrayChange('speakers', speaker.id, 'role', e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Role/Company" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                         <input type="text" value={speaker.tag} onChange={(e) => handleArrayChange('speakers', speaker.id, 'tag', e.target.value)} className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white uppercase focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Tag (e.g. AI)" />
                         <input type="color" value={speaker.color} onChange={(e) => handleArrayChange('speakers', speaker.id, 'color', e.target.value)} className="w-12 h-9 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer p-0.5" />
                      </div>
                      <textarea value={speaker.desc} onChange={(e) => handleArrayChange('speakers', speaker.id, 'desc', e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 focus:ring-1 focus:ring-blue-500 outline-none" rows="3" placeholder="Biography"></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSpeaker} className="min-h-[300px] border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-slate-400 hover:text-blue-400 rounded-2xl font-bold text-sm transition-all flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">+</span> Add New Speaker
                </button>
              </div>
            </div>
          )}

          {adminTab === 'schedule' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-white tracking-tight mb-6">Agenda Schedule</h2>
              <div className="space-y-4">
                {config.schedule?.map(s => (
                  <div key={s.id} className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row gap-6 relative group">
                    <button onClick={() => removeArrayItem('schedule', s.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all">🗑️</button>
                    <div className="w-full md:w-32 space-y-3">
                      <input type="text" value={s.time} onChange={(e) => handleArrayChange('schedule', s.id, 'time', e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-center font-black text-xl text-white focus:ring-1 focus:ring-blue-500 outline-none" />
                      <input type="color" value={s.color} onChange={(e) => handleArrayChange('schedule', s.id, 'color', e.target.value)} className="w-full h-8 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer p-0.5" />
                    </div>
                    <div className="flex-1 space-y-3 pr-8">
                      <div className="flex gap-3">
                        <input type="text" value={s.tag} onChange={(e) => handleArrayChange('schedule', s.id, 'tag', e.target.value)} className="w-32 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 uppercase focus:ring-1 focus:ring-blue-500 outline-none" placeholder="TAG" />
                        <input type="text" value={s.title} onChange={(e) => handleArrayChange('schedule', s.id, 'title', e.target.value)} className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Session Title" />
                      </div>
                      <textarea value={s.desc} onChange={(e) => handleArrayChange('schedule', s.id, 'desc', e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 focus:ring-1 focus:ring-blue-500 outline-none" rows="2" placeholder="Description"></textarea>
                    </div>
                  </div>
                ))}
                <button onClick={addSchedule} className="w-full py-6 border-2 border-dashed border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 rounded-2xl font-bold text-sm transition-all bg-slate-900/50">
                  + Add Session Slot
                </button>
              </div>
            </div>
          )}

          {adminTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-white tracking-tight mb-6">Ticket Tiers Config</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.tickets?.map(ticket => (
                  <div key={ticket.id} className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-4">
                    <input type="text" value={ticket.name} onChange={(e) => handleArrayChange('tickets', ticket.id, 'name', e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-white focus:ring-1 focus:ring-blue-500 outline-none text-center" />
                    <div className="relative">
                       <span className="absolute left-4 top-3 text-slate-500 font-bold">฿</span>
                       <input type="number" value={ticket.price} onChange={(e) => handleArrayChange('tickets', ticket.id, 'price', e.target.value)} className="w-full p-3 pl-8 bg-slate-950 border border-slate-800 rounded-xl text-2xl font-black text-emerald-400 focus:ring-1 focus:ring-blue-500 outline-none text-center" />
                    </div>
                    <input type="text" value={ticket.badge || ''} onChange={(e) => handleArrayChange('tickets', ticket.id, 'badge', e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-blue-400 uppercase text-center outline-none" placeholder="Badge (e.g. VIP)" />
                    <textarea value={ticket.features} onChange={(e) => handleArrayChange('tickets', ticket.id, 'features', e.target.value)} className="w-full flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 focus:ring-1 focus:ring-blue-500 outline-none leading-relaxed" rows="6"></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}