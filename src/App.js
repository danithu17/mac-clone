import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Sliders, Globe, MessageCircle, Play, Lock, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  
  // GitHub Pages වලදී images වල path එක නිවැරදිව ගන්න ක්‍රමය
  const getWallpaperPath = (name) => {
    const publicUrl = process.env.PUBLIC_URL || '';
    return `${publicUrl}/${name}`;
  };

  const [wallpaper, setWallpaper] = useState(getWallpaperPath('bg1.jpg'));

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const changeWallpaper = (num) => {
    setWallpaper(getWallpaperPath(`bg${num}.jpg`));
  };

  if (booting) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Apple size={60} color="white" fill="white" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden">
      
      {/* Background Wallpaper Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${wallpaper})`, 
          backgroundColor: '#1a1a1a' 
        }}
      />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-2xl bg-black/40"
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl">
              <Apple size={50} color="white" fill="white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu's MacBook</h1>
            <form 
              onSubmit={(e) => { e.preventDefault(); if(password === '1234') setIsLocked(false); }} 
              className="relative flex items-center"
            >
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (1234)" 
                className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:bg-white/20"
              />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40 shadow-lg">
                <ArrowRight size={16} color="white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Desktop (Login වුණාම පේන ටික) */}
      {!isLocked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
          {/* Top Menu Bar */}
          <div className="h-8 bg-white/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5 shadow-sm">
            <div className="flex gap-5 items-center font-bold">
              <Apple size={16} fill="white" />
              <span>Finder</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} />
              <Battery size={20} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Wallpapers App Icon */}
          <div className="p-6">
            <div 
              onDoubleClick={() => setActiveApp('Wallpapers')} 
              className="flex flex-col items-center gap-1 cursor-default group w-24"
            >
              <div className="bg-gradient-to-tr from-orange-400 to-rose-500 w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-2xl border border-white/20 transition group-hover:scale-110 active:scale-95">
                <ImageIcon size={35} color="white" />
              </div>
              <span className="text-white text-[11px] font-bold bg-black/40 px-2 py-0.5 rounded-md shadow-lg">Settings</span>
            </div>
          </div>

          {/* Wallpaper Selection Window */}
          <AnimatePresence>
            {activeApp === 'Wallpapers' && (
              <motion.div 
                drag dragHandleClassName="window-header"
                initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
                animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="fixed w-[500px] h-[350px] bg-white/80 backdrop-blur-3xl rounded-[22px] shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden"
              >
                <div className="window-header h-10 bg-black/5 flex items-center px-4 border-b border-black/5 cursor-default">
                  <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-90 transition" />
                  <span className="flex-1 text-center text-[10px] font-bold opacity-40 tracking-[2px] uppercase">Desktop & Wallpaper</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num} 
                      onClick={() => changeWallpaper(num)} 
                      className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${wallpaper.includes(`bg${num}`) ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}
                    >
                      <img src={getWallpaperPath(`bg${num}.jpg`)} alt={`bg${num}`} className="w-full h-24 object-cover" />
                      <p className="text-center text-[10px] font-bold py-1 bg-black/10 uppercase">Background {num}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* iOS Style Dock */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center ring-1 ring-black/5">
            <div className="w-14 h-14 bg-blue-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-125 hover:-translate-y-4 shadow-blue-500/20"><Globe size={28} color="white" /></div>
            <div className="w-14 h-14 bg-green-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-125 hover:-translate-y-4 shadow-green-500/20"><MessageCircle size={28} color="white" fill="white" /></div>
            <div className="w-14 h-14 bg-red-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-125 hover:-translate-y-4 shadow-red-500/20"><Play size={28} color="white" fill="white" /></div>
            <div className="w-[1px] h-10 bg-white/20 mx-1" />
            <div onClick={() => setIsLocked(true)} className="w-14 h-14 bg-gray-600 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-125 hover:-translate-y-4"><Lock size={28} color="white" /></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}