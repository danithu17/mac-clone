import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, LayoutGrid, Calculator as CalcIcon, Sliders, Sun, Volume2, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Mail, Search, Bell, Chrome, Github, Terminal, Camera, 
  Clock as ClockIcon, Calendar as CalIcon, Power
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  // System States
  const [brightness, setBrightness] = useState(100);
  const [userName, setUserName] = useState('Danithu');
  const [userPass, setUserPass] = useState('1234');
  const [inputPass, setInputPass] = useState('');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 3000);
    
    // Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if (e.metaKey && e.code === 'Space') { e.preventDefault(); setShowSpotlight(prev => !prev); }
      if (e.key === 'Escape') { setShowSpotlight(false); setShowControlCenter(false); setShowAbout(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Apple size={80} fill="white" className="mb-14 drop-shadow-2xl" />
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -192 }} animate={{ x: 0 }} transition={{ duration: 2.5 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen bg-black flex items-center justify-center cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />
      <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1.1 }} className="text-white text-9xl font-bold tracking-tighter z-10">Hello</motion.h1>
      <p className="absolute bottom-12 text-white/40 tracking-[5px] uppercase text-xs">Click to Configure</p>
    </div>
  );

  if (isSetup) return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="relative w-full max-w-4xl h-[500px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-gray-900 p-12 text-white flex flex-col justify-between">
          <Apple size={30} fill="white" />
          <h2 className="text-3xl font-bold">Welcome</h2>
          <div className="h-1 bg-white/20 w-full" />
        </div>
        <div className="flex-1 p-20 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Set up your profile</h3>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="text-xl border-b py-2 mb-8 outline-none" placeholder="Name" />
          <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white w-max px-12 py-3 rounded-full font-bold shadow-lg">Get Started</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden transition-all duration-700" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* LOGIN */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden shadow-2xl">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" />
            </div>
            <h1 className="text-2xl font-bold mb-8 tracking-tight">{userName}</h1>
            <input type="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && inputPass === userPass && setIsLocked(false)} className="bg-white/10 border border-white/20 rounded-full px-6 py-2 text-center outline-none w-64 backdrop-blur-md" placeholder="Enter Password" />
            <button onClick={() => { if(inputPass === userPass) setIsLocked(false); }} className="mt-4 p-2 bg-white/20 rounded-full"><ArrowRight size={20}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP UI */}
      {!isLocked && (
        <div className="h-full w-full flex flex-col" onClick={() => { setShowControlCenter(false); setShowAbout(false); }}>
          
          {/* Menu Bar */}
          <div className="h-8 bg-white/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-4 font-bold">
              <Apple size={15} fill="white" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowAbout(!showAbout); }} />
              <span className="cursor-default">Finder</span>
              <div className="hidden md:flex gap-4 opacity-70 font-medium"><span>File</span><span>Edit</span><span>View</span><span>Go</span></div>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={14} /><Search size={14} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowSpotlight(true); }} />
              <Sliders size={14} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowControlCenter(!showControlCenter); }} />
              <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* About This Mac Popup */}
          <AnimatePresence>
            {showAbout && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-10 left-4 w-64 bg-white/80 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl z-[150] text-black border border-white">
                <Apple size={40} className="mx-auto mb-4" />
                <h3 className="text-center font-bold text-lg">MacBook Pro</h3>
                <p className="text-center text-[10px] opacity-50 mb-4">Version 15.0 Sequoia</p>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between"><span>Processor</span><span className="font-bold">Apple M3 Max</span></div>
                  <div className="flex justify-between"><span>Memory</span><span className="font-bold">32 GB</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Widgets (Sequoia Style) */}
          <div className="absolute top-12 right-6 space-y-4 pointer-events-none">
             <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-[30px] border border-white/20 p-5 text-white flex flex-col justify-center items-center shadow-xl">
                <ClockIcon size={40} className="mb-2 opacity-80" />
                <span className="text-2xl font-bold tracking-tighter">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
             <div className="w-40 h-40 bg-black/20 backdrop-blur-md rounded-[30px] border border-white/10 p-5 text-white shadow-xl">
                <p className="text-red-400 font-bold text-xs">WEDNESDAY</p>
                <p className="text-5xl font-bold">21</p>
             </div>
          </div>

          {/* Spotlight Search */}
          <AnimatePresence>
            {showSpotlight && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] bg-black/10 backdrop-blur-sm pt-[15vh] flex justify-center" onClick={() => setShowSpotlight(false)}>
                <div onClick={(e) => e.stopPropagation()} className="w-[600px] bg-white/70 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/50 h-max overflow-hidden">
                   <div className="flex items-center p-4 gap-4">
                      <Search size={24} className="text-gray-400" />
                      <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent w-full text-2xl outline-none text-black font-light" placeholder="Spotlight Search" />
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control Center Sidebar */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="absolute right-2 top-10 w-80 bg-white/70 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl z-[150] border border-white/50 text-black">
                 <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-2 shadow-sm border border-white/50">
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Wifi size={14}/></div><span className="text-[11px] font-bold">Wi-Fi</span></div>
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Bluetooth size={14}/></div><span className="text-[11px] font-bold">Bluetooth</span></div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-2xl flex items-center gap-2 border border-white/50 shadow-sm">
                       <div className="bg-indigo-600 p-2 rounded-full text-white"><Moon size={16}/></div>
                       <span className="text-[11px] font-bold">Focus</span>
                    </div>
                 </div>
                 <div className="bg-white/50 p-4 rounded-2xl border border-white/50 shadow-sm space-y-4">
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] font-bold text-gray-400">BRIGHTNESS</span>
                       <div className="flex items-center gap-2"><Sun size={14}/><input type="range" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full accent-black" /></div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* App Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                <div className="h-full flex items-center justify-center text-black/20 italic font-bold text-4xl">{activeApp}</div>
              </Window>
            )}
          </AnimatePresence>

          {/* Dock (Sequoia Magnification Feel) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<Chrome size={28} color="white" />} color="bg-blue-500 shadow-blue-500/40" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<Github size={28} color="white" />} color="bg-gray-900 shadow-xl" onClick={() => setActiveApp('GitHub')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={28} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={28} color="white" />} color="bg-red-600 shadow-red-500/40" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[800px] h-[500px] bg-white/95 rounded-2xl shadow-2xl flex flex-col border border-white z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 border-b">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 uppercase tracking-[2px] text-black mr-12">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -15, scale: 1.25, margin: "0 10px" }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={onClick}
      className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}
    >
      {icon}
    </motion.div>
  );
}