import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Info, Folder, Settings as SettingsIcon, Monitor, User, Laptop, 
  Camera, Mail, Phone
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
  const [userName, setUserName] = useState('Danithu');
  const [deviceName, setDeviceName] = useState("Danithu's MacBook Pro");

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070",
    "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openApp = (appName) => {
    setActiveApp(appName);
    setShowLaunchpad(false);
  };

  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Apple size={60} color="white" fill="white" className="animate-pulse" />
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      
      <motion.div key={wallpaper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
            </div>
            <h1 className="text-2xl font-bold mb-6 tracking-tight">{userName}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PIN: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-blue-500/50" />
              <button type="submit" className="absolute right-2 p-1.5 bg-blue-500 rounded-full hover:bg-blue-600"><ArrowRight size={16} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          
          {/* Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-semibold">
              <Apple size={16} fill="white" className="cursor-pointer" onClick={() => openApp('About')} />
              <span>{activeApp || 'Finder'}</span>
              <div className="hidden md:flex gap-4 opacity-80 font-medium"><span>File</span><span>Edit</span><span>View</span><span>Go</span></div>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} /><Battery size={20} />
              <Sliders size={16} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Control Center */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-10 right-2 w-80 bg-white/80 backdrop-blur-3xl rounded-[2rem] shadow-2xl p-4 z-[110] border border-white/40 grid grid-cols-2 gap-3 text-black">
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-2 shadow-sm">
                  <div className="flex items-center gap-2"><div className="p-2 bg-blue-500 rounded-full text-white"><Wifi size={14} /></div><span className="text-[11px] font-bold">Wi-Fi</span></div>
                  <div className="flex items-center gap-2"><div className="p-2 bg-gray-400 rounded-full text-white"><Bluetooth size={14} /></div><span className="text-[11px] font-bold">Bluetooth</span></div>
                </div>
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm"><Moon size={18} className="text-indigo-500"/><span className="text-[11px] font-bold">Focus</span></div>
                <div className="col-span-2 bg-white/50 p-4 rounded-2xl space-y-4 shadow-sm text-gray-500">
                  <div className="flex items-center gap-3"><Sun size={16}/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300 text-black" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3"><Volume2 size={16}/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Windows Rendering */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && <div className="h-full bg-black flex flex-col p-4 text-white text-4xl items-end justify-end">0</div>}
                {activeApp === 'Messages' && <div className="h-full bg-white flex items-center justify-center text-gray-400">No Messages Yet</div>}
                {activeApp === 'Photos' && <div className="p-4 grid grid-cols-3 gap-2">{wallpapers.map(w => <img key={w} src={w} className="rounded-lg h-24 w-full object-cover" alt="p"/>)}</div>}
                {activeApp === 'Settings' && (
                  <div className="p-6 text-black">
                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 border rounded-lg mb-4" placeholder="Change User Name" />
                    <div className="grid grid-cols-2 gap-2">
                       {wallpapers.map(w => <div key={w} onClick={() => setWallpaper(w)} className="cursor-pointer border-2 rounded-lg overflow-hidden"><img src={w} className="h-20 w-full object-cover" alt="w"/></div>)}
                    </div>
                  </div>
                )}
                {activeApp === 'About' && (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-black text-center gap-4">
                    <Apple size={60} fill="black" />
                    <h2 className="text-xl font-bold">{deviceName}</h2>
                    <div className="text-xs bg-gray-100 p-3 rounded-lg w-full">M3 Max • 64GB • Sonoma 14.5</div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* --- Fixed Launchpad --- */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/30 p-20 flex flex-col items-center justify-start overflow-y-auto" onClick={() => setShowLaunchpad(false)}>
                 <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-5xl" onClick={(e) => e.stopPropagation()}>
                    <LaunchIcon icon={<CalcIcon size={40} color="white"/>} name="Calculator" color="bg-orange-500" onClick={() => openApp('Calculator')} />
                    <LaunchIcon icon={<MessageCircle size={40} color="white"/>} name="Messages" color="bg-green-500" onClick={() => openApp('Messages')} />
                    <LaunchIcon icon={<ImageIcon size={40} color="white"/>} name="Photos" color="bg-gradient-to-br from-purple-400 to-pink-500" onClick={() => openApp('Photos')} />
                    <LaunchIcon icon={<Globe size={40} color="white"/>} name="Safari" color="bg-blue-500" onClick={() => openApp('Safari')} />
                    <LaunchIcon icon={<SettingsIcon size={40} color="white"/>} name="Settings" color="bg-gray-500" onClick={() => openApp('Settings')} />
                    <LaunchIcon icon={<Music size={40} color="white"/>} name="Music" color="bg-red-500" onClick={() => openApp('Music')} />
                    <LaunchIcon icon={<Folder size={40} color="white"/>} name="Files" color="bg-blue-600" onClick={() => openApp('Files')} />
                    <LaunchIcon icon={<Mail size={40} color="white"/>} name="Mail" color="bg-sky-500" onClick={() => {}} />
                    <LaunchIcon icon={<Phone size={40} color="white"/>} name="Phone" color="bg-green-600" onClick={() => {}} />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock - iOS Style Icons */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Globe size={28} color="white" />} color="bg-blue-500" onClick={() => openApp('Safari')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500" onClick={() => openApp('Messages')} />
             <DockIcon icon={<ImageIcon size={28} color="white" />} color="bg-gradient-to-br from-purple-400 to-pink-500" onClick={() => openApp('Photos')} />
             <DockIcon icon={<Music size={28} color="white" />} color="bg-red-500" onClick={() => openApp('Music')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-500 shadow-gray-500/30" onClick={() => openApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// UI Components
function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[500px] h-[400px] bg-white/95 backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/5">
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing">
        <div className="flex gap-2">
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
  return (
    <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>
      {icon}
    </motion.div>
  );
}

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
      <div className={`${color} w-20 h-20 rounded-[1.6rem] flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-sm font-medium opacity-90">{name}</span>
    </div>
  );
}