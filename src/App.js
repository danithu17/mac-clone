import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Search, Calculator, Mic, X, Minus, Square
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [note, setNote] = useState('Welcome to Notes! \n- Double click to open apps\n- Use Settings to change wallpaper');
  
  // Calculator Logic
  const [calcDisplay, setCalcDisplay] = useState('0');

  const getPath = (name) => `${process.env.PUBLIC_URL}/${name}`;
  const [wallpaper, setWallpaper] = useState(getPath('bg1.jpg'));

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
    <div className="h-screen w-full relative font-sans select-none overflow-hidden bg-[#1a1a1a]">
      {/* Background Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
        style={{ backgroundImage: `url(${wallpaper})`, backgroundColor: '#2d3436' }} 
      />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu's MacBook</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
          {/* Top Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-bold">
              <Apple size={16} fill="white" />
              <span className="font-bold">Finder</span>
              <span className="font-medium opacity-80 hidden md:block">File</span>
              <span className="font-medium opacity-80 hidden md:block">Edit</span>
              <span className="font-medium opacity-80 hidden md:block">View</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} />
              <Battery size={20} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Desktop App Icons */}
          <div className="p-6 flex flex-col gap-8 w-fit">
            <DesktopIcon icon={<ImageIcon size={35} color="white" />} name="Settings" color="bg-gradient-to-tr from-gray-400 to-gray-600" open={() => setActiveApp('Settings')} />
            <DesktopIcon icon={<Calculator size={35} color="white" />} name="Calculator" color="bg-orange-500" open={() => setActiveApp('Calculator')} />
            <DesktopIcon icon={<FileText size={35} color="white" />} name="Notes" color="bg-yellow-500" open={() => setActiveApp('Notes')} />
          </div>

          {/* Windows Handling */}
          <AnimatePresence>
            {activeApp === 'Settings' && (
              <Window title="Settings" close={() => setActiveApp(null)}>
                <div className="p-6">
                  <h3 className="text-sm font-bold mb-4 opacity-70">SELECT WALLPAPER</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${wallpaper.includes(`bg${n}`) ? 'border-blue-500 scale-95' : 'border-transparent hover:scale-105'}`}>
                        <img src={getPath(`bg${n}.jpg`)} alt="bg" className="w-full h-24 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </Window>
            )}

            {activeApp === 'Calculator' && (
              <Window title="Calculator" close={() => setActiveApp(null)} width="w-64" height="h-96">
                <div className="bg-[#1d1d1d] h-full p-2 flex flex-col gap-2">
                  <div className="h-20 flex items-end justify-end text-white text-4xl p-2 font-light overflow-hidden">{calcDisplay}</div>
                  <div className="grid grid-cols-4 gap-1 flex-1">
                    {['C','+/-','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','='].map(btn => (
                      <button key={btn} onClick={() => setCalcDisplay(btn === 'C' ? '0' : btn)} className={`rounded-full flex items-center justify-center text-white text-lg transition-colors ${isNaN(btn) && btn !== '.' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-white/10 hover:bg-white/20'}`}>{btn}</button>
                    ))}
                  </div>
                </div>
              </Window>
            )}

            {activeApp === 'Notes' && (
              <Window title="Notes" close={() => setActiveApp(null)}>
                <div className="flex h-full bg-white">
                  <div className="w-1/3 border-r border-black/5 bg-[#f6f6f6] p-4 text-[11px] font-bold opacity-40">RECENT NOTES</div>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} className="flex-1 p-4 bg-transparent outline-none text-gray-800 resize-none font-medium text-sm leading-relaxed" />
                </div>
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20">
                <div className="flex justify-center mb-12">
                   <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-1.5 flex items-center gap-2 text-white/50 w-72 backdrop-blur-md">
                     <Search size={18} /> <span className="text-sm">Search</span>
                   </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-4xl mx-auto">
                   <LaunchpadIcon icon={<Globe size={45} color="white" />} name="Safari" color="bg-blue-500" />
                   <LaunchpadIcon icon={<MessageCircle size={45} color="white" />} name="Messages" color="bg-green-500" />
                   <LaunchpadIcon icon={<Play size={45} color="white" />} name="Music" color="bg-red-500" />
                   <LaunchpadIcon icon={<Calculator size={45} color="white" />} name="Calculator" color="bg-orange-500" />
                   <LaunchpadIcon icon={<FileText size={45} color="white" />} name="Notes" color="bg-yellow-500" />
                   <LaunchpadIcon icon={<ImageIcon size={45} color="white" />} name="Photos" color="bg-gradient-to-tr from-purple-500 to-pink-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 ring-1 ring-black/5 z-[100]">
            <DockIcon icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(true)} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Globe size={30} color="white" />} color="bg-blue-500 shadow-blue-500/30" />
            <DockIcon icon={<MessageCircle size={30} color="white" />} color="bg-green-500 shadow-green-500/30" />
            <DockIcon icon={<Play size={30} color="white" />} color="bg-red-600 shadow-red-600/30" />
            <DockIcon icon={<ImageIcon size={30} color="white" />} color="bg-gradient-to-tr from-orange-400 to-rose-500" onClick={() => setActiveApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Sub-Components
function DesktopIcon({ icon, name, color, open }) {
  return (
    <div onDoubleClick={open} className="flex flex-col items-center gap-1 cursor-default group w-20">
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20 transition-all group-hover:brightness-110 group-active:scale-90`}>
        {icon}
      </div>
      <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">{name}</span>
    </div>
  );
}

function Window({ title, children, close, width = "w-[520px]", height = "h-[380px]" }) {
  return (
    <motion.div drag dragHandleClassName="window-header" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`fixed ${width} ${height} bg-white/90 backdrop-blur-3xl rounded-[14px] shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden`}>
      <div className="window-header h-10 bg-black/5 flex items-center px-4 gap-2 cursor-default">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer flex items-center justify-center group"><X size={8} className="hidden group-hover:block text-black/50" /></div>
        <div className="w-3 h-3 bg-[#FEBC2E] rounded-full cursor-pointer flex items-center justify-center group"><Minus size={8} className="hidden group-hover:block text-black/50" /></div>
        <div className="w-3 h-3 bg-[#28C840] rounded-full cursor-pointer flex items-center justify-center group"><Square size={6} className="hidden group-hover:block text-black/50" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-40 uppercase tracking-[2px]">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return (
    <motion.div whileHover={{ y: -12, scale: 1.25 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-shadow`}>
      {icon}
    </motion.div>
  );
}

function LaunchpadIcon({ icon, name, color }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className={`${color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  );
}