import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Info, Folder, Settings as SettingsIcon, Monitor, User, Laptop, 
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isSetup, setIsSetup] = useState(true);
  const [setupStep, setSetupStep] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [userName, setUserName] = useState('');
  const [deviceName, setDeviceName] = useState("Danithu's MacBook");

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. BOOTING SCREEN (Fixed Alignment) ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex flex-col items-center"
      >
        <Apple size={85} color="white" fill="white" />
        <div className="w-48 h-1.5 bg-white/20 rounded-full mt-14 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }} 
            animate={{ left: "0%" }} 
            transition={{ duration: 2.5, ease: "easeInOut" }} 
            className="absolute inset-0 bg-white" 
          />
        </div>
      </motion.div>
    </div>
  );

  // --- 2. SETUP ASSISTANT (Hello Animation) ---
  if (isSetup) return (
    <div className="h-screen bg-[#F5F5F7] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="w-full max-w-5xl h-[650px] bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl flex border border-white/50 overflow-hidden"
      >
        {/* Left Side: Animated Hello */}
        <div className="w-[45%] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Apple size={45} fill="white" />
          </motion.div>
          
          <div className="relative z-10">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-extrabold tracking-tight mb-4"
            >
              Hello
            </motion.h1>
            <p className="text-blue-100 text-lg opacity-80">Welcome to your new MacBook experience.</p>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Configuration */}
        <div className="flex-1 p-16 flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            {setupStep === 1 ? (
              <motion.div 
                key="step1"
                initial={{ x: 30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                exit={{ x: -30, opacity: 0 }}
                className="w-full max-w-sm"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-blue-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Language</h2>
                <p className="text-gray-500 mb-10">Choose the language you want to use for your MacBook.</p>
                <div className="space-y-2 mb-10">
                  {['English (US)', 'Sinhala (Sri Lanka)', 'Japanese'].map(lang => (
                    <div key={lang} className={`p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${lang === 'English (US)' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:bg-gray-50'}`}>{lang}</div>
                  ))}
                </div>
                <button onClick={() => setSetupStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">Continue <ChevronRight size={18}/></button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ x: 30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                className="w-full max-w-sm"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || 'User'}`} alt="avatar" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-500 mb-8">Enter your name to personalize your Mac.</p>
                <input 
                  autoFocus
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 mb-8 text-center font-bold text-lg outline-none focus:ring-4 ring-blue-500/10 transition-all" 
                  placeholder="Your Name" 
                />
                <button 
                  disabled={!userName}
                  onClick={() => setIsSetup(false)} 
                  className="w-full bg-blue-600 disabled:opacity-50 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                >
                  Complete Setup
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      
      <motion.div key={wallpaper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Main OS UI (Menu Bar, Dock, Windows) */}
      {!isLocked ? (
        <div className="h-full w-full relative">
          {/* Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-semibold">
              <Apple size={16} fill="white" className="cursor-pointer" onClick={() => setActiveApp('About')} />
              <span>{activeApp || 'Finder'}</span>
              <div className="hidden md:flex gap-4 opacity-80 font-medium text-[12px]"><span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Window</span></div>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} /><Battery size={20} />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Render Active App Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                <div className="h-full p-6 text-black">
                  {activeApp === 'About' && (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <Apple size={60} fill="black" />
                      <h2 className="text-2xl font-bold">{deviceName}</h2>
                      <div className="text-xs bg-gray-100 p-4 rounded-2xl w-full max-w-xs space-y-2">
                        <div className="flex justify-between"><span>Processor</span><span className="font-bold">Apple M3 Max</span></div>
                        <div className="flex justify-between"><span>Memory</span><span className="font-bold">64 GB</span></div>
                        <div className="flex justify-between"><span>User</span><span className="font-bold">{userName}</span></div>
                      </div>
                    </div>
                  )}
                  {/* ... More Apps can go here ... */}
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    {activeApp} UI is currently being optimized...
                  </div>
                </div>
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Globe size={28} color="white" />} color="bg-blue-500 shadow-blue-500/20" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500 shadow-green-500/20" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<ImageIcon size={28} color="white" />} color="bg-gradient-to-br from-purple-400 to-pink-500 shadow-pink-500/20" onClick={() => setActiveApp('Photos')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-500 shadow-gray-500/20" onClick={() => setActiveApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      ) : (
        /* Login Screen */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
          <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md mb-6 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
          </div>
          <h1 className="text-3xl font-bold mb-8 tracking-tight">{userName}</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password: 1234" 
              className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-center outline-none backdrop-blur-md w-72 focus:ring-4 ring-blue-500/30 transition-all placeholder:text-white/40 font-medium" 
            />
            <button type="submit" className="absolute right-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"><ArrowRight size={18} /></button>
          </form>
          <p className="mt-12 text-sm opacity-60 font-medium">Touch ID or Enter Password</p>
        </motion.div>
      )}
    </div>
  );
}

// --- REUSABLE UI COMPONENTS ---

function Window({ title, children, close }) {
  return (
    <motion.div 
      drag dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} 
      animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
      className="fixed w-[700px] h-[500px] bg-white/95 backdrop-blur-3xl rounded-[24px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/10"
    >
      <div className="h-12 bg-gray-100/50 flex items-center px-5 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200/50">
        <div className="flex gap-2">
          <div onClick={close} className="w-3.5 h-3.5 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all shadow-inner" />
          <div className="w-3.5 h-3.5 bg-[#FEBC2E] rounded-full shadow-inner" />
          <div className="w-3.5 h-3.5 bg-[#28C840] rounded-full shadow-inner" />
        </div>
        <span className="flex-1 text-center text-[12px] font-bold opacity-30 uppercase tracking-[3px] text-black mr-12">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -18, scale: 1.35 }} 
      transition={{ type: "spring", stiffness: 400, damping: 12 }} 
      onClick={onClick} 
      className={`${color} w-14 h-14 rounded-[1.4rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/20`}
    >
      {icon}
    </motion.div>
  );
}

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className={`${color} w-20 h-20 rounded-[1.8rem] flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-105 transition-transform`}>{icon}</div>
      <span className="text-white text-sm font-semibold opacity-90 group-hover:opacity-100">{name}</span>
    </div>
  );
}