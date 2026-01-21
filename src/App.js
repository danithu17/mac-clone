import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, MessageCircle, Lock, ArrowRight, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Bluetooth, Moon, Folder, 
  Settings as SettingsIcon, Monitor, User, ChevronRight, Send, Search, 
  Chrome, Github, Terminal as TermIcon, Clock as ClockIcon, Power, 
  ExternalLink, Code2, Star, Globe
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [userName, setUserName] = useState('Danithu');
  const [userPass, setUserPass] = useState('1234');
  const [inputPass, setInputPass] = useState('');
  const [calcValue, setCalcValue] = useState('0');
  const [brightness, setBrightness] = useState(100);
  const [terminalOutput, setTerminalOutput] = useState(['Last login: Wed Jan 21 on ttys001', 'Type "help" for commands.']);
  const [termInput, setTermInput] = useState('');

  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 2000);
  }, []);

  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') { try { setCalcValue(String(eval(calcValue.replace('×', '*').replace('÷', '/')))); } catch { setCalcValue('Error'); } }
    else setCalcValue(calcValue === '0' ? val : calcValue + val);
  };

  const handleTerminal = (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.toLowerCase();
      let res = cmd === 'help' ? 'help, ls, clear, whoami, open-projects' : 
                cmd === 'ls' ? 'Apps  Docs  Projects' : 
                cmd === 'whoami' ? userName : 
                cmd === 'open-projects' ? 'Opening...' : `cmd not found: ${cmd}`;
      if(cmd === 'open-projects') setActiveApp('Projects');
      setTerminalOutput([...terminalOutput, `danithu@mac ~ % ${termInput}`, res]);
      setTermInput('');
    }
  };

  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Apple size={70} fill="white" className="mb-10" />
      <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -160 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen bg-black flex items-center justify-center cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />
      <motion.h1 animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-white text-8xl font-bold tracking-tighter z-10">Hello</motion.h1>
    </div>
  );

  if (isSetup) return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl h-[500px] bg-white rounded-[32px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between">
          <Apple size={30} fill="white" />
          <h2 className="text-3xl font-bold">Setup MacBook</h2>
          <div className="h-1 bg-white/20 w-full" />
        </div>
        <div className="flex-1 p-16 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Enter Username</h3>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="border-b-2 py-2 outline-none mb-8 text-xl" />
          <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white px-10 py-3 rounded-full font-bold">Complete</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden font-sans select-none" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />

      {/* LOGIN */}
      <AnimatePresence>
        {isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" /></div>
            <h1 className="text-2xl font-bold mb-8">{userName}</h1>
            <input type="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && inputPass === userPass && setIsLocked(false)} className="bg-white/10 border border-white/20 rounded-full px-6 py-2 text-center outline-none w-64" placeholder="Password" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full flex flex-col">
          {/* MENU BAR */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100]">
            <div className="flex gap-4 font-bold items-center"><Apple size={15} fill="white" /><span>Finder</span></div>
            <div className="flex gap-4 items-center">
              <Wifi size={14} /><Sliders size={14} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* CONTROL CENTER */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="absolute right-2 top-10 w-72 bg-white/70 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl z-[150] border border-white/50">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white/40 p-2 rounded-xl"><Wifi size={16} className="text-blue-600"/> <span className="text-xs font-bold">Wi-Fi</span></div>
                    <div className="space-y-1"><span className="text-[10px] font-bold opacity-40">BRIGHTNESS</span><input type="range" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full accent-black"/></div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WINDOWS */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black p-6 flex flex-col">
                    <div className="flex-1 text-right text-white text-5xl font-light">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {['C','÷','×','7','8','9','-','4','5','6','+','1','2','3','=','0'].map(b => (
                        <button key={b} onClick={() => handleCalc(b)} className={`h-12 rounded-full text-white ${b==='='?'bg-orange-500':'bg-white/20'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Terminal' && (
                  <div className="h-full bg-[#1c1c1e] p-4 font-mono text-xs text-green-400 overflow-y-auto">
                    {terminalOutput.map((l, i) => <div key={i}>{l}</div>)}
                    <div className="flex gap-2"><span>danithu@mac %</span><input autoFocus value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={handleTerminal} className="bg-transparent outline-none flex-1"/></div>
                  </div>
                )}
                {activeApp === 'Projects' && (
                  <div className="h-full bg-white p-6 overflow-y-auto">
                    <h2 className="text-2xl font-black mb-6">GitHub Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {n: "Tuition Management", l: "https://github.com/danithu17/TUITION_CLASS_MANAGEMENT_Public-visualverse"},
                        {n: "Print Price Calc", l: "https://github.com/danithu17/PrintPriceCalculator"},
                        {n: "macOS Clone", l: "https://github.com/danithu17/mac-clone", s: true}
                      ].map(p => (
                        <a key={p.n} href={p.l} target="_blank" className={`p-4 border rounded-2xl relative hover:border-blue-500 transition-all ${p.s ? 'border-blue-600 shadow-lg' : ''}`}>
                          {p.s && <span className="absolute top-2 right-2 bg-blue-600 text-[8px] text-white px-2 py-0.5 rounded-full font-bold animate-pulse">THIS ONE</span>}
                          <Code2 size={20} className="mb-2 text-blue-600"/>
                          <h4 className="font-bold text-black text-sm">{p.n}</h4>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Safari' && (
                  <div className="h-full flex flex-col">
                    <div className="h-8 bg-gray-100 flex items-center px-4 border-b text-[10px] text-gray-400">google.com</div>
                    <iframe src="https://www.bing.com" className="flex-1 w-full border-none"/>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* DOCK */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[28px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<Chrome size={24} color="white"/>} color="bg-blue-500" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<Github size={24} color="white"/>} color="bg-black" onClick={() => setActiveApp('Projects')} />
             <DockIcon icon={<TermIcon size={24} color="white"/>} color="bg-gray-800" onClick={() => setActiveApp('Terminal')} />
             <DockIcon icon={<MessageCircle size={24} color="white"/>} color="bg-green-500" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<CalcIcon size={24} color="white"/>} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <DockIcon icon={<SettingsIcon size={24} color="white"/>} color="bg-gray-600" onClick={() => setActiveApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={24} color="white"/>} color="bg-red-600" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[750px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col border border-white z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 border-b">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 tracking-[2px] text-black mr-12 uppercase">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color, onClick }) {
  return <motion.div whileHover={{ y: -12, scale: 1.2 }} onClick={onClick} className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10`}>{icon}</motion.div>;
}