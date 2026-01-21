import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, Wifi, Battery, MessageCircle, Lock, ArrowRight, LayoutGrid, 
  Calculator as CalcIcon, Sliders, Sun, Volume2, Bluetooth, Moon, Folder, 
  Settings as SettingsIcon, Monitor, User, ChevronRight, Send, Search, 
  Chrome, Github, Terminal as TermIcon, Clock as ClockIcon, Power, 
<<<<<<< HEAD
  ExternalLink, Code2, Star, Globe, ChevronLeft, File, Monitor smartphone
=======
  ExternalLink, Code2, Star, Globe, ChevronLeft, HardDrive, File
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
} from 'lucide-react';

export default function App() {
  // System States
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
<<<<<<< HEAD
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);
  const [userName, setUserName] = useState('Danithu');
  const [inputPass, setInputPass] = useState('');

  // App Specific States
  const [calcValue, setCalcValue] = useState('0');
=======
  const [userName, setUserName] = useState('Danithu');
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  
  // Finder & Terminal State
  const [currentPath, setCurrentPath] = useState('/Users/danithu');
  const [terminalOutput, setTerminalOutput] = useState(['Last login: Wed Jan 21 on ttys001', 'Type "help" to see commands.']);
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
  const [termInput, setTermInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['Last login: Wed Jan 21 on ttys001', 'Type "help" for commands.']);
  const [currentPath, setCurrentPath] = useState('/Users/danithu');
  const [searchQuery, setSearchQuery] = useState('');

<<<<<<< HEAD
  const wallpapers = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(wallpapers[0]);

  const fileSystem = {
    '/Users/danithu': ['Applications', 'Documents', 'Projects'],
    '/Users/danithu/Applications': ['Calculator.app', 'Safari.app', 'Terminal.app', 'Settings.app'],
    '/Users/danithu/Projects': ['Tuition_Management', 'Print_Calc', 'macOS_Clone'],
    '/Users/danithu/Documents': ['Resume.pdf', 'Notes.txt']
  };

  useEffect(() => {
    setTimeout(() => { setBooting(false); setShowHello(true); }, 2500);
    const handleShortcuts = (e) => {
      if (e.metaKey && e.code === 'Space') { e.preventDefault(); setShowSpotlight(true); }
      if (e.key === 'Escape') { setShowSpotlight(false); setShowControlCenter(false); }
    };
    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, []);

  // --- LOGIC FUNCTIONS ---
  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') { try { setCalcValue(String(eval(calcValue.replace('×', '*').replace('÷', '/')))); } catch { setCalcValue('Error'); } }
    else setCalcValue(calcValue === '0' ? val : calcValue + val);
=======
  const fileSystem = {
    '/Users/danithu': ['Applications', 'Documents', 'Projects'],
    '/Users/danithu/Applications': ['Calculator.app', 'Safari.app', 'Terminal.app'],
    '/Users/danithu/Projects': ['Tuition_Management', 'Print_Calc', 'macOS_Clone'],
    '/Users/danithu/Documents': ['Resume.pdf', 'Notes.txt']
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
  };

  useEffect(() => {
    setTimeout(() => setBooting(false), 2000);
  }, []);

  // Terminal Logic
  const executeCommand = (e) => {
    if (e.key === 'Enter') {
      const parts = termInput.trim().split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];
<<<<<<< HEAD
      let res = '';
      if (cmd === 'help') res = 'ls, cd, clear, whoami, open [app].app, pwd';
      else if (cmd === 'ls') res = fileSystem[currentPath]?.join('  ');
      else if (cmd === 'whoami') res = userName;
      else if (cmd === 'pwd') res = currentPath;
      else if (cmd === 'clear') { setTerminalOutput([]); setTermInput(''); return; }
      else if (cmd === 'open' && arg?.includes('.app')) { setActiveApp(arg.replace('.app', '')); res = `Opening ${arg}...`; }
      else if (cmd === 'cd') {
        if (fileSystem[`${currentPath}/${arg}`]) setCurrentPath(`${currentPath}/${arg}`);
        else if (arg === '..') setCurrentPath('/Users/danithu');
        else res = `cd: no such directory: ${arg}`;
      } else res = `zsh: command not found: ${cmd}`;
      setTerminalOutput([...terminalOutput, `danithu@mac ~ % ${termInput}`, res]);
=======
      let output = '';

      switch(cmd) {
        case 'help': output = 'Available: ls, cd [dir], clear, whoami, pwd, open [app]'; break;
        case 'ls': output = fileSystem[currentPath]?.join('  ') || ''; break;
        case 'pwd': output = currentPath; break;
        case 'whoami': output = userName; break;
        case 'clear': setTerminalOutput([]); setTermInput(''); return;
        case 'cd':
          if (!arg || arg === '~') setCurrentPath('/Users/danithu');
          else if (arg === '..') setCurrentPath('/Users/danithu');
          else if (fileSystem[currentPath].includes(arg)) setCurrentPath(`${currentPath}/${arg}`);
          else output = `cd: no such directory: ${arg}`;
          break;
        case 'open':
            if(arg?.includes('.app')) { setActiveApp(arg.replace('.app', '')); output = `Opening ${arg}...`; }
            else { output = 'Usage: open [AppName].app'; }
            break;
        default: output = `zsh: command not found: ${cmd}`;
      }
      setTerminalOutput([...terminalOutput, `danithu@mac ~ % ${termInput}`, output]);
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
      setTermInput('');
    }
  };

  // --- UI COMPONENTS ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Apple size={70} fill="white" className="mb-10 drop-shadow-2xl" />
<<<<<<< HEAD
      <div className="w-44 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -176 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
=======
      <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div initial={{ x: -160 }} animate={{ x: 0 }} transition={{ duration: 2 }} className="w-full h-full bg-white" />
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
      </div>
    </div>
  );

<<<<<<< HEAD
  if (showHello) return (
    <div onClick={() => { setShowHello(false); setIsSetup(true); }} className="h-screen bg-black flex items-center justify-center cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />
      <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="text-white text-9xl font-bold tracking-tighter z-10">Hello</motion.h1>
      <p className="absolute bottom-10 text-white/30 tracking-[4px] uppercase text-[10px]">Click to Start Setup</p>
    </div>
  );

  if (isSetup) return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl h-[500px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <Apple size={30} fill="white" />
          <h2 className="text-3xl font-bold">MacBook Pro</h2>
          <div className="h-1 bg-white/20 rounded-full w-full" />
        </div>
        <div className="flex-1 p-20 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">What's your name?</h3>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="text-2xl border-b-2 py-2 outline-none mb-10 focus:border-blue-600 transition-all" />
          <button onClick={() => setIsSetup(false)} className="bg-blue-600 text-white w-max px-12 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30">Get Started</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden font-sans select-none transition-all duration-700" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeWallpaper})` }} />
=======
  return (
    <div className="h-screen w-full relative overflow-hidden select-none" style={{ filter: `brightness(${brightness}%)` }}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070')] bg-cover bg-center" />
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2

      {/* SPOTLIGHT */}
      <AnimatePresence>
        {showSpotlight && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[300] bg-black/10 backdrop-blur-sm pt-[15vh] flex justify-center" onClick={() => setShowSpotlight(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-[600px] bg-white/70 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/50 h-max overflow-hidden">
              <div className="flex items-center p-5 gap-4">
                <Search size={24} className="text-gray-400" />
                <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent w-full text-2xl outline-none text-black font-light" placeholder="Spotlight Search" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN SCREEN */}
      <AnimatePresence>
        {isLocked && (
<<<<<<< HEAD
          <motion.div exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" /></div>
            <h1 className="text-2xl font-bold mb-8">{userName}</h1>
=======
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="absolute inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-3xl bg-black/40 text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 mb-6 border border-white/30 overflow-hidden shadow-2xl">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="u" />
            </div>
            <h1 className="text-2xl font-bold mb-8 tracking-tight">{userName}</h1>
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
            <input type="password" onKeyDown={(e) => e.key === 'Enter' && setIsLocked(false)} className="bg-white/10 border border-white/20 rounded-full px-6 py-2 text-center outline-none w-64 backdrop-blur-md" placeholder="Password" autoFocus />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLocked && (
        <div className="h-full w-full flex flex-col" onClick={() => { setShowControlCenter(false); setShowSpotlight(false); }}>
          {/* MENU BAR */}
          <div className="h-8 bg-black/10 backdrop-blur-3xl flex justify-between px-4 items-center text-white text-[13px] z-[100] border-b border-white/5">
<<<<<<< HEAD
            <div className="flex gap-4 font-bold items-center">
              <Apple size={15} fill="white" className="cursor-pointer" />
              <span className="font-bold">Finder</span>
              <div className="hidden md:flex gap-4 opacity-70 font-medium"><span>File</span><span>Edit</span><span>View</span><span>Go</span></div>
            </div>
=======
            <div className="flex gap-4 font-bold items-center"><Apple size={15} fill="white" /><span>Finder</span></div>
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
            <div className="flex gap-4 items-center">
              <Wifi size={14} /><Search size={14} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowSpotlight(true); }} />
              <Sliders size={14} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowControlCenter(!showControlCenter); }} />
              <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* CONTROL CENTER */}
          <AnimatePresence>
            {showControlCenter && (
<<<<<<< HEAD
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="absolute right-2 top-10 w-80 bg-white/70 backdrop-blur-3xl rounded-3xl p-4 shadow-2xl z-[150] border border-white/40 text-black">
                 <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-2 border border-white/50 shadow-sm">
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Wifi size={14}/></div><span className="text-[11px] font-bold">Wi-Fi</span></div>
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Bluetooth size={14}/></div><span className="text-[11px] font-bold">Bluetooth</span></div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-2xl flex items-center gap-2 border border-white/50 shadow-sm">
                       <div className="bg-indigo-600 p-2 rounded-full text-white"><Moon size={16}/></div><span className="text-[11px] font-bold">Focus</span>
                    </div>
                 </div>
                 <div className="bg-white/50 p-4 rounded-2xl border border-white/50 space-y-4 shadow-sm">
=======
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="absolute right-2 top-10 w-80 bg-white/70 backdrop-blur-3xl rounded-3xl p-4 shadow-2xl z-[150] border border-white/40 text-black">
                 <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/50 p-3 rounded-2xl flex flex-col gap-2 border border-white/50">
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Wifi size={14}/></div><span className="text-[11px] font-bold">Wi-Fi</span></div>
                       <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-full text-white"><Bluetooth size={14}/></div><span className="text-[11px] font-bold">Bluetooth</span></div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-2xl flex items-center gap-2 border border-white/50">
                       <div className="bg-indigo-600 p-2 rounded-full text-white"><Moon size={16}/></div><span className="text-[11px] font-bold">Focus</span>
                    </div>
                 </div>
                 <div className="bg-white/50 p-4 rounded-2xl border border-white/50 space-y-4">
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
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
<<<<<<< HEAD
                {activeApp === 'Calculator' && (
                  <div className="h-full bg-black p-6 flex flex-col">
                    <div className="flex-1 text-right text-white text-6xl font-light mb-4">{calcValue}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {['C','÷','×','7','8','9','-','4','5','6','+','1','2','3','=','0'].map(b => (
                        <button key={b} onClick={() => handleCalc(b)} className={`h-14 rounded-full text-white text-xl ${b==='='?'bg-orange-500':'bg-white/20 hover:bg-white/30'}`}>{b}</button>
=======
                {activeApp === 'Finder' && (
                  <div className="h-full flex bg-white text-black">
                    <div className="w-44 bg-gray-50/50 border-r p-4 space-y-1">
                      {['Applications', 'Documents', 'Projects'].map(f => (
                        <div key={f} onClick={() => setCurrentPath(`/Users/danithu/${f}`)} className="flex items-center gap-2 p-1.5 hover:bg-black/5 rounded-md cursor-pointer text-xs font-medium">
                          <Folder size={14} className="text-blue-500" /> {f}
                        </div>
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
                      ))}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs"><ChevronLeft size={16}/> <ChevronRight size={16}/> <span className="ml-2 font-bold text-black">{currentPath}</span></div>
                      <div className="grid grid-cols-4 gap-6">
                        {fileSystem[currentPath]?.map(item => (
                          <div key={item} onDoubleClick={() => item.includes('.app') ? setActiveApp(item.replace('.app', '')) : setActiveApp('Projects')} className="flex flex-col items-center gap-1 group cursor-pointer">
                            {item.includes('.app') || item.includes('.pdf') ? <File size={40} className="text-gray-400 group-hover:text-blue-500" /> : <Folder size={40} className="text-blue-500 group-hover:brightness-90" />}
                            <span className="text-[10px] font-medium text-center">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeApp === 'Finder' && (
                  <div className="h-full flex bg-white text-black">
                    <div className="w-48 bg-gray-50/50 border-r p-4 space-y-1">
                      {['Applications', 'Documents', 'Projects'].map(f => (
                        <div key={f} onClick={() => setCurrentPath(`/Users/danithu/${f}`)} className="flex items-center gap-2 p-2 hover:bg-black/5 rounded-lg cursor-pointer text-xs font-semibold">
                          <Folder size={15} className="text-blue-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs"><ChevronLeft size={16}/> <ChevronRight size={16}/> <span className="ml-2 font-bold text-black">{currentPath}</span></div>
                      <div className="grid grid-cols-4 gap-8">
                        {fileSystem[currentPath]?.map(item => (
                          <div key={item} onDoubleClick={() => item.includes('.app') ? setActiveApp(item.replace('.app', '')) : setActiveApp('Projects')} className="flex flex-col items-center gap-1 group cursor-pointer">
                            {item.includes('.app') ? <LayoutGrid size={45} className="text-gray-400 group-hover:text-blue-500" /> : <Folder size={45} className="text-blue-500 group-hover:scale-110 transition-transform" />}
                            <span className="text-[11px] font-medium text-center">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeApp === 'Terminal' && (
<<<<<<< HEAD
                  <div className="h-full bg-[#1c1c1e] p-5 font-mono text-sm text-green-400 overflow-y-auto">
                    {terminalOutput.map((l, i) => <div key={i} className="mb-1 leading-relaxed">{l}</div>)}
                    <div className="flex gap-2 text-white"><span>danithu@mac ~ %</span><input autoFocus value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={handleTerminal} className="bg-transparent outline-none flex-1 text-green-400"/></div>
                  </div>
                )}
                {activeApp === 'Safari' && (
                  <div className="h-full flex flex-col bg-white">
                    <div className="h-10 bg-gray-100 flex items-center px-4 gap-4 border-b">
                      <div className="flex gap-1"><ChevronLeft size={16} className="text-gray-400"/><ChevronRight size={16} className="text-gray-400"/></div>
                      <div className="flex-1 bg-white border rounded-md py-1 px-4 text-center text-xs text-gray-400">google.com</div>
                    </div>
                    <iframe src="https://www.bing.com" className="flex-1 w-full border-none" title="safari"/>
                  </div>
                )}
                {activeApp === 'Projects' && (
                  <div className="h-full bg-white p-10 overflow-y-auto text-black">
                    <div className="flex justify-between items-center mb-10"><h2 className="text-4xl font-black tracking-tight">Portfolio</h2><Github size={30}/></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {n: "macOS Clone", s: true, l: "https://github.com/danithu17/mac-clone", d: "The current project you are viewing."},
                        {n: "Tuition Management", l: "https://github.com/danithu17/TUITION_CLASS_MANAGEMENT_Public-visualverse", d: "A system for educational class management."},
                        {n: "Print Calculator", l: "https://github.com/danithu17/PrintPriceCalculator", d: "Instant cost calculator for printing."}
                      ].map(p => (
                        <a key={p.n} href={p.l} target="_blank" rel="noreferrer" className={`p-6 border rounded-[32px] relative group hover:shadow-2xl transition-all ${p.s ? 'border-blue-600 ring-4 ring-blue-50' : 'hover:border-gray-300'}`}>
                          {p.s && <span className="absolute top-4 right-6 bg-blue-600 text-[9px] text-white px-3 py-1 rounded-full font-bold animate-bounce shadow-lg shadow-blue-500/50">THIS ONE</span>}
                          <Code2 size={24} className="mb-4 text-blue-600" />
                          <h4 className="text-xl font-bold mb-2">{p.n}</h4>
                          <p className="text-sm text-gray-500 mb-6">{p.d}</p>
                          <ExternalLink size={16} className="text-gray-300 group-hover:text-blue-600" />
=======
                  <div className="h-full bg-[#1c1c1e] p-4 font-mono text-xs text-green-400 overflow-y-auto">
                    {terminalOutput.map((l, i) => <div key={i}>{l}</div>)}
                    <div className="flex gap-2"><span>danithu@mac ~ %</span><input autoFocus value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={executeCommand} className="bg-transparent outline-none flex-1"/></div>
                  </div>
                )}
                {activeApp === 'Projects' && (
                  <div className="h-full bg-white p-8 overflow-y-auto text-black">
                    <h2 className="text-3xl font-black mb-8">Projects Hub</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[{n: "macOS Clone", s: true, l: "https://github.com/danithu17/mac-clone"}, {n: "Tuition Management", l: "https://github.com/danithu17/TUITION_CLASS_MANAGEMENT_Public-visualverse"}, {n: "Print Calculator", l: "https://github.com/danithu17/PrintPriceCalculator"}].map(p => (
                        <a key={p.n} href={p.l} target="_blank" className={`p-6 border rounded-3xl relative hover:border-blue-500 transition-all ${p.s ? 'border-blue-600 ring-2 ring-blue-50' : ''}`}>
                          {p.s && <span className="absolute top-2 right-2 bg-blue-600 text-[8px] text-white px-3 py-1 rounded-full font-bold shadow-lg">THIS ONE</span>}
                          <Code2 className="mb-2 text-blue-600" />
                          <h4 className="font-bold">{p.n}</h4>
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
                        </a>
                      ))}
                    </div>
                  </div>
                )}
<<<<<<< HEAD
                {activeApp === 'Messages' && (
                   <div className="h-full flex bg-white text-black">
                      <div className="w-1/3 border-r p-4 font-bold text-lg">Messages</div>
                      <div className="flex-1 flex flex-col p-6 bg-gray-50/50">
                        <div className="flex-1 flex flex-col justify-end gap-3 pb-4">
                           <div className="bg-gray-200 p-3 rounded-2xl self-start text-sm max-w-[80%]">Welcome to the Mac Clone! 🚀</div>
                           <div className="bg-blue-600 text-white p-3 rounded-2xl self-end text-sm max-w-[80%]">Everything looks great!</div>
                        </div>
                        <div className="flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 outline-none text-sm" placeholder="iMessage" /><div className="bg-blue-600 p-2 rounded-full text-white"><Send size={18}/></div></div>
                      </div>
                   </div>
                )}
                {activeApp === 'Settings' && (
                  <div className="h-full flex bg-[#F6F6F6] text-black">
                    <div className="w-1/3 p-4 space-y-2 border-r">
                      <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center gap-2 text-xs font-bold"><User size={14}/> User Profile</div>
                      <div className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-2 text-xs font-medium"><Monitor size={14}/> Appearance</div>
                    </div>
                    <div className="flex-1 p-10">
                      <h2 className="text-2xl font-bold mb-8">User Settings</h2>
                      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-black/5">
                        <label className="text-[10px] font-bold text-gray-400 block mb-1">USERNAME</label>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full text-lg font-bold border-none outline-none" />
                      </div>
                      <h3 className="font-bold mb-4">Desktop Wallpaper</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {wallpapers.map(w => <img key={w} src={w} onClick={() => setActiveWallpaper(w)} className={`h-24 w-full object-cover rounded-xl cursor-pointer border-2 ${activeWallpaper === w ? 'border-blue-500' : 'border-transparent'}`} alt="wp"/>)}
                      </div>
                    </div>
                  </div>
                )}
=======
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
              </Window>
            )}
          </AnimatePresence>

          {/* DESKTOP WIDGETS */}
          <div className="absolute top-12 right-6 space-y-4 pointer-events-none opacity-90">
             <div className="w-44 h-44 bg-white/10 backdrop-blur-md rounded-[35px] border border-white/20 p-6 text-white flex flex-col justify-center items-center shadow-2xl">
                <ClockIcon size={40} className="mb-2 opacity-80" />
                <span className="text-3xl font-bold tracking-tighter">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-[10px] font-bold opacity-50 tracking-widest mt-1">Negombo, Sri Lanka</span>
             </div>
          </div>

          {/* DOCK */}
<<<<<<< HEAD
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[32px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<Folder size={26} color="white"/>} color="bg-blue-500 shadow-blue-500/30" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<Chrome size={26} color="white"/>} color="bg-white shadow-xl" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<Github size={26} color="white"/>} color="bg-black shadow-black/40" onClick={() => setActiveApp('Projects')} />
             <DockIcon icon={<TermIcon size={26} color="white"/>} color="bg-gray-800" onClick={() => setActiveApp('Terminal')} />
             <DockIcon icon={<MessageCircle size={26} color="white"/>} color="bg-green-500 shadow-green-500/30" onClick={() => setActiveApp('Messages')} />
             <DockIcon icon={<CalcIcon size={26} color="white"/>} color="bg-orange-500 shadow-orange-500/30" onClick={() => setActiveApp('Calculator')} />
             <DockIcon icon={<SettingsIcon size={26} color="white"/>} color="bg-gray-500 shadow-gray-500/30" onClick={() => setActiveApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={26} color="white"/>} color="bg-red-600 shadow-red-500/30" onClick={() => setIsLocked(true)} />
=======
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[30px] flex gap-3 shadow-2xl items-end px-4 z-[100]">
             <DockIcon icon={<Folder size={26} color="white"/>} color="bg-blue-500" onClick={() => setActiveApp('Finder')} />
             <DockIcon icon={<Chrome size={26} color="white"/>} color="bg-white" onClick={() => setActiveApp('Safari')} />
             <DockIcon icon={<Github size={26} color="white"/>} color="bg-black" onClick={() => setActiveApp('Projects')} />
             <DockIcon icon={<TermIcon size={26} color="white"/>} color="bg-gray-800" onClick={() => setActiveApp('Terminal')} />
             <DockIcon icon={<CalcIcon size={26} color="white"/>} color="bg-orange-500" onClick={() => setActiveApp('Calculator')} />
             <DockIcon icon={<SettingsIcon size={26} color="white"/>} color="bg-gray-500" onClick={() => setActiveApp('Settings')} />
             <div className="w-[1px] h-10 bg-white/20 self-center mx-1" />
             <DockIcon icon={<Power size={26} color="white"/>} color="bg-red-600" onClick={() => setIsLocked(true)} />
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
          </div>
        </div>
      )}
    </div>
  );
}

function Window({ title, children, close }) {
  return (
<<<<<<< HEAD
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[850px] h-[550px] bg-white rounded-[32px] shadow-2xl flex flex-col border border-white/50 z-50 overflow-hidden ring-1 ring-black/5">
      <div className="h-11 bg-gray-100/80 flex items-center px-5 border-b border-black/5">
        <div className="flex gap-2.5"><div onClick={close} className="w-3.5 h-3.5 bg-[#FF5F57] rounded-full cursor-pointer hover:brightness-90 transition-all shadow-inner" /><div className="w-3.5 h-3.5 bg-[#FEBC2E] rounded-full shadow-inner" /><div className="w-3.5 h-3.5 bg-[#28C840] rounded-full shadow-inner" /></div>
        <span className="flex-1 text-center text-[11px] font-bold opacity-30 uppercase tracking-[2px] text-black mr-16">{title}</span>
=======
    <motion.div drag dragMomentum={false} initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }} animate={{ scale: 1, opacity: 1 }} className="fixed w-[800px] h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col border border-white z-50 overflow-hidden ring-1 ring-black/10">
      <div className="h-10 bg-gray-100 flex items-center px-4 border-b">
        <div className="flex gap-2"><div onClick={close} className="w-3 h-3 bg-[#FF5F57] rounded-full cursor-pointer" /><div className="w-3 h-3 bg-[#FEBC2E] rounded-full" /><div className="w-3 h-3 bg-[#28C840] rounded-full" /></div>
        <span className="flex-1 text-center text-[10px] font-bold opacity-30 tracking-[2px] text-black mr-12 uppercase">{title}</span>
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function DockIcon({ icon, color, onClick }) {
<<<<<<< HEAD
  return <motion.div whileHover={{ y: -18, scale: 1.35, margin: "0 10px" }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={onClick} className={`${color} w-14 h-14 rounded-[18px] flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-all`}>{icon}</motion.div>;
=======
  return <motion.div whileHover={{ y: -15, scale: 1.3, margin: "0 10px" }} onClick={onClick} className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer border border-white/10 transition-all`}>{icon}</motion.div>;
>>>>>>> ee029c93fbc0179cdb1066c64d969538c01e10d2
}