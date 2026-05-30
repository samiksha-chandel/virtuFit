import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/StatsCard';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { stats, chartData } from '../data/stats';
import { ArrowLeft, Download } from 'lucide-react';

const COLORS = ['#8B5CF6', '#06B6D4', '#EC4899', '#A855F7', '#F59E0B'];

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = React.useState('week');

  const dashboardData = {
    day: {
    productPopularity: [
      { name: 'Velvet Blazer', value: 12 },
      { name: 'Silk Dress', value: 9 },
      { name: 'Maxi Skirt', value: 8 },
      { name: 'Statement Blouse', value: 7 },
      { name: 'Organza Top', value: 6 },
      { name: 'Leather Jacket', value: 5 },
      { name: 'Tailored Pants', value: 4 },
      { name: 'Cashmere Coat', value: 3 }
    ],
    dailyActivity: [
      { name: '6AM', users: 50, tryons: 70 },
      { name: '12PM', users: 120, tryons: 180 },
      { name: '6PM', users: 200, tryons: 280 }
      ],
    stats: {
      users: 432,
      tryons: 781,
      conversion: 18.4,
      popular: "Velvet Blazer"
      },
    deviceAnalytics: [
      { name: "Mobile", value: 68 },
      { name: "Desktop", value: 22 },
      { name: "Tablet", value: 10 }
      ],
    },

    week: {
    productPopularity: [
      { name: 'Velvet Blazer', value: 120 },
      { name: 'Silk Dress', value: 95 },
      { name: 'Maxi Skirt', value: 82 },
      { name: 'Statement Blouse', value: 76 },
      { name: 'Organza Top', value: 65 },
      { name: 'Leather Jacket', value: 58 },
      { name: 'Tailored Pants', value: 50 },
      { name: 'Cashmere Coat', value: 44 }
    ],
    dailyActivity: [
      { name: 'Mon', users: 2800, tryons: 4200 },
      { name: 'Tue', users: 3100, tryons: 3800 },
      { name: 'Wed', users: 2900, tryons: 5100 },
      { name: 'Thu', users: 3400, tryons: 4600 },
      { name: 'Fri', users: 3200, tryons: 5800 }
      ],
    stats: {
      users: 2870,
      tryons: 5640,
      conversion: 24.6,
      popular: "Maxi Skirt"
      },
    deviceAnalytics: [
      { name: "Mobile", value: 55 },
      { name: "Desktop", value: 30 },
      { name: "Tablet", value: 15 }
      ]
    },

    month: {
    productPopularity: [
      { name: 'Velvet Blazer', value: 1200 },
      { name: 'Silk Dress', value: 958 },
      { name: 'Maxi Skirt', value: 890 },
      { name: 'Statement Blouse', value: 876 },
      { name: 'Organza Top', value: 965 },
      { name: 'Leather Jacket', value: 548 },
      { name: 'Tailored Pants', value: 570 },
      { name: 'Cashmere Coat', value: 440 }
    ],
    dailyActivity: [
      { name: 'Week 1', users: 12000, tryons: 18000 },
      { name: 'Week 2', users: 14000, tryons: 22000 },
      { name: 'Week 3', users: 16000, tryons: 25000 },
      { name: 'Week 4', users: 18000, tryons: 28000 }
      ],
    stats: {
      users: 12450,
      tryons: 27800,
      conversion: 31.8,
      popular: "Silk Dress"
      },
    deviceAnalytics: [
      { name: "Mobile", value: 47 },
      { name: "Desktop", value: 38 },
      { name: "Tablet", value: 15 }
      ]
    }
  };

  const current = dashboardData[timeRange];

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const summaryCards = [
    { title: 'Total Users', value: current.stats.users.toLocaleString(), icon: 'users', trend: 12.5 },
    { title: 'Total Try-Ons', value: current.stats.tryons.toLocaleString(), icon: 'tryons', trend: 8.2 },
    { title: 'Conversion Rate', value: `${current.stats.conversion}%`, icon: 'conversion', trend: 3.1 },
    { title: 'Most Popular', value: current.stats.popular, icon: 'trending' }
  ];

  const handleDownload = () => {
    const csv =
  `Metric,Value
  Total Users,${current.stats.users}
  Total TryOns,${current.stats.tryons}
  Conversion Rate,${current.stats.conversion}%`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "virtufit-analytics.csv";
  a.click();

  URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"><ArrowLeft className="w-5 h-5" />Back to Home</button>
            <h1 className="text-4xl font-bold font-display">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-white/60">Real-time platform performance and virtual try-on insights</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex glass rounded-lg p-1">
              {['day', 'week', 'month'].map((range) => (
                <button key={range} onClick={() => setTimeRange(range)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === range ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}>{range.charAt(0).toUpperCase() + range.slice(1)}</button>
              ))}
            </div>
            <button onClick={handleDownload} className="p-3 rounded-lg glass hover:bg-white/10"> <Download className="w-5 h-5" /> </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (<StatsCard key={card.title} title={card.title} value={card.value} icon={card.icon} trend={card.trend} index={index} />))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Try-On Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={current.dailyActivity}>
                <defs><linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip contentStyle={{ background: 'rgba(5, 8, 22, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="tryons" stroke="#8B5CF6" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Device Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={current.deviceAnalytics} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {chartData.deviceAnalytics.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#050816', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px', color: '#ffffff'}} labelStyle={{ color: '#ffffff'}} itemStyle={{color: '#ffffff'}}/>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Product Popularity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={current.productPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#050816', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}} labelStyle={{ color: '#fff'}} itemStyle={{color: '#fff'}} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Daily Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ current.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip contentStyle={{ background: 'rgba(5, 8, 22, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} labelStyle={{color: '#ffffff'}} itemStyle={{color: '#ffffff'}} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4' }} />
                <Line type="monotone" dataKey="tryons" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Action</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: 'sarah.c@email.com', action: 'Try-On', product: 'Velvet Blazer', time: '2 min ago' },
                  { user: 'marcus.w@email.com', action: 'Download', product: 'Silk Dress', time: '5 min ago' },
                  { user: 'yuki.t@email.com', action: 'Try-On', product: 'Wool Coat', time: '8 min ago' },
                  { user: 'alex.m@email.com', action: 'Share', product: 'Denim Jacket', time: '12 min ago' },
                  { user: 'emma.k@email.com', action: 'Try-On', product: 'Maxi Skirt', time: '15 min ago' }
                ].map((activity, index) => (
                  <motion.tr key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + index * 0.1 }} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">{activity.user}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${activity.action === 'Try-On' ? 'bg-primary/20 text-primary' : activity.action === 'Download' ? 'bg-cyan/20 text-cyan' : 'bg-pink/20 text-pink'}`}>{activity.action}</span></td>
                    <td className="py-3 px-4">{activity.product}</td>
                    <td className="py-3 px-4 text-white/60">{activity.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}