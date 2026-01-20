import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, ArrowRight, Image as ImageIcon, LayoutGrid, FileText, Search } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [note, setNote] = useState('මෙතන මොනවා හරි ලියන්න...');

  const getPath = (name) => process.env.PUBLIC_URL + '/' + name;
  const [wallpaper, setWallpaper] = useState(getPath('bg1.jpg'));

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Apple size={60} color="white" fill="white" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden bg-[#1a1a1a]">
      
      {/* Wallpaper Layer */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl">
              <Apple size={50} color="white" fill="white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu's Mac</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Desktop */}
      {!isLocked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
          {/* Menu Bar */}
          <div className="h-8 bg-black/20 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-bold"><Apple size={16} fill="white" /><span>Finder</span><span className="font-normal opacity-80">View</span></div>
            <div className="flex gap-4 items-center"><Wifi size={16} /><Battery size={20} /><span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>

          {/* Desktop Icons */}
          <div className="p-6 grid gap-6">
            <DesktopIcon icon={<ImageIcon size={35} color="white" />} name="Settings" color="bg-gradient-to-tr from-orange-400 to-rose-500" open={() => setActiveApp('Wallpapers')} />
            <DesktopIcon icon={<FileText size={35} color="white" />} name="Notes" color="bg-yellow-500" open={() => setActiveApp('Notes')} />
          </div>

          {/* Windows */}
          <AnimatePresence>
            {activeApp === 'Wallpapers' && (
              <Window title="Desktop & Wallpaper" close={() => setActiveApp(null)}>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-xl overflow-hidden border-4 ${wallpaper.includes(`bg${n}`) ? 'border-blue-500' : 'border-transparent'}`}>
                      <img src={getPath(`bg${n}.jpg`)} alt="bg" className="w-full h-24 object-cover" />
                    </div>
                  ))}
                </div>
              </Window>
            )}

            {activeApp === 'Notes' && (
              <Window title="Notes" close={() => setActiveApp(null)}>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-full p-4 bg-transparent outline-none text-gray-800 resize-none font-medium" />
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad Overlay */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20">
                <div className="flex justify-center mb-10"><div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 text-white/50 w-64"><Search size={18} /><span>Search</span></div></div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-10 max-w-4xl mx-auto">
                   <LaunchpadIcon icon={<Globe size={40} color="white" />} name="Safari" color="bg-blue-500" />
                   <LaunchpadIcon icon={<MessageCircle size={40} color="white" />} name="Messages" color="bg-green-500" />
                   <LaunchpadIcon icon={<Play size={40} color="white" />} name="Music" color="bg-red-500" />
                   <LaunchpadIcon icon={<ImageIcon size={40} color="white" />} name="Photos" color="bg-gradient-to-b from-purple-400 to-pink-500" />
                   <LaunchpadIcon icon={<FileText size={40} color="white" />} name="Notes" color="bg-yellow-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center">
            <DockItem icon={<LayoutGrid size={28} color="white" />} color="bg-gray-400/50" onClick={() => setShowLaunchpad(true)} />
            <div className="w-[1px] h-8 bg-white/20 mx-1" />
            <DockItem icon={<Globe size={28} color="white" />} color="bg-blue-500 shadow-blue-500/50" />
            <DockItem icon={<MessageCircle size={28} color="white" />} color="bg-green-500 shadow-green-500/50" />
            <DockItem icon={<Play size={28} color="white" />} color="bg-red-500 shadow-red-500/50" />
            <DockItem icon={<Lock size={28} color="white" />} color="bg-gray-700" onClick={() => setIsLocked(true)} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Helper Components
function DesktopIcon({ icon, name, color, open }) {
  return (
    <div onDoubleClick={open} className="flex flex-col items-center gap-1 cursor-default group w-20">
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20 transition group-hover:scale-105`}>{icon}</div>
      <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md">{name}</span>
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragHandleClassName="h-10" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[500px] h-[350px] bg-white/90 backdrop-blur-3xl rounded-[18px] shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden">
      <div className="h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-90" />
        <span className="flex-1 text-center text-[11px] font-bold opacity-40 uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockItem({ icon, color, onClick }) {
  return <motion.div whileHover={{ y: -10, scale: 1.2 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-shadow`}>{icon}</motion.div>;
}

function LaunchpadIcon({ icon, name, color }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className={`${color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition group-hover:scale-110`}>{icon}</div>
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  );
}