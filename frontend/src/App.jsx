import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 1. CONFIG & BACKEND SETUP (TECH THEME)
// ==========================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbzopLs_wCM82zqR_9isoTUusY4Vji-6U8iaSZIPyw49b6d3TZehQnTNp2dsnWd8XEzf/exec";

const defaultConfig = {
  title: "NEXTGEN TECH",
  subtitle: "Summit 2026",
  date: "15 พฤศจิกายน 2026",
  location: "True Digital Park Bangkok (ฮอลล์ 1 ชั้น 6)",
  aboutText: "เวทีเทคโนโลยีและนวัตกรรมระดับภูมิภาคที่รวบรวมผู้นำความคิดด้าน AI, Cloud Computing, และ Cybersecurity มาร่วมเจาะลึกอนาคตดิจิทัลเพื่อขับเคลื่อนธุรกิจและนักพัฒนาไทยสู่เวทีโลกใน 1 วันเต็ม",
  contactEmail: "contact@nextgentech2026.com",
  contactPhone: "097-265-3945",
  
  heroBg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  marqueeBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
  sponsorBg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",

  speakers: [
    { id: 1, name: "ดร. ธนวัฒน์ วongsา", role: "AI Research Director, TechCorp", tag: "AI & ML", color: "#3B82F6", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", desc: "เจาะลึกวิวัฒนาการ Generative AI และการนำ Large Language Models มาปรับใช้ในองค์กรยุคใหม่" },
    { id: 2, name: "คุณศุภรดา กุล ภัทรพงศ์", role: "Cloud Solutions Architect", tag: "CLOUD INFRA", color: "#F97316", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", desc: "แนวทางการออกแบบระบบ Multi-Cloud ที่มีความเสถียรสูงและรองรับผู้ใช้งานหลักล้าน" },
    { id: 3, name: "คุณอิทธิฤทธิ์ พงษ์ไพบูลย์", role: "Cybersecurity Strategist", tag: "SECURITY", color: "#10B981", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", desc: "รับมือกับภัยคุกคามไซเบอร์ยุค AI และมาตรการป้องกันข้อมูลรั่วไหลในระดับองค์กร" }
  ],
  
  sponsors: [
    { id: 1, name: "GOOGLE CLOUD" }, { id: 2, name: "AWS THAILAND" },
    { id: 3, name: "MICROSOFT" }, { id: 4, name: "TRUE DIGITAL" }, { id: 5, name: "DEVTOTHEMOON" }
  ],

  tickets: [
    { id: 1, name: "Early Bird Dev", price: 1500, type: "early", badge: "🔥 BEST VALUE", features: "สิทธิ์เข้าฟัง Keynote ทุกเซสชัน\nเข้าร่วม Tech Workshop เชิงปฏิบัติการ\nอาหารกลางวันแบบบุฟเฟต์ & Coffee Break\nรับ Digital E-Certificate" },
    { id: 2, name: "Standard Tech Pass", price: 2800, type: "regular", badge: "POPULAR", features: "สิทธิ์เข้าฟัง Keynote ทุกเซสชัน\nเข้าร่วม Tech Workshop เชิงปฏิบัติการ\nอาหารกลางวันแบบบุฟเฟต์ & Coffee Break\nรับ Digital E-Certificate" },
    { id: 3, name: "VIP Innovator Pass", price: 4500, type: "vip", badge: "👑 VIP EXPERIENCE", features: "สิทธิพิเศษบัตร Standard Pass\nที่นั่ง Reserved Seat แถวหน้าสุด\nสิทธิ์ร่วม Networking Dinner กับวิทยากร\nชุดของที่ระลึก Tech Gadget Limited" }
  ],

  schedule: [
    { id: 1, time: "09:00", title: "Keynote: The Next Era of Artificial Intelligence", desc: "ภาพรวมทิศทางเทคโนโลยีโลกในปี 2026 และผลกระทบต่ออุตสาหกรรมดิจิทัล", tag: "OPENING KEYNOTE", color: "#F97316" },
    { id: 2, time: "10:45", title: "Panel: Scalable Cloud Architectures & DevOps", desc: "เสวนาวิสัยทัศน์การบริหารจัดการโครงสร้างพื้นฐานไอทีเพื่อความยืดหยุ่นสูงสุด", tag: "PANEL DISCUSSION", color: "#3B82F6" },
    { id: 3, time: "13:30", title: "Deep Dive Workshops (AI, Security, Cloud)", desc: "แยกย้ายเข้าห้องปฏิบัติการเฉพาะทางเพื่อทดลองเขียนโค้ดและทดสอบระบบจริง", tag: "MASTERCLASS", color: "#10B981" }
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [adminTab, setAdminTab] = useState('dashboard');
  
  const [config, setConfig] = useState(() => {
    try { const saved = localStorage.getItem('nextGenTechConfigV1'); return saved ? JSON.parse(saved) : defaultConfig; } 
    catch { return defaultConfig; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try { const saved = localStorage.getItem('nextGenTechRegisV1'); return saved ? JSON.parse(saved) : []; } 
    catch { return []; }
  });

  const pageViews = useMemo(() => registrations.length > 0 ? registrations.length * 14 + 1250 : 1250, [registrations.length]);

  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ticketModal, setTicketModal] = useState({ isOpen: false, name: '', tier: '', qrUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString('th-TH'));
  const [typedText, setTypedText] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', role: '', ticketId: config?.tickets?.[0]?.id || ''
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  useEffect(() => { localStorage.setItem('nextGenTechConfigV1', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('nextGenTechRegisV1', JSON.stringify(registrations)); }, [registrations]);

  useEffect(() => {
    if (currentView !== 'customer') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, config]);

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
    } catch (error) {
      console.error("Sheet API Error:", error);
    }

    setRegistrations(prev => [newRegis, ...prev]);
    const qrData = encodeURIComponent(`NextGenTech|${formData.name}|${selectedTicket.name}|${Date.now()}`);
    const qrUrl = `https://quickchart.io/qr?text=${qrData}&size=200&margin=1`;
    
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
          name: r.name || r.Name || '',
          email: r.email || r.Email || '',
          phone: r.phone || r.Phone || '',
          company: r.company || r.Company || '',
          ticketName: r.ticketName || r.TicketName || r.ticket || '',
          ticketId: String(r.ticketId || r.TicketId || ''),
          totalPaid: Number(r.totalPaid || r.TotalPaid || r.total || 0),
          timestamp: r.timestamp || r.Timestamp || ''
        }));
        
        const cleanData = formattedData.filter(r => r.name !== '');
        setRegistrations(cleanData);
        setLastSyncTime(new Date().toLocaleTimeString('th-TH'));
      }
    } catch (error) {
      console.error("Sync Error:", error);
    }
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

  // Styles ฝั่งลูกค้า (ปรับแต่งให้เน้นโทนเทคโนโลยี ทันสมัย และตั้ง Timeline ไว้ตรงกลาง)
  const customerCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Kanit:wght@300;400;500;600;700&display=swap');
    :root { --primary: #2563EB; --primary-dark: #1D4ED8; --bg-main: #0F172A; --bg-card: #1E293B; --text-light: #F8FAFC; --text-muted: #94A3B8; --border: #334155; --green: #10B981; --amber: #F59E0B; }
    body { font-family: 'Kanit', 'Inter', sans-serif; background: var(--bg-main); color: var(--text-light); overflow-x: hidden; }
    
    .reveal { opacity: 0; transform: translateY(40px) scale(0.98); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.is-visible { opacity: 1; transform: translateY(0) scale(1); }
    @keyframes blinkCursor { from { border-right-color: var(--primary); } to { border-right-color: transparent; } }
    .typewriter-text { border-right: 2px solid var(--primary); white-space: nowrap; overflow: hidden; animation: blinkCursor 0.7s steps(44) infinite normal; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 120px 0; position: relative; z-index: 2; border-bottom: 1px solid var(--border); background: #0F172A; }
    .section-alt { background: #0B0F19; }
    .sec-header { text-align: center; margin-bottom: 60px; }
    .sec-badge { display: inline-block; font-size: 11px; font-weight: 700; color: #60A5FA; background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.2); padding: 6px 16px; border-radius: 50px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
    .sec-title { font-size: 42px; font-weight: 700; color: #F8FAFC; margin-bottom: 20px; }
    .sec-line { width: 60px; height: 4px; background: var(--primary); margin: 0 auto; border-radius: 2px; }

    .btn { display: inline-flex; align-items: center; justify-content: center; background: #334155; color: #fff; border: none; padding: 16px 36px; font-size: 14px; font-weight: 700; border-radius: 50px; cursor: pointer; transition: 0.4s; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); }
    .btn-primary { background: linear-gradient(135deg, #2563EB, #3B82F6); box-shadow: 0 8px 20px -4px rgba(37,99,235,0.5); }
    .btn-primary:hover:not(:disabled) { background: linear-gradient(135deg, #1D4ED8, #2563EB); }

    .navbar { position: fixed; top: 0; width: 100%; background: rgba(15,23,42,0.85); backdrop-filter: blur(15px); border-bottom: 1px solid var(--border); z-index: 1000; padding: 15px 0; }
    .nav-wrap { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 22px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .logo-dot { width: 8px; height: 24px; background: var(--primary); border-radius: 4px; box-shadow: 0 0 12px var(--primary); }
    .nav-links { display: flex; gap: 35px; }
    .nav-links a { color: var(--text-muted); font-weight: 600; cursor: pointer; transition: 0.3s; font-size: 15px; }
    .nav-links a:hover { color: #60A5FA; }

    .hero { min-height: 100vh; display: flex; align-items: center; padding-top: 80px; position: relative; background-size: cover; background-position: center; background-attachment: fixed; }
    .hero-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(4px); z-index: 0; }
    .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border: 1px solid rgba(37,99,235,0.4); color: #60A5FA; font-size: 11px; font-weight: 700; border-radius: 50px; margin-bottom: 30px; background: rgba(37,99,235,0.1); }
    .hero-ping { width: 6px; height: 6px; background: #60A5FA; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(96,165,250,0.7); } 70% { box-shadow: 0 0 0 10px rgba(96,165,250,0); } 100% { box-shadow: 0 0 0 0 rgba(96,165,250,0); } }
    .hero h1 { font-size: 64px; line-height: 1.1; margin-bottom: 20px; color: #fff; font-weight: 800; }
    .hero h1 span { color: #60A5FA; display: block; font-size: 40px; font-weight: 600; margin-top: 10px; }

    .marquee-content { display: flex; overflow: hidden; white-space: nowrap; width: 100%; }
    .marquee-track { display: flex; animation: marquee 25s linear infinite; }
    .sponsor-name { font-size: 22px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; }
    .sponsor-dot { color: var(--primary); margin: 0 40px; }

    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    
    .concept-card { background: var(--bg-card); padding: 30px; border-radius: 24px; text-align: center; border: 1px solid var(--border); transition: 0.4s; }
    .concept-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px -10px rgba(37,99,235,0.2); }
    .concept-icon { width: 64px; height: 64px; background: rgba(37,99,235,0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; font-size: 24px; }

    .speaker-card { background: var(--bg-card); border-radius: 32px; padding: 15px; border: 1px solid var(--border); transition: 0.4s; cursor: pointer; }
    .speaker-card:hover { transform: translateY(-10px); border-color: #60A5FA; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
    .speaker-img-wrap { height: 280px; border-radius: 24px; overflow: hidden; position: relative; margin-bottom: 20px; background: #334155; }
    .speaker-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(50%); transition: 0.7s; }
    .speaker-card:hover .speaker-img { filter: grayscale(0%); transform: scale(1.05); }
    .speaker-tag { position: absolute; top: 15px; left: 15px; font-size: 9px; font-weight: 800; color: #fff; padding: 6px 12px; border-radius: 50px; letter-spacing: 2px; }

    /* จัดระเบียบ timeline ให้อยู่ตรงกลางอย่างสวยงาม */
    .timeline-wrap { max-width: 800px; margin: 0 auto; position: relative; padding-left: 40px; border-left: 2px dashed var(--border); }
    .time-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 32px; padding: 30px; display: flex; gap: 30px; align-items: center; margin-bottom: 40px; position: relative; transition: 0.3s; }
    .time-card:hover { transform: translateY(-5px); border-color: #60A5FA; box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
    .time-dot { position: absolute; left: -51px; top: 50%; transform: translateY(-50%); width: 22px; height: 22px; border-radius: 50%; background: var(--primary); border: 4px solid var(--bg-main); box-shadow: 0 0 0 2px var(--border); }
    .time-left { width: 120px; border-left: 4px solid var(--primary); padding-left: 20px; flex-shrink: 0; }
    .time-text { font-size: 36px; font-weight: 900; color: #60A5FA; line-height: 1; }

    .ticket-card { background: var(--bg-card); border-radius: 32px; padding: 40px 30px; border: 1px solid var(--border); transition: 0.4s; position: relative; display: flex; flex-direction: column; text-align: center; }
    .ticket-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--primary); color: #fff; padding: 6px 24px; font-size: 10px; font-weight: 800; border-radius: 50px; letter-spacing: 2px; }
    .ticket-price { font-size: 48px; font-weight: 800; color: #60A5FA; margin: 20px 0 30px; line-height: 1; }
    .ticket-feat { text-align: left; flex: 1; margin-bottom: 30px; font-size: 14px; color: var(--text-muted); }
    .ticket-feat div { padding: 10px 0; display: flex; gap: 12px; align-items: flex-start; }
    .ticket-radio { display: none; }
    .ticket-radio:checked + .ticket-card { border: 2px solid var(--primary); box-shadow: 0 20px 40px rgba(37,99,235,0.3); transform: translateY(-10px); }
    .ticket-vip { background: linear-gradient(135deg, #1E293B, #0F172A); border-color: #3B82F6; }

    .form-box { background: var(--bg-card); padding: 50px; border-radius: 32px; border: 1px solid var(--border); max-width: 800px; margin: 0 auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .form-group { margin-bottom: 25px; text-align: left; }
    .form-group label { display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
    .form-input { width: 100%; padding: 15px 20px; background: #0F172A; border: 1px solid var(--border); color: #fff; border-radius: 16px; font-size: 15px; transition: 0.3s; }
    .form-input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 4px rgba(37,99,235,0.2); }
    
    .modal-overlay { position: fixed; inset: 0; background: rgba(10,13,20,0.85); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 2000; padding: 20px; }
    .modal-content { background: var(--bg-card); color: #fff; border-radius: 32px; width: 100%; max-width: 800px; display: flex; overflow: hidden; position: relative; border: 1px solid var(--border); box-shadow: 0 40px 80px rgba(0,0,0,0.6); }
  `;

  // ==========================================
  // RENDER: CUSTOMER VIEW
  // ==========================================
  if (currentView === 'customer') {
    return (
      <>
        <style>{customerCss}</style>
        
        <nav className="navbar">
          <div className="container nav-wrap">
            <a onClick={() => scrollTo('home')} className="logo"><div className="logo-dot"></div><div>{config.title} <span style={{fontSize:'10px', display:'block', color:'#60A5FA', letterSpacing:'2px'}}>{config.subtitle}</span></div></a>
            <div className="nav-links">
              <a onClick={() => scrollTo('home')}>หน้าแรก</a>
              <a onClick={() => scrollTo('concept')}>ไฮไลท์</a>
              <a onClick={() => scrollTo('speakers')}>วิทยากร</a>
              <a onClick={() => scrollTo('schedule')}>กำหนดการ</a>
            </div>
            <button className="btn btn-primary" onClick={() => scrollTo('register')}>สำรองบัตร</button>
          </div>
        </nav>

        <section id="home" className="hero" style={{ backgroundImage: `url(${config.heroBg || ''})` }}>
          <div className="hero-overlay"></div>
          <div className="container reveal" style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-badge"><div className="hero-ping"></div> ASIA'S PREMIER TECH SUMMIT 2026</div>
            <h1>{config.title} <br/><span className={typedText.length < 38 ? "typewriter-text" : ""}>{typedText}</span></h1>
            <p style={{ color: '#94A3B8', fontSize: '18px', maxWidth: '650px', marginBottom: '40px' }}>{config.aboutText}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => scrollTo('register')}>ลงทะเบียนเข้าร่วมงาน ➔</button>
              <div style={{ fontSize: '14px', fontWeight: '600' }}><div style={{ color: '#fff', fontSize: '16px' }}>{config.date}</div><div style={{ color: '#60A5FA' }}>{config.location}</div></div>
            </div>
          </div>
        </section>

        <div style={{ backgroundImage: `url(${config.marqueeBg || ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative', padding: '15px 0', overflow: 'hidden', color: '#fff', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.94)' }}></div>
          <div className="marquee-content" style={{ position: 'relative', zIndex: 1 }}>
            <div className="marquee-track" style={{ gap: '40px' }}>
              <span style={{ color: '#60A5FA' }}>⚡ EARLY BIRD TICKETS AVAILABLE NOW</span>
              <span style={{ color: '#10B981' }}>LIMITED SEATS FOR AI MASTERCLASS</span>
              <span>NEXTGEN TECH SUMMIT 2026</span>
              <span style={{ color: '#60A5FA' }}>⚡ EARLY BIRD TICKETS AVAILABLE NOW</span>
              <span style={{ color: '#10B981' }}>LIMITED SEATS FOR AI MASTERCLASS</span>
              <span>NEXTGEN TECH SUMMIT 2026</span>
            </div>
          </div>
        </div>

        <section id="concept" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">SUMMIT TRACKS</div>
              <h2 className="sec-title">เจาะลึก 4 เทคโนโลยีพลิกโลก</h2>
              <div className="sec-line"></div>
            </div>
            <div className="grid-4 reveal">
              <div className="concept-card"><div className="concept-icon" style={{ color: '#3B82F6' }}>🤖</div><h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#fff' }}>Artificial Intelligence</h3><p style={{ fontSize: '13px', color: '#94A3B8' }}>Generative AI, LLMs และการประยุกต์ใช้ในระดับ Enterprise</p></div>
              <div className="concept-card"><div className="concept-icon" style={{ color: '#10B981' }}>☁️</div><h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#fff' }}>Cloud & DevOps</h3><p style={{ fontSize: '13px', color: '#94A3B8' }}>สถาปัตยกรรมระบบคลาวด์ยุคใหม่ที่รวดเร็วและปลอดภัยสูง</p></div>
              <div className="concept-card"><div className="concept-icon" style={{ color: '#F59E0B' }}>🔒</div><h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#fff' }}>Cybersecurity</h3><p style={{ fontSize: '13px', color: '#94A3B8' }}>รับมือภัยคุกคามไซเบอร์และมาตรฐานความปลอดภัยข้อมูลระดับสากล</p></div>
              <div className="concept-card"><div className="concept-icon" style={{ color: '#EC4899' }}>🚀</div><h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#fff' }}>Future Tech & Web3</h3><p style={{ fontSize: '13px', color: '#94A3B8' }}>นวัตกรรมล้ำอนาคตที่กำลังเปลี่ยนรูปแบบธุรกิจดิจิทัล</p></div>
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
            <div className="grid-3">
              {config.speakers?.map(speaker => (
                <div key={speaker.id} className="speaker-card reveal" onClick={() => setSelectedSpeaker(speaker)}>
                  <div className="speaker-img-wrap"><img src={speaker.img} alt={speaker.name} className="speaker-img" /><span className="speaker-tag" style={{ background: speaker.color || '#2563EB' }}>{speaker.tag}</span></div>
                  <div style={{ padding: '0 10px 10px' }}><h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '5px' }}>{speaker.name}</h3><p style={{ fontSize: '14px', color: '#60A5FA' }}>{speaker.role}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ส่วนกำหนดการสัมมนา ที่จัดวางอยู่กึ่งกลางอย่างสมบูรณ์ */}
        <section id="schedule" className="section section-alt">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">EVENT SCHEDULE</div>
              <h2 className="sec-title">กำหนดการงานสัมมนา</h2>
              <div className="sec-line"></div>
            </div>
            <div className="timeline-wrap reveal">
              {config.schedule?.map((s, i) => (
                <div key={i} className="time-card">
                  <div className="time-dot" style={{ background: s.color }}></div>
                  <div className="time-left" style={{ borderColor: s.color }}><div className="time-text" style={{ color: s.color }}>{s.time}</div></div>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '800', color: s.color, background: s.color+'20', padding: '4px 12px', borderRadius: '50px', marginBottom: '10px' }}>{s.tag}</div>
                    <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>{s.title}</h3>
                    <p style={{ fontSize: '15px', color: '#94A3B8' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ backgroundImage: `url(${config.sponsorBg || ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative', padding: '50px 0', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.95)' }}></div>
          <div className="container text-center mb-6 reveal" style={{ position: 'relative', zIndex: 1 }}>
            <div className="sec-badge" style={{ color: '#94A3B8' }}>OFFICIAL PARTNERS & SPONSORS</div>
          </div>
          <div className="marquee-content reveal" style={{ position: 'relative', zIndex: 1 }}>
            <div className="marquee-track">
              {config.sponsors?.map(s => <React.Fragment key={s.id}><span className="sponsor-name">{s.name}</span><span className="sponsor-dot">•</span></React.Fragment>)}
            </div>
            <div className="marquee-track">
              {config.sponsors?.map(s => <React.Fragment key={s.id + 'dup'}><span className="sponsor-name">{s.name}</span><span className="sponsor-dot">•</span></React.Fragment>)}
            </div>
          </div>
        </div>

        <section id="register" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-badge">SECURE YOUR SEAT</div>
              <h2 className="sec-title">ลงทะเบียนเข้าร่วมงานสัมมนา</h2>
              <div className="sec-line"></div>
            </div>

            <div className="grid-3 reveal" style={{ marginBottom: '80px' }}>
              {config.tickets?.map(ticket => (
                <label key={ticket.id} style={{ cursor: 'pointer', display: 'block' }}>
                  <input type="radio" name="ticketId" className="ticket-radio" value={ticket.id} checked={String(formData.ticketId) === String(ticket.id)} onChange={handleInputChange} />
                  <div className={`ticket-card ${ticket.type === 'vip' ? 'ticket-vip' : ''}`}>
                    {ticket.badge && <div className="ticket-badge" style={ticket.type === 'vip' ? { background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' } : {}}>{ticket.badge}</div>}
                    <h3 className="ticket-name font-serif" style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{ticket.name}</h3>
                    <div className="ticket-price">{Number(ticket.price).toLocaleString()} <span style={{ fontSize: '16px', color: '#94A3B8' }}>บาท</span></div>
                    <div className="ticket-feat">{ticket.features.split('\n').map((f, i) => <div key={i}><span style={{ color: '#60A5FA' }}>✓</span> {f}</div>)}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-box reveal">
              <h3 style={{ fontSize: '22px', marginBottom: '30px', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                <span style={{ display:'inline-flex', width:'30px', height:'30px', background:'var(--primary)', color:'#fff', borderRadius:'50%', alignItems:'center', justifyContent:'center', fontSize:'14px', marginRight:'10px'}}>1</span> กรอกข้อมูลผู้เข้าร่วมงาน
              </h3>
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                  <div className="form-group"><label>ชื่อ-นามสกุล *</label><input type="text" name="name" className="form-input" required value={formData.name} onChange={handleInputChange} placeholder="ชื่อจริง นามสกุล" /></div>
                  <div className="form-group"><label>อีเมล (รับ E-Ticket) *</label><input type="email" name="email" className="form-input" required value={formData.email} onChange={handleInputChange} placeholder="email@domain.com" /></div>
                </div>
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                  <div className="form-group"><label>เบอร์โทรศัพท์ *</label><input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleInputChange} placeholder="0891234567" /></div>
                  <div className="form-group"><label>บริษัท / องค์กร *</label><input type="text" name="company" className="form-input" required value={formData.company} onChange={handleInputChange} placeholder="ชื่อบริษัทหรือมหาวิทยาลัย" /></div>
                </div>

                <div style={{ background: '#0B0F19', border: '1px solid var(--border)', padding: '40px', borderRadius: '24px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '6px', height: '100%', background: 'var(--primary)' }}></div>
                  <div>
                    <div style={{ fontSize:'10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8' }}>บัตรที่เลือก: {selectedTicket?.name || '-'} (1 ท่าน)</div>
                    <div style={{ fontWeight: '600', color: '#fff' }}>ราคา: {subtotal.toLocaleString()} ฿ | VAT 7%: {vat.toLocaleString()} ฿</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#60A5FA' }}>{total.toLocaleString()} <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: '500' }}>บาท</span></div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'กำลังประมวลผล...' : 'ยืนยันการลงทะเบียน'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer style={{ background: '#0B0F19', padding: '80px 0 40px', color: '#fff', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <div className="logo" style={{ color: '#fff', marginBottom: '15px' }}><div className="logo-dot"></div> NEXTGEN TECH SUMMIT</div>
              <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2026 NextGen Tech Summit. All rights reserved.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>{config.contactEmail}</p>
              <div onClick={() => setCurrentView('admin')} style={{ display: 'inline-block', marginTop: '20px', color: '#64748B', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}>⚙️ ADMIN LOGIN</div>
            </div>
          </div>
        </footer>

        {selectedSpeaker && (
          <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedSpeaker(null)} style={{ position:'absolute', top:'20px', right:'20px', background:'none', border:'none', fontSize:'24px', color:'#fff', cursor:'pointer', zIndex:10 }}>✕</button>
              <div style={{ flex: '1', minHeight: '350px' }}><img src={selectedSpeaker.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="speaker" /></div>
              <div style={{ flex: '1.2', padding: '50px' }}>
                <span className="speaker-tag" style={{ position: 'static', background: selectedSpeaker.color, color: '#fff' }}>{selectedSpeaker.tag}</span>
                <div style={{ fontSize: '10px', color: '#60A5FA', fontWeight: '700', letterSpacing: '2px', marginTop: '20px', marginBottom: '5px' }}>{selectedSpeaker.role}</div>
                <h3 style={{ fontSize: '32px', margin: '0 0 20px', color: '#fff' }}>{selectedSpeaker.name}</h3>
                <p style={{ color: '#94A3B8', lineHeight: '1.8', fontSize: '14px' }}>{selectedSpeaker.desc}</p>
              </div>
            </div>
          </div>
        )}

        {ticketModal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px', flexDirection: 'column', textAlign: 'center', padding: '40px', background: '#1E293B' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'var(--primary)' }}></div>
              <h2 style={{ marginBottom: '5px', color: '#fff', fontSize: '28px' }}>NextGen Tech</h2>
              <p style={{ color: '#60A5FA', fontSize: '10px', fontWeight: '800', letterSpacing: '2px', marginBottom: '30px' }}>2026 OFFICIAL E-TICKET</p>
              <div style={{ background: '#fff', padding: '15px', borderRadius: '16px', display: 'inline-block', margin: '0 auto 30px' }}><img src={ticketModal.qrUrl} alt="QR" width="160" /></div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setTicketModal({ isOpen: false, name: '', tier: '', qrUrl: '' })}>ปิดหน้าต่าง</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN VIEW (Tailwind CSS Styled + Full Management Tabs)
  // ==========================================
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
        
        {/* Sidebar สไตล์ Tailwind โทน Dark Tech */}
        <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col z-10 shadow-xl">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('customer')}>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/50">N</div>
            <div>
              <h1 className="font-bold text-slate-100 text-base leading-tight">NextGen Admin</h1>
              <span className="text-xs text-blue-400 font-semibold">Live System On</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <button onClick={() => setAdminTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'dashboard' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              📊 แดชบอร์ดภาพรวม
            </button>
            <button onClick={() => setAdminTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'users' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              👥 รายชื่อผู้ลงทะเบียน
            </button>
            
            <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Website Management</div>
            
            <button onClick={() => setAdminTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'settings' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              ⚙️ ข้อมูลงานทั่วไป
            </button>
            <button onClick={() => setAdminTab('schedule')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'schedule' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              📅 กำหนดการงาน
            </button>
            <button onClick={() => setAdminTab('speakers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'speakers' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              🎤 วิทยากร
            </button>
            <button onClick={() => setAdminTab('sponsors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'sponsors' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              🤝 ผู้สนับสนุน (Sponsors)
            </button>
            <button onClick={() => setAdminTab('tickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${adminTab === 'tickets' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              🎟️ ราคาบัตรเข้าร่วม
            </button>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button onClick={() => setCurrentView('customer')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-bold transition-all border border-slate-700">
              ← กลับหน้าเว็บไซต์หลัก
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto bg-slate-900">
          
          {adminTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Overview Dashboard</h2>
                  <p className="text-slate-400 text-sm mt-1">สรุปข้อมูลสถิติและการขายบัตรแบบเรียลไทม์ (ซิงค์อัตโนมัติทุก 10 วินาที)</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Sync On
                  </span>
                  <button onClick={() => syncWithGoogleSheet()} disabled={isSyncing} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 transition-all disabled:opacity-50">
                    {isSyncing ? "กำลังซิงค์..." : "🔄 รีเฟรชข้อมูล"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Registrations</p>
                  <div className="text-4xl font-black text-white">{registrations.length} <span className="text-sm font-semibold text-slate-500">ท่าน</span></div>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estimated Revenue</p>
                  <div className="text-4xl font-black text-emerald-400">฿{totalRevenue.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Page Views (Simulated)</p>
                  <div className="text-4xl font-black text-white">{pageViews.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Conversion Rate</p>
                  <div className="text-4xl font-black text-blue-400">{conversionRate}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">🎟️ Ticket Sales Distribution</h3>
                  <div className="space-y-6">
                    {ticketStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                          <span>{t.name}</span>
                          <span className="text-blue-400">{t.count} ใบ ({t.percent}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div className={`h-full rounded-full transition-all duration-1000 ${i===0?'bg-blue-600':i===1?'bg-emerald-500':'bg-amber-500'}`} style={{ width: `${t.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">⚡ Recent Registrations</h3>
                  {registrations.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500 text-sm py-12">ยังไม่มีข้อมูลการลงทะเบียน</div>
                  ) : (
                    <div className="space-y-4 flex-1">
                      {registrations.slice(0, 4).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <div>
                            <div className="font-bold text-white text-sm">{r.name}</div>
                            <div className="text-xs text-slate-400">{r.email}</div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-400 border border-blue-900">{r.ticketName}</span>
                            <div className="text-xs font-bold text-emerald-400 mt-1">฿{Number(r.totalPaid).toLocaleString()}</div>
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
              <div className="flex justify-between items-center bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Attendee List</h2>
                  <p className="text-slate-400 text-sm mt-1">จัดการรายชื่อผู้เข้าร่วมงานทั้งหมด</p>
                </div>
                <button onClick={() => syncWithGoogleSheet()} disabled={isSyncing} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 transition-all">
                  🔄 ซิงค์ข้อมูลล่าสุด
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                {registrations.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 text-sm">ยังไม่มีข้อมูลผู้เข้าร่วมงานในระบบ</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">ชื่อ-นามสกุล / องค์กร</th>
                          <th className="py-4 px-6">ช่องทางติดต่อ</th>
                          <th className="py-4 px-6">ประเภทบัตร</th>
                          <th className="py-4 px-6">ยอดชำระ</th>
                          <th className="py-4 px-6 text-center">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-sm">
                        {registrations.map(r => (
                          <tr key={r.id} className="hover:bg-slate-900/50 transition-all">
                            {editingUserId === r.id ? (
                              <>
                                <td className="py-4 px-6 space-y-2">
                                  <input className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} placeholder="ชื่อ" />
                                  <input className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white" value={editUserForm.company} onChange={e => setEditUserForm({...editUserForm, company: e.target.value})} placeholder="องค์กร" />
                                </td>
                                <td className="py-4 px-6 space-y-2">
                                  <input className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white" value={editUserForm.email} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} placeholder="อีเมล" />
                                  <input className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white" value={editUserForm.phone} onChange={e => setEditUserForm({...editUserForm, phone: e.target.value})} placeholder="เบอร์โทร" />
                                </td>
                                <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">{r.ticketName}</span></td>
                                <td className="py-4 px-6 font-bold text-emerald-400">฿{Number(r.totalPaid).toLocaleString()}</td>
                                <td className="py-4 px-6 text-center space-x-2">
                                  <button onClick={saveUserEdit} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">บันทึก</button>
                                  <button onClick={() => setEditingUserId(null)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold">ยกเลิก</button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="py-4 px-6">
                                  <div className="font-bold text-white">{r.name}</div>
                                  <div className="text-xs text-slate-400 font-medium">{r.company || '-'}</div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="text-slate-200">{r.email}</div>
                                  <div className="text-xs text-slate-400">{r.phone}</div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-400 border border-blue-900">{r.ticketName}</span>
                                </td>
                                <td className="py-4 px-6 font-extrabold text-emerald-400">฿{Number(r.totalPaid).toLocaleString()}</td>
                                <td className="py-4 px-6 text-center space-x-2">
                                  <button onClick={() => startEditUser(r)} className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-blue-400 border border-blue-800 rounded-lg text-xs font-bold transition-all">แก้ไข</button>
                                  <button onClick={() => deleteUser(r.id)} className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold transition-all">ลบ</button>
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

          {adminTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-extrabold text-white">General Settings</h2>
                <p className="text-slate-400 text-sm mt-1">ตั้งค่าเนื้อหาและรูปภาพบนเว็บไซต์</p>
              </div>

              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">Main Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">ชื่องาน (Event Title)</label>
                    <input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">คำอธิบาย (Subtitle)</label>
                    <input type="text" value={config.subtitle} onChange={(e) => setConfig({...config, subtitle: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">วันที่จัดงาน (Date)</label>
                    <input type="text" value={config.date} onChange={(e) => setConfig({...config, date: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">สถานที่จัดงาน (Location)</label>
                    <input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">เกี่ยวกับงาน (About Description)</label>
                  <textarea value={config.aboutText} onChange={(e) => setConfig({...config, aboutText: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" rows="4"></textarea>
                </div>

                <h3 className="text-base font-bold text-white pt-4 pb-3 border-b border-slate-800">Visual Backgrounds (URL)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Hero Section Background</label>
                    <input type="text" value={config.heroBg || ''} onChange={(e) => setConfig({...config, heroBg: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Top Marquee Background</label>
                    <input type="text" value={config.marqueeBg || ''} onChange={(e) => setConfig({...config, marqueeBg: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Sponsor Background</label>
                    <input type="text" value={config.sponsorBg || ''} onChange={(e) => setConfig({...config, sponsorBg: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'schedule' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-extrabold text-white">Event Schedule</h2>
                <p className="text-slate-400 text-sm mt-1">จัดการกำหนดการและวาระการประชุม</p>
              </div>

              <div className="space-y-4">
                {config.schedule?.map((s) => (
                  <div key={s.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row gap-6 relative">
                    <button onClick={() => removeArrayItem('schedule', s.id)} className="absolute top-6 right-6 px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold transition-all">ลบ</button>
                    <div className="w-full md:w-40 space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase">Time</label>
                      <input type="text" value={s.time} onChange={(e) => handleArrayChange('schedule', s.id, 'time', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-center font-black text-lg text-blue-400 outline-none" />
                      <label className="block text-xs font-bold text-slate-400 uppercase">Color Theme</label>
                      <input type="color" value={s.color} onChange={(e) => handleArrayChange('schedule', s.id, 'color', e.target.value)} className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer p-1" />
                    </div>
                    <div className="flex-1 space-y-4 pr-16">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Session Title</label>
                          <input type="text" value={s.title} onChange={(e) => handleArrayChange('schedule', s.id, 'title', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tag</label>
                          <input type="text" value={s.tag} onChange={(e) => handleArrayChange('schedule', s.id, 'tag', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                        <textarea value={s.desc} onChange={(e) => handleArrayChange('schedule', s.id, 'desc', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" rows="2"></textarea>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addSchedule} className="w-full py-4 border-2 border-dashed border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 rounded-2xl font-bold text-sm transition-all bg-slate-950 shadow-xl">
                  + เพิ่มกำหนดการใหม่
                </button>
              </div>
            </div>
          )}

          {adminTab === 'speakers' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-extrabold text-white">Speakers & Guests</h2>
                <p className="text-slate-400 text-sm mt-1">จัดการวิทยากรผู้เชี่ยวชาญด้านเทคโนโลยี</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.speakers?.map(speaker => (
                  <div key={speaker.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative space-y-4">
                    <button onClick={() => removeArrayItem('speakers', speaker.id)} className="absolute top-6 right-6 px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold transition-all">ลบ</button>
                    
                    <div className="flex items-center gap-4">
                      <img src={speaker.img} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" alt="speaker" />
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Profile Image</label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'speakers', speaker.id)} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-blue-400 hover:file:bg-blue-900" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                      <input type="text" value={speaker.name} onChange={(e) => handleArrayChange('speakers', speaker.id, 'name', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Role / Organization</label>
                        <input type="text" value={speaker.role} onChange={(e) => handleArrayChange('speakers', speaker.id, 'role', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tag Color</label>
                        <input type="color" value={speaker.color} onChange={(e) => handleArrayChange('speakers', speaker.id, 'color', e.target.value)} className="w-full h-11 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer p-1" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Biography Details</label>
                      <textarea value={speaker.desc} onChange={(e) => handleArrayChange('speakers', speaker.id, 'desc', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" rows="3"></textarea>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <button onClick={addSpeaker} className="w-full h-full min-h-[220px] border-2 border-dashed border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 rounded-2xl font-bold text-sm transition-all bg-slate-950 shadow-xl flex items-center justify-center">
                    + เพิ่มวิทยากรใหม่
                  </button>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'sponsors' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-extrabold text-white">Sponsors Management</h2>
                <p className="text-slate-400 text-sm mt-1">จัดการรายชื่อแบรนด์หรือองค์กรผู้สนับสนุนเทคโนโลยีบนหน้าเว็บไซต์</p>
              </div>

              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                <div className="space-y-4">
                  {config.sponsors?.map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <input 
                        type="text" 
                        value={sponsor.name} 
                        onChange={(e) => handleArrayChange('sponsors', sponsor.id, 'name', e.target.value)} 
                        className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-bold text-white outline-none" 
                        placeholder="ชื่อผู้สนับสนุน" 
                      />
                      <button onClick={() => removeArrayItem('sponsors', sponsor.id)} className="px-4 py-3 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-xl text-xs font-bold transition-all">
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addSponsor} className="w-full py-4 border-2 border-dashed border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 rounded-2xl font-bold text-sm transition-all bg-slate-950 shadow-xl">
                  + เพิ่มผู้สนับสนุนใหม่
                </button>
              </div>
            </div>
          )}

          {adminTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-extrabold text-white">Ticket Pricing</h2>
                <p className="text-slate-400 text-sm mt-1">จัดการราคาและรายละเอียดบัตรเข้าร่วมงาน</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.tickets?.map(ticket => (
                  <div key={ticket.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ticket Name</label>
                      <input type="text" value={ticket.name} onChange={(e) => handleArrayChange('tickets', ticket.id, 'name', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price (THB)</label>
                      <input type="number" value={ticket.price} onChange={(e) => handleArrayChange('tickets', ticket.id, 'price', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-black text-emerald-400 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Badge Label (Optional)</label>
                      <input type="text" value={ticket.badge || ''} onChange={(e) => handleArrayChange('tickets', ticket.id, 'badge', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" placeholder="e.g. 🔥 BEST VALUE" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Features (บรรทัดละ 1 ข้อ)</label>
                      <textarea value={ticket.features} onChange={(e) => handleArrayChange('tickets', ticket.id, 'features', e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none" rows="5"></textarea>
                    </div>
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