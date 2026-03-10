import React, { useState, useEffect } from 'react';

// ==========================================
// --- src/components/FloatingPanels.jsx ---
// ==========================================
const FloatingPanels = () => (
  <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000">
    {/* Top-left floating panel */}
    <div className="absolute top-[15%] left-[5%] md:left-[10%] w-48 h-64 md:w-64 md:h-80 glass-panel rounded-xl animate-float-slow flex flex-col justify-evenly p-3 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full h-2 bg-slate-800/40 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
      ))}
    </div>

    {/* Right floating panel */}
    <div className="absolute top-[30%] right-[2%] md:right-[8%] w-56 h-72 md:w-80 md:h-96 glass-panel rounded-2xl animate-float-slower p-4 grid grid-cols-6 grid-rows-8 gap-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 to-transparent"></div>
      {[...Array(48)].map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-slate-900/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] mx-auto"></div>
      ))}
    </div>

    {/* Center Background Panel */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-40 glass-panel rounded-b-[40px] animate-float-bg opacity-40 flex items-end justify-center pb-4 space-x-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-8 h-24 bg-white/5 rounded-sm border border-white/10 backdrop-blur-sm"></div>
      ))}
    </div>

    {/* Bottom floating panel */}
    <div className="absolute bottom-[10%] left-[20%] md:left-[30%] w-40 h-40 md:w-56 md:h-56 glass-panel rounded-3xl animate-float-diagonal overflow-hidden flex items-center justify-center">
      <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      <svg className="absolute w-24 h-24 text-white/10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25l9 5.25v10.5l-9 5.25-9-5.25v-10.5l9-5.25z" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      </svg>
    </div>
  </div>
);

// ==========================================
// --- src/components/Header.jsx ---
// ==========================================
const Header = ({ currentView, setCurrentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 focus:outline-none group z-50"
        >
          <div className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-sm text-white font-bold tracking-tighter text-lg leading-none transition-transform group-hover:scale-105">M</div>
          <span className="text-white font-semibold tracking-widest text-sm uppercase group-hover:text-blue-200 transition-colors">Mahaduyutha</span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-slate-300">
          <button onClick={() => setCurrentView('product')} className={`hover:text-white transition-colors py-2 ${currentView === 'product' ? 'text-white border-b border-blue-500' : ''}`}>Acoustics</button>
          <button onClick={() => setCurrentView('ceiling')} className={`hover:text-white transition-colors py-2 ${currentView === 'ceiling' ? 'text-white border-b border-blue-500' : ''}`}>Ceiling Systems</button>
          <button onClick={() => setCurrentView('applications')} className={`hover:text-white transition-colors py-2 ${currentView === 'applications' ? 'text-white border-b border-blue-500' : ''}`}>Applications</button>
          <button onClick={() => setCurrentView('about')} className={`hover:text-white transition-colors py-2 ${currentView === 'about' ? 'text-white border-b border-blue-500' : ''}`}>About</button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="text-white md:hidden z-50 focus:outline-none w-10 h-10 flex items-center justify-center relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-1' : ''}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-1' : ''}`} />
          </div>
        </button>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 max-w-sm bg-slate-900 border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 pb-8 px-6 shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Links */}
        <nav className="flex flex-col space-y-6 text-lg font-medium tracking-wide text-slate-300 flex-1">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === 'home' ? 'text-blue-300' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('product')} 
            className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === 'product' ? 'text-blue-300' : ''}`}
          >
            Acoustical Systems
          </button>
          <button 
            onClick={() => handleNavClick('ceiling')} 
            className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === 'ceiling' ? 'text-blue-300' : ''}`}
          >
            Ceiling Systems
          </button>
          <button 
            onClick={() => handleNavClick('applications')} 
            className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === 'applications' ? 'text-blue-300' : ''}`}
          >
            Applications
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className={`text-left border-b border-white/5 pb-4 hover:text-white transition-colors ${currentView === 'about' ? 'text-blue-300' : ''}`}
          >
            About & Contact
          </button>
        </nav>

        {/* Mobile Menu Footer elements */}
        <div className="mt-auto space-y-4 pt-8">
          <button 
            onClick={() => handleNavClick('about')} 
            className="w-full py-4 bg-white/10 text-white rounded-xl font-bold tracking-wide border border-white/20 hover:bg-white/20 transition-colors"
          >
            Get a Quote
          </button>
          <div className="flex items-center justify-center space-x-4">
             <a href="tel:+919876543210" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-300 hover:bg-blue-500/20 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
             </a>
             <a href="mailto:info@mahaduyutha.in" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-300 hover:bg-blue-500/20 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
             </a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// --- src/components/Footer.jsx ---
// ==========================================
const Footer = ({ setCurrentView }) => (
  <footer className="w-full bg-slate-950/80 border-t border-white/10 pt-16 pb-8 px-6 mt-auto relative z-20 backdrop-blur-md">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center border-2 border-white rounded-sm text-white font-bold tracking-tighter text-lg leading-none">M</div>
          <span className="text-white font-semibold tracking-widest text-sm uppercase">Mahaduyutha</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Premium Acoustic Panels and Ceiling Systems designed for modern interiors. Elevating spaces to new lifestyle standards with sustainable and functional designs.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Products</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><button onClick={() => setCurrentView('product')} className="hover:text-blue-300 transition-colors">Acoustical Systems</button></li>
          <li><button onClick={() => setCurrentView('ceiling')} className="hover:text-blue-300 transition-colors">Ceiling Systems</button></li>
          <li><button onClick={() => setCurrentView('applications')} className="hover:text-blue-300 transition-colors">Applications</button></li>
          <li><button onClick={() => setCurrentView('home')} className="hover:text-blue-300 transition-colors">Installations</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <a href="mailto:info@mahaduyutha.in" className="hover:text-blue-300 transition-colors">info@mahaduyutha.in</a>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <a href="tel:+919876543210" className="hover:text-blue-300 transition-colors">+91 98765 43210</a>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Bengaluru, Karnataka, India</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Social</h4>
        <div className="flex space-x-3">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
      <p>© 2025 Mahaduyutha. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// ==========================================
// --- src/components/Hero.jsx ---
// ==========================================
const Hero = ({ setCurrentView }) => (
  <div className="max-w-4xl mx-auto relative animate-[fadeIn_0.5s_ease-out]">
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">Premium Building Materials</span>
    </div>
    
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
      Elevate Spaces to <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-slate-400">
        New Lifestyle Standards
      </span>
    </h1>
    
    <p className="mt-8 text-lg md:text-2xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
      Premium Acoustic Panels and Ceiling Systems designed for modern interiors. Combining functional sound absorption with sophisticated aesthetic appeal.
    </p>
    
    <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
      <button 
        onClick={() => setCurrentView('product')}
        className="group relative px-8 py-4 bg-white text-slate-950 font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <span className="relative">Explore Products</span>
      </button>
      <button onClick={() => setCurrentView('about')} className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg w-full sm:w-auto flex items-center justify-center space-x-2">
        <span>Get a Quote</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
      <button className="px-8 py-4 bg-transparent text-blue-300 font-medium rounded-full border border-blue-500/30 hover:bg-blue-500/10 transition-all w-full sm:w-auto flex items-center justify-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        <span>Download Product Catalogue</span>
      </button>
    </div>

    <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 className="text-3xl font-bold text-white">100%</h4>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">PET Fiber Core</p>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-white">Class A</h4>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Fire Rating</p>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-white">148+</h4>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Color Options</p>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-white">0.70</h4>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Up to NRC</p>
      </div>
    </div>
  </div>
);

// ==========================================
// --- src/components/InstallationsGallery.jsx ---
// ==========================================
const InstallationsGallery = () => (
  <div className="mt-32 pt-16 border-t border-white/10 w-full max-w-7xl mx-auto text-left relative z-20 animate-[fadeIn_0.5s_ease-out_0.3s_both]">
    <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-blue-200">Installations</span></h2>
        <p className="text-slate-400 max-w-2xl text-lg">
          Explore our portfolio of premium acoustical applications installed across various industries and architectural spaces.
        </p>
      </div>
      <button className="text-sm font-bold text-white uppercase tracking-wider hover:text-blue-300 transition-colors flex items-center justify-center md:justify-start gap-2">
        View All Projects <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Installation 1 */}
      <div className="glass-panel rounded-3xl overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-500 flex flex-col h-full">
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop" 
            alt="Office acoustic panels" 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
        <div className="p-6 bg-slate-950/50 flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-1">Corporate Workspace</h3>
          <p className="text-sm text-blue-300 font-medium tracking-wide">Office acoustic panels</p>
        </div>
      </div>

      {/* Installation 2 */}
      <div className="glass-panel rounded-3xl overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-500 flex flex-col h-full">
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop" 
            alt="Auditorium ceiling baffles" 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
        <div className="p-6 bg-slate-950/50 flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-1">Grand Theater</h3>
          <p className="text-sm text-blue-300 font-medium tracking-wide">Auditorium ceiling baffles</p>
        </div>
      </div>

      {/* Installation 3 */}
      <div className="glass-panel rounded-3xl overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-500 flex flex-col h-full">
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1582719478250-c8940c62d26d?q=80&w=800&auto=format&fit=crop" 
            alt="Hotel interior panels" 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
        <div className="p-6 bg-slate-950/50 flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-1">Luxury Resort Lobby</h3>
          <p className="text-sm text-blue-300 font-medium tracking-wide">Hotel interior panels</p>
        </div>
      </div>

    </div>
  </div>
);

// ==========================================
// --- src/components/ProductGallery.jsx ---
// ==========================================
const ProductGallery = () => (
  <div className="lg:col-span-7 space-y-6">
    <div className="aspect-[4/3] w-full glass-panel rounded-3xl overflow-hidden relative group">
      <img 
        src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2000&auto=format&fit=crop" 
        alt="PET Panels Application" 
        loading="lazy"
        className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 left-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/20 bg-slate-900/50 backdrop-blur-md">
        <span className="text-xs font-medium tracking-wider text-white uppercase">Corporate Office Application</span>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4">
      <div className="aspect-square glass-panel rounded-xl overflow-hidden cursor-pointer hover:border-white/40 transition-colors">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop" alt="Thumbnail 1" loading="lazy" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
      </div>
      <div className="aspect-square glass-panel rounded-xl overflow-hidden cursor-pointer hover:border-white/40 transition-colors">
        <img src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=800&auto=format&fit=crop" alt="Thumbnail 2" loading="lazy" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
      </div>
      <div className="aspect-square glass-panel rounded-xl overflow-hidden cursor-pointer hover:border-white/40 transition-colors flex items-center justify-center bg-white/5">
          <span className="text-sm font-semibold tracking-wider uppercase">+ View Gallery</span>
      </div>
    </div>
  </div>
);

// ==========================================
// --- src/components/SpecsTable.jsx ---
// ==========================================
const SpecsTable = () => (
  <div className="mt-24">
    <h3 className="text-2xl font-bold text-white mb-8">Acoustic Performance (NRC)</h3>
    <div className="glass-panel rounded-2xl p-8 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 px-4 font-semibold text-slate-400">Thickness</th>
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
          <tr className="hover:bg-white/5 transition-colors">
            <td className="py-4 px-4 text-white">9mm</td>
            <td className="py-4 px-4">0.01</td>
            <td className="py-4 px-4">0.04</td>
            <td className="py-4 px-4">0.12</td>
            <td className="py-4 px-4">0.33</td>
            <td className="py-4 px-4">0.62</td>
            <td className="py-4 px-4">0.76</td>
            <td className="py-4 px-4 font-bold text-blue-300">0.30</td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors">
            <td className="py-4 px-4 text-white">12mm</td>
            <td className="py-4 px-4">0.03</td>
            <td className="py-4 px-4">0.06</td>
            <td className="py-4 px-4">0.22</td>
            <td className="py-4 px-4">0.48</td>
            <td className="py-4 px-4">0.74</td>
            <td className="py-4 px-4">0.80</td>
            <td className="py-4 px-4 font-bold text-blue-300">0.40</td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors">
            <td className="py-4 px-4 text-white">25mm</td>
            <td className="py-4 px-4">0.09</td>
            <td className="py-4 px-4">0.27</td>
            <td className="py-4 px-4">0.65</td>
            <td className="py-4 px-4">0.97</td>
            <td className="py-4 px-4">0.92</td>
            <td className="py-4 px-4">0.87</td>
            <td className="py-4 px-4 font-bold text-blue-300">0.70</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================================
// --- src/components/ProductView.jsx ---
// ==========================================
const ProductView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
    <ProductGallery />
    <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">PET Panels <br/><span className="text-blue-200">Acoustical Systems</span></h1>
        <p className="mt-6 text-lg text-slate-400 leading-relaxed">
          A durable and versatile product made of 100% PET fiber. Bonded using heat rather than traditional chemical binders, ensuring natural resistance to fire, moisture, vermin, insects, mold, and bacteria.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 border-y border-white/10">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Thickness</h4>
          <p className="mt-2 text-white font-medium text-lg">9mm, 12mm, 25mm</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Max Dimensions</h4>
          <p className="mt-2 text-white font-medium">L-2.44m × W-1.22m</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Density</h4>
          <p className="mt-2 text-white font-medium">120 Kg - 200 Kg / m³</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fire Rating</h4>
          <p className="mt-2 text-white font-medium">Class "A" & "B"</p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Popular Colors (148 Total)</h4>
        <div className="flex flex-wrap gap-4">
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-lg"></div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">White</span>
          </div>
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-[#d7ccc8] border-2 border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-lg"></div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">Nat. Beige</span>
          </div>
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-[#78909c] border-2 border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-lg"></div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">Slate Grey</span>
          </div>
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-[#1c3144] border-2 border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-lg"></div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">Midnight</span>
          </div>
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-[#00838f] border-2 border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-lg"></div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">Teal</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 cursor-pointer flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-xs">+</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
        <button className="h-full w-full bg-white text-slate-950 p-4 rounded-xl font-bold tracking-tight hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center text-center text-sm leading-snug gap-2">
          <svg className="w-5 h-5 text-transparent shrink-0" fill="none" viewBox="0 0 24 24"></svg>
          <span>Request Sample</span>
        </button>
        <button className="h-full w-full bg-white/5 text-white p-4 rounded-xl font-bold tracking-tight border border-white/20 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-2 text-center text-sm leading-snug">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>Download Specs</span>
        </button>
        <button className="h-full w-full bg-blue-500/10 text-blue-300 p-4 rounded-xl font-bold tracking-tight border border-blue-500/30 hover:bg-blue-500/20 transition-colors flex flex-col items-center justify-center gap-2 text-center text-sm leading-snug">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>Product Catalogue</span>
        </button>
      </div>
    </div>
  </div>
);

// ==========================================
// --- src/pages/Home.jsx ---
// ==========================================
const Home = ({ setCurrentView }) => (
  <main className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-24 max-w-7xl mx-auto w-full">
    <Hero setCurrentView={setCurrentView} />
    <InstallationsGallery />
  </main>
);

// ==========================================
// --- src/pages/Product.jsx ---
// ==========================================
const Product = ({ setCurrentView }) => (
  <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 text-slate-300 animate-[fadeIn_0.5s_ease-out]">
    <button 
      onClick={() => setCurrentView('home')} 
      className="mb-8 flex items-center text-sm font-medium tracking-wide text-slate-400 hover:text-white transition-colors group"
    >
      <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Portfolio
    </button>
    <ProductView />
    <SpecsTable />
  </main>
);

// ==========================================
// --- src/pages/CeilingSystems.jsx ---
// ==========================================
const CeilingSystems = ({ setCurrentView }) => (
  <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 text-slate-300 animate-[fadeIn_0.5s_ease-out]">
    <button 
      onClick={() => setCurrentView('home')} 
      className="mb-8 flex items-center text-sm font-medium tracking-wide text-slate-400 hover:text-white transition-colors group"
    >
      <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Portfolio
    </button>
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-7 space-y-6">
        <div className="aspect-[4/3] w-full glass-panel rounded-3xl overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?q=80&w=2000&auto=format&fit=crop" 
            alt="Ceiling Baffles Application" 
            loading="lazy"
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/20 bg-slate-900/50 backdrop-blur-md">
            <span className="text-xs font-medium tracking-wider text-white uppercase">Acoustic Clouds & Baffles</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Baffle Ceiling <br/><span className="text-blue-200">Systems</span></h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Used in large open areas that have minimal wall surfaces to attach traditional wall panes. Our acoustic clouds and baffles seamlessly integrate to provide superior sound absorption and a striking visual aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 border-y border-white/10">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Thickness</h4>
            <p className="mt-2 text-white font-medium text-lg">Min: 9mm, Max: Custom</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Patterns</h4>
            <p className="mt-2 text-white font-medium">5 Different Patterns</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Available Baffle Types</h4>
          <div className="flex flex-wrap gap-2">
            {['U-Shaped', 'Special Shaped', 'O-Shaped', 'Bullet Shaped', 'V-Shaped', 'Quadrate Pipe', 'O-Shaped Pipe'].map(type => (
              <span key={type} className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-sm text-slate-300">
                {type}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
           <button className="w-full sm:w-auto bg-white/5 text-white px-8 py-4 rounded-xl font-bold tracking-tight border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
             <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             <span>Download Ceiling Specs</span>
           </button>
        </div>
      </div>
    </div>
  </main>
);

// ==========================================
// --- src/pages/Applications.jsx ---
// ==========================================
const Applications = ({ setCurrentView }) => {
  const applicationSectors = [
    {
      title: "Business & Corporate",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      items: ["Board Rooms", "Conference Rooms", "Lobbies & Corridors", "Cabins & Partitions", "Reception Desks", "Work Stations"]
    },
    {
      title: "Education",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      items: ["Class Rooms", "Lecture Halls", "Libraries", "Gymnasiums", "Music Rooms", "Multipurpose Halls", "Dormitories"]
    },
    {
      title: "Theatres & Auditoriums",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
      items: ["Multiplex & Single Theaters", "Large Auditoriums", "Marriage Halls", "Studios", "Home Theatre Systems"]
    },
    {
      title: "Hospitality",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      items: ["Lobbies & Reception", "Waiting Areas", "Meeting Rooms", "Guest Rooms & Saloons", "Dining & Party Halls"]
    },
    {
      title: "Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      items: ["Patient Waiting Halls", "ICU & Casualty Rooms", "Wards & Corridors", "Operation Theatres", "Reception Areas"]
    },
    {
      title: "Recreation & Sports Arenas",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      items: ["Basketball & Volleyball Courts", "Table Tennis & Squash", "Badminton Courts", "Bridge Rooms", "High Noise Ball Game Areas"]
    },
    {
      title: "Residential",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      items: ["Small Home Offices", "Bedrooms", "Home Theatres", "Drawing Rooms", "Dining Rooms"]
    }
  ];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 text-slate-300 animate-[fadeIn_0.5s_ease-out]">
      <button 
        onClick={() => setCurrentView('home')} 
        className="mb-8 flex items-center text-sm font-medium tracking-wide text-slate-400 hover:text-white transition-colors group"
      >
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Portfolio
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">Versatile <span className="text-blue-200">Applications</span></h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Our acoustical systems and ceiling solutions are meticulously engineered to enhance the acoustic performance and aesthetic appeal of any environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applicationSectors.map((sector, idx) => (
          <div key={idx} className="glass-panel rounded-3xl overflow-hidden group hover:border-white/30 transition-all duration-500 flex flex-col h-full">
            <div className="h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply z-10 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
              <img 
                src={sector.image} 
                alt={sector.title} 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-6 z-20">
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{sector.title}</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col bg-slate-950/40">
              <ul className="space-y-3 flex-1">
                {sector.items.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-3 shrink-0 opacity-70"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// ==========================================
// --- src/pages/About.jsx ---
// ==========================================
const About = ({ setCurrentView }) => (
  <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 text-slate-300 animate-[fadeIn_0.5s_ease-out]">
    <button 
      onClick={() => setCurrentView('home')} 
      className="mb-8 flex items-center text-sm font-medium tracking-wide text-slate-400 hover:text-white transition-colors group"
    >
      <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Portfolio
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* About Content */}
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">About <br/><span className="text-blue-200">Mahaduyutha</span></h1>
          <div className="w-20 h-1 bg-blue-500/50 rounded-full mb-8"></div>
        </div>
        
        <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
          <p>
            Mahaduyutha was established with a vision to offer world-class materials that elevate spaces to new lifestyle standards. Our product range is carefully crafted to meet the versatile demands of modern environments, combining functional design with aesthetic appeal.
          </p>
          <p>
            Each Mahaduyutha product introduces an element of sophistication, transforming spaces with ease and elegance.
          </p>
          <p>
            As a privately owned and fully integrated organization, Mahaduyutha manufactures, markets, and distributes premium building materials worldwide. Our extensive global network of partners supports our mission to bring exceptional materials to every corner of the world, ensuring seamless availability, sales, and service.
          </p>
        </div>
      </div>

      {/* Contact Information Panel */}
      <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Contact Information</h3>
        
        <div className="space-y-8 relative z-10">
          
          {/* Location */}
          <div className="flex items-start space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</h4>
              <p className="text-white font-medium">Global Headquarters<br/>Architectural & Industrial District<br/>Bengaluru, Karnataka, India</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</h4>
              <a href="tel:+919876543210" className="text-white font-medium hover:text-blue-300 transition-colors">+91 98765 43210</a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-colors">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp</h4>
              <a href="https://wa.me/919876543210" className="text-white font-medium hover:text-green-400 transition-colors">+91 98765 43210</a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email</h4>
              <a href="mailto:info@mahaduyutha.in" className="text-white font-medium hover:text-blue-300 transition-colors">info@mahaduyutha.in</a>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    {/* Contact Inquiry Form */}
    <div className="mt-20 glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3 text-center">Send an Inquiry</h2>
        <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
          Interested in our acoustic solutions or need a quote for your project? Fill out the form below and our team will get back to you shortly.
        </p>
        
        {/* Make sure to replace YOUR_FORMSPREE_ID with your actual form ID */}
        <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name *</label>
              <input type="text" id="name" name="name" required 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address *</label>
              <input type="email" id="email" name="email" required 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="john@example.com" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-300">Phone Number</label>
              <input type="tel" id="phone" name="phone" 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="+91 XXXXX XXXXX" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="project_type" className="text-sm font-medium text-slate-300">Project Type *</label>
              <div className="relative">
                <select id="project_type" name="project_type" required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                >
                  <option value="" disabled selected className="text-slate-500">Select an option</option>
                  <option value="commercial" className="bg-slate-900">Commercial / Office</option>
                  <option value="auditorium" className="bg-slate-900">Theater / Auditorium</option>
                  <option value="education" className="bg-slate-900">Education / Institution</option>
                  <option value="hospitality" className="bg-slate-900">Hospitality / Hotel</option>
                  <option value="residential" className="bg-slate-900">Residential</option>
                  <option value="other" className="bg-slate-900">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">Message *</label>
            <textarea id="message" name="message" rows="4" required 
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              placeholder="Tell us about your project requirements..."
            ></textarea>
          </div>
          
          <div className="pt-2 text-center">
            <button type="submit" className="w-full md:w-auto px-12 bg-white text-slate-950 font-bold tracking-wide py-4 rounded-xl hover:bg-blue-50 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
);

// ==========================================
// --- src/App.jsx ---
// ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('home');

  // Inject SEO Meta Tags & Favicon dynamically into document.head
  useEffect(() => {
    document.title = "Mahaduyutha | Premium Acoustical Systems";
    
    // Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Premium Acoustic Panels and Ceiling Systems designed for modern interiors. Elevate spaces to new lifestyle standards with Mahaduyutha.";

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Acoustic Panels, Ceiling Systems, PET Panels, Baffle Ceiling, Modern Interiors, Architecture, Sound Absorption, Mahaduyutha";

    // Favicon
    let linkFavicon = document.querySelector('link[rel="icon"]');
    if (!linkFavicon) {
      linkFavicon = document.createElement('link');
      linkFavicon.rel = "icon";
      document.head.appendChild(linkFavicon);
    }
    linkFavicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>M</text></svg>";
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Global Embedded Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(25px) rotate(0deg); }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0) rotate(12deg) scale(1); }
          50% { transform: translate(-15px, -15px) rotate(10deg) scale(1.02); }
        }
        @keyframes float-background {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
        .animate-float-diagonal { animation: float-diagonal 10s ease-in-out infinite; }
        .animate-float-bg { animation: float-background 15s ease-in-out infinite; }

        .glass-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1);
        }
      `}} />

      {/* Persistent Background Layer */}
      <div className="absolute inset-0 z-0 fixed">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop" 
          alt="Modern Architectural Office" 
          loading="lazy"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-950 flex"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
      </div>

      {/* Floating Acoustic Panels - Conditionally Rendered on Home view */}
      {currentView === 'home' && <FloatingPanels />}

      {/* Main Container & Routing */}
      <div className="relative z-20 flex flex-col flex-1">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'product' && <Product setCurrentView={setCurrentView} />}
        {currentView === 'ceiling' && <CeilingSystems setCurrentView={setCurrentView} />}
        {currentView === 'applications' && <Applications setCurrentView={setCurrentView} />}
        {currentView === 'about' && <About setCurrentView={setCurrentView} />}
        <Footer setCurrentView={setCurrentView} />
      </div>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 group-hover:animate-ping"></span>
        <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"></path></svg>
      </a>

    </div>
  );
};

export default App;
