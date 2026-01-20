import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Mail, Eye, EyeOff, MousePointer2, Trash2, Clock, Star, FileText,
  Github, ExternalLink, Code2
} from 'lucide-react';

export default function App() {
  // Navigation States
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  
  // User & System States
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [calcValue, setCalcValue] = useState('0');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);

  // GitHub Projects Data (මෙහි ඔයාගේ Projects විස්තර දාන්න)
  const myProjects = [
    { name: "E-Commerce App", desc: "React & Firebase based shop", link: "#", tech: "React" },
    { name: "Portfolio Website", desc: "Personal site with animations", link: "#", tech: "Tailwind" },
    { name: "Chat Application", desc: "Real-time chat with Socket.io", link: "#", tech: "Node.js" }
  ];

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 3000);
  }, []);

  const startSetup = () => { setShowHello(false); setIsSetup(true); };

  // --- 1. PERFECT BOOTING SCREEN (Fixed Apple Logo Alignment) ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center translate-y-[-20%]"> {/* Precise Alignment */}
        <Apple size={75} fill="white" className="mb-16" />
        <div className="w-44 h-[3px] bg-white/20 rounded-full overflow-hidden">
          <motion.div initial={{ x: -176 }} animate={{ x: 0 }} transition={{ duration: 2.5, ease: "easeInOut" }} className="w-full h-full bg-white" />
        </div>
      </div>
    </div>
  );

  // --- 2. HELLO ANIMATION ---
  if (showHello) return (
    <div onClick={startSetup} className="h-screen flex items-center justify-center cursor-pointer bg-black overflow-hidden relative">
      <div className="absolute inset-0 opacity-40 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${activeWallpaper})` }} />
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-white text-8xl font-bold tracking-tighter relative z-10"
      >
        Hello
      </motion.h1>
      <div className="absolute bottom-12 text-white/50 animate-pulse text-xs tracking-[4px] font-bold uppercase">Click to start</div>
    </div>
  );

  // --- 3. SETUP ASSISTANT ---
  if (isSetup) return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-200">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl h-[550px] bg-white rounded-[32px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between">
          <Apple size={30} fill="white" />
          <h2 className="text-3xl font-bold">Configure your Mac</h2>
          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden"><div className={`h-full bg-white transition-all ${setupStep === 1 ? 'w-1/2' : 'w-full'}`} /></div>
        </div>
        <div className="flex-1 p-16 flex flex-col justify-center">
          {setupStep === 1 ? (
            <div>
              <h3 className="text-2xl font-bold mb-6">User Name</h3>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border-b-2 py-2 outline-none text-xl focus:border-blue-600 mb-8" placeholder="Enter name" />
              <button onClick={() => setSetupStep(2)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Next</button>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-6">Create Password</h3>
              <input type="password" value={userPass} onChange={(e) => setUserPass(e.target.value)} className="w-full border-b-2 py-2 outline-none text-xl focus:border-blue-600 mb-8" placeholder="Password" />
              <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Complete</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* --- 4. LOGIN --- */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/30 text-white">
            <div className="w-24 h-24 rounded-full bg-gray-500 mb-6 overflow-hidden ring-4 ring-white/20">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="user" />
            </div>
            <h1 className="text-2xl font-bold mb-6">{userName || 'User'}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(inputPass === userPass) setIsLocked(false); }} className="relative">
              <input type="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} className="bg-white/20 border border-white/20 rounded-full px-6 py-2 text-center outline-none w-64 backdrop-blur-md" placeholder="Password" />
              <button type="submit" className="absolute right-2 top-1.5 p-1 bg-white/20 rounded-full"><ArrowRight size={18}/></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 5. DESKTOP --- */}
      {!isLocked && (
        <div className="h-full w-full flex flex-col">
          {/* Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-4 items-center font-bold">
              <Apple size={15} fill="white" className="cursor-pointer" onClick={() => setActiveApp('About')} />
              <span>{activeApp || 'Finder'}</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={14} /><Battery size={18} />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {/* SETTINGS APP */}
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#F5F5F7] text-black">
                    <div className="w-1/3 bg-white/40 border-r border-gray-200 p-4 space-y-1">
                      <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold"><User size={14}/> General</div>
                      <div onClick={() => setActiveApp('Projects')} className="p-2 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs cursor-pointer"><Github size={14}/> GitHub Projects</div>
                      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs"><Monitor size={14}/> Wallpapers</div>
                    </div>
                    <div className="flex-1 p-8 overflow-auto">
                      <h2 className="text-2xl font-bold mb-6">General Settings</h2>
                      <div className="bg-white p-4 rounded-xl border mb-6">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Owner</p>
                        <p className="text-lg font-bold">{userName}</p>
                      </div>
                      <h3 className="font-bold mb-4">Appearance</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {wallpapers.map(w => <img key={w} src={w} onClick={() => setActiveWallpaper(w)} className={`h-16 w-full object-cover rounded-lg cursor-pointer border-2 ${activeWallpaper === w ? 'border-blue-500' : 'border-transparent'}`} />)}
                      </div>
                    </div>
                  </div>
                )}

                {/* GITHUB PROJECTS APP */}
                {activeApp === 'Projects' && (
                  <div className="h-full bg-white text-black p-8">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="bg-gray-900 p-3 rounded-2xl text-white"><Github size={30}/></div>
                       <div>
                         <h2 className="text-2xl font-bold">GitHub Portfolio</h2>
                         <p className="text-sm text-gray-500">Explore my latest coding projects</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       {myProjects.map(p => (
                         <div key={p.name} className="p-5 border rounded-2xl hover:border-blue-500 transition-all group">
                            <div className="flex justify-between items-start mb-2">
                              <Code2 className="text-blue-600" size={20}/>
                              <ExternalLink size={16} className="text-gray-300 group-hover:text-blue-500"/>
                            </div>
                            <h3 className="font-bold text-lg">{p.name}</h3>
                            <p className="text-xs text-gray-500 mb-4">{p.desc}</p>
                            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md font-bold text-gray-600">{p.tech}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* CALCULATOR */}
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black flex flex-col p-4">
                    <div className="flex-1 flex items-end justify-end text-white text-5xl font-light mb-4">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {['C','÷','×','7','8','9','-','4','5','6','+','1','2','3','=','0'].map(b => (
                        <button key={b} onClick={() => setCalcValue(b==='C'?'0':b)} className={`h-12 rounded-full text-white text-lg ${b==='='?'bg-orange-500':'bg-white/20'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[24px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<LayoutGrid size={24} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-8 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Github size={24} color="white" />} color="bg-gray-900 shadow-xl" onClick={() => setActiveApp('Projects')} />
             <DockIcon icon={<SettingsIcon size={24} color="white" />} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={24} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-8 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={24} color="white" />} color="bg-black" onClick={() => { setIsLocked(true); setInputPass(''); }} />
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Window Component
function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[650px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 uppercase tracking-[2px] text-black mr-12">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -12, scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}