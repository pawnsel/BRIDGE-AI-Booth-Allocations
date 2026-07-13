import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Search, RefreshCw, MapPin, Users, Building, 
  Award, Info, ShieldCheck, Download, Share2, ArrowRight
} from 'lucide-react';
import { MOCK_PROJECTS, Project, AwardType } from './data';

const getAwardDetails = (award: AwardType) => {
  switch (award) {
    case 'GOLD':
      return { label: 'GOLD MEDAL', cardBg: 'bg-gradient-to-br from-[#FFFDF0]/90 to-[#FFF8C4]/90', color: 'text-[#B8860B]', bg: 'bg-[#FFD700]/20', border: 'border-[#F1C40F]/40' };
    case 'SILVER':
      return { label: 'SILVER MEDAL', cardBg: 'bg-gradient-to-br from-[#F8F9FA]/90 to-[#E9ECEF]/90', color: 'text-[#6C757D]', bg: 'bg-white/60', border: 'border-[#ADB5BD]/50' };
    case 'BRONZE':
      return { label: 'BRONZE MEDAL', cardBg: 'bg-gradient-to-br from-[#FDF8F5]/90 to-[#F2E3D5]/90', color: 'text-[#A0522D]', bg: 'bg-[#CD853F]/20', border: 'border-[#CD853F]/40' };
    case 'HONORABLE_MENTION':
      return { label: 'HONORABLE MENTION', cardBg: 'bg-gradient-to-br from-[#F0F7FF]/90 to-[#E0EFFF]/90', color: 'text-[#0277BD]', bg: 'bg-[#81D4FA]/30', border: 'border-[#81D4FA]/50' };
    case 'POPULAR_VOTE':
      return { label: 'POPULAR VOTE', cardBg: 'bg-gradient-to-br from-[#FFF0F5]/90 to-[#FFE4E1]/90', color: 'text-[#C2185B]', bg: 'bg-[#F48FB1]/30', border: 'border-[#F48FB1]/50' };
    default:
      return { label: 'PARTICIPANT', cardBg: 'bg-white/60', color: 'text-gray-600', bg: 'bg-black/5', border: 'border-black/10' };
  }
};

const triggerConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D4AF37', '#FFD700', '#F9A825']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#D4AF37', '#FFD700', '#F9A825']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Project[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Auto focus and particle effects could be added here
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim() || cooldown > 0) return;

    setIsSearching(true);
    setHasSearched(true);
    setExpandedId(null);
    setResults([]);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const filtered = MOCK_PROJECTS.filter(project => {
        const term = searchTerm.toLowerCase();
        return (
          project.id.toLowerCase().includes(term) ||
          project.projectName.toLowerCase().includes(term) ||
          project.owners.some(owner => owner.fullName.toLowerCase().includes(term)) ||
          project.booth.toLowerCase().includes(term)
        );
      });
      
      setResults(filtered);
      setIsSearching(false);
      setCooldown(3); // 3 seconds cooldown

      // Trigger confetti if a gold or popular vote is found in the direct search
      if (filtered.some(p => p.award === 'GOLD' || p.award === 'POPULAR_VOTE')) {
        triggerConfetti();
      }
    }, 1200);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setHasSearched(false);
    setResults([]);
    setExpandedId(null);
  };

  return (
    <div className="min-h-screen text-text-primary font-sans relative pb-24">
      {/* Background Effects */}
      <div className="bg-mesh" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

      <main className="max-w-[900px] mx-auto px-4 pt-12 sm:pt-20 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/60 border border-black/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-accent-blue" />
              <span className="text-sm font-medium tracking-wide text-text-secondary">Official Results 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Digital Health Innovation
            </h1>
            <h2 className="text-lg sm:text-xl text-text-secondary font-medium">Award Result Search</h2>
          </motion.div>
        </header>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel rounded-3xl p-2 sm:p-4 mb-12"
        >
          <form onSubmit={handleSearch} className="relative flex items-center">
            <div className="absolute left-4 sm:left-6 text-text-secondary">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Project ID, Team ID, or Title..."
              className="w-full bg-transparent border-none focus:ring-0 text-lg sm:text-xl text-gray-900 placeholder-gray-400 py-5 pl-14 sm:pl-16 pr-32 outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="absolute right-2 flex items-center space-x-2">
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="p-3 text-text-secondary hover:text-gray-900 transition-colors rounded-full hover:bg-black/5"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                disabled={!searchTerm.trim() || isSearching || cooldown > 0}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  (!searchTerm.trim() || isSearching || cooldown > 0) 
                    ? 'bg-black/5 text-gray-500 cursor-not-allowed' 
                    : 'bg-primary-blue hover:bg-accent-blue text-white shadow-[0_4_14px_rgba(0,118,255,0.39)]'
                }`}
              >
                {isSearching ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
                    <span className="hidden sm:inline">Searching</span>
                  </span>
                ) : cooldown > 0 ? (
                  <span>Wait {cooldown}s</span>
                ) : (
                  <span>Search</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {[1, 2].map(i => (
                <div key={i} className="glass-panel rounded-[24px] p-6 sm:p-8 shimmer overflow-hidden relative border-black/5 bg-white/40">
                   <div className="h-6 w-24 bg-black/5 rounded mb-4"></div>
                   <div className="h-8 w-3/4 bg-black/5 rounded mb-8"></div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="h-5 w-32 bg-black/5 rounded"></div>
                     <div className="h-5 w-40 bg-black/5 rounded"></div>
                   </div>
                </div>
              ))}
            </motion.div>
          ) : hasSearched && results.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto bg-black/5 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">No record found</h3>
              <p className="text-text-secondary">Please verify your Project Number or keyword and try again.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              className="space-y-8"
            >
              {results.map((project, index) => {
                const awardInfo = getAwardDetails(project.award);
                const isExpanded = expandedId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`glass-panel rounded-[24px] overflow-hidden relative group hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-300 border-black/5 ${awardInfo.cardBg}`}
                  >
                    {/* Corner Badge */}
                    <div className="absolute top-0 right-0 p-6 z-10 hidden sm:block">
                      <div className={`px-4 py-1.5 rounded-full border backdrop-blur-md font-bold text-sm tracking-wider flex items-center space-x-2 ${awardInfo.bg} ${awardInfo.border} ${awardInfo.color} shadow-sm`}>
                        <Award className="w-4 h-4" />
                        <span>{awardInfo.label}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-10 relative z-0">
                      {/* Mobile Badge */}
                      <div className="sm:hidden mb-6 inline-flex">
                        <div className={`px-3 py-1 rounded-full border font-bold text-xs tracking-wider flex items-center space-x-1.5 ${awardInfo.bg} ${awardInfo.border} ${awardInfo.color} shadow-sm`}>
                          <Award className="w-3.5 h-3.5" />
                          <span>{awardInfo.label}</span>
                        </div>
                      </div>

                      <div className="text-text-secondary font-mono text-sm mb-3 flex items-center space-x-3">
                        <span className="bg-black/5 px-2 py-1 rounded text-gray-800 font-semibold">{project.id}</span>
                        <span>•</span>
                        <span className="font-medium text-gray-600">Round: Final</span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-8 pr-0 sm:pr-40 text-gray-900">
                        {project.projectName}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                        <div>
                          <div className="text-text-secondary text-sm mb-1 flex items-center"><Info className="w-4 h-4 mr-2"/> Category</div>
                          <div className="font-medium">{project.category}</div>
                        </div>
                        <div>
                          <div className="text-text-secondary text-sm mb-1 flex items-center"><MapPin className="w-4 h-4 mr-2"/> Booth</div>
                          <div className="font-medium text-accent-blue">{project.booth}</div>
                        </div>
                        <div>
                          <div className="text-text-secondary text-sm mb-1 flex items-center"><Building className="w-4 h-4 mr-2"/> Institution</div>
                          <div className="font-medium">{project.institution || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-text-secondary text-sm mb-1 flex items-center"><MapPin className="w-4 h-4 mr-2"/> Country</div>
                          <div className="font-medium">{project.country || "N/A"}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-text-secondary text-sm mb-3 flex items-center"><Users className="w-4 h-4 mr-2"/> Inventor(s)</div>
                        <div className="flex flex-wrap gap-2">
                          {project.owners.map((owner, idx) => (
                            <span key={idx} className="bg-white/50 border border-black/5 rounded-md px-3 py-1.5 text-sm text-gray-800 font-medium">
                              {owner.fullName}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.abstract && (
                        <div>
                          <button 
                            onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            className="flex items-center space-x-2 text-primary-blue hover:text-accent-blue transition-colors text-sm font-medium py-2"
                          >
                            <span>{isExpanded ? 'Hide Abstract' : 'Read Abstract'}</span>
                            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="pt-4 text-gray-700 leading-relaxed border-t border-black/5 mt-2">
                                  {project.abstract}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="bg-black/[0.02] border-t border-black/5 p-4 sm:px-10 flex flex-wrap gap-3">
                      <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/80 hover:bg-white transition-colors px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-black/5 shadow-sm">
                        <Download className="w-4 h-4" />
                        <span>Certificate</span>
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/80 hover:bg-white transition-colors px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-black/5 shadow-sm">
                        <Share2 className="w-4 h-4" />
                        <span>Share Result</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {results.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue/10 text-primary-blue mb-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">Congratulations on your outstanding achievement!</h4>
                  <p className="text-text-secondary">Thank you for participating in the competition.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
