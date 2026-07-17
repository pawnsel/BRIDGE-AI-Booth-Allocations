export const CATEGORIES = {
  A: "Medical Education",
  B: "Clinical",
  C: "Digital Technology",
  D: "Medical AI"
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const DIVISIONS = {
  RISING: "Rising Innovator (High School / Undergraduate)",
  ADVANCED: "Advanced Innovator (Graduate / Medical Resident)"
} as const;

export type Division = typeof DIVISIONS[keyof typeof DIVISIONS];

export const AWARD_TYPES = {
  GRAND_PRIZE: "GRAND PRIZE",
  GOLD: "GOLD MEDAL",
  SILVER: "SILVER MEDAL",
  BRONZE: "BRONZE MEDAL",
  SPECIAL: "SPECIAL AWARD"
} as const;

export type AwardType = typeof AWARD_TYPES[keyof typeof AWARD_TYPES];

export type Owner = {
  fullName: string;
  email: string;
};

export type Project = {
  id: string;
  booth: string;
  projectName: string;
  owners: Owner[];
  category: Category;
};

export type Award = {
  id: string;
  division: Division;
  category: Category;
  awardType: AwardType;
  projectId?: string; // Optional, can link to a project or be empty if not announced yet
  winnerName?: string;
};

export const MOCK_PROJECTS: Project[] = [
  { id: "1", booth: "A01", projectName: "NextGen Anatomy VR", owners: [{ fullName: "Somchai Sripasert", email: "somchai.s@hospital.com" }, { fullName: "Manee Phrom", email: "manee.p@hospital.com" }], category: CATEGORIES.A },
  { id: "2", booth: "A02", projectName: "Interactive CPR Training Dummy", owners: [{ fullName: "Piti Wong", email: "piti.w@university.edu" }, { fullName: "Chujai Kij", email: "chujai.k@university.edu" }, { fullName: "Anan Boon", email: "anan.b@university.edu" }], category: CATEGORIES.A },
  { id: "3", booth: "A03", projectName: "Gamified Pediatrics Learning App", owners: [{ fullName: "Bella Rattanapong", email: "bella.r@clinic.org" }], category: CATEGORIES.A },
  { id: "4", booth: "B01", projectName: "Rapid Sepsis Detection Kit", owners: [{ fullName: "Dr. Arak Tanti", email: "arak.t@medcenter.co.th" }, { fullName: "Dr. Bordin Sirisuk", email: "bordin.s@medcenter.co.th" }], category: CATEGORIES.B },
  { id: "5", booth: "B02", projectName: "Portable ECG Monitor", owners: [{ fullName: "Nadech Kugimiya", email: "nadech.k@healthtech.com" }], category: CATEGORIES.B },
  { id: "6", booth: "B03", projectName: "Smart IV Drip Controller", owners: [{ fullName: "Pope Thanavat", email: "pope.t@hospital.com" }, { fullName: "Mew Nittha", email: "mew.n@hospital.com" }], category: CATEGORIES.B },
  { id: "7", booth: "C01", projectName: "Telemedicine Platform for Rural Areas", owners: [{ fullName: "Yaya Urassaya", email: "yaya.u@telemed.org" }, { fullName: "Mario Maurer", email: "mario.m@telemed.org" }, { fullName: "Weir Sukollawat", email: "weir.s@telemed.org" }], category: CATEGORIES.C },
  { id: "8", booth: "C02", projectName: "Blockchain Health Records", owners: [{ fullName: "Baifern Pimchanok", email: "baifern.p@blockchain.io" }], category: CATEGORIES.C },
  { id: "9", booth: "C03", projectName: "IoT Smart Hospital Bed", owners: [{ fullName: "James Jirayu", email: "james.j@iothealth.com" }, { fullName: "Taew Natapohn", email: "taew.n@iothealth.com" }], category: CATEGORIES.C },
  { id: "10", booth: "D01", projectName: "AI-Powered MRI Analysis", owners: [{ fullName: "Sunny Suwanmethanont", email: "sunny.s@aimed.com" }, { fullName: "Ter Chantavit", email: "ter.c@aimed.com" }], category: CATEGORIES.D },
  { id: "11", booth: "D02", projectName: "Predictive Analytics for Patient Readmission", owners: [{ fullName: "Mai Davika", email: "mai.d@analytics.co.th" }, { fullName: "Mark Prin", email: "mark.p@analytics.co.th" }, { fullName: "Kimberley Anne", email: "kimberley.a@analytics.co.th" }], category: CATEGORIES.D },
  { id: "12", booth: "D03", projectName: "Chatbot for Mental Health Triage", owners: [{ fullName: "Tor Thanapob", email: "tor.t@chatbot.net" }], category: CATEGORIES.D },
];

// Generate 40 awards automatically based on Divisions and Categories and Award Types
export const AWARDS: Award[] = (() => {
  const awards: Award[] = [];
  const awardOrder = [
    AWARD_TYPES.GRAND_PRIZE,
    AWARD_TYPES.GOLD,
    AWARD_TYPES.SILVER,
    AWARD_TYPES.BRONZE,
    AWARD_TYPES.SPECIAL
  ];
  
  let idCounter = 1;
  Object.values(DIVISIONS).forEach(division => {
    Object.values(CATEGORIES).forEach(category => {
      // Find projects in this category to use as mock winners
      const categoryProjects = MOCK_PROJECTS.filter(p => p.category === category);
      
      awardOrder.forEach((awardType, index) => {
        // Pick a project based on index, loop around if not enough projects
        const mockProject = categoryProjects.length > 0 ? categoryProjects[index % categoryProjects.length] : undefined;
        
        awards.push({
          id: `awd-${idCounter++}`,
          division,
          category,
          awardType,
          projectId: mockProject?.id,
          winnerName: mockProject ? `${mockProject.projectName} (${mockProject.owners.map(o => o.fullName).join(', ')})` : "To be announced..."
        });
      });
    });
  });
  return awards;
})();

