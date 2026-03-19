import React, { useState, useEffect } from 'react';

// ==========================================
// --- Components: Branding & UI Elements ---
// ==========================================

const Logo = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 100 70" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Stylized M based on the Mahadhuyutha logo */}
    <path d="M2,68 V8 L10,2 H18 L68,36 V68" />
    <path d="M98,68 V8 L90,2 H82 L46,24" />
  </svg>
);

const FloatingPanels = () => (
  <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 overflow-hidden">
    <div className="absolute top-[15%] left-[5%] md:left-[10%] w-48 h-64 md:w-64 md:h-80 glass-panel rounded-xl animate-float-slow flex flex-col justify-evenly p-3">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full h-2 bg-slate-800/40 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
      ))}
    </div>
    <div className="absolute top-[30%] right-[2%] md:right-[8%] w-56 h-72 md:w-80 md:h-96 glass-panel rounded-2xl animate-float-slower p-4 grid grid-cols-6 grid-rows-8 gap-2">
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 to-transparent"></div>
      {[...Array(48)].map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-slate-900/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] mx-auto"></div>
      ))}
    </div>
    <div className="absolute bottom-[10%] left-[20%] md:left-[30%] w-40 h-40 md:w-56 md:h-56 glass-panel rounded-3xl animate-float-diagonal flex items-center justify-center">
      <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      <Logo className="absolute w-24 h-24 text-white/5 opacity-50" />
    </div>
  </div>
);

const UniversalSlideshow = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToPrev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };
  const goToNext = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };

  return (
    <div className="relative aspect-[16/10] md:aspect-[16/9] w-full glass-panel rounded-3xl overflow-hidden group shadow-2xl">
      {images.map((img, idx) => (
        <div 
          key={img} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={img} alt={`Installation ${idx + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)} 
            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// --- Main Layout Components ---
// ==========================================

const Header = ({ currentView, setCurrentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'product', label: 'Acoustics' },
    { id: 'ceiling', label: 'Ceiling Systems' },
    { id: 'applications', label: 'Applications' },
    { id: 'about', label: 'About' }
  ];

  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto w-full border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 focus:outline-none group z-50">
          <Logo className="w-9 h-9 text-white transition-transform group-hover:scale-110" />
          <span className="text-white font-semibold tracking-[0.2em] text-sm uppercase group-hover:text-blue-200 transition-colors">Mahadhuyutha</span>
        </button>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-slate-300">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className={`hover:text-white transition-colors py-2 relative ${currentView === item.id ? 'text-white' : ''}`}>
              {item.label}
              {currentView === item.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>}
            </button>
          ))}
        </nav>

        <button className="text-white md:hidden z-50 focus:outline-none w-10 h-10 flex items-center justify-center relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </header>
      
      <div className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 max-w-sm bg-slate-900 border-l border-white/10 z-40 transform transition-transform duration-300 md:hidden flex flex-col pt-24 pb-8 px-6 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col space-y-6 text-lg font-medium tracking-wide text-slate-300 flex-1">
          <button onClick={() => handleNavClick('home')} className="text-left border-b border-white/5 pb-4 hover:text-white transition-colors">Home</button>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === item.id ? 'text-blue-300' : ''}`}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

const Footer = ({ setCurrentView }) => (
  <footer className="w-full bg-slate-950/80 border-t border-white/10 pt-16 pb-8 px-6 mt-auto relative z-20 backdrop-blur-md">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Logo className="w-8 h-8 text-white" />
          <span className="text-white font-semibold tracking-widest text-sm uppercase">Mahadhuyutha</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">Premium Acoustic Panels and Ceiling Systems designed for modern interiors.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Products</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><button onClick={() => {setCurrentView('product'); window.scrollTo(0,0);}} className="hover:text-blue-300 transition-colors">Acoustics</button></li>
          <li><button onClick={() => {setCurrentView('ceiling'); window.scrollTo(0,0);}} className="hover:text-blue-300 transition-colors">Ceiling Systems</button></li>
          <li><button onClick={() => {setCurrentView('applications'); window.scrollTo(0,0);}} className="hover:text-blue-300 transition-colors">Applications</button></li>
          <li><button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="hover:text-blue-300 transition-colors">Installations</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <a href="mailto:info@mahaduyutha.in" className="hover:text-blue-300 transition-colors">info@mahaduyutha.in</a>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <a href="tel:+916363146633" className="hover:text-blue-300 transition-colors">+91 63631 46633</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Social</h4>
        <div className="flex space-x-3">
          <a href="https://www.facebook.com/share/1HtXr1CVPh/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
          <a href="https://www.instagram.com/mahadhyutha_acoustic" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600/20 text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-xs text-slate-500 text-center md:text-left">
      <p>© 2025 Mahadhuyutha. All rights reserved.</p>
    </div>
  </footer>
);

// ==========================================
// --- Page Content Components ---
// ==========================================

const Hero = ({ setCurrentView }) => (
  <div className="max-w-4xl mx-auto relative text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">Premium Building Materials</span>
    </div>
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
      Elevate Spaces to <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-slate-400">New Lifestyle Standards</span>
    </h1>
    <p className="mt-8 text-lg md:text-2xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">Premium Acoustic Panels and Ceiling Systems designed for modern interiors. Combining functional sound absorption with sophisticated aesthetic appeal.</p>
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <button onClick={() => setCurrentView('product')} className="group relative px-8 py-4 bg-white text-slate-950 font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        <span className="relative">Explore Products</span>
      </button>
      <button onClick={() => setCurrentView('about')} className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 w-full sm:w-auto flex items-center justify-center space-x-2">
        <span>Get a Quote</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>
  </div>
);

const SpecsTable = () => (
  <div className="mt-24">
    <h3 className="text-2xl font-bold text-white mb-8">Acoustic Performance (NRC)</h3>
    <div className="glass-panel rounded-2xl p-8 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 px-4 font-semibold text-slate-400 uppercase text-[10px] tracking-wider">Thickness</th>
            <th className="py-4 px-4 font-semibold text-slate-400">125 Hz</th>
            <th className="py-4 px-4 font-semibold text-slate-400">250 Hz</th>
            <th className="py-4 px-4 font-semibold text-slate-400">500 Hz</th>
            <th className="py-4 px-4 font-semibold text-slate-400">1000 Hz</th>
            <th className="py-4 px-4 font-semibold text-slate-400">2000 Hz</th>
            <th className="py-4 px-4 font-semibold text-slate-400">4000 Hz</th>
            <th className="py-4 px-4 font-bold text-white">NRC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            { t: "9mm", v: [0.01, 0.04, 0.12, 0.33, 0.62, 0.76], nrc: "0.30" },
            { t: "12mm", v: [0.03, 0.06, 0.22, 0.48, 0.74, 0.80], nrc: "0.40" },
            { t: "25mm", v: [0.09, 0.27, 0.65, 0.97, 0.92, 0.87], nrc: "0.70" }
          ].map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-white font-medium">{row.t}</td>
              {row.v.map((v, j) => <td key={j} className="py-4 px-4 text-slate-400">{v.toFixed(2)}</td>)}
              <td className="py-4 px-4 font-bold text-blue-300">{row.nrc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AcousticsPage = () => {
  const images = ['8.jpg', '11.jpg', '12.jpg', '13.jpg', '15.jpg', '18.jpg', '26.jpg', '30.jpg', '34.jpg', '37.jpg'];
  const colors = [
    { name: 'White', hex: '#f8fafc' }, { name: 'Nat. Beige', hex: '#d7ccc8' }, { name: 'Slate Grey', hex: '#78909c' },
    { name: 'Midnight', hex: '#1c3144' }, { name: 'Teal', hex: '#00838f' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-7">
        <UniversalSlideshow images={images} />
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">PET Panels <br/><span className="text-blue-200">Acoustical Systems</span></h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">High-performance acoustic solutions made of 100% PET fiber. Engineered for maximum sound absorption and aesthetic flexibility.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
          <div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Thickness</h4><p className="mt-2 text-white font-medium text-lg">9mm, 12mm, 25mm</p></div>
          <div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">NRC</h4><p className="mt-2 text-white font-medium text-lg">Up to 0.70</p></div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Color Options</h4>
          <div className="flex flex-wrap gap-4">
            {colors.map(color => (
              <div key={color.name} className="group relative">
                <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg hover:scale-110 transition-all cursor-help" style={{ backgroundColor: color.hex }} />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-12">
        <SpecsTable />
      </div>
    </div>
  );
};

const CeilingPage = () => {
  const images = ['img14.jpg', 'img16.jpg', 'img18.jpg', 'img20.jpg', 'img22.jpg', 'img24.jpg', 'img26.jpg', 'img28.jpg', 'img33.jpg', 'img37.jpg'];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-7">
        <UniversalSlideshow images={images} />
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Baffle Ceiling <br/><span className="text-blue-200">Systems</span></h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">Architectural ceiling systems that improve room acoustics without compromising on space or style. Perfectly suited for commercial and open-plan environments.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
          <div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Design</h4><p className="mt-2 text-white font-medium text-lg">U, O, V Shapes</p></div>
          <div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Customization</h4><p className="mt-2 text-white font-medium text-lg">Fully Tailored</p></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Vertical Baffles', 'Acoustic Clouds', 'Linear Systems'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-300">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicationsPage = () => {
  const items = [
    { title: "Corporate", img: "https://images.unsplash.com/photo-1497366216548-37526070297c" },
    { title: "Education", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1" },
    { title: "Healthcare", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d" }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map(item => (
        <div key={item.title} className="glass-panel rounded-3xl overflow-hidden group">
          <div className="h-48 relative overflow-hidden">
            <img src={`${item.img}?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.title} />
          </div>
          <div className="p-6 bg-slate-950/40">
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

const AboutPage = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white">About <span className="text-blue-200">Mahadhuyutha</span></h1>
      <p className="text-lg text-slate-400 leading-relaxed">Mahadhuyutha offers world-class acoustic materials that elevate spaces to new lifestyle standards. Our products combine functional sound absorption with sophisticated design.</p>
    </div>
    <div className="glass-panel rounded-3xl p-8 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Inquiries</p>
          <a href="tel:+916363146633" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">+91 63631 46633</a>
        </div>
        <a href="https://wa.me/916363146633" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-3 px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:scale-105 transition-transform">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
);

// ==========================================
// --- App Controller ---
// ==========================================

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    document.title = "Mahadhuyutha | Premium Acoustical Systems";
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 font-sans overflow-x-hidden selection:bg-blue-500/30 text-slate-100">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        @keyframes float-slower { 0%, 100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(15px) rotate(-1deg); } }
        @keyframes float-diagonal { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, -10px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 14s ease-in-out infinite; }
        .animate-float-diagonal { animation: float-diagonal 12s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .glass-panel { background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
      `}} />

      {/* Shared Persistent Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950"></div>
      </div>

      {currentView === 'home' && <FloatingPanels />}

      <div className="relative z-20 flex flex-col flex-1">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-24">
          {/* Internal Navigation Button */}
          <button 
            onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} 
            className={`mb-8 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group ${currentView === 'home' ? 'hidden' : ''}`}
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </button>
          
          {currentView === 'home' && <Hero setCurrentView={setCurrentView} />}
          {currentView === 'product' && <AcousticsPage />}
          {currentView === 'ceiling' && <CeilingPage />}
          {currentView === 'applications' && <ApplicationsPage />}
          {currentView === 'about' && <AboutPage />}
        </main>

        <Footer setCurrentView={setCurrentView} />
      </div>

      {/* Persistent Floating WhatsApp Action */}
      <a href="https://wa.me/916363146633" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all group">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 group-hover:animate-ping"></span>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
      </a>
    </div>
  );
};

export default App;