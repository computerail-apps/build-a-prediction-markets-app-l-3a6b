import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MarketCard from './components/MarketCard';
import MarketModal from './components/MarketModal';
import Portfolio from './components/Portfolio';
import { mockMarkets } from './data/mockMarkets';
import type { Market, Position } from './types';
const CATS = ['All','Crypto','Finance','AI','Space'];
export default function App() {
  const [tab, setTab] = useState('Markets');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState<Market|null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [balance, setBalance] = useState(1000);
  const filtered = mockMarkets.filter(m=>cat==='All'||m.category===cat);
  const handleTrade = (side:'YES'|'NO', shares:number) => {
    if(!selected) return;
    const price = side==='YES' ? selected.yes_prob : 100-selected.yes_prob;
    const cost = shares * price / 100;
    if(cost > balance) return alert('Insufficient balance');
    setBalance(b=>parseFloat((b-cost).toFixed(2)));
    setPositions(prev=>{
      const ex = prev.find(p=>p.market_id===selected.id && p.side===side);
      if(ex) return prev.map(p=>p.market_id===selected.id&&p.side===side ? {...p, shares:p.shares+shares, avg_price:Math.round((p.avg_price*p.shares+price*shares)/(p.shares+shares))} : p);
      return [...prev, { market_id:selected.id, side, shares, avg_price:price }];
    });
  };
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar tab={tab} setTab={setTab} />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">{tab==='Markets'?'Open Markets':tab}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{tab==='Markets'?`${filtered.length} active markets`:`${positions.length} positions`}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-right">
            <p className="text-xs text-gray-500">Balance</p>
            <p className="text-lg font-black text-indigo-400">${balance.toFixed(2)}</p>
          </div>
        </div>
        {tab==='Markets' && (
          <>
            <div className="flex gap-2 mb-6 flex-wrap">
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    cat===c?'bg-indigo-600 text-white':'bg-gray-800 text-gray-400 hover:text-white'
                  }`}>{c}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(m=><MarketCard key={m.id} market={m} onClick={()=>setSelected(m)} />)}
            </div>
          </>
        )}
        {tab==='Portfolio' && <Portfolio positions={positions} markets={mockMarkets} />}
        {tab==='Leaderboard' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="space-y-3">
              {[{name:'alice.eth',pnl:'+$4,210',rank:1},{name:'bob.eth',pnl:'+$3,100',rank:2},{name:'carol.eth',pnl:'+$1,850',rank:3},{name:'You',pnl:`$${balance.toFixed(2)}`,rank:4}].map(u=>(
                <div key={u.rank} className={`flex items-center justify-between p-3 rounded-xl ${
                  u.name==='You'?'bg-indigo-900/40 border border-indigo-700':'bg-gray-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-gray-500">#{u.rank}</span>
                    <span className="font-medium text-white">{u.name}</span>
                  </div>
                  <span className="text-green-400 font-bold">{u.pnl}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {selected && <MarketModal market={selected} onClose={()=>setSelected(null)} onTrade={handleTrade} />}
    </div>
  );
}
