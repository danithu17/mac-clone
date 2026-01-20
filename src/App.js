import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Info, Folder, Settings as SettingsIcon, Monitor, User, Laptop
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  // System states
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBTOn, setIsBTOn] = useState(false);
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

  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Apple size={60} color="white" fill="white" className="animate-pulse" />
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Background */}
      <motion.div key={wallpaper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6 tracking-tight">{userName}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PIN: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-blue-500/50" />
              <button type="submit" className="absolute right-2 p-1.5 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          
          {/* Dynamic Menu Bar - මෙතන තමයි App එකේ නම පේන්නේ */}
          <div className="h-8 bg-white/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center">
              <Apple size={16} fill="white" className="cursor-pointer hover:opacity-70" onClick={() => setActiveApp('About')} />
              <span className="font-bold cursor-default">{activeApp ? activeApp : 'Finder'}</span>
              {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
                <span key={item} className="opacity-80 cursor-default hidden lg:block hover:opacity-100 transition-opacity">{item}</span>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} className={isWifiOn ? 'opacity-100' : 'opacity-30'} />
              <Battery size={20} className="opacity-90" />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Control Center */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-10 right-2 w-80 bg-white/70 backdrop-blur-3xl rounded-[2rem] shadow-2xl p-4 z-[110] border border-white/40 grid grid-cols-2 gap-3 text-black">
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsWifiOn(!isWifiOn)}>
                    <div className={`p-2 rounded-full ${isWifiOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}><Wifi size={14} /></div>
                    <span className="text-[11px] font-bold">Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsBTOn(!isBTOn)}>
                    <div className={`p-2 rounded-full ${isBTOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}><Bluetooth size={14} /></div>
                    <span className="text-[11px] font-bold">Bluetooth</span>
                  </div>
                </div>
                <div className="bg-white/50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm">
                   <Moon size={20} className="text-gray-400" />
                   <span className="text-[11px] font-bold">Focus</span>
                </div>
                <div className="col-span-2 bg-white/50 p-4 rounded-2xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-3"><Sun size={16} className="opacity-50"/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3"><Volume2 size={16} className="opacity-50"/><input type="range" className="w-full h-1.5 accent-blue-500 rounded-lg appearance-none bg-gray-300" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Functional Apps */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-gray-100/30">
                    <div className="w-1/3 bg-white/40 p-4 border-r border-black/5 flex flex-col gap-1">
                       <div className="p-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 font-bold text-xs"><User size={14}/> User Profile</div>
                       <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 font-medium text-xs text-gray-600"><Monitor size={14}/> Display</div>
                       <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 font-medium text-xs text-gray-600"><Laptop size={14}/> About</div>
                    </div>
                    <div className="flex-1 p-6 overflow-auto text-black">
                      <h2 className="text-xl font-bold mb-6">User Settings</h2>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold opacity-40 uppercase">Your Name</label>
                          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-white border border-black/5 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-500/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold opacity-40 uppercase">Device Name</label>
                          <input value={deviceName} onChange={(e) => setDeviceName(e.target.value)} className="bg-white border border-black/5 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-500/20" />
                        </div>
                        <hr className="my-4 border-black/5" />
                        <label className="text-[10px] font-bold opacity-40 uppercase">Desktop Wallpaper</label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {wallpapers.map((url, i) => (
                            <div key={i} onClick={() => setWallpaper(url)} className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${wallpaper === url ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent shadow-sm'}`}>
                              <img src={url} className="w-full h-20 object-cover" alt="wp" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'About' && (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-black gap-4 text-center">
                    <Apple size={80} fill="black" />
                    <div><h2 className="text-2xl font-bold">{deviceName}</h2><p className="opacity-50 text-sm">macOS Sequoia 15.2</p></div>
                    <div className="w-full max-w-xs bg-black/5 p-4 rounded-xl text-[11px] space-y-2">
                      <div className="flex justify-between"><span>Chip</span><span className="font-bold">Apple M3 Max</span></div>
                      <div className="flex justify-between"><span>Memory</span><span className="font-bold">64 GB</span></div>
                      <div className="flex justify-between"><span>Owner</span><span className="font-bold">{userName}</span></div>
                    </div>
                  </div>
                )}

                {activeApp === 'Files' && (
                  <div className="h-full bg-white flex flex-col text-black">
                    <div className="h-10 bg-gray-50 border-b flex items-center px-4 justify-between">
                      <span className="text-xs font-bold opacity-40">Macintosh HD</span>
                      <Search size={14} className="opacity-30" />
                    </div>
                    <div className="flex-1 p-6 grid grid-cols-4 gap-6 content-start">
                      {['Documents', 'Projects', 'Images', 'Movies', 'Music'].map(folder => (
                        <div key={folder} className="flex flex-col items-center gap-1 group cursor-pointer">
                          <Folder size={45} className="text-blue-500 fill-blue-500/10 group-hover:fill-blue-500/30 transition-all" />
                          <span className="text-[10px] font-semibold">{folder}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Folder size={28} color="white" />} color="bg-blue-500 shadow-blue-500/30" onClick={() => setActiveApp('Files')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-500 shadow-gray-500/30" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={28} color="white" />} color="bg-orange-500 shadow-orange-500/30" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// Reusable Window Component
function Window({ title, children, close }) {
  return (
    <motion.div 
      drag dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} 
      animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
      className="fixed w-[550px] h-[400px] bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/5"
    >
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing">
        <div className="flex gap-2">
          <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all shadow-inner" />
          <div className="w-3 h-3 bg-[#FEBC2E] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#28C840] rounded-full shadow-inner" />
        </div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -15, scale: 1.3 }} 
      transition={{ type: "spring", stiffness: 300, damping: 15 }} 
      onClick={onClick} 
      className={`${color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-shadow`}
    >
      {icon}
    </motion.div>
  );
}