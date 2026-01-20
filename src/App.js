import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, X, Sliders, Sun, Volume2, Music, Search, SkipBack, SkipForward
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  
  const [note, setNote] = useState('My Notes...');
  const [calcValue, setCalcValue] = useState('0');

  // ඔක්කොම Online Wallpapers විතරයි දැන් තියෙන්නේ
  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openApp = (appName) => {
    setActiveApp(appName);
    setShowLaunchpad(false); // App එකක් ඕපන් කරද්දී ලෝන්ච් පෑඩ් එක වැහෙනවා
  };

  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Apple size={60} color="white" fill="white" className="animate-pulse" />
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Background Wallpaper */}
      <motion.div 
        key={wallpaper} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700" 
        style={{ backgroundImage: `url(${wallpaper})` }} 
      />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Pass: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          {/* Menu Bar */}
          <div className="h-8 bg-black/20 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/10">
            <div className="flex gap-5 items-center font-bold"><Apple size={16} fill="white" /><span>Finder</span></div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} /><Sliders size={16} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Control Center */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-10 right-4 w-72 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 z-[110] border border-white/40 text-black">
                <div className="bg-white/50 p-3 rounded-xl space-y-4">
                  <div className="flex items-center gap-3"><Sun size={14} /><input type="range" className="w-full accent-blue-500" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3"><Volume2 size={14} /><input type="range" className="w-full accent-blue-500" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* App Windows - Improved Dragging */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && <div className="h-full bg-[#1e1e1e] p-4 text-white flex items-center justify-center text-4xl">0</div>}
                {activeApp === 'Notes' && <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-full p-6 bg-transparent outline-none resize-none text-gray-800 text-lg" autoFocus />}
                {activeApp === 'Settings' && (
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {wallpapers.map((url, i) => (
                        <div key={i} onClick={() => setWallpaper(url)} className={`cursor-pointer rounded-xl overflow-hidden border-4 ${wallpaper === url ? 'border-blue-500 shadow-md' : 'border-transparent hover:scale-105 transition-all'}`}><img src={url} className="w-full h-24 object-cover" alt="wp" /></div>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Music' && <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center flex-col gap-4"><Music size={60} /><p>Music Player</p></div>}
                {activeApp === 'Safari' && <div className="h-full bg-white flex items-center justify-center text-gray-400">Safari Browser UI</div>}
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad - Fixed */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20 flex flex-col items-center" onClick={() => setShowLaunchpad(false)}>
                 <div className="grid grid-cols-4 md:grid-cols-5 gap-12 max-w-4xl pt-10" onClick={(e) => e.stopPropagation()}>
                    <LaunchIcon icon={<CalcIcon size={45} color="white" />} name="Calculator" color="bg-orange-500" onClick={() => openApp('Calculator')} />
                    <LaunchIcon icon={<FileText size={45} color="white" />} name="Notes" color="bg-yellow-500" onClick={() => openApp('Notes')} />
                    <LaunchIcon icon={<ImageIcon size={45} color="white" />} name="Settings" color="bg-blue-600" onClick={() => openApp('Settings')} />
                    <LaunchIcon icon={<Globe size={45} color="white" />} name="Safari" color="bg-blue-400" onClick={() => openApp('Safari')} />
                    <LaunchIcon icon={<Play size={45} color="white" />} name="Music" color="bg-pink-600" onClick={() => openApp('Music')} />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
            <DockIcon icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(!showLaunchpad)} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Globe size={30} color="white" />} color="bg-blue-500" onClick={() => openApp('Safari')} />
            <DockIcon icon={<CalcIcon size={30} color="white" />} color="bg-orange-500" onClick={() => openApp('Calculator')} />
            <DockIcon icon={<FileText size={30} color="white" />} color="bg-yellow-500" onClick={() => openApp('Notes')} />
            <DockIcon icon={<ImageIcon size={30} color="white" />} color="bg-blue-600" onClick={() => openApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div 
      drag 
      dragMomentum={false} // "පා වෙනවා" වගේ ගතිය මෙතනින් නැති කළා
      initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} 
      animate={{ scale: 1, opacity: 1 }} 
      exit={{ scale: 0.9, opacity: 0 }} 
      className="fixed w-[450px] h-[380px] bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/5"
    >
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all" />
        <div className="w-3 h-3 bg-[#FEBC2E] rounded-full" />
        <div className="w-3 h-3 bg-[#28C840] rounded-full" />
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -12, scale: 1.3 }} transition={{ type: "spring", stiffness: 300 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
      <div className={`${color} w-20 h-20 rounded-[1.6rem] flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-[13px] font-medium opacity-80">{name}</span>
    </div>
  );
}