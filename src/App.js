import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Sliders, Folder, Globe, 
  MessageCircle, Image as ImageIcon, Settings, Play 
} from 'lucide-react';

export default function IOSMacStyle() {
  const [booting, setBooting] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [isControlOpen, setIsControlOpen] = useState(false);

  // Wallpaper එක පේන්න නම් public/bg.jpg ලෙස සේව් කරගන්න. නැතිනම් මේ ලින්ක් එක වැඩ කරයි.
  const wallpaperUrl = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop";

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1500);
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
    <div 
      className="h-screen w-full bg-cover bg-center relative overflow-hidden font-sans select-none" 
      style={{ backgroundImage: `url(${wallpaperUrl})`, backgroundColor: '#1a1a1a' }}
    >
      {/* Top Menu Bar */}
      <div className="h-8 bg-white/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5 shadow-sm">
        <div className="flex gap-5 items-center font-bold">
          <Apple size={16} fill="white" />
          <span className="cursor-default">Finder</span>
          <span className="font-medium opacity-80 hidden md:block">File</span>
          <span className="font-medium opacity-80 hidden md:block">Edit</span>
        </div>
        <div className="flex gap-4 items-center">
          <Wifi size={16} />
          <Battery size={20} />
          <Sliders size={16} className="cursor-pointer" onClick={() => setIsControlOpen(!isControlOpen)} />
          <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Control Center */}
      <AnimatePresence>
        {isControlOpen && (
          <motion.div 
            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
            className="absolute top-10 right-2 w-72 bg-white/70 backdrop-blur-3xl rounded-[28px] p-4 shadow-2xl border border-white/40 z-[110]"
          >
            <div className="bg-white/40 p-3 rounded-2xl mb-2 border border-black/5 text-[11px] font-bold text-gray-700">
               Brightness <input type="range" className="w-full mt-2 accent-blue-500" />
            </div>
            <div className="bg-white/40 p-3 rounded-2xl border border-black/5 text-[11px] font-bold text-gray-700">
               Volume <input type="range" className="w-full mt-2 accent-blue-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Content */}
      <div className="p-6 grid grid-cols-1 gap-8 w-fit h-fit">
        <DesktopIcon icon={<Folder size={45} color="white" fill="white" />} name="Works" color="bg-blue-500" open={() => setActiveApp('Works')} />
        <DesktopIcon icon={<ImageIcon size={40} color="white" />} name="Photos" color="bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500" open={() => setActiveApp('Photos')} />
      </div>

      {/* App Window */}
      <AnimatePresence>
        {activeApp && (
          <motion.div 
            drag dragHandleClassName="window-header"
            initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            className="fixed w-[600px] h-[400px] bg-white/90 backdrop-blur-3xl rounded-[22px] shadow-2xl flex flex-col border border-white/50 overflow-hidden z-50"
          >
            <div className="window-header h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
              <div className="flex gap-2">
                <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer shadow-inner" />
                <div className="w-3 h-3 bg-[#FEBC2E] rounded-full shadow-inner" />
                <div className="w-3 h-3 bg-[#28C840] rounded-full shadow-inner" />
              </div>
              <span className="flex-1 text-center text-[10px] font-black opacity-30 uppercase tracking-[3px] mr-10">{activeApp}</span>
            </div>
            <div className="p-10 text-center">
              <h1 className="text-3xl font-black text-gray-800 tracking-tighter capitalize">{activeApp}</h1>
              <p className="text-gray-500 mt-4 font-medium">මෙම App එක ඉදිරියේදී යාවත්කාලීන වේ.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Style Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center ring-1 ring-black/5">
        <DockIcon icon={<Globe size={28} color="white" />} color="bg-gradient-to-b from-blue-300 to-blue-600" />
        <DockIcon icon={<MessageCircle size={28} color="white" fill="white" />} color="bg-green-500" />
        <DockIcon icon={<Play size={28} color="white" fill="white" />} color="bg-red-500" />
        <div className="w-[1px] h-10 bg-white/20 mx-1" />
        <DockIcon icon={<Settings size={28} color="#555" />} color="bg-gray-200" />
      </div>
    </div>
  );
}

// iOS Style Icon Component
function DesktopIcon({ icon, name, color, open }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.9 }} onDoubleClick={open}
      className="flex flex-col items-center gap-1 cursor-default group"
    >
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20 transition group-hover:brightness-110`}>
        {icon}
      </div>
      <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-md shadow-lg border border-white/10">{name}</span>
    </motion.div>
  );
}

function DockIcon({ icon, color }) {
  return (
    <motion.div 
      whileHover={{ y: -15, scale: 1.3 }}
      className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}
    >
      {icon}
    </motion.div>
  );
}