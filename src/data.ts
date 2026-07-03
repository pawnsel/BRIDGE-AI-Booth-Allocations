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

export type Project = {
  id: string;
  booth: string;
  projectName: string;
  owners: Owner[];
  category: Category;
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
