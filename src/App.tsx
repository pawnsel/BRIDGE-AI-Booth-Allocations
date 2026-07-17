import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronRight, ChevronDown, Activity, Stethoscope, MonitorSmartphone, BrainCircuit, Download, X, Mail, LayoutGrid, Award as AwardIcon } from 'lucide-react';
import { MOCK_PROJECTS, CATEGORIES, Project } from './data';
import AwardsView from './components/AwardsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'booths' | 'awards'>('booths');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      const matchesSearch = 
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.owners.some(owner => owner.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.booth.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 shadow-sm border-b bg-white border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Exhibition Portal</h1>
              <p className="text-sm mt-1 text-gray-500">Discover projects and award announcements</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex p-1 rounded-lg bg-gray-100">
                <button
                  onClick={() => setActiveTab('booths')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'booths' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Booth Allocation</span>
                </button>
                <button
                  onClick={() => setActiveTab('awards')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'awards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                >
                  <AwardIcon className="w-4 h-4" />
                  <span>Awards</span>
                </button>
              </div>

              <button className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4" />
                <span>Preparation Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'awards' ? (
        <AwardsView />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          
          {/* Top Navigation / Filters visual representation */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="hidden lg:flex flex-1 space-x-1 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                All Categories
              </button>
              <button 
                onClick={() => setSelectedCategory(CATEGORIES.A)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === CATEGORIES.A ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <Activity className="w-4 h-4" />
                <span>Medical Ed</span>
              </button>
              <button 
                 onClick={() => setSelectedCategory(CATEGORIES.B)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === CATEGORIES.B ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Clinical</span>
              </button>
               <button 
                 onClick={() => setSelectedCategory(CATEGORIES.C)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === CATEGORIES.C ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <MonitorSmartphone className="w-4 h-4" />
                <span>Digital Tech</span>
              </button>
               <button 
                 onClick={() => setSelectedCategory(CATEGORIES.D)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === CATEGORIES.D ? 'bg-rose-50 text-rose-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Medical AI</span>
              </button>
            </div>
          </div>

          {/* Search and Mobile Filter */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by project name, owner, or booth number (e.g. A01)..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative md:w-64 lg:hidden">
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg appearance-none bg-white transition-shadow shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value={CATEGORIES.A}>Medical Education (A)</option>
                <option value={CATEGORIES.B}>Clinical (B)</option>
                <option value={CATEGORIES.C}>Digital Technology (C)</option>
                <option value={CATEGORIES.D}>Medical AI (D)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Booth
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Owner(s)
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th scope="col" className="relative px-6 py-4">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedProject(project)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-sm min-w-[3rem]">
                            {project.booth}
                          </span>
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{project.projectName}</div>
                        {/* Mobile category badge */}
                        <div className="mt-1 md:hidden">
                          <span className="inline-flex items-center text-xs text-gray-500">
                             {project.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {project.owners.map(o => o.fullName).join(', ')}
                        </div>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${project.category === CATEGORIES.A ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10' : ''}
                          ${project.category === CATEGORIES.B ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10' : ''}
                          ${project.category === CATEGORIES.C ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10' : ''}
                          ${project.category === CATEGORIES.D ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/10' : ''}
                        `}>
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors ml-auto" />
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No projects found matching your criteria.</p>
                        <button 
                          onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                          className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-400">
            Showing {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Modal Overlay for Booth */}
      {selectedProject && activeTab === 'booths' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-800">
                    Booth {selectedProject.booth}
                  </span>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                    <MapPin className="w-4 h-4 mr-1" /> View on map
                  </span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedProject.projectName}</h2>
              <div className="mb-8">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                    ${selectedProject.category === CATEGORIES.A ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10' : ''}
                    ${selectedProject.category === CATEGORIES.B ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10' : ''}
                    ${selectedProject.category === CATEGORIES.C ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10' : ''}
                    ${selectedProject.category === CATEGORIES.D ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/10' : ''}
                  `}>
                  {selectedProject.category}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Project Owners</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedProject.owners.map((owner, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner">
                        {owner.fullName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 truncate" title={owner.fullName}>{owner.fullName}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1 truncate" title={owner.email}>
                          <Mail className="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span className="truncate">{owner.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

