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
  const [note, setNote] = useState('Welcome to Notes! \n- Buy milk\n- Finish the React project');
  
  // Calculator Logic
  const [calcDisplay, setCalcDisplay] = useState('0');

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
      {/* Background Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-white/30" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
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
              <span className="font-medium opacity-80 cursor-default">File</span>
              <span className="font-medium opacity-80 cursor-default">Edit</span>
            </div>
            <div className="flex gap-4 items-center">
              <Mic size={14} className="opacity-70" />
              <Wifi size={16} />
              <Battery size={20} />
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Desktop App Icons */}
          <div className="p-6 flex flex-col gap-8 w-fit">
            <AppIcon icon={<ImageIcon size={35} color="white" />} name="Settings" color="bg-gradient-to-tr from-gray-400 to-gray-600" open={() => setActiveApp('Settings')} />
            <AppIcon icon={<Calculator size={35} color="white" />} name="Calculator" color="bg-orange-500" open={() => setActiveApp('Calculator')} />
            <AppIcon icon={<FileText size={35} color="white" />} name="Notes" color="bg-yellow-500" open={() => setActiveApp('Notes')} />
          </div>

          {/* Windows Rendering */}
          <AnimatePresence>
            {activeApp === 'Settings' && (
              <Window title="Settings" close={() => setActiveApp(null)}>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Desktop Wallpapers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-lg overflow-hidden border-2 ${wallpaper.includes(`bg${n}`) ? 'border-blue-500' : 'border-transparent'}`}>
                        <img src={getPath(`bg${n}.jpg`)} alt="bg" className="w-full h-24 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </Window>
            )}

            {activeApp === 'Calculator' && (
              <Window title="Calculator" close={() => setActiveApp(null)} width="w-64" height="h-96">
                <div className="bg-[#333] h-full p-2 flex flex-col gap-2">
                  <div className="h-20 flex items-end justify-end text-white text-4xl p-2 font-light">{calcDisplay}</div>
                  <div className="grid grid-cols-4 gap-1 flex-1">
                    {['C','+/-','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','='].map(btn => (
                      <button key={btn} onClick={() => setCalcDisplay(btn === 'C' ? '0' : btn)} className={`rounded-full flex items-center justify-center text-white text-lg ${isNaN(btn) ? 'bg-orange-500' : 'bg-white/20'}`}>{btn}</button>
                    ))}
                  </div>
                </div>
              </Window>
            )}

            {activeApp === 'Notes' && (
              <Window title="Notes" close={() => setActiveApp(null)}>
                <div className="flex h-full">
                  <div className="w-1/3 border-r border-black/5 bg-black/5 p-2 text-[11px] font-bold opacity-50">RECENT NOTES</div>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} className="flex-1 p-4 bg-transparent outline-none text-gray-800 resize-none font-medium text-sm" />
                </div>
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad Overlay */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-4xl mx-auto">
                   <LaunchIcon icon={<Globe size={45} color="white" />} name="Safari" color="bg-blue-500" />
                   <LaunchIcon icon={<MessageCircle size={45} color="white" />} name="Messages" color="bg-green-500" />
                   <LaunchIcon icon={<Play size={45} color="white" />} name="Music" color="bg-red-500" />
                   <LaunchIcon icon={<Calculator size={45} color="white" />} name="Calculator" color="bg-orange-500" />
                   <LaunchIcon icon={<FileText size={45} color="white" />} name="Notes" color="bg-yellow-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[32px] flex gap-4 shadow-2xl items-end px-4 ring-1 ring-black/5">
            <DockIcon icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(true)} />
            <div className="w-[1px] h-10 bg-white/20 self-center" />
            <DockIcon icon={<Globe size={30} color="white" />} color="bg-blue-500" />
            <DockIcon icon={<MessageCircle size={30} color="white" />} color="bg-green-500" />
            <DockIcon icon={<Play size={30} color="white" />} color="bg-red-600" />
            <DockIcon icon={<ImageIcon size={30} color="white" />} color="bg-gradient-to-tr from-purple-500 to-pink-500" onClick={() => setActiveApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Sub-Components
function AppIcon({ icon, name, color, open }) {
  return (
    <div onDoubleClick={open} className="flex flex-col items-center gap-1 cursor-default group">
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-lg border border-white/20 transition group-hover:brightness-110 group-active:scale-90`}>{icon}</div>
      <span className="text-white text-[11px] font-bold bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">{name}</span>
    </div>
  );
}

function Window({ title, children, close, width = "w-[500px]", height = "h-[350px]" }) {
  return (
    <motion.div drag dragHandleClassName="window-header" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`fixed ${width} ${height} bg-white/90 backdrop-blur-3xl rounded-[14px] shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden`}>
      <div className="window-header h-10 bg-black/5 flex items-center px-4 gap-2">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer flex items-center justify-center group"><X size={8} className="hidden group-hover:block" /></div>
        <div className="w-3 h-3 bg-[#FEBC2E] rounded-full cursor-pointer flex items-center justify-center group"><Minus size={8} className="hidden group-hover:block" /></div>
        <div className="w-3 h-3 bg-[#28C840] rounded-full cursor-pointer flex items-center justify-center group"><Square size={6} className="hidden group-hover:block" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-50 uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return (
    <motion.div whileHover={{ y: -15, scale: 1.3 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/20 transition-all`}>
      {icon}
    </motion.div>
  );
}

function LaunchIcon({ icon, name, color }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className={`${color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition group-hover:scale-110`}>{icon}</div>
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  );
}