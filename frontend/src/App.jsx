import React, { useState, useEffect, useContext, createContext, useRef } from "react";

// ============================================================
// GOOGLE FONTS IMPORT
// ============================================================
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --primary: #0066FF;
      --primary-dark: #0052CC;
      --primary-light: #E8F0FF;
      --accent: #00D4AA;
      --danger: #FF3B5C;
      --warning: #FF9500;
      --success: #00C48C;
      --text-primary: #0A0F1E;
      --text-secondary: #4A5568;
      --text-muted: #8492A6;
      --border: #E2E8F0;
      --bg: #F7F9FC;
      --white: #FFFFFF;
      --card-shadow: 0 2px 16px rgba(0,0,0,0.08);
      --card-shadow-hover: 0 8px 32px rgba(0,102,255,0.15);
    }

    body { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      background: var(--bg);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
    }

    input, select, textarea {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      color: #0A0F1E !important;
      -webkit-text-fill-color: #0A0F1E !important;
    }

    input::placeholder { color: #8492A6 !important; opacity: 1; }
    textarea::placeholder { color: #8492A6 !important; opacity: 1; }

    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{transform:translateX(120px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
    .animate-float { animation: float 3s ease-in-out infinite; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

    .card-hover { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
    .card-hover:hover { transform: translateY(-3px); box-shadow: var(--card-shadow-hover) !important; }

    .nav-link { transition: all 0.2s; position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:var(--primary); transition:width 0.2s; border-radius:2px; }
    .nav-link.active::after { width:100%; }
    .nav-link.active { color: var(--primary) !important; }

    .btn-primary {
      background: linear-gradient(135deg, #0066FF, #0052CC);
      color: white;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 600;
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,102,255,0.35); filter: brightness(1.05); }
    .btn-primary:active { transform: translateY(0); }

    .btn-secondary {
      background: white;
      color: var(--text-primary);
      border: 1.5px solid var(--border);
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 600;
    }
    .btn-secondary:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

    .input-field {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #E2E8F0;
      border-radius: 12px;
      font-size: 14px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0A0F1E !important;
      background: #FFFFFF;
      outline: none;
      transition: all 0.2s;
      box-sizing: border-box;
      -webkit-text-fill-color: #0A0F1E !important;
    }
    .input-field:focus { border-color: #0066FF; box-shadow: 0 0 0 3px rgba(0,102,255,0.1); }
    .input-field.error { border-color: #FF3B5C; box-shadow: 0 0 0 3px rgba(255,59,92,0.1); }
    .input-field::placeholder { color: #8492A6 !important; -webkit-text-fill-color: #8492A6 !important; }
    .input-field:not(:placeholder-shown) { color: #0A0F1E !important; -webkit-text-fill-color: #0A0F1E !important; }

    select.input-field { cursor: pointer; }
    select.input-field option { color: #0A0F1E; background: white; }
    textarea.input-field { resize: vertical; min-height: 100px; }

    .stat-card { 
      background: white; 
      border-radius: 20px; 
      padding: 24px; 
      border: 1px solid var(--border);
      box-shadow: var(--card-shadow);
      transition: all 0.25s;
    }
    .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,102,255,0.12); }

    .glass { 
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .gradient-text {
      background: linear-gradient(135deg, #0066FF, #00D4AA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-bg {
      background: linear-gradient(135deg, #0A0F1E 0%, #0D1B3E 40%, #0A2A6E 70%, #0066FF 100%);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    }

    .progress-bar { 
      height: 6px; 
      background: #E2E8F0; 
      border-radius: 10px; 
      overflow: hidden; 
    }
    .progress-fill { 
      height: 100%; 
      border-radius: 10px; 
      transition: width 1s cubic-bezier(0.4,0,0.2,1);
    }

    .tag {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .sidebar-item:hover { background: var(--primary-light); color: var(--primary); }
    .sidebar-item.active { background: var(--primary-light); color: var(--primary); font-weight: 700; }

    .complaint-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      transition: all 0.25s;
      cursor: pointer;
    }
    .complaint-card:hover { border-color: var(--primary); box-shadow: 0 4px 24px rgba(0,102,255,0.1); transform: translateY(-2px); }

    .step-indicator {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 32px;
    }

    .chatbot-window {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 360px;
      height: 500px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.2);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--border);
      animation: fadeUp 0.3s ease;
    }

    .metric-ring {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: conic-gradient(var(--primary) var(--pct, 0%), #E2E8F0 0%);
      position: relative;
    }
    .metric-ring::before {
      content: '';
      position: absolute;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: white;
    }
  `}</style>
);

// ============================================================
// CONSTANTS
// ============================================================
const CATEGORIES = ["Pothole","Garbage","Water Leakage","Street Light","Sewage","Encroachment","Noise Pollution","Air Pollution","Road Damage","Park Maintenance"];
const DEPARTMENTS = {Pothole:"PWD",Garbage:"MCD","Water Leakage":"DJB","Street Light":"BSES",Sewage:"DJB",Encroachment:"MCorp","Noise Pollution":"Pollution Dept","Air Pollution":"DPCC","Road Damage":"PWD","Park Maintenance":"Horticulture"};
const STATUSES = ["Pending","Under Review","In Progress","Resolved","Rejected"];
const STATUS_COLORS = {Pending:"#FF9500","Under Review":"#0066FF","In Progress":"#8B5CF6",Resolved:"#00C48C",Rejected:"#FF3B5C"};
const PRIORITY_COLORS = {HIGH:"#FF3B5C",MEDIUM:"#FF9500",LOW:"#00C48C"};
const PRIORITY_BG = {HIGH:"#FFF0F3",MEDIUM:"#FFF8EC",LOW:"#EDFAF5"};

const SAMPLE_COMPLAINTS = [
  {id:"CMP-2024-001",title:"Deep pothole on MG Road",category:"Pothole",status:"In Progress",priority:"HIGH",location:"MG Road, Sector 5",date:"2024-12-10",votes:23,description:"Large pothole causing accidents near the bus stop. Vehicles have been damaged.",department:"PWD"},
  {id:"CMP-2024-002",title:"Garbage overflow near market",category:"Garbage",status:"Pending",priority:"HIGH",location:"Karol Bagh Market",date:"2024-12-11",votes:45,description:"Overflowing bins for 3 days, health hazard.",department:"MCD"},
  {id:"CMP-2024-003",title:"Water pipe burst on Ring Road",category:"Water Leakage",status:"Resolved",priority:"HIGH",location:"Ring Road, Lajpat",date:"2024-12-08",votes:18,description:"Major water waste, road waterlogged.",department:"DJB"},
  {id:"CMP-2024-004",title:"Street lights not working",category:"Street Light",status:"Under Review",priority:"MEDIUM",location:"Dwarka Sector 10",date:"2024-12-09",votes:12,description:"5 lights out for a week.",department:"BSES"},
  {id:"CMP-2024-005",title:"Sewage overflow on main road",category:"Sewage",status:"In Progress",priority:"HIGH",location:"Rohini Sector 3",date:"2024-12-12",votes:31,description:"Health hazard for residents.",department:"DJB"},
  {id:"CMP-2024-006",title:"Road damage after rain",category:"Road Damage",status:"Pending",priority:"MEDIUM",location:"Janakpuri West",date:"2024-12-13",votes:8,description:"Multiple cracks in road surface.",department:"PWD"},
];

const AppContext = createContext();
const useApp = () => useContext(AppContext);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const genId = () => `CMP-2024-${Math.floor(Math.random()*900)+100}`;
const fmtDate = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});

// ============================================================
// AI SERVICE
// ============================================================
const AIService = {
  async analyzeComplaint(title, description, category) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 800,
          messages: [{role:"user",content:`Analyze this civic complaint and respond ONLY with JSON (no markdown):
Title: "${title}"
Description: "${description}"
Category: "${category}"
JSON: {"priority":"HIGH|MEDIUM|LOW","priority_reason":"one sentence","sentiment":"urgent|moderate|mild","keywords":["k1","k2","k3"],"suggested_category":"category","estimated_resolution":"X-Y days","severity_score":1-10,"recommended_actions":["a1","a2","a3"]}`}]
        })
      });
      const data = await res.json();
      return JSON.parse(data.content[0].text.replace(/```json|```/g,"").trim());
    } catch {
      return {priority:"MEDIUM",priority_reason:"Standard civic issue requiring attention",sentiment:"moderate",keywords:[category.toLowerCase(),"civic","repair"],suggested_category:category,estimated_resolution:"7-14 days",severity_score:5,recommended_actions:["Inspect area","Assign department","Schedule repair"]};
    }
  },
  async chatbot(message, history) {
    try {
      const msgs = [...history.map(h=>({role:h.role,content:h.content})),{role:"user",content:message}];
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY||"","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body: JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,system:"You are NaviBot, AI assistant for NagarSeva — India's civic complaint platform. Help citizens file complaints, track status, understand the process. Be concise, friendly, under 80 words.",messages:msgs})
      });
      const data = await res.json();
      return data.content[0].text;
    } catch { return "I'm having trouble connecting. Please try again or call 1800-XXX-XXXX."; }
  }
};

// ============================================================
// REUSABLE COMPONENTS
// ============================================================
const Spinner = ({size=20,color="#0066FF"}) => <div style={{width:size,height:size,border:`2.5px solid ${color}20`,borderTop:`2.5px solid ${color}`,borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block",flexShrink:0}}/>;

const Tag = ({label,color,bg}) => <span className="tag" style={{background:bg||`${color}15`,color}}>{label}</span>;

const Toast = ({toasts,remove}) => (
  <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>
    {toasts.map(t=>(
      <div key={t.id} style={{background:t.type==="success"?"#00C48C":t.type==="error"?"#FF3B5C":"#0066FF",color:"#fff",padding:"14px 20px",borderRadius:14,fontSize:14,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",display:"flex",alignItems:"center",gap:10,animation:"slideIn 0.3s ease",maxWidth:340,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <span style={{fontSize:16}}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>
        <span style={{flex:1}}>{t.message}</span>
        <button onClick={()=>remove(t.id)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>
      </div>
    ))}
  </div>
);

const InputField = ({label,error,type="text",suffix,...props}) => {
  const [showPw,setShowPw] = useState(false);
  const isPw = type==="password";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {label&&<label style={{fontSize:13,fontWeight:700,color:"#0A0F1E",letterSpacing:"0.2px"}}>{label}</label>}
      <div style={{position:"relative"}}>
        <input
          {...props}
          type={isPw?(showPw?"text":"password"):type}
          className={`input-field${error?" error":""}`}
          style={{paddingRight:isPw||suffix?"44px":"16px",...props.style}}
        />
        {isPw&&(
          <button type="button" onClick={()=>setShowPw(s=>!s)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#8492A6",fontSize:16,display:"flex",alignItems:"center",padding:0}}>
            {showPw?"👁️":"👁️‍🗨️"}
          </button>
        )}
        {suffix&&!isPw&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:"#8492A6",fontSize:13}}>{suffix}</span>}
      </div>
      {error&&<span style={{fontSize:12,color:"#FF3B5C",fontWeight:500}}>{error}</span>}
    </div>
  );
};

const SelectField = ({label,options,error,...props}) => (
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    {label&&<label style={{fontSize:13,fontWeight:700,color:"#0A0F1E"}}>{label}</label>}
    <select {...props} className={`input-field${error?" error":""}`}>
      {options.map(o=><option key={o.value} value={o.value} style={{color:"#0A0F1E",background:"white"}}>{o.label}</option>)}
    </select>
    {error&&<span style={{fontSize:12,color:"#FF3B5C",fontWeight:500}}>{error}</span>}
  </div>
);

const Btn = ({children,variant="primary",loading,icon,style:s={},...props}) => {
  const variants = {
    primary:{className:"btn-primary",style:{padding:"12px 24px",borderRadius:12,fontSize:14,display:"flex",alignItems:"center",gap:8,justifyContent:"center"}},
    secondary:{className:"btn-secondary",style:{padding:"11px 22px",borderRadius:12,fontSize:14,display:"flex",alignItems:"center",gap:8,justifyContent:"center"}},
    danger:{className:"btn-primary",style:{padding:"11px 22px",borderRadius:12,fontSize:14,display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#FF3B5C,#CC2244)",justifyContent:"center"}},
    ghost:{className:"",style:{padding:"11px 22px",borderRadius:12,fontSize:14,background:"transparent",border:"1.5px solid rgba(255,255,255,0.3)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,transition:"all 0.2s",justifyContent:"center"}},
    success:{className:"btn-primary",style:{padding:"12px 24px",borderRadius:12,fontSize:14,background:"linear-gradient(135deg,#00C48C,#009970)",display:"flex",alignItems:"center",gap:8,justifyContent:"center"}},
  };
  const v = variants[variant];
  return (
    <button {...props} disabled={loading||props.disabled} className={v.className} style={{...v.style,...s,opacity:loading?0.7:1,cursor:loading?"not-allowed":"pointer"}}>
      {loading?<Spinner size={16} color={variant==="secondary"?"#0066FF":"#fff"}/>:icon}
      {children}
    </button>
  );
};

const Card = ({children,style:s={},hover=false,...props}) => (
  <div className={hover?"card-hover":""} style={{background:"#fff",borderRadius:20,border:"1px solid #E2E8F0",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",padding:24,...s}} {...props}>
    {children}
  </div>
);

// ============================================================
// MINI CHARTS (Pure SVG)
// ============================================================
const BarChart = ({data,color="#0066FF",title}) => {
  const max = Math.max(...data.map(d=>d.value),1);
  return (
    <div>
      {title&&<h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:16}}>{title}</h4>}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {data.map((d,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:12,color:"#8492A6",minWidth:110,textAlign:"right",fontWeight:500}}>{d.label}</span>
            <div style={{flex:1,background:"#F1F5F9",borderRadius:6,height:22,overflow:"hidden"}}>
              <div style={{width:`${(d.value/max)*100}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}99)`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8,minWidth:d.value>0?40:0,transition:"width 1s ease"}}>
                {d.value>0&&<span style={{fontSize:11,color:"#fff",fontWeight:700}}>{d.value}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DonutChart = ({data,title}) => {
  const total = data.reduce((s,d)=>s+d.value,0)||1;
  let cum = 0;
  const cx=70,cy=70,r=54,ir=36,size=140;
  const segs = data.map(d=>{
    const pct=d.value/total;
    const s=(cum/total)*2*Math.PI-Math.PI/2;
    cum+=d.value;
    const e=(cum/total)*2*Math.PI-Math.PI/2;
    const x1=cx+r*Math.cos(s),y1=cy+r*Math.sin(s);
    const x2=cx+r*Math.cos(e),y2=cy+r*Math.sin(e);
    const xi1=cx+ir*Math.cos(s),yi1=cy+ir*Math.sin(s);
    const xi2=cx+ir*Math.cos(e),yi2=cy+ir*Math.sin(e);
    const lg=pct>0.5?1:0;
    return {...d,path:`M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${ir} ${ir} 0 ${lg} 0 ${xi1} ${yi1} Z`};
  });
  return (
    <div>
      {title&&<h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:16}}>{title}</h4>}
      <div style={{display:"flex",alignItems:"center",gap:20}}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segs.map((s,i)=><path key={i} d={s.path} fill={s.color} opacity={0.9}/>)}
          <text x={cx} y={cy-5} textAnchor="middle" fontSize="20" fontWeight="800" fill="#0A0F1E" fontFamily="Plus Jakarta Sans">{total}</text>
          <text x={cx} y={cy+12} textAnchor="middle" fontSize="10" fill="#8492A6" fontFamily="Plus Jakarta Sans">Total</text>
        </svg>
        <div style={{display:"flex",flexDirection:"column",gap:8,flex:1}}>
          {data.map((d,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:10,height:10,borderRadius:3,background:d.color,flexShrink:0}}/>
              <span style={{fontSize:12,color:"#4A5568",flex:1}}>{d.label}</span>
              <span style={{fontSize:13,fontWeight:700,color:"#0A0F1E"}}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NAVBAR
// ============================================================
const Navbar = ({page,setPage,user,setUser,toast}) => {
  const isAdmin = user?.role==="admin";
  const navItems = user ? [
    {id:"home",label:"Home",icon:"🏠"},
    {id:"dashboard",label:"Dashboard",icon:"📊"},
    {id:"submit",label:"File Complaint",icon:"📝"},
    {id:"track",label:"Track",icon:"🔍"},
    ...(isAdmin?[{id:"admin",label:"Admin Panel",icon:"⚙️"}]:[]),
  ]:[
    {id:"home",label:"Home",icon:"🏠"},
    {id:"track",label:"Track Complaint",icon:"🔍"},
  ];

  return (
    <nav style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid #E2E8F0",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(0,0,0,0.06)"}}>
      <div style={{maxWidth:1320,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setPage("home")}>
          <div style={{width:40,height:40,background:"linear-gradient(135deg,#0066FF,#00D4AA)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 4px 12px rgba(0,102,255,0.3)"}}>🏛️</div>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:"#0A0F1E",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.3px"}}>NagarSeva <span style={{color:"#0066FF"}}>AI</span></div>
            <div style={{fontSize:10,color:"#8492A6",letterSpacing:"1px",textTransform:"uppercase",fontWeight:600}}>Civic Intelligence Platform</div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{display:"flex",alignItems:"center",gap:2}}>
          {navItems.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} className={`nav-link${page===item.id?" active":""}`}
              style={{padding:"8px 16px",borderRadius:10,border:"none",background:page===item.id?"#E8F0FF":"transparent",color:page===item.id?"#0066FF":"#4A5568",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* Auth */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {/* Notification Bell */}
              <div style={{position:"relative"}}>
                <button style={{width:38,height:38,borderRadius:10,background:"#F7F9FC",border:"1.5px solid #E2E8F0",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>🔔</button>
                <span style={{position:"absolute",top:-4,right:-4,width:16,height:16,background:"#FF3B5C",borderRadius:"50%",fontSize:9,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>3</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 14px",background:"#F7F9FC",borderRadius:12,border:"1.5px solid #E2E8F0"}}>
                <div style={{width:30,height:30,borderRadius:10,background:"linear-gradient(135deg,#0066FF,#00D4AA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:800}}>{user.name[0]}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#0A0F1E"}}>{user.name.split(" ")[0]}</div>
                  {isAdmin&&<div style={{fontSize:10,color:"#0066FF",fontWeight:700,letterSpacing:"0.5px"}}>ADMIN</div>}
                </div>
              </div>
              <Btn variant="secondary" style={{padding:"8px 16px",fontSize:13}} onClick={()=>{setUser(null);setPage("home");toast("Logged out","success");}}>Logout</Btn>
            </div>
          ):(
            <div style={{display:"flex",gap:8}}>
              <Btn variant="secondary" style={{padding:"8px 18px",fontSize:13}} onClick={()=>setPage("login")}>Sign In</Btn>
              <Btn variant="primary" style={{padding:"8px 18px",fontSize:13}} onClick={()=>setPage("register")}>Get Started →</Btn>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = ({setPage,complaints}) => {
  const stats = [
    {label:"Complaints Filed",value:"12,847",icon:"📋",color:"#0066FF",bg:"#E8F0FF"},
    {label:"Issues Resolved",value:"9,231",icon:"✅",color:"#00C48C",bg:"#EDFAF5"},
    {label:"Avg Resolution",value:"4.2 days",icon:"⚡",color:"#8B5CF6",bg:"#F3EEFF"},
    {label:"Cities Covered",value:"28",icon:"🏙️",color:"#FF9500",bg:"#FFF8EC"},
  ];
  const features = [
    {icon:"🤖",title:"AI-Powered Analysis",desc:"NLP auto-categorizes complaints, detects duplicates, and assigns priority scores in milliseconds.",color:"#0066FF"},
    {icon:"📸",title:"Image Classification",desc:"Upload photos and our YOLO-powered AI instantly detects potholes, garbage, water leaks.",color:"#8B5CF6"},
    {icon:"🗺️",title:"Live Heatmaps",desc:"Visualize complaint hotspots with interactive maps. See where your city needs attention most.",color:"#00C48C"},
    {icon:"🔔",title:"Real-time Updates",desc:"Instant notifications via SMS and email when your complaint status changes.",color:"#FF9500"},
    {icon:"📊",title:"Analytics Dashboard",desc:"Data-driven insights for administrators to identify trends and allocate resources efficiently.",color:"#FF3B5C"},
    {icon:"🏛️",title:"Smart Routing",desc:"Complaints automatically routed to the correct government department using ML classification.",color:"#0066FF"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#F7F9FC"}}>
      {/* Hero Section */}
      <div className="hero-bg" style={{color:"#fff",padding:"100px 24px 80px",position:"relative",overflow:"hidden"}}>
        {/* Decorative circles */}
        <div style={{position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.15),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-150,left:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,102,255,0.2),transparent 70%)",pointerEvents:"none"}}/>
        
        {/* Grid pattern */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>

        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:30,padding:"8px 20px",fontSize:13,marginBottom:28,backdropFilter:"blur(10px)"}}>
            <span style={{width:8,height:8,background:"#00C48C",borderRadius:"50%",animation:"pulse 2s infinite"}}/>
            <span style={{fontWeight:600}}>Powered by Claude AI • Live Platform</span>
          </div>

          <h1 style={{fontSize:"clamp(36px,5.5vw,64px)",fontWeight:900,lineHeight:1.1,marginBottom:24,fontFamily:"'Syne',sans-serif",letterSpacing:"-2px"}}>
            Transform Civic Issues Into<br/>
            <span style={{background:"linear-gradient(90deg,#00D4AA,#0066FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Government Action</span>
          </h1>

          <p style={{fontSize:18,color:"rgba(255,255,255,0.72)",marginBottom:40,lineHeight:1.7,maxWidth:600,margin:"0 auto 40px"}}>
            India's most intelligent civic complaint platform. AI automatically categorizes, prioritizes, and routes your complaint to the right department in seconds.
          </p>

          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn variant="primary" style={{padding:"15px 36px",fontSize:16,background:"linear-gradient(135deg,#00D4AA,#0099CC)",boxShadow:"0 8px 32px rgba(0,212,170,0.4)"}} onClick={()=>setPage("submit")}>
              🚀 File a Complaint
            </Btn>
            <Btn variant="ghost" style={{padding:"15px 36px",fontSize:16}} onClick={()=>setPage("track")}>
              🔍 Track Status
            </Btn>
          </div>

          {/* Trust badges */}
          <div style={{display:"flex",gap:24,justifyContent:"center",marginTop:48,flexWrap:"wrap"}}>
            {["🏆 Govt. Approved","🔒 Data Secure","⚡ 4.2 Day Avg. Resolution","🌍 28 Cities"].map((b,i)=>(
              <div key={i} style={{fontSize:13,color:"rgba(255,255,255,0.65)",fontWeight:600,display:"flex",alignItems:"center",gap:6}}>{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{maxWidth:1200,margin:"-40px auto 0",padding:"0 24px",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {stats.map((s,i)=>(
            <div key={i} className="stat-card" style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:52,height:52,borderRadius:16,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{s.icon}</div>
              <div>
                <div style={{fontSize:28,fontWeight:900,color:s.color,fontFamily:"'Syne',sans-serif"}}>{s.value}</div>
                <div style={{fontSize:13,color:"#8492A6",fontWeight:500,marginTop:2}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{maxWidth:1200,margin:"72px auto",padding:"0 24px"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-block",background:"#E8F0FF",color:"#0066FF",padding:"6px 16px",borderRadius:20,fontSize:12,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:16}}>WHY NAGARSEVA AI</div>
          <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif",letterSpacing:"-1px"}}>Built for Modern India</h2>
          <p style={{color:"#8492A6",fontSize:16,marginTop:12}}>Cutting-edge AI meets civic responsibility</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
          {features.map((f,i)=>(
            <div key={i} className="card-hover" style={{background:"#fff",borderRadius:20,border:"1px solid #E2E8F0",padding:28,boxShadow:"0 2px 16px rgba(0,0,0,0.05)"}}>
              <div style={{width:52,height:52,borderRadius:16,background:`${f.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:18}}>{f.icon}</div>
              <h3 style={{fontSize:17,fontWeight:800,color:"#0A0F1E",marginBottom:10}}>{f.title}</h3>
              <p style={{fontSize:14,color:"#8492A6",lineHeight:1.7}}>{f.desc}</p>
              <div style={{marginTop:16,display:"flex",alignItems:"center",gap:6,color:f.color,fontSize:13,fontWeight:700}}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Complaints */}
      <div style={{maxWidth:1200,margin:"0 auto 72px",padding:"0 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <h2 style={{fontSize:24,fontWeight:800,color:"#0A0F1E",fontFamily:"'Syne',sans-serif"}}>Recent Complaints</h2>
          <Btn variant="secondary" style={{fontSize:13}} onClick={()=>setPage("track")}>View All →</Btn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          {complaints.slice(0,4).map(c=>(
            <div key={c.id} className="complaint-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <span style={{fontSize:11,fontFamily:"monospace",color:"#8492A6",background:"#F7F9FC",padding:"3px 10px",borderRadius:8,fontWeight:600}}>{c.id}</span>
                <Tag label={c.priority} color={PRIORITY_COLORS[c.priority]} bg={PRIORITY_BG[c.priority]}/>
              </div>
              <h4 style={{fontSize:15,fontWeight:700,color:"#0A0F1E",marginBottom:10}}>{c.title}</h4>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                <Tag label={c.category} color="#0066FF" bg="#E8F0FF"/>
                <Tag label={c.status} color={STATUS_COLORS[c.status]} bg={`${STATUS_COLORS[c.status]}15`}/>
              </div>
              <div style={{fontSize:12,color:"#8492A6",fontWeight:500}}>📍 {c.location}</div>
              <div className="progress-bar" style={{marginTop:12}}>
                <div className="progress-fill" style={{width:c.status==="Resolved"?"100%":c.status==="In Progress"?"65%":c.status==="Under Review"?"35%":"10%",background:STATUS_COLORS[c.status]}}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:"linear-gradient(135deg,#0A0F1E,#0D1B3E)",padding:"80px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 50%,rgba(0,102,255,0.15),transparent 60%),radial-gradient(circle at 70% 50%,rgba(0,212,170,0.1),transparent 60%)"}}/>
        <div style={{position:"relative",maxWidth:600,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:"#fff",marginBottom:16,fontFamily:"'Syne',sans-serif",letterSpacing:"-1px"}}>Ready to make your city better?</h2>
          <p style={{color:"rgba(255,255,255,0.6)",marginBottom:32,fontSize:16}}>Join 50,000+ citizens already using NagarSeva AI</p>
          <Btn onClick={()=>setPage("register")} style={{padding:"16px 40px",fontSize:16,background:"linear-gradient(135deg,#0066FF,#00D4AA)",border:"none",cursor:"pointer",borderRadius:14,fontWeight:700,color:"white",boxShadow:"0 8px 32px rgba(0,102,255,0.4)",fontFamily:"'Plus Jakarta Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8}}>
            Get Started Free → 
          </Btn>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// AUTH PAGE
// ============================================================
const AuthPage = ({type,setUser,setPage,toast}) => {
  const [form,setForm] = useState({name:"",email:"",phone:"",password:"",role:"user"});
  const [loading,setLoading] = useState(false);
  const [errors,setErrors] = useState({});
  const isLogin = type==="login";

  const validate = () => {
    const e={};
    if(!form.email) e.email="Email is required";
    if(!form.password||form.password.length<6) e.password="Min 6 characters";
    if(!isLogin&&!form.name) e.name="Name is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handle = async () => {
  if (!validate()) return;
  setLoading(true);

  try {
    // 1. Point this to your actual FastAPI URL
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // 2. Use the REAL data from your backend (result.data.user)
      setUser(result.data.user);
      localStorage.setItem("token", result.data.access_token); // Save your JWT!
      
      toast(`Welcome back, ${result.data.user.name.split(" ")[0]}!`, "success");
      setPage(result.data.user.role === "admin" ? "admin" : "dashboard");
    } else {
      // 3. This handles the 401 Unauthorized from your Python code
      toast(result.detail || "Login failed", "error");
    }
  } catch (error) {
    toast("Server connection failed", "error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",background:"#fff"}}>
      {/* Left Panel */}
      <div className="hero-bg" style={{padding:48,display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 80%,rgba(0,212,170,0.2),transparent 50%),radial-gradient(circle at 80% 20%,rgba(0,102,255,0.2),transparent 50%)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:48}}>
            <div style={{width:40,height:40,background:"rgba(255,255,255,0.2)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏛️</div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif"}}>NagarSeva AI</div>
          </div>
          <h2 style={{fontSize:"clamp(28px,3vw,42px)",fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif",letterSpacing:"-1px",lineHeight:1.2,marginBottom:20}}>
            {isLogin?"Welcome back,":"Join India's"}<br/>
            <span style={{background:"linear-gradient(90deg,#00D4AA,#60A5FA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              {isLogin?"Good to see you!":"Civic Revolution"}
            </span>
          </h2>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:16,lineHeight:1.7}}>
            {isLogin?"Sign in to continue making your city better with AI-powered complaint management.":"Create your account and start reporting civic issues with intelligent AI assistance."}
          </p>
        </div>
        <div style={{position:"relative"}}>
          {[
            {icon:"🤖",title:"AI Analysis",desc:"Instant categorization"},
            {icon:"⚡",title:"Fast Resolution",desc:"4.2 day average"},
            {icon:"🔔",title:"Live Updates",desc:"Real-time notifications"},
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,marginBottom:16,padding:"14px 16px",background:"rgba(255,255,255,0.08)",borderRadius:14,border:"1px solid rgba(255,255,255,0.12)"}}>
              <span style={{fontSize:24}}>{f.icon}</span>
              <div>
                <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{f.title}</div>
                <div style={{color:"rgba(255,255,255,0.55)",fontSize:12}}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:48,background:"#F7F9FC"}}>
        <div style={{width:"100%",maxWidth:420}}>
          <div style={{marginBottom:36}}>
            <h3 style={{fontSize:28,fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.5px"}}>{isLogin?"Sign In":"Create Account"}</h3>
            <p style={{color:"#8492A6",marginTop:8,fontSize:14}}>{isLogin?"Enter your credentials to continue":"Fill in your details to get started"}</p>
          </div>

          {isLogin&&(
            <div style={{background:"#E8F0FF",border:"1px solid #BDD0FF",borderRadius:12,padding:14,marginBottom:24,fontSize:13,color:"#0052CC",fontWeight:500}}>
              <strong>Demo Admin:</strong> admin@nagarseva.in / Admin123
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {!isLogin&&(
              <InputField label="Full Name" placeholder="Raj Kumar" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} error={errors.name}/>
            )}
            <InputField label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} error={errors.email}/>
            {!isLogin&&(
              <InputField label="Phone Number" type="tel" placeholder="9876543210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
            )}
            <InputField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} error={errors.password}/>
            {!isLogin&&(
              <SelectField label="Account Type" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
                options={[{value:"user",label:"👤 Citizen"},{value:"admin",label:"⚙️ Government Official"}]}
              />
            )}
            <Btn variant="primary" loading={loading} style={{width:"100%",padding:"14px",fontSize:15,marginTop:4}} onClick={handle}>
              {isLogin?"Sign In →":"Create Account →"}
            </Btn>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:12,margin:"24px 0"}}>
            <div style={{flex:1,height:1,background:"#E2E8F0"}}/>
            <span style={{fontSize:12,color:"#8492A6",fontWeight:600}}>OR</span>
            <div style={{flex:1,height:1,background:"#E2E8F0"}}/>
          </div>

          <p style={{textAlign:"center",fontSize:14,color:"#8492A6"}}>
            {isLogin?"Don't have an account? ":"Already have an account? "}
            <span style={{color:"#0066FF",cursor:"pointer",fontWeight:700}} onClick={()=>setPage(isLogin?"register":"login")}>
              {isLogin?"Register here":"Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// USER DASHBOARD
// ============================================================
const Dashboard = ({user,complaints,setPage}) => {
  const myComplaints = complaints.slice(0,5);
  const kpis = [
    {label:"Total Filed",value:myComplaints.length,icon:"📋",color:"#0066FF",bg:"#E8F0FF"},
    {label:"Resolved",value:myComplaints.filter(c=>c.status==="Resolved").length,icon:"✅",color:"#00C48C",bg:"#EDFAF5"},
    {label:"In Progress",value:myComplaints.filter(c=>c.status==="In Progress").length,icon:"⚙️",color:"#8B5CF6",bg:"#F3EEFF"},
    {label:"Pending",value:myComplaints.filter(c=>c.status==="Pending").length,icon:"⏳",color:"#FF9500",bg:"#FFF8EC"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",padding:"32px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        {/* Header */}
        <div style={{marginBottom:32,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div>
            <div style={{fontSize:13,color:"#8492A6",fontWeight:600,marginBottom:4}}>WELCOME BACK</div>
            <h1 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.5px"}}>{user?.name} 👋</h1>
            <p style={{color:"#8492A6",marginTop:6,fontSize:14}}>Here's your civic activity overview</p>
          </div>
          <Btn variant="primary" style={{gap:8}} onClick={()=>setPage("submit")}>
            📝 New Complaint
          </Btn>
        </div>

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:28}}>
          {kpis.map((k,i)=>(
            <div key={i} className="stat-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:12,color:"#8492A6",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{k.label}</div>
                  <div style={{fontSize:36,fontWeight:900,color:k.color,fontFamily:"'Syne',sans-serif",marginTop:6}}>{k.value}</div>
                </div>
                <div style={{width:44,height:44,borderRadius:14,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{k.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
          {/* My Complaints */}
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:800,color:"#0A0F1E"}}>My Complaints</h3>
              <Tag label={`${myComplaints.length} total`} color="#0066FF" bg="#E8F0FF"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {myComplaints.map(c=>(
                <div key={c.id} style={{padding:"16px",background:"#F7F9FC",borderRadius:14,border:"1px solid #E2E8F0",transition:"all 0.2s",cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#0066FF";e.currentTarget.style.background="#F0F7FF";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.background="#F7F9FC";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <span style={{fontSize:11,fontFamily:"monospace",color:"#8492A6",background:"#E2E8F0",padding:"2px 8px",borderRadius:6,fontWeight:600}}>{c.id}</span>
                    <div style={{display:"flex",gap:6}}>
                      <Tag label={c.priority} color={PRIORITY_COLORS[c.priority]} bg={PRIORITY_BG[c.priority]}/>
                      <Tag label={c.status} color={STATUS_COLORS[c.status]} bg={`${STATUS_COLORS[c.status]}15`}/>
                    </div>
                  </div>
                  <h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:8}}>{c.title}</h4>
                  <div style={{fontSize:12,color:"#8492A6",marginBottom:10}}>📍 {c.location} • {fmtDate(c.date)}</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:c.status==="Resolved"?"100%":c.status==="In Progress"?"65%":c.status==="Under Review"?"35%":"10%",background:STATUS_COLORS[c.status]}}/>
                  </div>
                  <div style={{fontSize:11,color:"#8492A6",marginTop:4,textAlign:"right"}}>
                    {c.status==="Resolved"?"Completed":c.status==="In Progress"?"65% Complete":c.status==="Under Review"?"Under Review":"Just Filed"}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Panel */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Card>
              <DonutChart title="Status Breakdown" data={[
                {label:"Resolved",value:Math.max(1,myComplaints.filter(c=>c.status==="Resolved").length),color:"#00C48C"},
                {label:"In Progress",value:Math.max(1,myComplaints.filter(c=>c.status==="In Progress").length),color:"#8B5CF6"},
                {label:"Pending",value:Math.max(1,myComplaints.filter(c=>c.status==="Pending").length),color:"#FF9500"},
                {label:"Under Review",value:Math.max(1,myComplaints.filter(c=>c.status==="Under Review").length),color:"#0066FF"},
              ]}/>
            </Card>
            <Card style={{background:"linear-gradient(135deg,#0066FF,#0099CC)",border:"none"}}>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600,marginBottom:6}}>RESOLUTION RATE</div>
              <div style={{fontSize:40,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif"}}>87%</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,marginTop:4}}>Above city average of 72%</div>
              <Btn onClick={()=>setPage("track")} style={{marginTop:16,width:"100%",background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",borderRadius:10,padding:"10px",fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>
                Track All →
              </Btn>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SUBMIT COMPLAINT
// ============================================================
const SubmitComplaint = ({user,setPage,addComplaint,toast}) => {
  const [step,setStep] = useState(1);
  const [form,setForm] = useState({title:"",category:"",location:"",description:"",contact:user?.phone||""});
  const [imagePreview,setImagePreview] = useState(null);
  const [imageAI,setImageAI] = useState(null);
  const [aiResult,setAiResult] = useState(null);
  const [aiLoading,setAiLoading] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [submitted,setSubmitted] = useState(null);
  const [errors,setErrors] = useState({});
  const [isListening,setIsListening] = useState(false);
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      setImagePreview(ev.target.result);
      setImageAI({detecting:true});
      await sleep(1500);
      const classes = ["Pothole","Garbage","Water Leakage","Road Damage","Street Light"];
      const detected = classes[Math.floor(Math.random()*classes.length)];
      const conf = (0.75+Math.random()*0.2).toFixed(2);
      setImageAI({detected_class:detected,confidence:conf,severity:conf>0.87?"HIGH":"MEDIUM"});
      if(!form.category) setForm(f=>({...f,category:detected}));
      toast(`AI detected: ${detected} (${(conf*100).toFixed(0)}% confidence)`,"success");
    };
    reader.readAsDataURL(file);
  };

  const analyzeAI = async () => {
    if(!form.title||!form.description||!form.category){toast("Fill title, category and description first","error");return;}
    setAiLoading(true);
    const r = await AIService.analyzeComplaint(form.title,form.description,form.category);
    setAiResult(r);
    setForm(f=>({...f,priority:r.priority}));
    setAiLoading(false);
    toast("AI analysis complete!","success");
  };

  const validate = () => {
    const e={};
    if(!form.title.trim()) e.title="Title is required";
    if(!form.category) e.category="Select a category";
    if(!form.location.trim()) e.location="Location is required";
    if(!form.description.trim()||form.description.length<20) e.description="Min 20 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async () => {
    if(!validate()) return;
    setSubmitting(true);
    await sleep(1200);
    const c = {id:genId(),title:form.title,category:form.category,location:form.location,description:form.description,priority:aiResult?.priority||"MEDIUM",status:"Pending",date:new Date().toISOString().split("T")[0],votes:0,department:DEPARTMENTS[form.category]||"General",aiAnalysis:aiResult};
    addComplaint(c);
    setSubmitted(c);
    setSubmitting(false);
    toast("Complaint submitted!","success");
  };

  if(submitted) return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Card style={{maxWidth:500,width:"100%",textAlign:"center",padding:48}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"#EDFAF5",border:"3px solid #00C48C",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px"}}>🎉</div>
        <h2 style={{fontSize:26,fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif",marginBottom:8}}>Complaint Filed!</h2>
        <p style={{color:"#8492A6",marginBottom:28,fontSize:14}}>Your complaint has been registered and routed to {submitted.department}</p>
        <div style={{background:"#F7F9FC",border:"2px solid #00C48C",borderRadius:16,padding:20,marginBottom:24}}>
          <div style={{fontSize:12,color:"#8492A6",marginBottom:4,fontWeight:600}}>COMPLAINT ID</div>
          <div style={{fontSize:28,fontWeight:900,color:"#00C48C",fontFamily:"monospace"}}>{submitted.id}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
          <div style={{background:"#F7F9FC",padding:14,borderRadius:12,textAlign:"left"}}>
            <div style={{fontSize:11,color:"#8492A6",marginBottom:6,fontWeight:600}}>PRIORITY</div>
            <Tag label={submitted.priority} color={PRIORITY_COLORS[submitted.priority]} bg={PRIORITY_BG[submitted.priority]}/>
          </div>
          <div style={{background:"#F7F9FC",padding:14,borderRadius:12,textAlign:"left"}}>
            <div style={{fontSize:11,color:"#8492A6",marginBottom:6,fontWeight:600}}>DEPARTMENT</div>
            <div style={{fontSize:14,fontWeight:700,color:"#0A0F1E"}}>{submitted.department}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <Btn variant="secondary" style={{flex:1}} onClick={()=>setPage("track")}>Track Status</Btn>
          <Btn variant="primary" style={{flex:1}} onClick={()=>{setSubmitted(null);setForm({title:"",category:"",location:"",description:"",contact:""});setAiResult(null);setStep(1);}}>New Complaint</Btn>
        </div>
      </Card>
    </div>
  );

  const steps = ["Details","Media & AI","Review"];

  return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",padding:"32px 24px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{marginBottom:32}}>
          <h1 style={{fontSize:28,fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif"}}>📝 File a Complaint</h1>
          <p style={{color:"#8492A6",marginTop:6}}>AI will automatically categorize and prioritize your complaint</p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((s,i)=>(
            <React.Fragment key={s}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:step>i+1?"#00C48C":step===i+1?"#0066FF":"#E2E8F0",color:step>=i+1?"#fff":"#8492A6",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,transition:"all 0.3s",boxShadow:step===i+1?"0 4px 16px rgba(0,102,255,0.3)":"none"}}>
                  {step>i+1?"✓":i+1}
                </div>
                <span style={{fontSize:12,color:step>=i+1?"#0066FF":"#8492A6",fontWeight:step>=i+1?700:500}}>{s}</span>
              </div>
              {i<steps.length-1&&<div style={{flex:1,height:2,background:step>i+1?"#00C48C":"#E2E8F0",margin:"0 8px",marginBottom:18,transition:"background 0.3s"}}/>}
            </React.Fragment>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr",gap:20}}>
          <div>
            {step===1&&(
              <Card>
                <h3 style={{fontSize:18,fontWeight:800,color:"#0A0F1E",marginBottom:24}}>Complaint Details</h3>
                <div style={{display:"flex",flexDirection:"column",gap:18}}>
                  <InputField label="Complaint Title *" placeholder="e.g., Large pothole on Main Street" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} error={errors.title}/>
                  <SelectField label="Category *" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} error={errors.category}
                    options={[{value:"",label:"-- Select Category --"},...CATEGORIES.map(c=>({value:c,label:c}))]}
                  />
                  <InputField label="Location / Address *" placeholder="e.g., Sector 5, MG Road, Delhi" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} error={errors.location}/>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <label style={{fontSize:13,fontWeight:700,color:"#0A0F1E"}}>Description *</label>
                      <button onClick={()=>toast("Voice input requires browser permission","info")} style={{fontSize:12,color:"#0066FF",background:"none",border:"none",cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                        🎤 Voice Input
                      </button>
                    </div>
                    <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe the issue in detail... (min 20 characters)" rows={4} className={`input-field${errors.description?" error":""}`}/>
                    {errors.description&&<span style={{fontSize:12,color:"#FF3B5C",fontWeight:500}}>{errors.description}</span>}
                    <div style={{fontSize:11,color:"#8492A6",textAlign:"right"}}>{form.description.length} characters</div>
                  </div>
                  <InputField label="Contact Number" type="tel" placeholder="9876543210" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/>
                </div>
                <div style={{marginTop:24,display:"flex",justifyContent:"flex-end"}}>
                  <Btn variant="primary" onClick={()=>{if(validate())setStep(2);}}>Next: Add Media →</Btn>
                </div>
              </Card>
            )}

            {step===2&&(
              <Card>
                <h3 style={{fontSize:18,fontWeight:800,color:"#0A0F1E",marginBottom:20}}>📸 Photo Evidence</h3>
                <div onClick={()=>fileRef.current.click()} style={{border:"2px dashed #CBD5E1",borderRadius:16,padding:40,textAlign:"center",cursor:"pointer",background:"#F7F9FC",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#0066FF";e.currentTarget.style.background="#F0F7FF";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#CBD5E1";e.currentTarget.style.background="#F7F9FC";}}>
                  {imagePreview?<img src={imagePreview} alt="Preview" style={{maxWidth:"100%",maxHeight:200,borderRadius:10,objectFit:"cover"}}/>
                    :<><div style={{fontSize:40,marginBottom:10}}>📷</div><div style={{color:"#4A5568",fontSize:14,fontWeight:600}}>Click to upload photo</div><div style={{color:"#8492A6",fontSize:12,marginTop:4}}>JPEG, PNG, MP4 (max 10MB)</div></>}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{display:"none"}}/>

                {imageAI&&(
                  <div style={{marginTop:16,padding:16,background:imageAI.detecting?"#F7F9FC":"#EDFAF5",border:`1px solid ${imageAI.detecting?"#E2E8F0":"#86EFAC"}`,borderRadius:12}}>
                    {imageAI.detecting?<div style={{display:"flex",alignItems:"center",gap:10}}><Spinner size={16}/><span style={{fontSize:14,color:"#8492A6"}}>AI analyzing image...</span></div>
                      :<div>
                        <div style={{fontSize:13,fontWeight:700,color:"#15803D",marginBottom:10}}>🤖 AI Image Analysis Complete</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                          {[["Detected",imageAI.detected_class],["Confidence",`${(imageAI.confidence*100).toFixed(0)}%`]].map(([k,v])=>(
                            <div key={k}><div style={{fontSize:11,color:"#8492A6"}}>{k}</div><div style={{fontSize:14,fontWeight:800,color:"#0A0F1E"}}>{v}</div></div>
                          ))}
                          <div><div style={{fontSize:11,color:"#8492A6"}}>Severity</div><Tag label={imageAI.severity} color={PRIORITY_COLORS[imageAI.severity]} bg={PRIORITY_BG[imageAI.severity]}/></div>
                        </div>
                      </div>}
                  </div>
                )}

                <div style={{marginTop:20,display:"flex",justifyContent:"space-between"}}>
                  <Btn variant="secondary" onClick={()=>setStep(1)}>← Back</Btn>
                  <Btn variant="primary" onClick={()=>setStep(3)}>Next: Review →</Btn>
                </div>
              </Card>
            )}

            {step===3&&(
              <Card>
                <h3 style={{fontSize:18,fontWeight:800,color:"#0A0F1E",marginBottom:20}}>Review & Submit</h3>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                  {[["Title",form.title],["Category",form.category],["Location",form.location],["Description",form.description]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",gap:14,padding:"12px 16px",background:"#F7F9FC",borderRadius:12,border:"1px solid #E2E8F0"}}>
                      <span style={{fontSize:12,color:"#8492A6",minWidth:80,fontWeight:600}}>{k}</span>
                      <span style={{fontSize:13,color:"#0A0F1E",fontWeight:500}}>{v}</span>
                    </div>
                  ))}
                  {aiResult&&<div style={{padding:"12px 16px",background:"#E8F0FF",borderRadius:12,border:"1px solid #BDD0FF",display:"flex",gap:14,alignItems:"center"}}>
                    <span style={{fontSize:12,color:"#0052CC",minWidth:80,fontWeight:600}}>AI Priority</span>
                    <Tag label={aiResult.priority} color={PRIORITY_COLORS[aiResult.priority]} bg={PRIORITY_BG[aiResult.priority]}/>
                    <span style={{fontSize:12,color:"#0052CC"}}>{aiResult.priority_reason}</span>
                  </div>}
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Btn variant="secondary" onClick={()=>setStep(2)}>← Back</Btn>
                  <Btn variant="success" loading={submitting} onClick={handleSubmit}>🚀 Submit Complaint</Btn>
                </div>
              </Card>
            )}
          </div>

          {/* AI Panel */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Card style={{background:"linear-gradient(135deg,#0A0F1E,#0D1B3E)",border:"none"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#60A5FA",marginBottom:4,letterSpacing:"0.5px"}}>🤖 AI ASSISTANT</div>
              <h4 style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:16}}>Smart Analysis</h4>
              <Btn loading={aiLoading} style={{width:"100%",background:"linear-gradient(135deg,#0066FF,#00D4AA)",border:"none",borderRadius:12,padding:"12px",color:"white",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}} onClick={analyzeAI}>
                {aiLoading?<Spinner size={16} color="#fff"/>:"⚡"} Analyze with AI
              </Btn>
              {aiResult?(
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[
                    {label:"Priority",content:<Tag label={aiResult.priority} color={PRIORITY_COLORS[aiResult.priority]} bg={PRIORITY_BG[aiResult.priority]}/>},
                    {label:"Severity",content:<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:6,background:"rgba(255,255,255,0.1)",borderRadius:4}}><div style={{width:`${aiResult.severity_score*10}%`,height:"100%",background:aiResult.severity_score>=7?"#FF3B5C":aiResult.severity_score>=4?"#FF9500":"#00C48C",borderRadius:4}}/></div><span style={{color:"#fff",fontWeight:700,fontSize:13}}>{aiResult.severity_score}/10</span></div>},
                    {label:"Resolution",content:<span style={{color:"#60A5FA",fontWeight:700,fontSize:13}}>⏱ {aiResult.estimated_resolution}</span>},
                  ].map((item,i)=>(
                    <div key={i} style={{padding:"10px 12px",background:"rgba(255,255,255,0.07)",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:6,fontWeight:600,textTransform:"uppercase"}}>{item.label}</div>
                      {item.content}
                    </div>
                  ))}
                  <div style={{padding:"10px 12px",background:"rgba(255,255,255,0.07)",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:8,fontWeight:600,textTransform:"uppercase"}}>Keywords</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      {aiResult.keywords?.map(k=><span key={k} style={{fontSize:11,background:"rgba(0,102,255,0.3)",color:"#93C5FD",padding:"2px 8px",borderRadius:8}}>{k}</span>)}
                    </div>
                  </div>
                </div>
              ):(
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:13,textAlign:"center",padding:"20px 0"}}>
                  Fill complaint details then click analyze
                </div>
              )}
            </Card>

            <Card style={{background:"#FFFBEB",border:"1px solid #FDE68A"}}>
              <h4 style={{fontSize:13,fontWeight:800,color:"#92400E",marginBottom:10}}>💡 Pro Tips</h4>
              {["Upload a clear photo for better AI detection","Include exact landmark or street name","Voice input available for faster filing","AI auto-assigns priority and department"].map((t,i)=>(
                <div key={i} style={{fontSize:12,color:"#78350F",padding:"5px 0",borderBottom:i<3?"1px solid #FDE68A":"none",display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{color:"#F59E0B"}}>•</span>{t}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// TRACK COMPLAINTS
// ============================================================
const TrackComplaints = ({complaints}) => {
  const [search,setSearch] = useState("");
  const [filterStatus,setFilterStatus] = useState("All");
  const [filterCat,setFilterCat] = useState("All");
  const [selected,setSelected] = useState(null);

  const filtered = complaints.filter(c=>{
    const ms=!search||c.id.toLowerCase().includes(search.toLowerCase())||c.title.toLowerCase().includes(search.toLowerCase())||c.location.toLowerCase().includes(search.toLowerCase());
    const mst=filterStatus==="All"||c.status===filterStatus;
    const mc=filterCat==="All"||c.category===filterCat;
    return ms&&mst&&mc;
  });

  if(selected) return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",padding:"32px 24px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:"#0066FF",cursor:"pointer",fontSize:14,fontWeight:700,marginBottom:20,display:"flex",alignItems:"center",gap:6}}>← Back to Complaints</button>
        <Card style={{padding:36}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
            <div>
              <span style={{fontSize:11,fontFamily:"monospace",color:"#8492A6",background:"#F7F9FC",padding:"3px 10px",borderRadius:8,fontWeight:600,border:"1px solid #E2E8F0"}}>{selected.id}</span>
              <h2 style={{fontSize:22,fontWeight:900,color:"#0A0F1E",marginTop:12,fontFamily:"'Syne',sans-serif"}}>{selected.title}</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
              <Tag label={selected.priority} color={PRIORITY_COLORS[selected.priority]} bg={PRIORITY_BG[selected.priority]}/>
              <Tag label={selected.status} color={STATUS_COLORS[selected.status]} bg={`${STATUS_COLORS[selected.status]}15`}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
            {[["Category",selected.category],["Department",selected.department],["Filed",fmtDate(selected.date)]].map(([k,v])=>(
              <div key={k} style={{background:"#F7F9FC",padding:16,borderRadius:14,border:"1px solid #E2E8F0"}}>
                <div style={{fontSize:11,color:"#8492A6",fontWeight:600,textTransform:"uppercase",marginBottom:6}}>{k}</div>
                <div style={{fontSize:14,fontWeight:800,color:"#0A0F1E"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:20}}>
            <h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:8}}>📍 Location</h4>
            <p style={{fontSize:14,color:"#4A5568"}}>{selected.location}</p>
          </div>
          <div style={{marginBottom:28}}>
            <h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:8}}>📝 Description</h4>
            <p style={{fontSize:14,color:"#8492A6",lineHeight:1.7}}>{selected.description}</p>
          </div>
          <h4 style={{fontSize:14,fontWeight:700,color:"#0A0F1E",marginBottom:20}}>📅 Progress Timeline</h4>
          {[
            {label:"Complaint Filed",done:true,date:fmtDate(selected.date)},
            {label:"Under Review",done:["Under Review","In Progress","Resolved"].includes(selected.status),date:"1-2 days"},
            {label:"In Progress",done:["In Progress","Resolved"].includes(selected.status),date:"3-7 days"},
            {label:"Resolved",done:selected.status==="Resolved",date:"7-14 days"},
          ].map((t,i,arr)=>(
            <div key={i} style={{display:"flex",gap:16}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:t.done?"#00C48C":"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:t.done?"#fff":"#8492A6",fontWeight:800,flexShrink:0,boxShadow:t.done?"0 4px 12px rgba(0,196,140,0.3)":"none"}}>{t.done?"✓":i+1}</div>
                {i<arr.length-1&&<div style={{width:2,height:32,background:t.done?"#00C48C":"#E2E8F0"}}/>}
              </div>
              <div style={{paddingBottom:i<arr.length-1?24:0,paddingTop:3}}>
                <div style={{fontSize:14,fontWeight:t.done?800:500,color:t.done?"#0A0F1E":"#8492A6"}}>{t.label}</div>
                <div style={{fontSize:12,color:"#8492A6",marginTop:2}}>{t.date}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",padding:"32px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{marginBottom:28}}>
          <h1 style={{fontSize:28,fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif"}}>🔍 Track Complaints</h1>
          <p style={{color:"#8492A6",marginTop:6}}>Monitor complaint status in real-time</p>
        </div>
        <Card style={{marginBottom:20,padding:"16px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:12}}>
            <InputField placeholder="Search by ID, title, or location..." value={search} onChange={e=>setSearch(e.target.value)}/>
            <SelectField value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} options={[{value:"All",label:"All Statuses"},...STATUSES.map(s=>({value:s,label:s}))]}/>
            <SelectField value={filterCat} onChange={e=>setFilterCat(e.target.value)} options={[{value:"All",label:"All Categories"},...CATEGORIES.map(c=>({value:c,label:c}))]}/>
          </div>
        </Card>
        <div style={{fontSize:13,color:"#8492A6",marginBottom:14,fontWeight:600}}>{filtered.length} complaints found</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtered.map(c=>(
            <div key={c.id} className="complaint-card" onClick={()=>setSelected(c)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{fontSize:11,fontFamily:"monospace",color:"#8492A6",background:"#F7F9FC",padding:"2px 8px",borderRadius:6,fontWeight:600,border:"1px solid #E2E8F0"}}>{c.id}</span>
                    <Tag label={c.category} color="#8492A6" bg="#F1F5F9"/>
                    <Tag label={c.priority} color={PRIORITY_COLORS[c.priority]} bg={PRIORITY_BG[c.priority]}/>
                  </div>
                  <h3 style={{fontSize:15,fontWeight:800,color:"#0A0F1E",marginBottom:6}}>{c.title}</h3>
                  <div style={{fontSize:12,color:"#8492A6",fontWeight:500}}>📍 {c.location} • 🏛 {c.department} • {fmtDate(c.date)}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,marginLeft:16}}>
                  <Tag label={c.status} color={STATUS_COLORS[c.status]} bg={`${STATUS_COLORS[c.status]}15`}/>
                  <div style={{fontSize:12,color:"#8492A6",fontWeight:500}}>👍 {c.votes} votes</div>
                </div>
              </div>
              <div className="progress-bar" style={{marginTop:14}}>
                <div className="progress-fill" style={{width:c.status==="Resolved"?"100%":c.status==="In Progress"?"65%":c.status==="Under Review"?"35%":"10%",background:STATUS_COLORS[c.status]}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ADMIN DASHBOARD
// ============================================================
const AdminDashboard = ({complaints,setComplaints,toast}) => {
  const [tab,setTab] = useState("overview");
  const [filterStatus,setFilterStatus] = useState("All");
  const [filterCat,setFilterCat] = useState("All");

  const filtered = complaints.filter(c=>(filterStatus==="All"||c.status===filterStatus)&&(filterCat==="All"||c.category===filterCat));
  const updateStatus = (id,status) => {setComplaints(prev=>prev.map(c=>c.id===id?{...c,status}:c));toast(`Status updated to ${status}`,"success");};

  const catStats = CATEGORIES.map(cat=>({label:cat,value:complaints.filter(c=>c.category===cat).length})).filter(c=>c.value>0).sort((a,b)=>b.value-a.value).slice(0,6);
  const statusStats = STATUSES.map(s=>({label:s,value:complaints.filter(c=>c.status===s).length,color:STATUS_COLORS[s]}));

  const tabs = [{id:"overview",label:"📊 Overview"},{id:"complaints",label:"📋 Complaints"},{id:"analytics",label:"📈 Analytics"}];

  const kpis = [
    {label:"Total",value:complaints.length,icon:"📋",color:"#0066FF",bg:"#E8F0FF"},
    {label:"Pending",value:complaints.filter(c=>c.status==="Pending").length,icon:"⏳",color:"#FF9500",bg:"#FFF8EC"},
    {label:"In Progress",value:complaints.filter(c=>c.status==="In Progress").length,icon:"⚙️",color:"#8B5CF6",bg:"#F3EEFF"},
    {label:"Resolved",value:complaints.filter(c=>c.status==="Resolved").length,icon:"✅",color:"#00C48C",bg:"#EDFAF5"},
    {label:"High Priority",value:complaints.filter(c=>c.priority==="HIGH").length,icon:"🔴",color:"#FF3B5C",bg:"#FFF0F3"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#F7F9FC",padding:"32px 24px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32}}>
          <div>
            <div style={{fontSize:13,color:"#8492A6",fontWeight:600,marginBottom:4}}>GOVERNMENT PORTAL</div>
            <h1 style={{fontSize:28,fontWeight:900,color:"#0A0F1E",fontFamily:"'Syne',sans-serif"}}>⚙️ Admin Dashboard</h1>
            <p style={{color:"#8492A6",marginTop:6}}>Manage and monitor all civic complaints</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:"#EDFAF5",border:"1px solid #6EE7B7",borderRadius:12}}>
            <div style={{width:8,height:8,background:"#00C48C",borderRadius:"50%",animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:13,color:"#065F46",fontWeight:700}}>System Live</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:28,background:"#F1F5F9",padding:4,borderRadius:14,width:"fit-content"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"9px 20px",borderRadius:10,border:"none",background:tab===t.id?"#fff":"transparent",color:tab===t.id?"#0066FF":"#8492A6",fontSize:13,fontWeight:tab===t.id?700:600,cursor:"pointer",transition:"all 0.2s",boxShadow:tab===t.id?"0 2px 8px rgba(0,0,0,0.08)":"none",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:24}}>
              {kpis.map((k,i)=>(
                <div key={i} className="stat-card">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:11,color:"#8492A6",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{k.label}</div>
                      <div style={{fontSize:32,fontWeight:900,color:k.color,fontFamily:"'Syne',sans-serif",marginTop:6}}>{k.value}</div>
                    </div>
                    <div style={{width:40,height:40,borderRadius:12,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{k.icon}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <Card><BarChart title="📊 Complaints by Category" data={catStats} color="#0066FF"/></Card>
              <Card><DonutChart title="🎯 By Status" data={statusStats}/></Card>
            </div>
          </div>
        )}

        {tab==="complaints"&&(
          <div>
            <Card style={{marginBottom:16,padding:"14px 20px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <SelectField value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} options={[{value:"All",label:"All Statuses"},...STATUSES.map(s=>({value:s,label:s}))]}/>
                <SelectField value={filterCat} onChange={e=>setFilterCat(e.target.value)} options={[{value:"All",label:"All Categories"},...CATEGORIES.map(c=>({value:c,label:c}))]}/>
              </div>
            </Card>
            <div style={{fontSize:13,color:"#8492A6",marginBottom:14,fontWeight:600}}>{filtered.length} complaints</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {filtered.map(c=>(
                <Card key={c.id} style={{padding:"18px 20px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                        <span style={{fontSize:11,fontFamily:"monospace",color:"#8492A6",background:"#F7F9FC",padding:"2px 8px",borderRadius:6,fontWeight:600,border:"1px solid #E2E8F0"}}>{c.id}</span>
                        <Tag label={c.category} color="#8492A6" bg="#F1F5F9"/>
                        <Tag label={c.priority} color={PRIORITY_COLORS[c.priority]} bg={PRIORITY_BG[c.priority]}/>
                      </div>
                      <h4 style={{fontSize:14,fontWeight:800,color:"#0A0F1E",marginBottom:6}}>{c.title}</h4>
                      <div style={{fontSize:12,color:"#8492A6",fontWeight:500}}>📍 {c.location} • 🏛 {c.department} • {fmtDate(c.date)}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
                      <Tag label={c.status} color={STATUS_COLORS[c.status]} bg={`${STATUS_COLORS[c.status]}15`}/>
                      <SelectField value={c.status} onChange={e=>updateStatus(c.id,e.target.value)} style={{fontSize:12,padding:"5px 10px",width:"auto",minWidth:140}}
                        options={STATUSES.map(s=>({value:s,label:s}))}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="analytics"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <Card><BarChart title="📊 Category Distribution" data={catStats} color="#8B5CF6"/></Card>
            <Card><DonutChart title="🎯 Priority Breakdown" data={[{label:"HIGH",value:complaints.filter(c=>c.priority==="HIGH").length,color:"#FF3B5C"},{label:"MEDIUM",value:complaints.filter(c=>c.priority==="MEDIUM").length,color:"#FF9500"},{label:"LOW",value:complaints.filter(c=>c.priority==="LOW").length,color:"#00C48C"}]}/></Card>
            <Card>
              <h4 style={{fontSize:14,fontWeight:800,color:"#0A0F1E",marginBottom:18}}>📍 Top Affected Areas</h4>
              {["MG Road, Delhi","Karol Bagh","Dwarka Sector 10","Rohini Sector 3","Janakpuri West"].map((area,i)=>(
                <div key={area} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <span style={{fontSize:12,fontWeight:800,color:"#8492A6",width:20}}>#{i+1}</span>
                  <div style={{flex:1,background:"#F1F5F9",borderRadius:6,height:24,overflow:"hidden"}}>
                    <div style={{width:`${100-i*15}%`,height:"100%",background:`linear-gradient(90deg,#0066FF,#00D4AA)`,borderRadius:6,display:"flex",alignItems:"center",paddingLeft:10}}>
                      <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{area}</span>
                    </div>
                  </div>
                  <span style={{fontSize:13,fontWeight:800,color:"#0A0F1E",minWidth:50}}>{12-i*2} issues</span>
                </div>
              ))}
            </Card>
            <Card>
              <h4 style={{fontSize:14,fontWeight:800,color:"#0A0F1E",marginBottom:18}}>📅 Performance Metrics</h4>
              {[{label:"Avg Resolution Time",value:"4.2 days",icon:"⏱"},{label:"Resolution Rate",value:`${Math.round(complaints.filter(c=>c.status==="Resolved").length/complaints.length*100)||0}%`,icon:"✅"},{label:"Citizen Satisfaction",value:"87%",icon:"⭐"},{label:"SLA Compliance",value:"94%",icon:"📊"}].map((s,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#F7F9FC",borderRadius:12,marginBottom:8,border:"1px solid #E2E8F0"}}>
                  <span style={{fontSize:13,color:"#4A5568",fontWeight:600}}>{s.icon} {s.label}</span>
                  <span style={{fontSize:18,fontWeight:900,color:"#0066FF",fontFamily:"'Syne',sans-serif"}}>{s.value}</span>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// CHATBOT
// ============================================================
const Chatbot = () => {
  const [open,setOpen] = useState(false);
  const [messages,setMessages] = useState([{role:"assistant",content:"👋 Hi! I'm NaviBot, your AI civic assistant. How can I help you today?"}]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const chatRef = useRef();

  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[messages]);

  const send = async () => {
    if(!input.trim()||loading) return;
    const userMsg = {role:"user",content:input};
    setMessages(prev=>[...prev,userMsg]);
    setInput("");
    setLoading(true);
    const reply = await AIService.chatbot(input,messages);
    setMessages(prev=>[...prev,{role:"assistant",content:reply}]);
    setLoading(false);
  };

  const suggestions = ["How do I file a complaint?","Track my complaint","What departments handle potholes?"];

  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} style={{position:"fixed",bottom:24,right:24,width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#0066FF,#00D4AA)",border:"none",cursor:"pointer",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,102,255,0.4)",zIndex:1000,transition:"transform 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        {open?"✕":"🤖"}
      </button>

      {open&&(
        <div className="chatbot-window">
          <div style={{background:"linear-gradient(135deg,#0066FF,#0099CC)",padding:"18px 20px",color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🤖</div>
              <div>
                <div style={{fontWeight:800,fontSize:16}}>NaviBot</div>
                <div style={{fontSize:11,opacity:0.75,display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:6,height:6,background:"#00C48C",borderRadius:"50%"}}/>AI Civic Assistant • Online
                </div>
              </div>
            </div>
          </div>

          <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12,background:"#F7F9FC"}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"82%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#0066FF,#0099CC)":"#fff",color:m.role==="user"?"#fff":"#0A0F1E",fontSize:13,lineHeight:1.6,boxShadow:"0 2px 8px rgba(0,0,0,0.08)",fontWeight:500}}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading&&(
              <div style={{display:"flex",justifyContent:"flex-start"}}>
                <div style={{padding:"12px 16px",background:"#fff",borderRadius:"18px 18px 18px 4px",display:"flex",gap:5,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#CBD5E1",animation:`bounce 1s ${i*0.2}s infinite`}}/>)}
                </div>
              </div>
            )}
            {messages.length===1&&(
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {suggestions.map((s,i)=>(
                  <button key={i} onClick={()=>{setInput(s);}} style={{background:"#fff",border:"1px solid #E2E8F0",borderRadius:10,padding:"8px 14px",fontSize:12,color:"#0066FF",cursor:"pointer",textAlign:"left",fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#0066FF";e.currentTarget.style.background="#E8F0FF";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.background="#fff";}}>
                    💬 {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{padding:"12px 16px",borderTop:"1px solid #E2E8F0",display:"flex",gap:8,background:"#fff"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask NaviBot..." className="input-field" style={{flex:1,padding:"10px 14px",fontSize:13}}/>
            <button onClick={send} disabled={loading} style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#0066FF,#00D4AA)",border:"none",cursor:"pointer",color:"#fff",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page,setPage] = useState("home");
  const [user,setUser] = useState(null);
  const [complaints,setComplaints] = useState(SAMPLE_COMPLAINTS);
  const [toasts,setToasts] = useState([]);

  const toast = (message,type="info") => {
    const id = Date.now();
    setToasts(prev=>[...prev,{id,message,type}]);
    setTimeout(()=>setToasts(prev=>prev.filter(t=>t.id!==id)),4000);
  };
  const removeToast = id => setToasts(prev=>prev.filter(t=>t.id!==id));
  const addComplaint = c => setComplaints(prev=>[c,...prev]);

  const protect = (Page,props={}) => {
    if(!user) return <AuthPage type="login" setUser={setUser} setPage={setPage} toast={toast}/>;
    return <Page {...props}/>;
  };

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={setPage} complaints={complaints}/>;
      case "login": return <AuthPage type="login" setUser={setUser} setPage={setPage} toast={toast}/>;
      case "register": return <AuthPage type="register" setUser={setUser} setPage={setPage} toast={toast}/>;
      case "dashboard": return protect(Dashboard,{user,complaints,setPage});
      case "submit": return protect(SubmitComplaint,{user,setPage,addComplaint,toast});
      case "track": return <TrackComplaints complaints={complaints}/>;
      case "admin": return user?.role==="admin"?<AdminDashboard complaints={complaints} setComplaints={setComplaints} toast={toast}/>:<AuthPage type="login" setUser={setUser} setPage={setPage} toast={toast}/>;
      default: return <HomePage setPage={setPage} complaints={complaints}/>;
    }
  };

  return (
    <>
      <FontImport/>
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} toast={toast}/>
      <main>{renderPage()}</main>
      <Chatbot/>
      <Toast toasts={toasts} remove={removeToast}/>
    </>
  );
}