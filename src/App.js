import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Sliders, Folder, Globe, MessageCircle, Play, Settings, Image as ImageIcon } from 'lucide-react';

export default function MacOSFinal() {
  const [booting, setBooting] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [isControlOpen, setIsControlOpen] = useState(false);
  
  // පටන් ගනිද්දී තියෙන wallpaper එක (bg1.jpg)
  const [wallpaper, setWallpaper] = useState(process.env.PUBLIC_URL + '/bg1.jpg');

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
      className="h-screen w-full bg-cover bg-center relative overflow-hidden font-sans select-none transition-all duration-1000" 
      style={{ backgroundImage: `url(${wallpaper})` }}
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

      {/* Desktop Icons */}
      <div className="p-6 grid grid-cols-1 gap-8 w-fit">
        <DesktopIcon icon={<Folder size={40} color="white" fill="white" />} name="Works" color="bg-blue-500" open={() => setActiveApp('Works')} />
        <DesktopIcon icon={<ImageIcon size={40} color="white" />} name="Wallpapers" color="bg-gradient-to-tr from-orange-400 to-rose-500" open={() => setActiveApp('Wallpapers')} />
      </div>

      {/* Wallpaper Settings Window */}
      <AnimatePresence>
        {activeApp === 'Wallpapers' && (
          <motion.div 
            drag dragHandleClassName="window-header"
            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="fixed w-[550px] h-[350px] bg-white/90 backdrop-blur-3xl rounded-[22px] shadow-2xl flex flex-col border border-white/50 overflow-hidden z-50"
          >
            <div className="window-header h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
              <div className="flex gap-2">
                <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer shadow-inner" />
                <div className="w-3 h-3 bg-[#FEBC2E] rounded-full shadow-inner" />
                <div className="w-3 h-3 bg-[#28C840] rounded-full shadow-inner" />
              </div>
              <span className="flex-1 text-center text-[10px] font-black opacity-30 uppercase tracking-[3px] mr-10">Wallpaper Settings</span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 h-full overflow-y-auto">
               {[1, 2, 3, 4].map((num) => (
                 <div 
                   key={num} 
                   onClick={() => setWallpaper(process.env.PUBLIC_URL + `/bg${num}.jpg`)}
                   className={`cursor-pointer rounded-lg overflow-hidden border-4 transition ${wallpaper.includes(`bg${num}`) ? 'border-blue-500' : 'border-transparent'}`}
                 >
                   <img src={process.env.PUBLIC_URL + `/bg${num}.jpg`} alt="Wallpaper" className="w-full h-24 object-cover" />
                   <p className="text-center text-[10px] font-bold py-1 bg-black/5">Background {num}</p>
                 </div>
               ))}
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

function DesktopIcon({ icon, name, color, open }) {
  return (
    <motion.div whileTap={{ scale: 0.9 }} onDoubleClick={open} className="flex flex-col items-center gap-1 cursor-default group">
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20 transition group-hover:brightness-110`}>{icon}</div>
      <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">{name}</span>
    </motion.div>
  );
}

function DockIcon({ icon, color }) {
  return (
    <motion.div whileHover={{ y: -15, scale: 1.3 }} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>
  );
}