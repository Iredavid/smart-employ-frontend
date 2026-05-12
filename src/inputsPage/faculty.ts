// ✅ Universal skills (available across all faculties)
interface ChipData {
  key: number;
  label: string;
}
export const universalSkills: ChipData[] = [
  { key: 0, label: "Communication" },
  { key: 1, label: "Research Skills" },
  { key: 2, label: "Critical Thinking" },
  { key: 3, label: "Data Analysis" },
  { key: 4, label: "Networking" },
  // "Communication",
  // "Research Skills",
  // "Critical Thinking",
  // "Data Analysis",
  // "Networking",
];

// ✅ Faculty-specific skills only
export const facultySkillsMap: Record<string, string[]> = {
  Computing: [
    "Python",
    "Java",
    "Web Development",
    "Machine Learning",
    "Cybersecurity",
    "Database Management",
    "UI/UX Design",
    // "Cloud Computing",
  ],

  Science: [
    "Laboratory Skills",
    "Statistical Analysis",
    "Technical Writing",
    // "Scientific Modelling",
    // "Experimental Design",
  ],

  Education: [
    "Teaching",
    "Counselling",
    "Classroom Management",
    "Curriculum Development",
    // "Assessment Design",
    // "Educational Technology",
  ],

  "Social Sciences": [
    "Policy Analysis",
    // "Survey Design",
    // "Behavioral Analysis",
    // "Public Administration",
    // "Sociological Analysis",
  ],

  "Management Sciences": [
    "Financial Analysis",
    "Project Management",
    "Marketing",
    "Accounting Software",
    // "Business Strategy",
    // "Risk Management",
  ],

  Arts: [
    "Writing",
    "Content Creation",
    // "Creative Design",
    // "Storytelling",
    // "Media Production",
    // "Editing",
  ],

  Agriculture: [
    "Field Work",
    "Environmental Analysis",
    // "Crop Management",
    // "Soil Analysis",
    // "Livestock Management",
    // "Agribusiness",
  ],

  "Environmental Design": [
    "GIS",
    "Urban Planning",
    // "Architectural Design",
    "Environmental Analysis",
    // "CAD Design",
    // "Spatial Analysis",
  ],

  Law: [
    "Legal Research",
    "Legal Writing",
    "Argumentation",
    // "Contract Drafting",
    // "Case Analysis",
    // "Negotiation",
  ],
};
