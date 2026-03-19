import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  PieChart as PieChartIcon,
  Search,
  Settings,
  Sparkles,
  SunMedium,
  Target,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'

const stats = [
  { label: 'Total Balance', value: '$12,480', change: '+12.4%', icon: Wallet },
  { label: 'Monthly Income', value: '$4,850', change: '+8.1%', icon: ArrowUpRight },
  { label: 'Monthly Expense', value: '$2,430', change: '-3.2%', icon: ArrowDownRight },
  { label: 'Savings Goal', value: '78%', change: '+14.0%', icon: Target },
]

const spendingData = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 90 },
  { day: 'Wed', amount: 170 },
  { day: 'Thu', amount: 145 },
  { day: 'Fri', amount: 210 },
  { day: 'Sat', amount: 160 },
  { day: 'Sun', amount: 185 },
]

const monthlyTrend = [
  { month: 'Jan', income: 4000, expense: 2200 },
  { month: 'Feb', income: 4300, expense: 2400 },
  { month: 'Mar', income: 4800, expense: 2430 },
  { month: 'Apr', income: 4550, expense: 2320 },
  { month: 'May', income: 5100, expense: 2580 },
  { month: 'Jun', income: 5300, expense: 2690 },
]

const categoryData = [
  { name: 'Food', value: 35 },
  { name: 'Transport', value: 20 },
  { name: 'Bills', value: 18 },
  { name: 'Shopping', value: 15 },
  { name: 'Other', value: 12 },
]

const transactions = [
  { title: 'Adobe Subscription', category: 'Software', amount: '-$29.00', time: 'Today, 09:40 AM' },
  { title: 'Client Payment', category: 'Income', amount: '+$820.00', time: 'Today, 08:15 AM' },
  { title: 'Grab Transport', category: 'Transport', amount: '-$7.80', time: 'Yesterday, 06:10 PM' },
  { title: 'Restaurant', category: 'Food', amount: '-$18.50', time: 'Yesterday, 01:25 PM' },
]

const budgets = [
  { name: 'Food Budget', used: 74, amount: '$540 / $730' },
  { name: 'Transport Budget', used: 56, amount: '$180 / $320' },
  { name: 'Shopping Budget', used: 82, amount: '$410 / $500' },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
  { label: 'Features', icon: Sparkles, href: '#features' },
  { label: 'Analytics', icon: PieChartIcon, href: '#analytics' },
  { label: 'Budget', icon: Target, href: '#budget' },
]

const chartColors = ['#10b981', '#38bdf8', '#8b5cf6', '#f97316', '#ef4444']

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ThemeButton({ darkMode, toggle }) {
  return (
    <button
      onClick={toggle}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
        darkMode
          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
          : 'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
      )}
    >
      {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
      {darkMode ? 'Light' : 'Dark'}
    </button>
  )
}

function Header({ darkMode, toggleTheme, mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className={cn('mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8', darkMode ? 'bg-zinc-950/70' : 'bg-white/70')}>
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <Wallet size={20} />
          </div>
          <div>
            <div className={cn('text-lg font800 font-extrabold', darkMode ? 'text-white' : 'text-zinc-900')}>SpendWise</div>
            <div className={cn('text-xs', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Expense Tracker</div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                darkMode ? 'text-zinc-300 hover:bg-white/5 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeButton darkMode={darkMode} toggle={toggleTheme} />
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
          >
            Live Demo <ArrowRight size={16} />
          </a>
        </div>

        <button
          className={cn('rounded-full p-2 md:hidden', darkMode ? 'bg-white/5 text-white' : 'bg-zinc-100 text-zinc-900')}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={cn('border-t px-4 py-4 md:hidden', darkMode ? 'border-white/10 bg-zinc-950/95' : 'border-zinc-200 bg-white/95')}>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn('rounded-2xl px-4 py-3 text-sm font-medium', darkMode ? 'text-zinc-200 hover:bg-white/5' : 'text-zinc-700 hover:bg-zinc-100')}
              >
                {item.label}
              </a>
            ))}
            <ThemeButton darkMode={darkMode} toggle={toggleTheme} />
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ darkMode }) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className={cn('mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm', darkMode ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700')}>
              <Sparkles size={16} /> Smart financial insights for students and developers
            </div>
            <h1 className={cn('max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl', darkMode ? 'text-white' : 'text-zinc-950')}>
              Track every dollar with a <span className="text-emerald-500">modern expense tracker</span> website.
            </h1>
            <p className={cn('mt-6 max-w-2xl text-base leading-8 sm:text-lg', darkMode ? 'text-zinc-300' : 'text-zinc-600')}>
              A polished landing page and dashboard concept for monitoring spending, budgeting smarter, and visualizing money flow in one clean UI.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#dashboard" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:translate-y-[-2px]">
                Explore Dashboard <ArrowRight size={18} />
              </a>
              <a href="#features" className={cn('inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition', darkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-zinc-200 text-zinc-900 hover:bg-zinc-100')}>
                View Features
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                ['25K+', 'transactions tracked'],
                ['98%', 'budget accuracy'],
                ['24/7', 'spending insights'],
              ].map(([value, label]) => (
                <div key={label} className={cn('rounded-3xl border p-4', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
                  <div className={cn('text-2xl font-extrabold', darkMode ? 'text-white' : 'text-zinc-900')}>{value}</div>
                  <div className={cn('mt-1 text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <div className={cn('relative rounded-[2rem] border p-4 shadow-glow', darkMode ? 'border-white/10 bg-zinc-900/80' : 'border-zinc-200 bg-white')}>
            <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white">
              <div>
                <div className="text-sm text-white/80">Available Balance</div>
                <div className="mt-2 text-3xl font-extrabold">$12,480.90</div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs">+14.2% this month</div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <Wallet size={30} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.slice(1, 3).map((item) => (
                <div key={item.label} className={cn('rounded-3xl border p-4', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50')}>
                  <div className="flex items-center justify-between">
                    <span className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>{item.label}</span>
                    <item.icon size={18} className="text-emerald-500" />
                  </div>
                  <div className={cn('mt-4 text-2xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>{item.value}</div>
                  <div className="mt-1 text-sm text-emerald-500">{item.change}</div>
                </div>
              ))}
            </div>

            <div className={cn('mt-4 rounded-3xl border p-5', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50')}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Spending Activity</div>
                  <div className={cn('text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>Weekly overview</div>
                </div>
                <div className={cn('rounded-full px-3 py-1 text-xs', darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700')}>Live</div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e5e7eb'} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#a1a1aa' : '#71717a', fontSize: 12 }} />
                    <Tooltip cursor={false} contentStyle={{ borderRadius: 16, border: 'none', background: darkMode ? '#18181b' : '#ffffff' }} />
                    <Bar dataKey="amount" radius={[16, 16, 0, 0]} fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Features({ darkMode }) {
  const items = [
    { title: 'Smart Transaction Tracking', desc: 'Capture income and expenses with clean cards, filters, and fast category browsing.', icon: CreditCard },
    { title: 'Budget Planning', desc: 'Set monthly targets and monitor progress before spending goes beyond your limit.', icon: Target },
    { title: 'Analytics & Reports', desc: 'Turn raw transaction data into visual trends and category-based insights.', icon: PieChartIcon },
    { title: 'Export Ready', desc: 'Prepare reports and downloadable summaries for finance review or portfolio demos.', icon: Download },
  ]

  return (
    <section id="features" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-500">Features</div>
          <h2 className={cn('mt-3 text-3xl font-extrabold sm:text-4xl', darkMode ? 'text-white' : 'text-zinc-950')}>
            Everything you need to control your spending.
          </h2>
          <p className={cn('mt-4 text-lg leading-8', darkMode ? 'text-zinc-400' : 'text-zinc-600')}>
            Designed for clean presentation, strong UX, and real product vibes for an expense tracker concept.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={cn('rounded-[1.75rem] border p-6', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}
            >
              <div className={cn('mb-5 inline-flex rounded-2xl p-3', darkMode ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-50 text-emerald-600')}>
                <item.icon size={22} />
              </div>
              <h3 className={cn('text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>{item.title}</h3>
              <p className={cn('mt-3 text-sm leading-7', darkMode ? 'text-zinc-400' : 'text-zinc-600')}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Dashboard({ darkMode }) {
  return (
    <section id="dashboard" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[280px_1fr]">
        <aside className={cn('rounded-[2rem] border p-5', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
          <div className="flex items-center gap-3 rounded-3xl bg-emerald-500 p-4 text-white">
            <div className="rounded-2xl bg-white/15 p-3"><Home size={20} /></div>
            <div>
              <div className="font-bold">Main Workspace</div>
              <div className="text-sm text-white/80">Personal finance hub</div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {[
              ['Overview', LayoutDashboard],
              ['Transactions', CreditCard],
              ['Analytics', PieChartIcon],
              ['Budgets', Target],
              ['Settings', Settings],
            ].map(([label, Icon], idx) => (
              <button
                key={label}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                  idx === 0
                    ? 'bg-emerald-500 text-white'
                    : darkMode
                    ? 'text-zinc-300 hover:bg-white/5'
                    : 'text-zinc-700 hover:bg-zinc-100'
                )}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          <div className={cn('mt-8 rounded-[1.5rem] p-4', darkMode ? 'bg-zinc-900' : 'bg-zinc-50')}>
            <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Savings Goal</div>
            <div className={cn('mt-2 text-2xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>$7,500</div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="h-full w-[78%] rounded-full bg-emerald-500" />
            </div>
            <div className={cn('mt-3 text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>78% completed</div>
          </div>
        </aside>

        <div className={cn('rounded-[2rem] border p-5 lg:p-6', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Dashboard Preview</div>
              <h3 className={cn('text-2xl font-extrabold', darkMode ? 'text-white' : 'text-zinc-900')}>Visual money management</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className={cn('flex items-center gap-2 rounded-full border px-4 py-2', darkMode ? 'border-white/10 bg-zinc-900 text-zinc-300' : 'border-zinc-200 bg-zinc-50 text-zinc-500')}>
                <Search size={16} /> Search transactions
              </div>
              <div className={cn('rounded-full p-2', darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700')}><Bell size={18} /></div>
              <div className={cn('rounded-full p-2', darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700')}><Settings size={18} /></div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className={cn('rounded-[1.5rem] border p-4', darkMode ? 'border-white/10 bg-zinc-900/70' : 'border-zinc-200 bg-zinc-50')}>
                <div className="flex items-center justify-between">
                  <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>{item.label}</div>
                  <div className={cn('rounded-2xl p-2', darkMode ? 'bg-white/5 text-emerald-400' : 'bg-white text-emerald-600')}>
                    <item.icon size={18} />
                  </div>
                </div>
                <div className={cn('mt-4 text-2xl font-extrabold', darkMode ? 'text-white' : 'text-zinc-900')}>{item.value}</div>
                <div className="mt-1 text-sm text-emerald-500">{item.change} vs last month</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className={cn('rounded-[1.75rem] border p-5', darkMode ? 'border-white/10 bg-zinc-900/70' : 'border-zinc-200 bg-zinc-50')}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Monthly Cash Flow</div>
                  <div className={cn('text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>Income vs Expense</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                  <TrendingUp size={14} /> +18.2%
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e4e4e7'} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#a1a1aa' : '#71717a', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#a1a1aa' : '#71717a', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 16, border: 'none', background: darkMode ? '#18181b' : '#ffffff' }} />
                    <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" strokeWidth={3} />
                    <Area type="monotone" dataKey="expense" stroke="#38bdf8" fill="url(#expense)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-6">
              <div id="analytics" className={cn('rounded-[1.75rem] border p-5', darkMode ? 'border-white/10 bg-zinc-900/70' : 'border-zinc-200 bg-zinc-50')}>
                <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Expense Categories</div>
                <div className={cn('mb-4 text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>Where your money goes</div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={4}>
                        {categoryData.map((_, index) => (
                          <Cell key={index} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 16, border: 'none', background: darkMode ? '#18181b' : '#ffffff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categoryData.map((item, index) => (
                    <div key={item.name} className={cn('rounded-2xl border px-3 py-2 text-sm', darkMode ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-zinc-200 bg-white text-zinc-700')}>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                        {item.name}
                      </div>
                      <div className="mt-1 font-semibold">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn('rounded-[1.75rem] border p-5', darkMode ? 'border-white/10 bg-zinc-900/70' : 'border-zinc-200 bg-zinc-50')}>
                <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Recent Transactions</div>
                <div className={cn('mb-4 text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>Activity Feed</div>
                <div className="space-y-3">
                  {transactions.map((item) => (
                    <div key={item.title + item.time} className={cn('flex items-center justify-between rounded-2xl border p-3', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
                      <div>
                        <div className={cn('font-semibold', darkMode ? 'text-white' : 'text-zinc-900')}>{item.title}</div>
                        <div className={cn('text-xs', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>{item.category} • {item.time}</div>
                      </div>
                      <div className={cn('font-semibold', item.amount.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BudgetSection({ darkMode }) {
  return (
    <section id="budget" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={cn('rounded-[2rem] border p-6', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-500">Budget Focus</div>
          <h3 className={cn('mt-3 text-3xl font-extrabold', darkMode ? 'text-white' : 'text-zinc-900')}>
            Keep your monthly plan under control.
          </h3>
          <p className={cn('mt-4 text-base leading-8', darkMode ? 'text-zinc-400' : 'text-zinc-600')}>
            Each card highlights how much you used and how close you are to your spending limit. Great for a SaaS-style finance product showcase.
          </p>

          <div className={cn('mt-8 rounded-[1.75rem] border p-5', darkMode ? 'border-white/10 bg-zinc-900/70' : 'border-zinc-200 bg-zinc-50')}>
            <div className="flex items-center justify-between">
              <div>
                <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Auto Insight</div>
                <div className={cn('mt-1 text-xl font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>You spent 25% more on food this week</div>
              </div>
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500">
                <Sparkles size={22} />
              </div>
            </div>
            <p className={cn('mt-3 text-sm leading-7', darkMode ? 'text-zinc-400' : 'text-zinc-600')}>
              Suggested action: reduce takeaway expenses and move $40 into savings by the end of the month.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {budgets.map((item) => (
            <div key={item.name} className={cn('rounded-[1.75rem] border p-5', darkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white')}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={cn('text-lg font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>{item.name}</div>
                  <div className={cn('mt-1 text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>{item.amount}</div>
                </div>
                <div className={cn('rounded-full px-3 py-1 text-sm font-semibold', item.used >= 80 ? 'bg-amber-500/15 text-amber-500' : 'bg-emerald-500/15 text-emerald-500')}>
                  {item.used}% used
                </div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.used}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ darkMode }) {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white shadow-2xl shadow-emerald-500/20 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Ready to launch</div>
            <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">Build your Expense Tracker brand with a premium-looking UI.</h3>
            <p className="mt-4 max-w-2xl text-white/85">This starter website is ideal for portfolios, SaaS concepts, student projects, and modern finance dashboards.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition hover:translate-y-[-2px]">Get Started</a>
            <a href="#dashboard" className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">See Demo</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ darkMode }) {
  return (
    <footer className={cn('border-t px-4 py-8 sm:px-6 lg:px-8', darkMode ? 'border-white/10' : 'border-zinc-200')}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className={cn('font-bold', darkMode ? 'text-white' : 'text-zinc-900')}>SpendWise</div>
          <div className={cn('text-sm', darkMode ? 'text-zinc-400' : 'text-zinc-500')}>Modern expense tracker website concept</div>
        </div>
        <div className={cn('text-sm', darkMode ? 'text-zinc-500' : 'text-zinc-500')}>Designed for clean UI inspiration by Vath coder</div>
      </div>
    </footer>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const pageClass = useMemo(
    () =>
      darkMode
        ? 'min-h-screen bg-zinc-950 text-white'
        : 'min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white text-zinc-900',
    [darkMode]
  )

  return (
    <div className={pageClass}>
      <div className={cn('fixed inset-0 -z-10', darkMode ? 'bg-grid bg-[size:42px_42px] opacity-[0.04]' : 'opacity-0')} />
      <Header darkMode={darkMode} toggleTheme={() => setDarkMode((v) => !v)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero darkMode={darkMode} />
      <Features darkMode={darkMode} />
      <Dashboard darkMode={darkMode} />
      <BudgetSection darkMode={darkMode} />
      <CTA darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  )
}
