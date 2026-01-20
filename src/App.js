import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, Globe, MessageCircle, Play, Lock, 
  ArrowRight, Image as ImageIcon, LayoutGrid, FileText, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Music, Search, 
  Bluetooth, Moon, Info, Folder, Settings as SettingsIcon, Monitor, User, Laptop, 
  Camera, Mail, Phone, ChevronRight, Check
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isSetup, setIsSetup] = useState(true); // Setup Screen state
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
  const [deviceName, setDeviceName] = useState("Danithu's MacBook");
  const [calcValue, setCalcValue] = useState('0');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070",
    "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070"
  ];
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const openApp = (appName) => { setActiveApp(appName); setShowLaunchpad(false); };

  // --- Booting Animation ---
  if (booting) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Apple size={80} color="white" fill="white" />
        <div className="w-40 h-1 bg-white/20 rounded-full mt-10 overflow-hidden">
          <motion.div initial={{ x: -160 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
        </div>
      </motion.div>
    </div>
  );

  // --- Setup Assistant (මුලින්ම එන එක) ---
  if (isSetup) return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-gray-200">
        <div className="w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between">
          <div><Apple size={40} fill="white" /> <h1 className="text-3xl font-bold mt-6">Setup Assistant</h1></div>
          <p className="text-blue-100 text-sm">Configure your MacBook to get started with the best experience.</p>
        </div>
        <div className="flex-1 p-12 flex flex-col justify-center items-center text-center">
          {setupStep === 1 && (
            <motion.div initial={{ x: 20 }} animate={{ x: 0 }}>
              <Globe size={60} className="text-blue-600 mb-6 mx-auto" />
              <h2 className="text-2xl font-bold mb-2">Select your Language</h2>
              <p className="text-gray-500 mb-8">English (United States)</p>
              <button onClick={() => setSetupStep(2)} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700">Continue <ChevronRight size={18}/></button>
            </motion.div>
          )}
          {setupStep === 2 && (
            <motion.div initial={{ x: 20 }} animate={{ x: 0 }}>
              <User size={60} className="text-blue-600 mb-6 mx-auto" />
              <h2 className="text-2xl font-bold mb-2">Create Account</h2>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-3 w-64 mb-6 outline-none focus:border-blue-500 transition-all text-center font-bold" placeholder="Enter Your Name" />
              <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold block mx-auto hover:bg-blue-700">Get Started</button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative font-sans select-none overflow-hidden" style={{ filter: `brightness(${brightness}%)` }}>
      
      <motion.div key={wallpaper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      {/* Login Screen */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center border border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="avatar" />
            </div>
            <h1 className="text-2xl font-bold mb-6 tracking-tight">{userName}</h1>
            <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsLocked(false); }} className="relative flex items-center">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PIN: 1234" className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-center outline-none backdrop-blur-md w-64 focus:ring-2 ring-blue-500/50 transition-all" />
              <button type="submit" className="absolute right-2 p-1.5 bg-blue-500 rounded-full hover:bg-blue-600"><ArrowRight size={16} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full relative">
          
          {/* Menu Bar */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5 shadow-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Apple size={16} fill="white" className="cursor-pointer" onClick={() => openApp('About')} />
              <span className="font-bold">{activeApp || 'Finder'}</span>
              <div className="hidden md:flex gap-4 opacity-80 font-medium"><span>File</span><span>Edit</span><span>View</span><span>Go</span></div>
            </div>
            <div className="flex gap-4 items-center">
              <Wifi size={16} /><Battery size={20} />
              <Sliders size={16} className="cursor-pointer hover:bg-white/10 rounded p-0.5" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Windows Rendering */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                
                {/* SETTINGS UI */}
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#f5f5f7]">
                    <div className="w-1/3 bg-white/50 backdrop-blur-md p-4 flex flex-col gap-2 border-r border-gray-200">
                      <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold"><User size={14}/> User Profile</div>
                      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs text-gray-700 font-medium"><Monitor size={14}/> Appearance</div>
                      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-xs text-gray-700 font-medium"><Wifi size={14}/> Wi-Fi</div>
                    </div>
                    <div className="flex-1 p-8 text-black overflow-auto">
                      <h2 className="text-2xl font-bold mb-6">Settings</h2>
                      <div className="space-y-6">
                        <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                           <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Profile</h3>
                           <div className="flex items-center gap-4">
                              <img className="w-12 h-12 rounded-full bg-gray-200" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="p"/>
                              <div className="flex-1">
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-sm font-bold outline-none border-b border-gray-100 py-1" />
                                <p className="text-[10px] text-gray-400 mt-1">Local Admin Account</p>
                              </div>
                           </div>
                        </section>
                        <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                           <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Wallpaper</h3>
                           <div className="grid grid-cols-2 gap-2">
                             {wallpapers.map(w => <img key={w} onClick={() => setWallpaper(w)} src={w} className={`rounded-lg h-16 w-full object-cover cursor-pointer border-2 transition-all ${wallpaper===w ? 'border-blue-500 scale-95' : 'border-transparent'}`} alt="w"/>)}
                           </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}

                {/* CALCULATOR UI */}
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black flex flex-col p-4">
                    <div className="flex-1 flex items-end justify-end text-white text-6xl font-light mb-4 px-2 tracking-tight">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-3 mb-2">
                      {['C','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+'].map(b => (
                        <button key={b} onClick={() => setCalcValue(b)} className="w-full h-14 rounded-full bg-[#333] hover:bg-[#444] text-white text-xl font-medium transition-all">{b}</button>
                      ))}
                      <button className="col-span-2 h-14 rounded-full bg-[#333] text-white text-xl text-left px-6">0</button>
                      <button className="h-14 rounded-full bg-[#333] text-white text-xl">.</button>
                      <button className="h-14 rounded-full bg-orange-500 text-white text-2xl">=</button>
                    </div>
                  </div>
                )}

                {/* MESSAGES UI */}
                {activeApp === 'Messages' && (
                  <div className="h-full flex bg-white text-black">
                    <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between"><h2 className="font-bold">Messages</h2><FileText size={16} className="text-blue-500"/></div>
                      {[1,2,3].map(i => <div key={i} className={`p-4 flex gap-3 items-center hover:bg-gray-50 cursor-pointer ${i===1?'bg-blue-50':''}`}>
                        <div className="w-10 h-10 rounded-full bg-gray-200" /><div className="flex-1"><div className="flex justify-between text-[11px]"><span className="font-bold">Contact {i}</span><span className="opacity-40">10:45 AM</span></div><p className="text-[10px] opacity-60">Hey there! How's it going?</p></div>
                      </div>)}
                    </div>
                    <div className="flex-1 flex flex-col bg-gray-50/50">
                      <div className="flex-1 p-6 flex flex-col justify-end gap-2 text-xs">
                        <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none self-start max-w-[70%]">Welcome to the Message app!</div>
                        <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-br-none self-end max-w-[70%] shadow-md shadow-blue-500/20">Thanks for building this!</div>
                      </div>
                      <div className="p-4"><input className="w-full bg-white border border-gray-200 rounded-full px-4 py-2 text-xs outline-none shadow-sm" placeholder="iMessage" /></div>
                    </div>
                  </div>
                )}

                {/* SAFARI UI */}
                {activeApp === 'Safari' && (
                  <div className="h-full bg-white flex flex-col text-black">
                    <div className="bg-[#f0f0f0] p-2 flex items-center gap-4">
                      <div className="flex gap-2 ml-2"><ChevronRight size={16} className="rotate-180 opacity-30"/><ChevronRight size={16} className="opacity-30"/></div>
                      <div className="flex-1 bg-white rounded-lg p-1.5 flex items-center justify-center gap-2 text-xs text-gray-400 border border-gray-200 shadow-sm"><Lock size={12}/> google.com</div>
                      <div className="w-8" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-10">
                       <Globe size={100} /> <h1 className="text-3xl font-bold">Safari</h1>
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* Launchpad */}
          <AnimatePresence>
            {showLaunchpad && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[150] backdrop-blur-3xl bg-black/30 p-20 flex flex-col items-center justify-start overflow-y-auto" onClick={() => setShowLaunchpad(false)}>
                 <div className="grid grid-cols-4 md:grid-cols-6 gap-12 max-w-5xl" onClick={(e) => e.stopPropagation()}>
                    <LaunchIcon icon={<CalcIcon size={40} color="white"/>} name="Calculator" color="bg-orange-500" onClick={() => openApp('Calculator')} />
                    <LaunchIcon icon={<MessageCircle size={40} color="white"/>} name="Messages" color="bg-green-500" onClick={() => openApp('Messages')} />
                    <LaunchIcon icon={<ImageIcon size={40} color="white"/>} name="Photos" color="bg-gradient-to-br from-purple-400 to-pink-500" onClick={() => openApp('Photos')} />
                    <LaunchIcon icon={<Globe size={40} color="white"/>} name="Safari" color="bg-blue-500" onClick={() => openApp('Safari')} />
                    <LaunchIcon icon={<SettingsIcon size={40} color="white"/>} name="Settings" color="bg-gray-500" onClick={() => openApp('Settings')} />
                    <LaunchIcon icon={<Music size={40} color="white"/>} name="Music" color="bg-red-500" onClick={() => openApp('Music')} />
                    <LaunchIcon icon={<Folder size={40} color="white"/>} name="Files" color="bg-blue-600" onClick={() => openApp('Files')} />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl border border-white/30 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 z-[100] ring-1 ring-black/5">
             <DockIcon icon={<LayoutGrid size={28} color="white" />} onClick={() => setShowLaunchpad(true)} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Globe size={28} color="white" />} color="bg-blue-500" onClick={() => openApp('Safari')} />
             <DockIcon icon={<MessageCircle size={28} color="white" />} color="bg-green-500" onClick={() => openApp('Messages')} />
             <DockIcon icon={<ImageIcon size={28} color="white" />} color="bg-gradient-to-br from-purple-400 to-pink-500" onClick={() => openApp('Photos')} />
             <DockIcon icon={<SettingsIcon size={28} color="white" />} color="bg-gray-500" onClick={() => openApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Lock size={28} color="white" />} color="bg-gray-800" onClick={() => setIsLocked(true)} />
          </div>

        </div>
      )}
    </div>
  );
}

// UI Reusable Components
function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed w-[650px] h-[450px] bg-white/95 backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col border border-white/40 z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing border-b border-gray-200">
        <div className="flex gap-2">
          <div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-75 transition-all shadow-inner" />
          <div className="w-3 h-3 bg-[#FEBC2E] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#28C840] rounded-full shadow-inner" />
        </div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color = "bg-white/10", onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}

function LaunchIcon({ icon, name, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110">
      <div className={`${color} w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10`}>{icon}</div>
      <span className="text-white text-sm font-medium opacity-90">{name}</span>
    </div>
  );
}