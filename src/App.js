import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, MessageCircle, Lock, ArrowRight, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Bluetooth, Moon, Folder, 
  Settings as SettingsIcon, Monitor, User, ChevronRight, Send, Search, 
  Chrome, Github, Terminal as TermIcon, Clock as ClockIcon, Power, 
  ExternalLink, Code2, Star, Globe, ChevronLeft, File, HardDrive
} from 'lucide-react';

export default function App() {
  // System States
  const [booting, setBooting] = useState(true);
  const [showHello, setShowHello] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [userName, setUserName] = useState('Danithu');
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);

  // Finder & Terminal State
  const [currentPath, setCurrentPath] = useState('/Users/danithu');
  const [terminalOutput, setTerminalOutput] = useState(['Last login: Wed Jan 21 on ttys001', 'Type "help" for commands.']);
  const [termInput, setTermInput] = useState('');
  const [isGitInit, setIsGitInit] = useState(false);
  const [stagedFiles, setStagedFiles] = useState([]);

  // Calculator State
  const [calcValue, setCalcValue] = useState('0');

  const fileSystem = {
    '/Users/danithu': ['Applications', 'Documents', 'Projects'],
    '/Users/danithu/Applications': ['Calculator.app', 'Safari.app', 'Terminal.app'],
    '/Users/danithu/Projects': ['macOS_Clone', 'Tuition_App', 'Price_Calc'],
    '/Users/danithu/Documents': ['Resume.pdf', 'Notes.txt']
  };

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 2000);
  }, []);

  // --- TERMINAL & GIT LOGIC ---
  const executeCommand = (e) => {
    if (e.key === 'Enter') {
      const parts = termInput.trim().split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];
      let res = '';

      if (cmd === 'git') {
        if (arg === 'init') { setIsGitInit(true); res = 'Initialized empty Git repository in ' + currentPath + '/.git/'; }
        else if (!isGitInit) { res = 'fatal: not a git repository (or any of the parent directories): .git'; }
        else if (arg === 'add') { setStagedFiles(['App.js', 'styles.css', 'index.html']); res = 'staged 3 files.'; }
        else if (arg === 'status') {
           res = stagedFiles.length > 0 ? `On branch main\nChanges to be committed:\n\tmodified: App.js\n\tmodified: styles.css` : 'nothing to commit, working tree clean';
        }
      } 
      else if (cmd === 'ls') { res = fileSystem[currentPath]?.join('  ') || ''; }
      else if (cmd === 'cd') {
        if (!arg || arg === '~') setCurrentPath('/Users/danithu');
        else if (arg === '..') setCurrentPath('/Users/danithu');
        else if (fileSystem[currentPath]?.includes(arg)) setCurrentPath(`${currentPath}/${arg}`);
        else res = `cd: no such directory: ${arg}`;
      }
      else if (cmd === 'open' && arg?.includes('.app')) { setActiveApp(arg.replace('.app', '')); res = `Opening ${arg}...`; }
      else if (cmd === 'help') { res = 'Available: ls, cd, pwd, whoami, git init, git add ., git status, clear, open [app].app'; }
      else if (cmd === 'clear') { setTerminalOutput([]); setTermInput(''); return; }
      else { res = `zsh: command not found: ${cmd}`; }

      setTerminalOutput([...terminalOutput, `danithu@mac ~ % ${termInput}`, res]);
      setTermInput('');
    }
  };

  // --- CALCULATOR LOGIC ---
  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') {
      try { setCalcValue(eval(calcValue.replace('×', '*').replace('÷', '/')).toString()); } catch { setCalcValue('Error'); }
    } else { setCalcValue(calcValue === '0' ? val : calcValue + val); }
  };

  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white font-sans">
      <Apple size={70} fill="white" className="mb-10 drop-shadow-2xl" />
      <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -160 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
      </div>
    </div>
  );

  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen bg-black flex items-center justify-center cursor-pointer font-sans overflow-hidden">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-8xl font-bold tracking-tighter">Hello</motion.h1>
      <p className="absolute bottom-10 text-white/30 text-xs tracking-widest uppercase">Click to Setup Mac</p>
    </div>
  );

  if (isSetup) return (
    <div className="h-screen bg-[#F2F2F7] flex items-center justify-center font-sans">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-[800px] h-[500px] rounded-[40px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <Apple size={30} fill="white" />
          <h2 className="text-3xl font-bold leading-tight">MacBook Pro Setup</h2>
        </div>
        <div className="flex-1 p-16 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">What's your name?</h3>
          <p className="text-gray-400 mb-8 text-sm">This will be used for your home folder.</p>
          <input autoFocus value={userName} onChange={(e) => setUserName(e.target.value)} className="border-b-2 border-blue-600 text-2xl py-2 outline-none mb-10 w-full" />
          <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white w-max px-10 py-3 rounded-full font-bold shadow-lg shadow-blue-200">Get Started</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden select-none font-sans" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070')] bg-cover bg-center" />

      {/* LOGIN SCREEN */}
      <AnimatePresence>
        {isLocked && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden shadow-2xl"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" /></div>
            <h1 className="text-2xl font-bold mb-8">{userName}</h1>
            <input type="password" onKeyDown={(e) => e.key === 'Enter' && setIsLocked(false)} className="bg-white/10 border border-white/20 rounded-full px-6 py-2 text-center outline-none w-64 backdrop-blur-md" placeholder="Enter Password" autoFocus />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full flex flex-col">
          {/* TOP MENU BAR */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
            <div className="flex gap-4 font-bold items-center"><Apple size={15} fill="white" /><span>Finder</span></div>
            <div className="flex gap-4 items-center">
              <Wifi size={14} /><Sliders size={14} className="cursor-pointer" onClick={() => setShowControlCenter(!showControlCenter)} />
              <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* CONTROL CENTER */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="absolute right-2 top-10 w-80 bg-white/70 backdrop-blur-3xl rounded-3xl p-4 shadow-2xl z-[150] border border-white/40 text-black">
                 <div className="bg-white/50 p-4 rounded-2xl border border-white/50 space-y-4 shadow-sm">
                    <div className="flex flex-col gap-1"><span className="text-[10px] font-bold opacity-40">BRIGHTNESS</span><div className="flex items-center gap-2"><Sun size={14}/><input type="range" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full accent-black"/></div></div>
                    <div className="flex flex-col gap-1"><span className="text-[10px] font-bold opacity-40">VOLUME</span><div className="flex items-center gap-2"><Volume2 size={14}/><input type="range" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full accent-black"/></div></div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WINDOWS */}
          <AnimatePresence>
            {activeApp && (
              <Window title={activeApp} close={() => setActiveApp(null)}>
                {activeApp === 'Finder' && (
                  <div className="h-full flex bg-white text-black">
                    <div className="w-44 bg-gray-50/50 border-r p-4 space-y-1">
                      {['Applications', 'Documents', 'Projects'].map(f => (
                        <div key={f} onClick={() => setCurrentPath(`/Users/danithu/${f}`)} className="flex items-center gap-2 p-1.5 hover:bg-black/5 rounded-md cursor-pointer text-xs font-medium">
                          <Folder size={14} className="text-blue-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs"><ChevronLeft size={16}/> <ChevronRight size={16}/> <span className="ml-2 font-bold text-black">{currentPath}</span></div>
                      <div className="grid grid-cols-4 gap-6">
                        {fileSystem[currentPath]?.map(item => (
                          <div key={item} onDoubleClick={() => item.includes('.app') ? setActiveApp(item.replace('.app', '')) : setActiveApp('Projects')} className="flex flex-col items-center gap-1 group cursor-pointer">
                            <Folder size={40} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-medium text-center">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeApp === 'Terminal' && (
                  <div className="h-full bg-[#1c1c1e] p-4 font-mono text-xs text-green-400 overflow-y-auto">
                    {terminalOutput.map((l, i) => <div key={i} className={l.includes('modified') ? 'text-yellow-400' : ''}>{l}</div>)}
                    <div className="flex gap-2"><span>danithu@mac ~ %</span><input autoFocus value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={executeCommand} className="bg-transparent outline-none flex-1 text-green-400"/></div>
                  </div>
                )}
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black p-6 flex flex-col text-white">
                    <div className="flex-1 text-right text-5xl font-light flex items-end justify-end pb-4">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {['C','÷','×','-','7','8','9','+','4','5','6','0','1','2','3','='].map(btn => (
                        <button key={btn} onClick={() => handleCalc(btn)} className={`h-12 rounded-full text-lg ${btn === '=' ? 'bg-orange-500' : 'bg-white/20 hover:bg-white/30'}`}>{btn}</button>
                      ))}
                    </div>
                  </div>
                )}
                {activeApp === 'Safari' && (
                  <div className="h-full flex flex-col bg-white">
                    <div className="h-10 bg-gray-100 flex items-center px-4 border-b gap-4">
                       <div className="flex-1 bg-white border rounded-md py-1 px-3 text-xs text-gray-400 text-center">google.com</div>
                    </div>
                    <iframe src="https://www.bing.com" className="flex-1 w-full border-none" />
                  </div>
                )}
                {activeApp === 'Projects' && (
                  <div className="h-full bg-white p-8 overflow-y-auto text-black">
                    <h2 className="text-3xl font-black mb-8">My Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[{n: "macOS Clone", s: true, l: "https://github.com/danithu17/mac-clone"}, {n: "Tuition App", l: "#"}, {n: "Print Calculator", l: "#"}].map(p => (
                        <a key={p.n} href={p.l} target="_blank" className="p-6 border rounded-3xl relative hover:border-blue-500 transition-all">
                          {p.s && <span className="absolute top-2 right-2 bg-blue-600 text-[8px] text-white px-3 py-1 rounded-full font-bold">THIS ONE</span>}
                          <Code2 className="mb-2 text-blue-600" />
                          <h4 className="font-bold">{p.n}</h4>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Window>
            )}
          </AnimatePresence>

          {/* DOCK */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<Folder size={26} color="white"/>} color="bg-blue-500" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<Chrome size={26} color="white"/>} color="bg-white" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<TermIcon size={26} color="white"/>} color="bg-gray-800" onClick={() => setActiveApp('Terminal')} />
             <DockIcon icon={<CalcIcon size={26} color="white"/>} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <DockIcon icon={<Github size={26} color="white"/>} color="bg-black" onClick={() => setActiveApp('Projects')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={26} color="white"/>} color="bg-red-600" onClick={() => setIsLocked(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[750px] h-[480px] bg-white rounded-[32px] shadow-2xl flex flex-col border border-white z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-11 bg-gray-100/50 flex items-center px-5 border-b">
        <div className="flex gap-2"><div onClick={close} className="w-3.5 h-3.5 bg-[#FF5F57] rounded-full cursor-pointer shadow-inner" /><div className="w-3.5 h-3.5 bg-[#FEBC2E] rounded-full shadow-inner" /><div className="w-3.5 h-3.5 bg-[#28C840] rounded-full shadow-inner" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 text-black uppercase tracking-widest mr-16">{title}</span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color, onClick }) {
  return <motion.div whileHover={{ y: -15, scale: 1.3, margin: "0 10px" }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-all`}>{icon}</motion.div>;
}
