import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Folder, Settings as SettingsIcon, Monitor, User,
  ChevronRight, Send, Mail, Eye, EyeOff, MousePointer2
} from 'lucide-react';

export default function App() {
  // Navigation States
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  
  // User Data States
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // System States
  const [brightness, setBrightness] = useState(100);
  const [activeWallpaper, setActiveWallpaper] = useState("https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070");
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
    <div onClick={startSetup} className="h-screen bg-black flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1 
          key={helloIndex}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
          className="text-white text-8xl font-bold tracking-tighter"
        >
          {helloTexts[helloIndex]}
        </motion.h1>
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
        className="absolute bottom-12 text-white flex flex-col items-center gap-2"
      >
        <MousePointer2 size={24} className="animate-bounce" />
        <p className="text-xs tracking-[4px] uppercase">Click to begin</p>
      </motion.div>
    </div>
  );

  // --- 3. SETUP ASSISTANT ---
  if (isSetup) return (
    <div className="h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-5xl h-[650px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden border border-white">
        <div className="w-1/3 bg-gradient-to-b from-blue-600 to-indigo-700 p-12 text-white flex flex-col justify-between">
          <Apple size={32} fill="white" />
          <div>
            <h2 className="text-4xl font-bold mb-4">Set up your Mac</h2>
            <p className="opacity-70 text-sm">Configure your account and security settings.</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${setupStep >= i ? 'bg-white' : 'bg-white/20'}`} />)}
          </div>
        </div>
        
        <div className="flex-1 p-20 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {setupStep === 1 && (
              <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <h3 className="text-3xl font-bold mb-2">Who's using this Mac?</h3>
                <p className="text-gray-500 mb-8">Enter your name to personalize the experience.</p>
                <input 
                  autoFocus value={userName} onChange={(e) => setUserName(e.target.value)}
                  className="w-full text-2xl font-bold border-b-2 border-gray-100 py-2 outline-none focus:border-blue-500 transition-all"
                  placeholder="Full Name"
                />
                <button 
                  disabled={!userName} onClick={() => setSetupStep(2)}
                  className="mt-12 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold disabled:opacity-30 flex items-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  Continue <ChevronRight size={20}/>
                </button>
              </motion.div>
            )}

            {setupStep === 2 && (
              <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <h3 className="text-3xl font-bold mb-2">Create Password</h3>
                <p className="text-gray-500 mb-8">This password will be used to unlock your Mac.</p>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} value={userPass} onChange={(e) => setUserPass(e.target.value)}
                    className="w-full text-2xl font-bold border-b-2 border-gray-100 py-2 outline-none focus:border-blue-500 transition-all"
                    placeholder="Password"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-0 bottom-3 text-gray-400">
                    {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                </div>
                <button 
                  disabled={userPass.length < 4} onClick={() => setIsSetup(false)}
                  className="mt-12 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold disabled:opacity-30 shadow-lg shadow-blue-500/30"
                >
                  Finish Setup
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* --- 4. LOGIN SCREEN --- */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md mb-6 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
            </div>
            <h1 className="text-3xl font-bold mb-8 tracking-tight">{userName}</h1>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              if(inputPass === userPass) setIsLocked(false); 
              else { setPasswordError(true); setTimeout(() => setPasswordError(false), 500); }
            }} className={`relative flex items-center ${passwordError ? 'animate-shake' : ''}`}>
              <input 
                type={showPass ? "text" : "password"} value={inputPass} onChange={(e) => setInputPass(e.target.value)}
                placeholder="Enter Password" 
                className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-center outline-none backdrop-blur-md w-72 focus:ring-4 ring-blue-500/30 transition-all font-medium" 
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-4 text-white/30">
                 {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
              <button type="submit" className="absolute right-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-500/40"><ArrowRight size={18} /></button>
            </form>
            {passwordError && <p className="mt-4 text-red-400 text-xs font-bold uppercase tracking-widest">Wrong Password</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 5. DESKTOP INTERFACE --- */}
      {!isLocked && (
        <div className="h-full w-full relative">
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5 shadow-sm">
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
                <div className="h-full flex items-center justify-center text-black opacity-30 italic">
                  {activeApp} interface is active.
                </div>
              </Window>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} />
             <DockIcon icon={<Folder size={28} color="white" />} color="bg-blue-500" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800 shadow-lg" onClick={() => { setIsLocked(true); setInputPass(''); }} />
          </div>
        </div>
      )}

      {/* Shake animation CSS */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}

// UI Reusable Components
function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[680px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden">
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-shadow`}>{icon}</motion.div>;
}