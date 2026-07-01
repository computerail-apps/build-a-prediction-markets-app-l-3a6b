import React from 'react';
interface Props { tab: string; setTab: (t:string)=>void; }
export default function Navbar({ tab, setTab }: Props) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-indigo-400">PredictX</span>
        <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">BETA</span>
      </div>
      <div className="flex gap-1">
        {['Markets','Portfolio','Leaderboard'].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              tab===t ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}>{t}</button>
        ))}
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-lg font-medium">Connect Wallet</button>
    </nav>
  );
}
