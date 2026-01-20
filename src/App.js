import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Info, Folder, HardDrive, Settings as SettingsIcon, Monitor, User
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  // System Settings States
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBTOn, setIsBTOn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Apps States
  const [note, setNote] = useState('Productivity Mode On!\n- Use File Manager to see storage.\n- Calculator is now pro.');
  const [calcValue, setCalcValue] = useState('0');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070",
    "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=2070",
    "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') {
      try { setCalcValue(String(eval(calcValue.replace('×', '*').replace('÷', '/')))); } 
      catch { setCalcValue('Error'); }
    } else { setCalcValue(calcValue === '0' ? val : calcValue + val); }
  };

  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Apple size={60} color="white" fill="white" className="animate-pulse" />
    </div>
  );

  return (
    <div className={`h-screen w-full relative font-sans select-none overflow-hidden transition-colors duration-500 ${isDark ? 'dark' : ''}`} style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Dynamic Wallpaper */}
      <motion.div key={wallpaper} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6 tracking-tight">Danithu</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PIN: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-blue-500/50 transition-all" />
              <button type="submit" className="absolute right-2 p-1.5 bg-blue-500 rounded-full hover:bg-blue-600"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          {/* Menu Bar */}
          <div className="h-8 bg-white/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center">
              <Apple size={16} fill="white" className="cursor-pointer hover:opacity-70" onClick={() => setActiveApp('About')} />
              <span className="font-bold cursor-default">Finder</span>
              <span className="opacity-80 cursor-default hidden sm:block">File</span>
              <span className="opacity-80 cursor-default hidden sm:block">Edit</span>
              <span className="opacity-80 cursor-default hidden sm:block">View</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} className={isWifiOn ? 'text-white' : 'text-white/30'} />
              <Battery size={20} />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Improved Control Center */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-10 right-2 w-80 bg-white/70 backdrop-blur-3xl rounded-[2rem] shadow-2xl p-4 z-[110] border border-white/40 grid grid-cols-2 gap-3 text-black">
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsWifiOn(!isWifiOn)}>
                    <div className={`p-2 rounded-full ${isWifiOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}><Wifi size={14} /></div>
                    <span className="text-[11px] font-bold">Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsBTOn(!isBTOn)}>
                    <div className={`p-2 rounded-full ${isBTOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}><Bluetooth size={14} /></div>
                    <span className="text-[11px] font-bold">Bluetooth</span>
                  </div>
                </div>
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer" onClick={() => setIsDark(!isDark)}>
                   <Moon size={20} className={isDark ? 'text-blue-500' : 'text-gray-500'} />
                   <span className="text-[11px] font-bold">Dark Mode</span>
                </div>
                <div className="col-span-2 bg-white/50 p-4 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3"><Sun size={16}/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3"><Volume2 size={16}/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Apps Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black p-4 flex flex-col">
                    <div className="h-20 flex items-end justify-end text-white text-5xl font-light mb-4 px-2">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2 flex-1">
                      {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                        <button key={btn} onClick={() => handleCalc(btn)} className={`rounded-full flex items-center justify-center text-white text-xl transition-all ${btn === '=' ? 'bg-orange-500' : isNaN(btn) ? 'bg-white/10 hover:bg-white/20' : 'bg-white/30 hover:bg-white/40'} ${btn === '0' ? 'col-span-2 rounded-3xl' : ''}`}>{btn}</button>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-gray-100/50">
                    <div className="w-1/3 bg-white/40 p-4 border-r border-black/5 flex flex-col gap-2">
                       <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg flex items-center gap-2 font-bold text-xs"><Monitor size={14}/> Display</div>
                       <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 font-medium text-xs text-gray-600"><User size={14}/> Profile</div>
                    </div>
                    <div className="flex-1 p-6 overflow-auto">
                      <h2 className="text-xl font-bold mb-4 text-black">Display Settings</h2>
                      <p className="text-xs opacity-50 mb-4">Choose your desktop wallpaper</p>
                      <div className="grid grid-cols-2 gap-3">
                        {wallpapers.map((url, i) => (
                          <div key={i} onClick={() => setWallpaper(url)} className={`cursor-pointer rounded-lg overflow-hidden border-2 ${wallpaper === url ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent shadow-sm'}`}><img src={url} className="w-full h-20 object-cover" alt="wp" /></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'Files' && (
                  <div className="h-full bg-white flex flex-col">
                    <div className="h-10 bg-gray-100 border-b flex items-center px-4 gap-4">
                      <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-gray-300"/><div className="w-2 h-2 rounded-full bg-gray-300"/></div>
                      <span className="text-xs font-bold text-gray-500">Macintosh HD</span>
                    </div>
                    <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start">
                      <div className="flex flex-col items-center gap-1 group cursor-pointer"><Folder size={40} className="text-blue-500 fill-blue-500/20 group-hover:fill-blue-500/40" /><span className="text-[10px] font-medium text-black">Documents</span></div>
                      <div className="flex flex-col items-center gap-1 group cursor-pointer"><Folder size={40} className="text-blue-500 fill-blue-500/20 group-hover:fill-blue-500/40" /><span className="text-[10px] font-medium text-black">Downloads</span></div>
                      <div className="flex flex-col items-center gap-1 group cursor-pointer"><ImageIcon size={40} className="text-blue-500 opacity-70" /><span className="text-[10px] font-medium text-black">Pictures</span></div>
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
            <DockIcon icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(!showLaunchpad)} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Folder size={30} color="white" />} color="bg-blue-500" onClick={() => setActiveApp('Files')} />
            <DockIcon icon={<CalcIcon size={30} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
            <DockIcon icon={<SettingsIcon size={30} color="white" />} color="bg-gray-500 shadow-gray-500/40" onClick={() => setActiveApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// Window Component with fixed "Floating" issue
function Window({ title, children, close }) {
  return (
    <motion.div 
      drag dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} 
      animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
      className="fixed w-[500px] h-[400px] bg-white/90 backdrop-blur-3xl rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/5"
    >
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing">
        <div className="flex gap-1.5">
          <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all" />
          <div className="w-3 h-3 bg-[#FEBC2E] rounded-full" />
          <div className="w-3 h-3 bg-[#28C840] rounded-full" />
        </div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-shadow hover:shadow-2xl`}>{icon}</motion.div>;
}