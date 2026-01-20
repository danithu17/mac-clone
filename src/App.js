import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Sliders, Folder, Globe, MessageCircle, Play, Settings } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [isControlOpen, setIsControlOpen] = useState(false);

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
    <div 
      className="h-screen w-full bg-cover bg-center relative overflow-hidden font-sans select-none" 
      style={{ backgroundImage: `url('https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/wallpapers/Sequoia.jpg')` }}
    >
      {/* Menu Bar */}
      <div className="h-8 bg-white/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
        <div className="flex gap-5 items-center font-bold">
          <Apple size={16} fill="white" />
          <span>Finder</span>
          <span className="opacity-80 hidden md:block">File</span>
          <span className="opacity-80 hidden md:block">Edit</span>
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
            className="absolute top-10 right-2 w-72 bg-white/70 backdrop-blur-3xl rounded-[24px] p-4 shadow-2xl border border-white/40 z-[110]"
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

      {/* iOS App Icons on Desktop */}
      <div className="p-6 grid grid-cols-1 gap-8 w-fit">
        <div onDoubleClick={() => setActiveApp('Works')} className="flex flex-col items-center gap-1 cursor-default group">
          <div className="bg-blue-500 w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20">
            <Folder size={40} color="white" fill="white" />
          </div>
          <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">Works</span>
        </div>
      </div>

      {/* iOS Style Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center ring-1 ring-black/5">
        <DockIcon icon={<Globe size={28} color="white" />} color="bg-gradient-to-b from-blue-300 to-blue-600" />
        <DockIcon icon={<MessageCircle size={28} color="white" fill="white" />} color="bg-green-500" />
        <DockIcon icon={<Play size={28} color="white" fill="white" />} color="bg-red-500" />
        <div className="w-[1px] h-10 bg-white/20 mx-1" />
        <DockIcon icon={<Settings size={28} color="#555" />} color="bg-gray-200" />
      </div>

      {/* Windows Layer */}
      <AnimatePresence>
        {activeApp && (
          <motion.div 
            drag dragHandleClassName="window-header"
            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="fixed w-[600px] h-[400px] bg-white/90 backdrop-blur-3xl rounded-[22px] shadow-2xl flex flex-col border border-white/50 overflow-hidden z-50"
          >
            <div className="window-header h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
              <div className="flex gap-2">
                <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" />
                <div className="w-3 h-3 bg-[#FEBC2E] rounded-full" />
                <div className="w-3 h-3 bg-[#28C840] rounded-full" />
              </div>
              <span className="flex-1 text-center text-[10px] font-black opacity-30 uppercase tracking-[3px] mr-10">{activeApp}</span>
            </div>
            <div className="p-10 text-center">
              <h1 className="text-3xl font-black text-gray-800 tracking-tighter">macOS Sequoia</h1>
              <p className="text-gray-500 mt-4 font-medium italic">by Danithu</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DockIcon({ icon, color }) {
  return (
    <motion.div whileHover={{ y: -15, scale: 1.3 }} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>
      {icon}
    </motion.div>
  );
}