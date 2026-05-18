import { useState } from 'react'
import { InstallPrompt, OfflineBanner, UpdatePrompt } from './components/PwaPrompts'
import { usePwa } from './hooks/usePwa'

// ── Data ──────────────────────────────────────────────────────────────────────

const flights = [
  { id: 1, from: 'HAN', to: 'SGN', dep: '06:00', arr: '08:10', airline: 'VietJet', price: '890K', seats: 12, date: 'T2, 19/05' },
  { id: 2, from: 'SGN', to: 'DAD', dep: '09:30', arr: '10:45', airline: 'Bamboo', price: '650K', seats: 5, date: 'T2, 19/05' },
  { id: 3, from: 'HAN', to: 'PQC', dep: '13:15', arr: '15:30', airline: 'Vietnam Airlines', price: '1.2M', seats: 20, date: 'T3, 20/05' },
  { id: 4, from: 'SGN', to: 'HAN', dep: '17:00', arr: '19:10', airline: 'VietJet', price: '750K', seats: 3, date: 'T3, 20/05' },
]

const vouchers = [
  { code: 'FLY30', discount: '30%', desc: 'Giảm 30% cho chuyến bay nội địa', exp: '31/05/2026', color: 'from-orange-500 to-rose-500' },
  { code: 'SUMMER25', discount: '25%', desc: 'Ưu đãi hè — tất cả đường bay', exp: '30/06/2026', color: 'from-sky-500 to-blue-600' },
  { code: 'NEWUSER', discount: '15%', desc: 'Chào mừng thành viên mới', exp: '31/12/2026', color: 'from-violet-500 to-purple-600' },
]

const features = [
  { icon: '✈️', title: 'Đặt vé nhanh', desc: 'Tìm kiếm và đặt vé chỉ trong 60 giây với giao diện tối ưu cho mobile.' },
  { icon: '🗓️', title: 'Lịch trình linh hoạt', desc: 'Xem toàn bộ lịch bay theo ngày, tuần hoặc tháng một cách trực quan.' },
  { icon: '🎟️', title: 'Voucher độc quyền', desc: 'Nhận ưu đãi giảm giá lên đến 40% dành riêng cho thành viên ứng dụng.' },
  { icon: '🔔', title: 'Thông báo thời gian thực', desc: 'Cập nhật tức thì về trạng thái chuyến bay, gate và hành lý.' },
]

const cities = ['Hà Nội (HAN)', 'TP. Hồ Chí Minh (SGN)', 'Đà Nẵng (DAD)', 'Phú Quốc (PQC)', 'Nha Trang (CXR)', 'Huế (HUI)']

// ── Components ────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl">✈</span>
          <span className="font-display font-800 text-xl tracking-tight text-white">SkyGo</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#flights" className="hover:text-white transition-colors">Chuyến bay</a>
          <a href="#vouchers" className="hover:text-white transition-colors">Voucher</a>
          <a href="#features" className="hover:text-white transition-colors">Tính năng</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors">Đăng nhập</button>
          <button className="text-sm bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-full font-medium transition-colors">
            Đăng ký
          </button>
        </div>
        <button className="md:hidden text-slate-300 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: open ? 'rotate(45deg) translate(2px, 8px)' : '' }} />
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: open ? 0 : 1 }} />
          <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: open ? 'rotate(-45deg) translate(2px, -8px)' : '' }} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0d1526] border-t border-white/5 px-4 py-4 flex flex-col gap-4 text-sm text-slate-300">
          <a href="#flights" onClick={() => setOpen(false)}>Chuyến bay</a>
          <a href="#vouchers" onClick={() => setOpen(false)}>Voucher</a>
          <a href="#features" onClick={() => setOpen(false)}>Tính năng</a>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <button className="flex-1 py-2 border border-white/20 rounded-full text-center">Đăng nhập</button>
            <button className="flex-1 py-2 bg-sky-500 rounded-full text-white text-center">Đăng ký</button>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [tripType, setTripType] = useState<'one' | 'round'>('one')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a35] to-[#0a0f1e]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 rounded-full px-4 py-1.5 text-sky-400 text-sm mb-6">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            Hơn 500 chuyến bay mỗi ngày
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            Bay đến<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">mọi ước mơ</span>
            <br />của bạn
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
            Đặt vé máy bay nhanh chóng, giá tốt nhất. Hàng trăm chuyến bay nội địa và quốc tế mỗi ngày.
          </p>
        </div>

        {/* Search card */}
        <div className="bg-[#111827]/90 backdrop-blur border border-white/10 rounded-2xl p-6 max-w-4xl shadow-2xl">
          {/* Trip type toggle */}
          <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 w-fit">
            {(['one', 'round'] as const).map(t => (
              <button key={t}
                onClick={() => setTripType(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tripType === t ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
                {t === 'one' ? 'Một chiều' : 'Khứ hồi'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Điểm đi</label>
              <select value={from} onChange={e => setFrom(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors appearance-none cursor-pointer">
                <option value="" className="bg-[#111827]">Chọn điểm đi</option>
                {cities.map(c => <option key={c} value={c} className="bg-[#111827]">{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Điểm đến</label>
              <select value={to} onChange={e => setTo(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors appearance-none cursor-pointer">
                <option value="" className="bg-[#111827]">Chọn điểm đến</option>
                {cities.map(c => <option key={c} value={c} className="bg-[#111827]">{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Ngày đi</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors [color-scheme:dark]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase tracking-wider invisible">Tìm</label>
              <button className="bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-semibold rounded-xl px-6 py-3 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Tìm chuyến bay
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-10">
          {[['2M+', 'Khách hàng'], ['500+', 'Chuyến bay/ngày'], ['98%', 'Đúng giờ']].map(([n, l]) => (
            <div key={l}>
              <div className="font-display font-bold text-2xl text-white">{n}</div>
              <div className="text-slate-500 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlightSchedule() {
  const [activeDate, setActiveDate] = useState('T2, 19/05')
  const dates = ['T2, 19/05', 'T3, 20/05']
  const filtered = flights.filter(f => f.date === activeDate)

  return (
    <section id="flights" className="py-20 bg-[#0d1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-2">Lịch trình</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Chuyến bay sắp tới</h2>
          </div>
          <div className="flex gap-2">
            {dates.map(d => (
              <button key={d} onClick={() => setActiveDate(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeDate === d ? 'bg-sky-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {filtered.map(f => (
            <div key={f.id}
              className="group bg-[#111827] hover:bg-[#1a2235] border border-white/5 hover:border-sky-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all cursor-pointer">
              {/* Route */}
              <div className="flex items-center gap-4 flex-1">
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-white">{f.from}</div>
                  <div className="text-slate-500 text-xs">{f.dep}</div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div className="text-slate-600 text-xs">{f.airline}</div>
                  <div className="w-full flex items-center gap-1">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-slate-400 text-sm">✈</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <div className="text-slate-600 text-xs">Thẳng</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-white">{f.to}</div>
                  <div className="text-slate-500 text-xs">{f.arr}</div>
                </div>
              </div>

              {/* Seats */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${f.seats <= 5 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {f.seats <= 5 ? `Còn ${f.seats} chỗ` : `${f.seats} chỗ trống`}
                </span>
              </div>

              {/* Price + CTA */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                <div className="font-display font-bold text-xl text-sky-400">{f.price}</div>
                <button className="bg-sky-500/10 hover:bg-sky-500 border border-sky-500/30 hover:border-sky-500 text-sky-400 hover:text-white text-sm font-medium px-5 py-2 rounded-full transition-all whitespace-nowrap">
                  Đặt ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-slate-400 hover:text-white text-sm border border-white/10 hover:border-white/30 px-6 py-3 rounded-full transition-all">
            Xem tất cả chuyến bay →
          </button>
        </div>
      </div>
    </section>
  )
}

function Vouchers() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="vouchers" className="py-20 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-medium uppercase tracking-widest mb-2">Ưu đãi</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">Voucher độc quyền</h2>
          <p className="text-slate-400 max-w-md mx-auto">Sử dụng mã giảm giá khi đặt vé để tiết kiệm tối đa chi phí chuyến đi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {vouchers.map(v => (
            <div key={v.code} className="relative overflow-hidden bg-[#111827] border border-white/5 rounded-2xl p-6 group hover:border-white/15 transition-all">
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.color}`} />
              <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${v.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} text-white text-xl mb-4 shadow-lg`}>
                🎟️
              </div>

              <div className="font-display font-bold text-4xl text-white mb-1">{v.discount}</div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{v.desc}</p>

              <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <code className="text-white font-mono font-semibold tracking-widest text-sm">{v.code}</code>
                <button onClick={() => copy(v.code)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors ml-2 shrink-0">
                  {copied === v.code ? '✓ Đã sao chép' : 'Sao chép'}
                </button>
              </div>

              <p className="text-slate-600 text-xs mt-3">HSD: {v.exp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-20 bg-[#0d1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-2">Tại sao chọn SkyGo</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6 leading-tight">
              Trải nghiệm đặt vé<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">thế hệ mới</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              SkyGo được thiết kế để mang lại trải nghiệm đặt vé nhanh nhất, đơn giản nhất — ngay trên điện thoại của bạn.
            </p>
            <button className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-sky-500/25">
              Tải ứng dụng ngay
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 hover:border-sky-500/20 rounded-2xl p-5 transition-all group">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0a0f1e] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈</span>
            <span className="font-display font-bold text-xl text-white">SkyGo</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Hỗ trợ</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
          <p className="text-slate-600 text-sm">© 2026 SkyGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const { needRefresh, canInstall, update, dismissUpdate, install, dismissInstall } = usePwa()

  return (
    <div className="min-h-screen bg-[#0a0f1e]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <OfflineBanner />
      {needRefresh && <UpdatePrompt onUpdate={update} onDismiss={dismissUpdate} />}
      {canInstall && !needRefresh && <InstallPrompt onInstall={install} onDismiss={dismissInstall} />}
      <Navbar />
      <Hero />
      <FlightSchedule />
      <Vouchers />
      <Features />
      <Footer />
    </div>
  )
}

export default App
