
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', corn: 4000, wheat: 2400, rice: 2400 },
  { name: 'Feb', corn: 3000, wheat: 1398, rice: 2210 },
  { name: 'Mar', corn: 2000, wheat: 9800, rice: 2290 },
  { name: 'Apr', corn: 2780, wheat: 3908, rice: 2000 },
  { name: 'May', corn: 1890, wheat: 4800, rice: 2181 },
  { name: 'Jun', corn: 2390, wheat: 3800, rice: 2500 },
  { name: 'Jul', corn: 3490, wheat: 4300, rice: 2100 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-stone-800">Market Intelligence</h2>
        <p className="text-stone-500">Global crop price trends and seasonal yield projections.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <StatCard label="Corn Market Price" value="$450.20" trend="+2.4%" icon="fa-wheat-awn" color="amber" />
        <StatCard label="Wheat Market Price" value="$325.10" trend="-1.2%" icon="fa-seedling" color="emerald" />
        <StatCard label="Rice Market Price" value="$580.45" trend="+0.8%" icon="fa-bowl-rice" color="sky" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Price Index Forecast</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="corn" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="wheat" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Global Supply Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="rice" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, trend: string, icon: string, color: string }> = ({ label, value, trend, icon, color }) => {
  const colors: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    sky: 'bg-sky-100 text-sky-600'
  };

  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-6">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <p className="text-stone-500 text-sm font-medium">{label}</p>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
};
