import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, ArrowRight, Image as ImageIcon, LayoutGrid, FileText, Search } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [note, setNote] = useState('Welcome to Notes! Type anything...');

  const getPath = (name) => `${process.env.PUBLIC_URL}/${name}`;
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
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl">
              <Apple size={50} color="white" fill="white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu's MacBook</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
          {/* Menu Bar */}
          <div className="h-8 bg-black/20 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-bold"><Apple size={16} fill="white" /><span>Finder</span></div>
            <div className="flex gap-4 items-center"><Wifi size={16} /><Battery size={20} /><span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>

          {/* Icons */}
          <div className="p-6 flex flex-col gap-6">
            <div onDoubleClick={() => setActiveApp('Wallpapers')} className="flex flex-col items-center gap-1 cursor-default group w-20">
              <div className="bg-gradient-to-tr from-orange-400 to-rose-500 w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20"><ImageIcon size={35} color="white" /></div>
              <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md">Settings</span>
            </div>
            <div onDoubleClick={() => setActiveApp('Notes')} className="flex flex-col items-center gap-1 cursor-default group w-20">
              <div className="bg-yellow-500 w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20"><FileText size={35} color="white" /></div>
              <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md">Notes</span>
            </div>
          </div>

          {/* Wallpaper Window */}
          <AnimatePresence>
            {activeApp === 'Wallpapers' && (
              <motion.div drag dragHandleClassName="h-10" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[480px] h-[350px] bg-white/90 backdrop-blur-3xl rounded-[18px] shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden">
                <div className="h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
                  <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" />
                  <span className="flex-1 text-center text-[10px] font-bold opacity-40 uppercase tracking-widest">Wallpapers</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-lg overflow-hidden border-4 ${wallpaper.includes(`bg${n}`) ? 'border-blue-500' : 'border-transparent'}`}>
                      <img src={getPath(`bg${n}.jpg`)} alt="bg" className="w-full h-24 object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeApp === 'Notes' && (
              <motion.div drag dragHandleClassName="h-10" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[400px] h-[300px] bg-white/95 backdrop-blur-3xl rounded-[18px] shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden">
                <div className="h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
                  <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" />
                  <span className="flex-1 text-center text-[10px] font-bold opacity-40 uppercase tracking-widest">Notes</span>
                </div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} className="flex-1 p-4 bg-transparent outline-none text-gray-800 resize-none font-medium" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launchpad */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20 grid grid-cols-4 md:grid-cols-6 gap-10">
                <LaunchpadIcon icon={<Globe size={40} color="white" />} name="Safari" color="bg-blue-500" />
                <LaunchpadIcon icon={<MessageCircle size={40} color="white" />} name="Messages" color="bg-green-500" />
                <LaunchpadIcon icon={<Play size={40} color="white" />} name="Music" color="bg-red-500" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center">
            <div onClick={() => setShowLaunchpad(true)} className="w-14 h-14 bg-white/20 rounded-[1.1rem] flex items-center justify-center cursor-pointer hover:scale-120 transition-transform"><LayoutGrid size={28} color="white" /></div>
            <div className="w-14 h-14 bg-blue-500 rounded-[1.1rem] flex items-center justify-center cursor-pointer hover:scale-120 transition-transform"><Globe size={28} color="white" /></div>
            <div className="w-14 h-14 bg-green-500 rounded-[1.1rem] flex items-center justify-center cursor-pointer hover:scale-120 transition-transform"><MessageCircle size={28} color="white" /></div>
            <div onClick={() => setIsLocked(true)} className="w-14 h-14 bg-gray-700 rounded-[1.1rem] flex items-center justify-center cursor-pointer hover:scale-120 transition-transform"><Lock size={28} color="white" /></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function LaunchpadIcon({ icon, name, color }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className={`${color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition group-hover:scale-110`}>{icon}</div>
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  );
}