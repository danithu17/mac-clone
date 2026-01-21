import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, MessageCircle, Lock, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Bluetooth, Moon, Folder, 
  Settings as SettingsIcon, Monitor, User, ChevronRight, Search, 
  Chrome, Github, Terminal as TermIcon, Power, Code2, ChevronLeft, File
} from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [userName, setUserName] = useState('Danithu');
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);

  const [currentPath, setCurrentPath] = useState('/Users/danithu');
  const [terminalOutput, setTerminalOutput] = useState(['Last login: Wed Jan 21 on ttys001', 'Type "help" for commands.']);
  const [termInput, setTermInput] = useState('');
  const [isGitInit, setIsGitInit] = useState(false);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [calcValue, setCalcValue] = useState('0');

  const wallpaper = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070";

  const fileSystem = {
    '/Users/danithu': ['Applications', 'Documents', 'Projects'],
    '/Users/danithu/Applications': ['Calculator.app', 'Safari.app', 'Terminal.app'],
    '/Users/danithu/Projects': ['macOS_Clone', 'Tuition_App'],
    '/Users/danithu/Documents': ['Resume.pdf']
  };

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 2500);
  }, []);

  const executeCommand = (e) => {
    if (e.key === 'Enter') {
      const parts = termInput.trim().split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];
      let res = '';

      if (cmd === 'git') {
        if (arg === 'init') { setIsGitInit(true); res = 'Initialized empty Git repository.'; }
        else if (!isGitInit) { res = 'fatal: not a git repository'; }
        else if (arg === 'add') { setStagedFiles(['App.js', 'index.html']); res = 'staged 2 files.'; }
        else if (arg === 'status') { res = stagedFiles.length > 0 ? `On branch main\nChanges to be committed:\n\tmodified: App.js` : 'nothing to commit'; }
      } 
      else if (cmd === 'ls') { res = fileSystem[currentPath]?.join('  ') || ''; }
      else if (cmd === 'help') { res = 'ls, git init, git add, git status, clear, open [app].app'; }
      else if (cmd === 'clear') { setTerminalOutput([]); setTermInput(''); return; }
      else { res = `zsh: command not found: ${cmd}`; }

      setTerminalOutput([...terminalOutput, `danithu@mac ~ % ${termInput}`, res]);
      setTermInput('');
    }
  };

  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <Apple size={70} fill="white" className="mb-10 animate-pulse" />
      <div className="w-44 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -176 }} animate={{ x: 0 }} transition={{ duration: 2.5 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen w-full relative flex items-center justify-center cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-white text-9xl font-bold z-10 tracking-tighter">Hello</motion.h1>
      <p className="absolute bottom-10 text-white/50 text-xs tracking-[4px] uppercase z-10">Click to enter</p>
    </div>
  );

  if (isSetup) return (
    <div className="h-screen w-full bg-[#F2F2F7] flex items-center justify-center font-sans">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-[900px] h-[550px] rounded-[40px] shadow-2xl flex overflow-hidden border border-black/5">
        <div className="w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <Apple size={40} fill="white" />
          <h2 className="text-4xl font-bold">MacBook<br/>Pro</h2>
        </div>
        <div className="flex-1 p-20 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4">Set your Name</h3>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="border-b-4 border-blue-600 text-3xl py-2 outline-none mb-12 w-full font-bold" />
          <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white w-max px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-200 hover:scale-105 transition-transform">Get Started</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden select-none font-sans" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }} />

      <AnimatePresence>
        {isLocked && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/20 text-white">
            <div className="w-28 h-28 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden shadow-2xl">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" />
            </div>
            <h1 className="text-3xl font-bold mb-10 tracking-tight">{userName}</h1>
            <input type="password" onKeyDown={(e) => e.key === 'Enter' && setIsLocked(false)} className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-center outline-none w-72 backdrop-blur-xl text-lg shadow-2xl" placeholder="Enter 1234" autoFocus />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full flex flex-col">
          {/* MENU BAR */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-5 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-5 font-bold items-center"><Apple size={16} fill="white" /><span>Finder</span><span>File</span><span>Edit</span></div>
            <div className="flex gap-4 items-center">
              <Wifi size={15} /><Sliders size={15} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* WINDOWS */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black p-6 flex flex-col text-white">
                    <div className="flex-1 text-right text-6xl font-light flex items-end justify-end pb-6">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-3">
                      {['C','/','*','-','7','8','9','+','4','5','6','0','1','2','3','='].map(btn => (
                        <button key={btn} onClick={() => {
                          if(btn === 'C') setCalcValue('0');
                          else if(btn === '=') { try{setCalcValue(eval(calcValue).toString())}catch{setCalcValue('Error')} }
                          else setCalcValue(calcValue === '0' ? btn : calcValue + btn);
                        }} className={`h-14 rounded-full text-xl font-medium ${btn === '=' ? 'bg-orange-500' : 'bg-white/10 hover:bg-white/20'}`}>{btn}</button>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Terminal' && (
                  <div className="h-full bg-[#1c1c1e] p-5 font-mono text-[13px] text-green-400 overflow-y-auto">
                    {terminalOutput.map((l, i) => <div key={i} className={l.includes('modified') ? 'text-yellow-400' : ''}>{l}</div>)}
                    <div className="flex gap-2 text-white"><span>{userName.toLowerCase()}@mac ~ %</span><input autoFocus value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={executeCommand} className="bg-transparent outline-none flex-1 text-green-400"/></div>
                  </div>
                )}
                {activeApp === 'Safari' && (
                  <div className="h-full bg-white flex flex-col">
                    <div className="h-12 bg-gray-100 border-b flex items-center px-4 gap-4">
                       <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-1 text-xs text-gray-400 text-center">google.com</div>
                    </div>
                    <iframe src="https://www.bing.com" className="flex-1 w-full border-none" />
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* DOCK */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2.5 rounded-[32px] flex gap-4 shadow-2xl items-end px-5 z-[100]">
             <DockIcon icon={<Folder size={28} color="white"/>} color="bg-blue-500" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<Chrome size={28} color="white"/>} color="bg-white shadow-xl" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<TermIcon size={28} color="white"/>} color="bg-gray-800" onClick={() => setActiveApp('Terminal')} />
             <DockIcon icon={<CalcIcon size={28} color="white"/>} color="bg-orange-500 shadow-orange-500/30" onClick={() => setActiveApp('Calculator')} />
             <div className="w-[1px] h-12 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={28} color="white"/>} color="bg-red-600" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[800px] h-[520px] bg-white rounded-[35px] shadow-2xl flex flex-col border border-white z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-12 bg-gray-100/80 flex items-center px-6 border-b border-black/5 backdrop-blur-md">
        <div className="flex gap-2.5"><div onClick={close} className="w-3.5 h-3.5 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-90 transition-all shadow-inner" /><div className="w-3.5 h-3.5 bg-[#FEBC2E] rounded-full shadow-inner" /><div className="w-3.5 h-3.5 bg-[#28C840] rounded-full shadow-inner" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 text-black uppercase tracking-[3px] mr-16">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color, onClick }) {
  return <motion.div whileHover={{ y: -18, scale: 1.4, margin: "0 12px" }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-16 h-16 rounded-[20px] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-all`}>{icon}</motion.div>;
}
