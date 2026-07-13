export const CATEGORIES = {
  A: "Medical Education",
  B: "Clinical",
  C: "Digital Technology",
  D: "Medical AI"
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export type Owner = {
  fullName: string;
  email: string;
};

export type AwardType = 'GOLD' | 'SILVER' | 'BRONZE' | 'HONORABLE_MENTION' | 'POPULAR_VOTE' | 'NONE';

export type Project = {
  id: string;
  booth: string;
  projectName: string;
  owners: Owner[];
  category: Category;
  award: AwardType;
  institution: string;
  country: string;
  abstract?: string;
};

export const MOCK_PROJECTS: Project[] = [
  { 
    id: "TH4936", 
    booth: "A01", 
    projectName: "AuraBoost: Hybrid AI ecosystem platform for proactive mental wellness of caregivers", 
    owners: [
      { fullName: "P. Tansawai", email: "p.t@example.com" }, 
      { fullName: "T. Tipoud", email: "t.t@example.com" }, 
      { fullName: "P. Chomchey", email: "p.c@example.com" }, 
      { fullName: "P. Udanuta", email: "p.u@example.com" }, 
      { fullName: "Sanong E.", email: "s.e@example.com" }
    ], 
    category: CATEGORIES.A,
    award: 'SILVER',
    institution: "Chulalongkorn University",
    country: "Thailand",
    abstract: "AuraBoost leverages multi-modal AI to analyze stress indicators in caregivers, providing timely interventions and personalized wellness plans to prevent burnout."
  },
  { 
    id: "SG1024", 
    booth: "B01", 
    projectName: "Rapid Sepsis Detection Kit", 
    owners: [{ fullName: "Dr. Arak Tanti", email: "arak.t@medcenter.co.th" }, { fullName: "Dr. Bordin Sirisuk", email: "bordin.s@medcenter.co.th" }], 
    category: CATEGORIES.B,
    award: 'GOLD',
    institution: "National University of Singapore",
    country: "Singapore",
    abstract: "A point-of-care testing kit that detects sepsis biomarkers in whole blood within 15 minutes, significantly improving patient outcomes in critical care."
  },
  { 
    id: "JP8821", 
    booth: "C01", 
    projectName: "Telemedicine Platform for Rural Areas", 
    owners: [{ fullName: "Yaya Urassaya", email: "yaya.u@telemed.org" }, { fullName: "Mario Maurer", email: "mario.m@telemed.org" }], 
    category: CATEGORIES.C,
    award: 'POPULAR_VOTE',
    institution: "University of Tokyo",
    country: "Japan",
    abstract: "An ultra-low bandwidth telemedicine platform designed for remote areas, featuring AI-assisted diagnosis and real-time vital sign monitoring."
  },
  { 
    id: "TH2049", 
    booth: "D01", 
    projectName: "AI-Powered MRI Analysis", 
    owners: [{ fullName: "Sunny Suwanmethanont", email: "sunny.s@aimed.com" }, { fullName: "Ter Chantavit", email: "ter.c@aimed.com" }], 
    category: CATEGORIES.D,
    award: 'HONORABLE_MENTION',
    institution: "Mahidol University",
    country: "Thailand",
    abstract: "Deep learning models capable of identifying micro-lesions in MRI scans 40% faster than traditional methods, aiding in early disease detection."
  },
  { 
    id: "US5531", 
    booth: "A02", 
    projectName: "Interactive CPR Training Dummy", 
    owners: [{ fullName: "Piti Wong", email: "piti.w@university.edu" }, { fullName: "Chujai Kij", email: "chujai.k@university.edu" }], 
    category: CATEGORIES.A,
    award: 'BRONZE',
    institution: "Stanford University",
    country: "USA"
  },
  { 
    id: "UK9912", 
    booth: "C02", 
    projectName: "Blockchain Health Records", 
    owners: [{ fullName: "Baifern Pimchanok", email: "baifern.p@blockchain.io" }], 
    category: CATEGORIES.C,
    award: 'NONE',
    institution: "Oxford University",
    country: "UK"
  }
];
