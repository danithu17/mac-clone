import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, X, Minus, Square, Sliders, Sun, Volume2, Bluetooth
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  
  // App States
  const [note, setNote] = useState('My First Note...');
  const [calcValue, setCalcValue] = useState('0');

  const getPath = (name) => `${process.env.PUBLIC_URL}/${name}`;
  const [wallpaper, setWallpaper] = useState(getPath('bg1.jpg'));

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Calculator Logic
  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') {
      try { setCalcValue(eval(calcValue.replace('×', '*').replace('÷', '/')).toString()); } 
      catch { setCalcValue('Error'); }
    } else {
      setCalcValue(calcValue === '0' ? val : calcValue + val);
    }
  };

  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Apple size={60} color="white" fill="white" className="animate-pulse" />
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden transition-all duration-300" style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Background Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6 text-shadow-sm">Danithu</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-white/30" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          
          {/* Menu Bar */}
          <div className="h-8 bg-black/15 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5 shadow-sm">
            <div className="flex gap-5 items-center font-bold">
              <Apple size={16} fill="white" className="hover:opacity-70 cursor-pointer" />
              <span className="cursor-default">Finder</span>
              <span className="font-medium opacity-80 cursor-default hidden sm:block">File</span>
              <span className="font-medium opacity-80 cursor-default hidden sm:block">Edit</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} />
              <Battery size={20} />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium cursor-default">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Control Center Popup */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-10 right-2 w-72 bg-white/75 backdrop-blur-3xl rounded-2xl shadow-2xl p-4 z-[110] border border-white/40 ring-1 ring-black/5">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/50 p-3 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-600"><Wifi size={16} /> <span className="text-[10px] font-bold">Wi-Fi</span></div>
                    <div className="flex items-center gap-2 text-gray-500"><Bluetooth size={16} /> <span className="text-[10px] font-bold">Bluetooth</span></div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-xl flex flex-col items-center justify-center">
                    <Play size={20} className="text-pink-500" />
                    <span className="text-[9px] font-bold mt-1 opacity-50 uppercase tracking-tighter text-black">AirDrop</span>
                  </div>
                </div>
                <div className="bg-white/50 p-3 rounded-xl space-y-3">
                  <div className="flex items-center gap-3 text-black/50"><Sun size={14} /><input type="range" className="w-full accent-blue-500 h-1" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3 text-black/50"><Volume2 size={14} /><input type="range" className="w-full accent-blue-500 h-1" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* App Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-[#1e1e1e] p-4 flex flex-col gap-3">
                    <div className="h-16 flex items-end justify-end text-white text-5xl font-light px-2 overflow-hidden">{calcDisplay(calcValue)}</div>
                    <div className="grid grid-cols-4 gap-2 flex-1">
                      {['C', '÷', '×', 'back', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((btn) => (
                        <button key={btn} onClick={() => handleCalc(btn)} className={`rounded-full text-lg font-medium flex items-center justify-center transition-all ${btn === '=' ? 'bg-orange-500 text-white col-span-1' : isNaN(btn) && btn !== '.' ? 'bg-white/10 text-orange-400' : 'bg-white/20 text-white hover:bg-white/30'} ${btn === '0' ? 'col-span-1' : ''}`}>
                          {btn === 'back' ? '←' : btn}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Notes' && (
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-full p-6 bg-[#fff9c4]/30 outline-none resize-none text-gray-800 text-lg font-medium" autoFocus />
                )}
                {activeApp === 'Settings' && (
                  <div className="p-6">
                    <h3 className="text-xs font-bold opacity-40 mb-4 uppercase tracking-[2px]">Wallpapers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${wallpaper.includes(`bg${n}`) ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}>
                          <img src={getPath(`bg${n}.jpg`)} alt="wallpaper" className="w-full h-24 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad Overlay */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20 flex flex-col items-center">
                 <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-4xl pt-10">
                    <LaunchIcon icon={<CalcIcon size={45} color="white" />} name="Calculator" color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
                    <LaunchIcon icon={<FileText size={45} color="white" />} name="Notes" color="bg-yellow-500" onClick={() => setActiveApp('Notes')} />
                    <LaunchIcon icon={<ImageIcon size={45} color="white" />} name="Settings" color="bg-gradient-to-tr from-blue-400 to-indigo-600" onClick={() => setActiveApp('Settings')} />
                    <LaunchIcon icon={<Globe size={45} color="white" />} name="Safari" color="bg-blue-500" />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2.5 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
            <DockItem icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(true)} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Globe size={30} color="white" />} color="bg-blue-500 shadow-blue-500/20" />
            <DockIcon icon={<MessageCircle size={30} color="white" />} color="bg-green-500 shadow-green-500/20" />
            <DockIcon icon={<CalcIcon size={30} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
            <DockIcon icon={<FileText size={30} color="white" />} color="bg-yellow-500" onClick={() => setActiveApp('Notes')} />
            <DockIcon icon={<ImageIcon size={30} color="white" />} color="bg-gradient-to-tr from-purple-500 to-pink-500" onClick={() => setActiveApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// UI Helper Components
function Window({ title, children, close }) {
  return (
    <motion.div drag dragHandleClassName="h-10" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[450px] h-[400px] bg-white/90 backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-default">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75" />
        <div className="w-3 h-3 bg-[#FEBC2E] rounded-full" />
        <div className="w-3 h-3 bg-[#28C840] rounded-full" />
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 uppercase tracking-[2px]">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockItem({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.35 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/15 transition-all`}>{icon}</motion.div>;
}

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={(e) => { e.stopPropagation(); onClick(); }} className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
      <div className={`${color} w-20 h-20 rounded-[1.6rem] flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-[13px] font-medium opacity-80">{name}</span>
    </div>
  );
}

const calcDisplay = (val) => val.length > 10 ? val.substring(0, 10) : val;