import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Wifi, Battery, Sliders, Folder, Globe, MessageCircle, Play, Settings, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [isControlOpen, setIsControlOpen] = useState(false);
  
  // Images ටික src එකේ තියෙනවා නම් මේ විදියට ගන්න පුළුවන්
  const wallpapers = [
    { id: 1, img: require('./bg1.jpg') },
    { id: 2, img: require('./bg2.jpg') },
    { id: 3, img: require('./bg3.jpg') },
    { id: 4, img: require('./bg4.jpg') }
  ];

  const [wallpaper, setWallpaper] = useState(wallpapers[0].img);

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
      className="h-screen w-full bg-cover bg-center relative overflow-hidden font-sans select-none transition-all duration-700" 
      style={{ backgroundImage: `url(${wallpaper})`, backgroundColor: '#1a1a1a' }}
    >
      {/* Menu Bar */}
      <div className="h-8 bg-white/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
        <div className="flex gap-5 items-center font-bold">
          <Apple size={16} fill="white" />
          <span>Finder</span>
        </div>
        <div className="flex gap-4 items-center">
          <Wifi size={16} />
          <Battery size={20} />
          <Sliders size={16} className="cursor-pointer" onClick={() => setIsControlOpen(!isControlOpen)} />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icons */}
      <div className="p-6 grid grid-cols-1 gap-8 w-fit">
        <div onDoubleClick={() => setActiveApp('Wallpapers')} className="flex flex-col items-center gap-1 cursor-default group">
          <div className="bg-gradient-to-tr from-orange-400 to-rose-500 w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20">
            <ImageIcon size={40} color="white" />
          </div>
          <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-md">Wallpapers</span>
        </div>
      </div>

      {/* Wallpaper App */}
      <AnimatePresence>
        {activeApp === 'Wallpapers' && (
          <motion.div 
            drag dragHandleClassName="window-header"
            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="fixed w-[500px] h-[350px] bg-white/90 backdrop-blur-3xl rounded-[22px] shadow-2xl flex flex-col border border-white/50 overflow-hidden z-50"
          >
            <div className="window-header h-10 bg-black/5 flex items-center px-4 border-b border-black/5">
              <div onClick={() => setActiveApp(null)} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" />
              <span className="flex-1 text-center text-[10px] font-black opacity-30 tracking-[3px] uppercase">Select Wallpaper</span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto">
              {wallpapers.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setWallpaper(item.img)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-4 transition ${wallpaper === item.img ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img src={item.img} alt="bg" className="w-full h-24 object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-center ring-1 ring-black/5">
        <div className="w-14 h-14 bg-blue-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition hover:scale-110 hover:-translate-y-2"><Globe size={28} color="white" /></div>
        <div className="w-14 h-14 bg-green-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition hover:scale-110 hover:-translate-y-2"><MessageCircle size={28} color="white" fill="white" /></div>
        <div className="w-14 h-14 bg-red-500 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer transition hover:scale-110 hover:-translate-y-2"><Play size={28} color="white" fill="white" /></div>
      </div>
    </div>
  );
}