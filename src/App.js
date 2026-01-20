import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Mail, Eye, EyeOff, MousePointer2, Trash2, Clock, Star, FileText
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
  
  // User Data States
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [calcValue, setCalcValue] = useState('0');

  // Wallpaper & System
  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);
  const helloTexts = ["Hello", "ආයුබෝවන්", "Bonjour", "Hola", "नमस्ते", "Ciao"];
  const [helloIndex, setHelloIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 2500);
  }, []);

  useEffect(() => {
    if (showHello) {
      const interval = setInterval(() => setHelloIndex(i => (i + 1) % helloTexts.length), 2000);
      return () => clearInterval(interval);
    }
  }, [showHello]);

  const startSetup = () => { setShowHello(false); setIsSetup(true); };

  // Calculator Logic
  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') { try { setCalcValue(String(eval(calcValue.replace('×', '*').replace('÷', '/')))); } catch { setCalcValue('Error'); } }
    else { setCalcValue(calcValue === '0' ? val : calcValue + val); }
  };

  // --- 1. BOOTING SCREEN ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Apple size={80} fill="white" className="mb-10" />
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -192 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  // --- 2. HELLO ANIMATION (CLICK TO START) ---
  if (showHello) return (
    <div onClick={startSetup} className="h-screen flex flex-col items-center justify-center cursor-pointer relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${activeWallpaper})` }}>
      <AnimatePresence mode="wait">
        <motion.h1 
          key={helloIndex}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          className="text-white text-8xl font-bold tracking-tighter"
        >
          {helloTexts[helloIndex]}
        </motion.h1>
      </AnimatePresence>
      <div className="absolute bottom-12 text-white flex flex-col items-center gap-2 opacity-50">
        <MousePointer2 size={24} className="animate-bounce" />
        <p className="text-xs tracking-[4px] uppercase font-bold">Click to setup your Mac</p>
      </div>
    </div>
  );

  // --- 3. SETUP ASSISTANT ---
  if (isSetup) return (
    <div className="h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-5xl h-[650px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <Apple size={32} fill="white" />
          <h2 className="text-4xl font-bold leading-tight">Welcome to <br/> MacBook Pro</h2>
          <div className="flex gap-1">
            {[1, 2].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${setupStep >= i ? 'bg-white' : 'bg-white/20'}`} />)}
          </div>
        </div>
        <div className="flex-1 p-20 flex flex-col justify-center items-center">
          {setupStep === 1 ? (
            <div className="w-full max-w-sm">
              <h3 className="text-3xl font-bold mb-8">What's your name?</h3>
              <input autoFocus value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-2xl font-bold border-b-2 border-gray-100 py-2 outline-none focus:border-blue-500 transition-all mb-10" placeholder="User Name" />
              <button onClick={() => setSetupStep(2)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2">Continue <ChevronRight size={18}/></button>
            </div>
          ) : (
            <div className="w-full max-w-sm">
              <h3 className="text-3xl font-bold mb-8">Set a Password</h3>
              <div className="relative mb-10">
                <input type={showPass ? "text" : "password"} value={userPass} onChange={(e) => setUserPass(e.target.value)} className="w-full text-2xl font-bold border-b-2 border-gray-100 py-2 outline-none focus:border-blue-500 transition-all" placeholder="Password" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-0 bottom-3 text-gray-400">{showPass ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
              </div>
              <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold">Start Using Mac</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* --- 4. LOGIN SCREEN --- */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md mb-6 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
            </div>
            <h1 className="text-3xl font-bold mb-8">{userName}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(inputPass === userPass) setIsLocked(false); else setPasswordError(true); }} className={`relative flex items-center ${passwordError ? 'animate-shake' : ''}`}>
              <input type={showPass ? "text" : "password"} value={inputPass} onChange={(e) => setInputPass(e.target.value)} placeholder="Enter Password" className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-center outline-none backdrop-blur-md w-72 focus:ring-4 ring-blue-500/30 transition-all font-medium" />
              <button type="submit" className="absolute right-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 shadow-lg"><ArrowRight size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 5. DESKTOP INTERFACE --- */}
      {!isLocked && (
        <div className="h-full w-full relative">
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 items-center font-bold">
              <Apple size={16} fill="white" className="cursor-pointer" onClick={() => setActiveApp('About')} />
              <span>{activeApp || 'Finder'}</span>
            </div>
            <div className="flex gap-4 items-center font-medium">
              <Wifi size={16} /><Battery size={20} />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black flex flex-col p-4">
                    <div className="flex-1 flex items-end justify-end text-white text-6xl font-light mb-4 px-2">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {['C', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((btn) => (
                        <button key={btn} onClick={() => handleCalc(btn)} className={`h-14 rounded-full text-white text-xl font-medium ${btn === '=' ? 'bg-orange-500' : isNaN(btn) ? 'bg-white/10' : 'bg-white/30'} ${btn === '0' ? 'col-span-2' : ''}`}>{btn}</button>
                      ))}
                    </div>
                  </div>
                )}

                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#F5F5F7] text-black">
                    <div className="w-1/3 bg-white/40 border-r border-gray-200 p-4 space-y-1">
                      <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold"><User size={14}/> Profile</div>
                      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs text-gray-700 font-medium"><Monitor size={14}/> Display</div>
                    </div>
                    <div className="flex-1 p-8 overflow-auto">
                      <h2 className="text-2xl font-bold mb-6">Settings</h2>
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">User Name</label>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-lg font-bold border-b border-gray-100 outline-none mt-1" />
                      </div>
                      <h3 className="text-sm font-bold mb-3">Wallpapers</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {wallpapers.map(w => <img key={w} onClick={() => setActiveWallpaper(w)} src={w} className={`rounded-xl h-20 w-full object-cover cursor-pointer border-2 ${activeWallpaper === w ? 'border-blue-500 scale-95' : 'border-transparent'}`} />)}
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'Messages' && (
                  <div className="h-full bg-white text-black flex">
                    <div className="w-1/3 border-r flex flex-col">
                       <div className="p-4 border-b font-bold flex justify-between text-sm">Messages <FileText size={16} className="text-blue-500"/></div>
                       <div className="p-4 bg-blue-50 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-300" /><div><p className="text-xs font-bold">Mom</p><p className="text-[10px] opacity-60">See you later!</p></div></div>
                    </div>
                    <div className="flex-1 flex flex-col bg-gray-50/30">
                       <div className="flex-1 p-4 flex flex-col justify-end gap-3 text-xs">
                          <div className="bg-gray-200 p-3 rounded-2xl self-start max-w-[70%]">Welcome to the new Mac!</div>
                          <div className="bg-blue-600 text-white p-3 rounded-2xl self-end max-w-[70%]">Thanks! Everything works great.</div>
                       </div>
                       <div className="p-4 flex gap-2"><input className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs outline-none" placeholder="iMessage" /><div className="bg-blue-600 p-2 rounded-full text-white"><Send size={14}/></div></div>
                    </div>
                  </div>
                )}

                {activeApp === 'Files' && (
                  <div className="h-full bg-white flex flex-col text-black">
                    <div className="h-10 bg-gray-50 border-b flex items-center px-4 gap-4"><Folder size={16} className="text-blue-500"/><span className="text-xs font-bold">Macintosh HD</span></div>
                    <div className="flex-1 p-6 grid grid-cols-4 content-start gap-8">
                      {['Documents','Downloads','Movies','Projects'].map(f => (
                        <div key={f} className="flex flex-col items-center gap-1 cursor-pointer group">
                          <Folder size={45} className="text-blue-500 group-hover:fill-blue-100 transition-all" />
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Folder size={28} color="white" />} color="bg-blue-500 shadow-blue-500/30" onClick={() => setActiveApp('Files')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500 shadow-green-500/30" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-600 shadow-gray-600/30" onClick={() => setActiveApp('Settings')} />
             <DockIcon icon={<CalcIcon size={28} color="white" />} color="bg-orange-500 shadow-orange-500/30" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => { setIsLocked(true); setInputPass(''); }} />
          </div>

          {/* Launchpad */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/30 p-20 flex flex-col items-center" onClick={() => setShowLaunchpad(false)}>
                 <div className="grid grid-cols-4 gap-12 max-w-4xl" onClick={(e) => e.stopPropagation()}>
                    <LaunchIcon icon={<CalcIcon size={40} color="white"/>} name="Calculator" color="bg-orange-500" onClick={() => {setActiveApp('Calculator'); setShowLaunchpad(false);}} />
                    <LaunchIcon icon={<MessageCircle size={40} color="white"/>} name="Messages" color="bg-green-500" onClick={() => {setActiveApp('Messages'); setShowLaunchpad(false);}} />
                    <LaunchIcon icon={<Folder size={40} color="white"/>} name="Files" color="bg-blue-600" onClick={() => {setActiveApp('Files'); setShowLaunchpad(false);}} />
                    <LaunchIcon icon={<SettingsIcon size={40} color="white"/>} name="Settings" color="bg-gray-500" onClick={() => {setActiveApp('Settings'); setShowLaunchpad(false);}} />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}

// UI Reusable Components
function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[700px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
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

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-105">
      <div className={`${color} w-20 h-20 rounded-[1.8rem] flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-sm font-semibold">{name}</span>
    </div>
  );
}