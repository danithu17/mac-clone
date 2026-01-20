import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Mail, Eye, EyeOff, MousePointer2, Trash2, Clock, Star, FileText,
  Github, ExternalLink, Code2, Camera
} from 'lucide-react';

export default function App() {
  // Navigation States
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  
  // User & System States
  const [userName, setUserName] = useState('User');
  const [userPass, setUserPass] = useState('1234');
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [calcValue, setCalcValue] = useState('0');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);
  const [helloIndex, setHelloIndex] = useState(0);
  const helloTexts = ["Hello", "ආයුබෝවන්", "Bonjour", "Hola", "नमस्ते", "Ciao"];

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 3000);
  }, []);

  useEffect(() => {
    if (showHello) {
      const interval = setInterval(() => setHelloIndex(i => (i + 1) % helloTexts.length), 2000);
      return () => clearInterval(interval);
    }
  }, [showHello]);

  // Calculator Logic
  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') { try { setCalcValue(String(eval(calcValue.replace('×', '*').replace('÷', '/')))); } catch { setCalcValue('Error'); } }
    else { setCalcValue(calcValue === '0' ? val : calcValue + val); }
  };

  // --- 1. BOOTING SCREEN ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="flex flex-col items-center">
        <Apple size={80} fill="white" className="mb-14 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div initial={{ x: -192 }} animate={{ x: 0 }} transition={{ duration: 2.5, ease: "easeInOut" }} className="w-full h-full bg-white" />
        </div>
      </motion.div>
    </div>
  );

  // --- 2. HELLO ANIMATION ---
  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen bg-black flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />
      <AnimatePresence mode="wait">
        <motion.h1 key={helloIndex} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-white text-8xl font-bold tracking-tighter z-10">{helloTexts[helloIndex]}</motion.h1>
      </AnimatePresence>
      <div className="absolute bottom-12 text-white/50 flex flex-col items-center gap-2">
        <MousePointer2 size={24} className="animate-bounce" />
        <p className="text-[10px] tracking-[4px] uppercase font-bold">Click to start setup</p>
      </div>
    </div>
  );

  // --- 3. SETUP ASSISTANT ---
  if (isSetup) return (
    <div className="h-screen flex items-center justify-center bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full max-w-4xl h-[580px] bg-white/90 rounded-[40px] shadow-2xl flex overflow-hidden border border-white/50">
        <div className="w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <Apple size={32} fill="white" />
          <h2 className="text-4xl font-bold leading-tight">Welcome to <br/> MacBook Pro</h2>
          <div className="h-1 bg-white/20 rounded-full"><div className={`h-full bg-white transition-all ${setupStep === 1 ? 'w-1/2' : 'w-full'}`} /></div>
        </div>
        <div className="flex-1 p-20 flex flex-col justify-center">
          {setupStep === 1 ? (
            <div className="w-full">
              <h3 className="text-3xl font-bold mb-8">What's your name?</h3>
              <input autoFocus value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-2xl border-b-2 py-2 outline-none focus:border-blue-600 mb-10" placeholder="Your Name" />
              <button onClick={() => setSetupStep(2)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold">Continue</button>
            </div>
          ) : (
            <div className="w-full">
              <h3 className="text-3xl font-bold mb-8">Choose Password</h3>
              <input type="password" value={userPass} onChange={(e) => setUserPass(e.target.value)} className="w-full text-2xl border-b-2 py-2 outline-none focus:border-blue-600 mb-10" placeholder="Enter Password" />
              <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold">Finish Setup</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* --- LOGIN --- */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/30 text-white">
            <div className="w-24 h-24 rounded-full bg-gray-400 mb-6 border-4 border-white/20 overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" /></div>
            <h1 className="text-2xl font-bold mb-8">{userName}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(inputPass === userPass) setIsLocked(false); }} className="relative">
              <input type="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} className="bg-white/20 border border-white/20 rounded-full px-8 py-3 text-center outline-none w-72 backdrop-blur-md" placeholder="Enter Password" />
              <button type="submit" className="absolute right-2 top-2 p-1.5 bg-white/20 rounded-full"><ArrowRight size={18}/></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN UI --- */}
      {!isLocked && (
        <div className="h-full w-full flex flex-col">
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-4 font-bold"><Apple size={15} fill="white" className="cursor-pointer" onClick={() => setActiveApp('About')} /><span>{activeApp || 'Finder'}</span></div>
            <div className="flex gap-4 items-center"><Wifi size={14} /><Battery size={18} /><span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>

          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black flex flex-col p-6">
                    <div className="flex-1 flex items-end justify-end text-white text-6xl font-light mb-6">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-3">
                      {['C', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0'].map(b => (
                        <button key={b} onClick={() => handleCalc(b)} className={`h-14 rounded-full text-white text-xl font-medium ${b === '=' ? 'bg-orange-500' : 'bg-white/20'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                )}

                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#F5F5F7] text-black">
                    <div className="w-1/3 bg-white/50 border-r p-4 space-y-1">
                      <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold"><User size={14}/> General</div>
                      <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 text-xs font-medium"><Monitor size={14}/> Appearance</div>
                    </div>
                    <div className="flex-1 p-8">
                      <h2 className="text-2xl font-bold mb-6">General</h2>
                      <div className="bg-white p-4 rounded-xl border mb-6">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">User</p>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-lg font-bold border-none outline-none" />
                      </div>
                      <h3 className="font-bold mb-4">Desktop Wallpaper</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {wallpapers.map(w => <img key={w} src={w} onClick={() => setActiveWallpaper(w)} className={`h-20 w-full object-cover rounded-xl cursor-pointer border-2 ${activeWallpaper === w ? 'border-blue-500' : 'border-transparent'}`} />)}
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'Messages' && (
                   <div className="h-full flex bg-white text-black">
                      <div className="w-1/3 border-r overflow-y-auto">
                        <div className="p-4 border-b font-bold">Messages</div>
                        <div className="p-4 flex gap-3 bg-blue-50/50 border-b cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-gray-300" />
                          <div><p className="text-xs font-bold">Danithu</p><p className="text-[10px] opacity-60">Working on the new project!</p></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col bg-gray-50/30 p-4">
                        <div className="flex-1 flex flex-col justify-end gap-2">
                           <div className="bg-gray-200 p-3 rounded-2xl self-start text-xs max-w-[70%]">Hey! Any updates?</div>
                           <div className="bg-blue-600 text-white p-3 rounded-2xl self-end text-xs max-w-[70%]">Almost done with the UI!</div>
                        </div>
                        <div className="mt-4 flex gap-2"><input className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs outline-none" placeholder="iMessage" /><div className="bg-blue-600 p-2 rounded-full text-white"><Send size={14}/></div></div>
                      </div>
                   </div>
                )}

                {activeApp === 'Projects' && (
                  <div className="h-full bg-white p-8 overflow-auto text-black">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Github size={30}/> My Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {['E-Commerce App', 'Weather App', 'Mac OS Clone', 'Portfolio Site'].map(p => (
                        <div key={p} className="p-5 border rounded-2xl hover:border-blue-500 transition-all cursor-pointer group">
                          <Code2 className="text-blue-600 mb-2" size={24}/>
                          <h4 className="font-bold">{p}</h4>
                          <p className="text-xs text-gray-500 mt-1">Built using React and Tailwind CSS</p>
                          <ExternalLink size={14} className="mt-4 text-gray-300 group-hover:text-blue-500"/>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Folder size={28} color="white" />} color="bg-blue-500" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<Github size={28} color="white" />} color="bg-gray-900 shadow-xl" onClick={() => setActiveApp('Projects')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={28} color="white" />} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-black" onClick={() => { setIsLocked(true); setInputPass(''); }} />
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[720px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100/80 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black mr-12">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}