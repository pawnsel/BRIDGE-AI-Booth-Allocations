import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Users, Building, ShieldCheck, RefreshCw, Trophy, Medal, Star, Crown, Award as AwardIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AWARDS, AWARD_TYPES, MOCK_PROJECTS, DIVISIONS, CATEGORIES } from '../data';

const getAwardBadge = (type: string) => {
  switch (type) {
    case AWARD_TYPES.GRAND_PRIZE: 
      return { bg: 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600', text: 'text-white', icon: <Crown className="w-5 h-5 mr-2" /> };
    case AWARD_TYPES.GOLD: 
      return { bg: 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]', text: 'text-white', icon: <Trophy className="w-5 h-5 mr-2" /> };
    case AWARD_TYPES.SILVER: 
      return { bg: 'bg-gradient-to-r from-[#757F9A] via-[#D7DDE8] to-[#757F9A]', text: 'text-white', icon: <Medal className="w-5 h-5 mr-2" /> };
    case AWARD_TYPES.BRONZE: 
      return { bg: 'bg-gradient-to-r from-[#804A00] via-[#D4AF37] to-[#804A00]', text: 'text-white', icon: <Medal className="w-5 h-5 mr-2" /> };
    case AWARD_TYPES.SPECIAL: 
      return { bg: 'bg-gradient-to-r from-purple-700 via-purple-400 to-purple-700', text: 'text-white', icon: <Star className="w-5 h-5 mr-2" /> };
    default: 
      return { bg: 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300', text: 'text-gray-900', icon: <AwardIcon className="w-5 h-5 mr-2" /> };
  }
};

export default function AwardsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Fire confetti on initial load
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2F80ED', '#D4AF37', '#BFC4CC']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2F80ED', '#D4AF37', '#BFC4CC']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    if (!searchTerm && !debouncedSearch) return; // Prevent initial double render loading state if empty
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredAwards = useMemo(() => {
    let result = AWARDS;
    
    if (selectedTrack !== 'All') {
        result = result.filter(a => a.division === selectedTrack);
    }

    if (selectedCategory !== 'All') {
        result = result.filter(a => a.category === selectedCategory);
    }
    
    if (debouncedSearch) {
        result = result.filter(award => {
          const project = MOCK_PROJECTS.find(p => p.id === award.projectId);
          const searchString = `${award.winnerName} ${award.awardType} ${project?.projectName} ${project?.booth} ${project?.id}`.toLowerCase();
          return searchString.includes(debouncedSearch.toLowerCase());
        });
    }
    
    return result;
  }, [debouncedSearch, selectedTrack, selectedCategory]);

  const displayAwards = filteredAwards;

  return (
      <div className="relative min-h-[calc(100vh-80px)] bg-gray-50 text-gray-900 w-full flex flex-col font-sans overflow-hidden">
        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-1 flex flex-col">
            
            {/* Header section */}
            <div className="text-center mb-10 animate-in slide-in-from-bottom-4 duration-700 ease-out">
               <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                 BRIDGE-AI Summit 2026
               </h1>
               <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                 Award Result Search
               </p>
            </div>

            {/* Search Box */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-2 mb-8 shadow-sm animate-in slide-in-from-bottom-8 duration-700 delay-100 ease-out">
               <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center justify-center">
                    {isSearching ? <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" /> : <Search className="w-6 h-6 text-gray-400" />}
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Project ID, Name, or Booth..."
                    className="w-full bg-transparent border-none text-gray-900 text-lg py-4 pl-14 pr-32 focus:outline-none focus:ring-0 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute right-2">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2.5 px-6 rounded-full shadow-sm">
                      Search
                    </button>
                  </div>
               </div>
            </div>

            {/* Track & Category Filters */}
            <div className="flex flex-col items-center gap-4 mb-12 animate-in slide-in-from-bottom-8 duration-700 delay-150 ease-out">
               <div className="flex flex-wrap items-center justify-center gap-3">
                 <button onClick={() => setSelectedTrack('All')} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${selectedTrack === 'All' ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm'}`}>All Tracks</button>
                 <button onClick={() => setSelectedTrack(DIVISIONS.RISING)} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${selectedTrack === DIVISIONS.RISING ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm'}`}>Rising Innovator</button>
                 <button onClick={() => setSelectedTrack(DIVISIONS.ADVANCED)} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${selectedTrack === DIVISIONS.ADVANCED ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm'}`}>Advanced Innovator</button>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-2">
                 <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === 'All' ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm' : 'bg-white text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700'}`}>All Categories</button>
                 {Object.values(CATEGORIES).map(cat => (
                   <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border ${selectedCategory === cat ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm' : 'bg-white text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700'}`}>{cat}</button>
                 ))}
               </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 space-y-8 pb-20">
               {isSearching ? (
                  <div className="space-y-6">
                    {[1].map(i => (
                       <div key={i} className="bg-white border border-gray-200 rounded-[24px] p-8 animate-pulse flex flex-col gap-6 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                               <div className="h-5 bg-gray-200 rounded-full w-32 mb-4"></div>
                               <div className="h-8 bg-gray-200 rounded-lg w-64 md:w-96"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                          </div>
                          <div className="h-px w-full bg-gray-100"></div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                             <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                             <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                          </div>
                       </div>
                    ))}
                  </div>
               ) : displayAwards.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-[24px] p-12 text-center animate-in fade-in duration-500 max-w-2xl mx-auto shadow-sm">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No record found</h3>
                    <p className="text-gray-500">Please verify your Project Number, Name, or selected Track/Category.</p>
                  </div>
               ) : (
                  <div className="space-y-16">
                     {Object.values(DIVISIONS).map(division => {
                       if (selectedTrack !== 'All' && selectedTrack !== division) return null;
                       const divisionAwards = displayAwards.filter(a => a.division === division);
                       if (divisionAwards.length === 0) return null;
                       
                       const splitDiv = division.split('(');
                       const mainTitle = splitDiv[0].trim();
                       const subTitle = splitDiv[1] ? `(${splitDiv[1]}` : '';

                       return (
                         <div key={division} className="animate-in fade-in duration-700">
                             <div className="text-center mb-10 pb-6 border-b border-gray-200">
                                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">{mainTitle}</h2>
                                 {subTitle && <p className="text-blue-600 text-lg font-medium">{subTitle}</p>}
                             </div>
                             
                             <div className="space-y-12">
                                 {Object.values(CATEGORIES).map(category => {
                                     const categoryAwards = divisionAwards.filter(a => a.category === category);
                                     if (categoryAwards.length === 0) return null;
                                     if (selectedCategory !== 'All' && selectedCategory !== category) return null;
                                     
                                     return (
                                         <div key={category} className="space-y-6">
                                             <div className="flex items-center space-x-3 mb-6">
                                                 <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
                                                 <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                                             </div>
                                             
                                             <div className="space-y-8">
                                                 {categoryAwards.map((award, index) => {
                                                   const project = MOCK_PROJECTS.find(p => p.id === award.projectId);
                                                   const badge = getAwardBadge(award.awardType);
                                                   const cleanProjectName = project ? project.projectName : award.winnerName?.split('(')[0]?.trim();

                                                   return (
                                                     <div 
                                                       key={award.id} 
                                                       className="group relative bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl hover:border-gray-300"
                                                       style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
                                                     >
                                                        <div className="p-8 relative z-10">
                                                           <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 mb-6">
                                                              <div>
                                                                 <div className="flex items-center space-x-3 mb-3">
                                                                   <span className="text-blue-600 font-mono font-semibold tracking-wider">
                                                                      Booth {project ? project.booth : 'TBA'}
                                                                   </span>
                                                                 </div>
                                                                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2 max-w-2xl">
                                                                    {cleanProjectName || "To be announced..."}
                                                                 </h3>
                                                              </div>
                                                              <div className={`flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-full font-bold shadow-sm border border-white/50 ${badge.bg} ${badge.text}`}>
                                                                 {badge.icon}
                                                                 {award.awardType}
                                                              </div>
                                                           </div>

                                                           <div className="pt-6 border-t border-gray-100">
                                                              <div className="flex items-center text-gray-700 text-lg">
                                                                <Users className="w-5 h-5 mr-3 text-gray-400" />
                                                                <span className="font-medium text-gray-500 mr-2">Team Leader:</span>
                                                                <span className="font-semibold text-gray-900">
                                                                  {project ? project.owners[0].fullName : 'Unknown'}
                                                                </span>
                                                              </div>
                                                           </div>
                                                        </div>
                                                     </div>
                                                   )
                                                 })}
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                         </div>
                       )
                     })}
                  </div>
               )}
            </div>
        </div>
      </div>
  );
}
