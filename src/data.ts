export const CATEGORIES = {
  A: "Medical Education",
  B: "Clinical",
  C: "Digital Technology",
  D: "Medical AI"
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export type Project = {
  id: string;
  booth: string;
  projectName: string;
  owners: string[];
  category: Category;
};

export const MOCK_PROJECTS: Project[] = [
  { id: "1", booth: "A01", projectName: "NextGen Anatomy VR", owners: ["Somchai S.", "Manee P."], category: CATEGORIES.A },
  { id: "2", booth: "A02", projectName: "Interactive CPR Training Dummy", owners: ["Piti W.", "Chujai K.", "Anan B."], category: CATEGORIES.A },
  { id: "3", booth: "A03", projectName: "Gamified Pediatrics Learning App", owners: ["Bella R."], category: CATEGORIES.A },
  { id: "4", booth: "B01", projectName: "Rapid Sepsis Detection Kit", owners: ["Dr. Arak T.", "Dr. Bordin S."], category: CATEGORIES.B },
  { id: "5", booth: "B02", projectName: "Portable ECG Monitor", owners: ["Nadech K."], category: CATEGORIES.B },
  { id: "6", booth: "B03", projectName: "Smart IV Drip Controller", owners: ["Pope T.", "Mew N."], category: CATEGORIES.B },
  { id: "7", booth: "C01", projectName: "Telemedicine Platform for Rural Areas", owners: ["Yaya U.", "Mario M.", "Weir S."], category: CATEGORIES.C },
  { id: "8", booth: "C02", projectName: "Blockchain Health Records", owners: ["Baifern P."], category: CATEGORIES.C },
  { id: "9", booth: "C03", projectName: "IoT Smart Hospital Bed", owners: ["James J.", "Taew N."], category: CATEGORIES.C },
  { id: "10", booth: "D01", projectName: "AI-Powered MRI Analysis", owners: ["Sunny S.", "Ter C."], category: CATEGORIES.D },
  { id: "11", booth: "D02", projectName: "Predictive Analytics for Patient Readmission", owners: ["Mai D.", "Mark P.", "Kimberley A."], category: CATEGORIES.D },
  { id: "12", booth: "D03", projectName: "Chatbot for Mental Health Triage", owners: ["Tor T."], category: CATEGORIES.D },
];
