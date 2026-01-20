import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator, Mic, X, Minus, Square, Sliders, Moon, Volume2, Sun, Bluetooth
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
  const [note, setNote] = useState('Welcome to Danithu\'s Mac! \n- Double click icons to open.\n- Use the Sliders icon for Control Center.');

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
    <div className="h-screen w-full relative font-sans select-none overflow-hidden transition-all duration-500" style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Wallpaper Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
        style={{ backgroundImage: `url(${wallpaper})`, backgroundColor: '#1a1a1a' }} 
      />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danithu" alt="avatar" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-6">Danithu</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white text-center outline-none backdrop-blur-md w-64 focus:bg-white/20 transition-all" />
              <button type="submit" className="absolute right-2 p-1.5 bg-white/20 rounded-full hover:bg-white/40"><ArrowRight size={16} color="white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative flex flex-col">
          
          {/* Top Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-2xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-bold">
              <Apple size={16} fill="white" className="cursor-pointer" />
              <span className="cursor-default">Finder</span>
              <span className="font-medium opacity-80 cursor-default hidden sm:block">File</span>
              <span className="font-medium opacity-80 cursor-default hidden sm:block">Edit</span>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} className="cursor-pointer" />
              <Battery size={20} className="cursor-pointer" />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-medium cursor-default">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Desktop App Icons */}
          <div className="absolute inset-0 p-10 pt-16 grid grid-cols-1 content-start gap-10 w-fit pointer-events-none">
            <DesktopIcon icon={<ImageIcon size={35} color="white" />} name="Settings" color="bg-gradient-to-tr from-blue-400 to-indigo-600" onClick={() => setActiveApp('Settings')} />
            <DesktopIcon icon={<Calculator size={35} color="white" />} name="Calculator" color="bg-orange-500 shadow-orange-500/20" onClick={() => setActiveApp('Calculator')} />
            <DesktopIcon icon={<FileText size={35} color="white" />} name="Notes" color="bg-yellow-500 shadow-yellow-500/20" onClick={() => setActiveApp('Notes')} />
          </div>

          {/* Control Center */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="absolute top-10 right-4 w-72 bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 z-[110] border border-white/40">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/50 p-3 rounded-xl flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2"><div className="p-1.5 bg-blue-500 rounded-full"><Wifi size={14} color="white" /></div><span className="text-[11px] font-bold opacity-70">Wi-Fi</span></div>
                    <div className="flex items-center gap-2"><div className="p-1.5 bg-gray-400 rounded-full"><Bluetooth size={14} color="white" /></div><span className="text-[11px] font-bold opacity-70">Bluetooth</span></div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-xl flex flex-col items-center justify-center shadow-sm">
                     <Moon size={20} className="text-indigo-600 mb-1" />
                     <span className="text-[10px] font-bold opacity-60">Focus</span>
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl shadow-sm space-y-4">
                  <div className="flex items-center gap-3"><Sun size={16} opacity={0.5} /><input type="range" className="w-full accent-blue-500" value={brightness} onChange={(e) => setBrightness(e.target.value)} /></div>
                  <div className="flex items-center gap-3"><Volume2 size={16} opacity={0.5} /><input type="range" className="w-full accent-blue-500" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Windows Handling */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Settings' && (
                  <div className="p-6">
                    <p className="text-[11px] font-bold opacity-40 mb-4 uppercase tracking-widest">Select Desktop Wallpaper</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} onClick={() => setWallpaper(getPath(`bg${n}.jpg`))} className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${wallpaper.includes(`bg${n}`) ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}>
                          <img src={getPath(`bg${n}.jpg`)} alt="bg" className="w-full h-24 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Notes' && <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-full p-6 bg-transparent outline-none resize-none font-medium text-gray-800" />}
                {activeApp === 'Calculator' && <div className="h-full flex flex-col bg-[#1d1d1d] text-white p-4">
                  <div className="flex-1 flex items-end justify-end text-5xl font-light mb-4 tracking-tighter">0</div>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {['C','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='].map(b => (
                      <div key={b} className={`h-12 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer ${isNaN(b) && b!=='.' ? 'bg-orange-500' : 'bg-white/20 hover:bg-white/30'}`}>{b}</div>
                    ))}
                  </div>
                </div>}
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad Overlay */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} onClick={() => setShowLaunchpad(false)} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/20 p-20 flex flex-col items-center">
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-1.5 flex items-center gap-2 text-white/50 w-72 mb-16"><Search size={18} /><span>Search</span></div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-4xl">
                   <LaunchItem icon={<Globe size={45} color="white" />} name="Safari" color="bg-blue-500" />
                   <LaunchItem icon={<MessageCircle size={45} color="white" />} name="Messages" color="bg-green-500" />
                   <LaunchItem icon={<Play size={45} color="white" />} name="Music" color="bg-red-500" />
                   <LaunchItem icon={<Calculator size={45} color="white" />} name="Calculator" color="bg-orange-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
            <DockIcon icon={<LayoutGrid size={30} color="white" />} onClick={() => setShowLaunchpad(true)} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Globe size={30} color="white" />} color="bg-blue-500 shadow-blue-500/20" />
            <DockIcon icon={<MessageCircle size={30} color="white" />} color="bg-green-500 shadow-green-500/20" />
            <DockIcon icon={<Play size={30} color="white" />} color="bg-red-600 shadow-red-600/20" />
            <DockIcon icon={<ImageIcon size={30} color="white" />} color="bg-gradient-to-tr from-purple-500 to-pink-500 shadow-purple-500/20" onClick={() => setActiveApp('Settings')} />
            <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
            <DockIcon icon={<Lock size={30} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// Helper Components
function DesktopIcon({ icon, name, color, onClick }) {
  return (
    <div onDoubleClick={onClick} className="flex flex-col items-center gap-1 cursor-default group pointer-events-auto">
      <div className={`${color} w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border border-white/20 transition group-hover:brightness-110 group-active:scale-90`}>{icon}</div>
      <span className="text-white text-[11px] font-bold bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">{name}</span>
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragHandleClassName="h-10" initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[520px] h-[380px] bg-white/90 backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden">
      <div className="h-10 bg-black/5 flex items-center px-4 gap-2 cursor-default">
        <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75" />
        <div className="w-3 h-3 bg-[#FEBC2E] rounded-full" />
        <div className="w-3 h-3 bg-[#28C840] rounded-full" />
        <span className="flex-1 text-center text-[10px] font-bold opacity-40 uppercase tracking-[2px]">{title}</span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -12, scale: 1.2 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-all`}>{icon}</motion.div>;
}

function LaunchItem({ icon, name, color }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
      <div className={`${color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  );
}