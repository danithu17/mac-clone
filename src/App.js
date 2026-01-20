import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Camera, Mail, Play, Trash2, Clock, Star
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isSetup, setIsSetup] = useState(true);
  const [setupStep, setSetupStep] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [password, setPassword] = useState('');
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  // System States
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [userName, setUserName] = useState('Danithu');
  const [calcValue, setCalcValue] = useState('0');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Hello Animation Text for Setup
  const helloTexts = ["Hello", "ආයුබෝවන්", "Bonjour", "Hola", "नमस्ते"];
  const [helloIndex, setHelloIndex] = useState(0);

  useEffect(() => {
    if (isSetup && setupStep === 1) {
      const interval = setInterval(() => {
        setHelloIndex((prev) => (prev + 1) % helloTexts.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isSetup, setupStep]);

  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Apple size={80} color="white" fill="white" className="mb-10" />
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -192 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  // --- Setup Assistant with Hello Animation ---
  if (isSetup) return (
    <div className="h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-5xl h-[600px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden border border-white/50">
        <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black p-16 text-white flex flex-col justify-center items-center relative">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={helloIndex}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-7xl font-bold tracking-tighter"
            >
              {helloTexts[helloIndex]}
            </motion.h1>
          </AnimatePresence>
          <p className="mt-6 opacity-40 text-sm tracking-widest uppercase">MacBook Air</p>
        </div>
        <div className="flex-1 p-16 flex flex-col justify-center items-center">
          {setupStep === 1 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h2 className="text-3xl font-bold mb-4">Select Your Language</h2>
              <div className="space-y-2 mb-8 w-64">
                {['English', 'Sinhala', 'French'].map(l => (
                  <div key={l} className="p-3 border rounded-xl hover:bg-gray-50 cursor-pointer transition-all">{l}</div>
                ))}
              </div>
              <button onClick={() => setSetupStep(2)} className="bg-blue-600 text-white px-10 py-3 rounded-full font-bold flex items-center gap-2">Continue <ChevronRight size={18}/></button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <User size={50} className="mx-auto mb-4 text-blue-600" />
              <h2 className="text-3xl font-bold mb-4">Create Account</h2>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-64 p-3 border rounded-xl mb-6 text-center outline-none focus:ring-2 ring-blue-500" placeholder="Enter Name" />
              <button onClick={() => setIsSetup(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Complete Setup</button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${wallpaper})` }} />

      {!isLocked ? (
        <div className="h-full w-full relative">
          {/* Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-semibold">
              <Apple size={16} fill="white" className="cursor-pointer" onClick={() => setActiveApp('About')} />
              <span>{activeApp || 'Finder'}</span>
              <div className="hidden md:flex gap-4 opacity-70"><span>File</span><span>Edit</span><span>View</span><span>Go</span></div>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} /><Battery size={20} />
              <Sliders size={16} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Real App Windows */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#F5F5F7]">
                    <div className="w-1/3 bg-white/50 border-r p-4 flex flex-col gap-1">
                      <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/20"><User size={14}/> Profile</div>
                      <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 text-xs font-medium"><Monitor size={14}/> Display</div>
                      <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 text-xs font-medium"><Wifi size={14}/> Wi-Fi</div>
                    </div>
                    <div className="flex-1 p-8 text-black overflow-auto">
                      <h2 className="text-2xl font-bold mb-6">User Settings</h2>
                      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
                        <p className="text-[10px] font-bold opacity-30 uppercase mb-1">Full Name</p>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-lg font-bold outline-none border-b border-gray-100 focus:border-blue-500 pb-1" />
                      </div>
                      <h3 className="text-sm font-bold mb-3">Wallpapers</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {wallpapers.map(w => <img key={w} onClick={() => setWallpaper(w)} src={w} className={`rounded-lg h-16 w-full object-cover cursor-pointer border-2 ${wallpaper === w ? 'border-blue-500' : 'border-transparent'}`} />)}
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'Messages' && (
                  <div className="h-full flex bg-white text-black">
                    <div className="w-1/3 border-r overflow-y-auto">
                      <div className="p-4 border-b font-bold flex justify-between">Messages <Mail size={16} className="text-blue-500"/></div>
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`p-4 flex gap-3 items-center hover:bg-gray-50 border-b border-gray-50 cursor-pointer ${i===1?'bg-blue-50/50':''}`}>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300" />
                          <div className="flex-1"><div className="flex justify-between text-[11px] font-bold"><span>Mom</span><span className="opacity-40">10:45 AM</span></div><p className="text-[10px] opacity-60">See you later!</p></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col bg-gray-50/30">
                      <div className="flex-1 p-6 flex flex-col justify-end gap-3">
                         <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none self-start text-xs max-w-[70%]">Hey, did you finish the project?</div>
                         <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none self-end text-xs max-w-[70%] shadow-md">Yes! Just finished it.</div>
                      </div>
                      <div className="p-4 flex gap-2"><input className="flex-1 bg-white border rounded-full px-4 py-2 text-xs outline-none" placeholder="iMessage" /><div className="bg-blue-600 p-2 rounded-full text-white"><Send size={14}/></div></div>
                    </div>
                  </div>
                )}

                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black flex flex-col p-4">
                    <div className="flex-1 flex items-end justify-end text-white text-6xl font-light mb-4 px-2">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-3">
                      {['C','÷','×','-','7','8','9','+','4','5','6','=','1','2','3','0'].map(b => (
                        <button key={b} onClick={() => setCalcValue(b === 'C' ? '0' : b)} className={`h-14 rounded-full text-white text-xl ${b==='='?'bg-orange-500':'bg-white/20 hover:bg-white/30'} transition-all`}>{b}</button>
                      ))}
                    </div>
                  </div>
                )}

                {activeApp === 'Files' && (
                  <div className="h-full bg-white text-black flex flex-col">
                    <div className="h-10 bg-gray-100 border-b flex items-center px-4 gap-4">
                      <div className="flex gap-2"><Folder size={16} className="text-blue-500"/><span className="text-xs font-bold">Macintosh HD</span></div>
                    </div>
                    <div className="flex-1 p-6 grid grid-cols-4 gap-8 content-start">
                       {['Documents','Downloads','Images','Projects','Movies'].map(f => (
                         <div key={f} className="flex flex-col items-center gap-1 group cursor-pointer">
                            <Folder size={45} className="text-blue-500 fill-blue-500/10 group-hover:fill-blue-500/20" />
                            <span className="text-[10px] font-medium">{f}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Folder size={28} color="white" />} color="bg-blue-500" onClick={() => setActiveApp('Files')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={28} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
          <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md mb-6 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
          </div>
          <h1 className="text-3xl font-bold mb-8 tracking-tight">{userName}</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: 1234" className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-center outline-none backdrop-blur-md w-72 focus:ring-4 ring-blue-500/30 transition-all font-medium" />
            <button type="submit" className="absolute right-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 shadow-lg"><ArrowRight size={18} /></button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[700px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}