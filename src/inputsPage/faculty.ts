// ✅ Universal skills (available across all faculties)
interface ChipData {
  key: number;
  label: string;
}
export const universalSkills: ChipData[] = [
      { key: 0, label: 'Communication' },
    { key: 1, label: 'Research Skills' },
    { key: 2, label: 'Critical Thinking' },
    { key: 3, label: 'Data Analysis' },
    { key: 4, label: 'Networking' },
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
    "Software Engineering",
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



// // ✅ Faculty → Skills
// export  const facultySkillsMap: Record<string, string[]> = {
//   Computing: [
//     "Python", "Java", "Web Development", "Data Analysis",
//     "Machine Learning", "Cybersecurity", "Networking",
//     "Database Management", "UI/UX Design", "Research Skills",
//   ],

//   Science: [
//     "Laboratory Skills", "Research Skills",
//     "Data Analysis", "Statistical Analysis", "Technical Writing", "Networking","Communication",
//   ],

//   Education: [
//     "Teaching", "Communication", "Counselling",
//     "Classroom Management", "Curriculum Development", "Research Skills","Networking","Communication",
//   ],

//   "Social Sciences": [
//     "Data Analysis", "Research Skills",
//     "Critical Thinking", "Communication", "Policy Analysis","Networking",
//   ],

//   "Management Sciences": [
//     "Financial Analysis", "Data Analysis",
//     "Project Management", "Communication",
//     "Marketing", "Accounting Software","Networking","Communication",
//   ],

//   Arts: [
//     "Communication", "Writing",
//     "Critical Thinking", "Research Skills", "Content Creation","Networking"
//   ],

//   Agriculture: [
//     "Field Work", "Data Analysis",
//     "Research Skills", "Environmental Analysis","Networking","Communication"
//   ],

//   "Environmental Design": [
//     "GIS", "Data Analysis",
//     "Urban Planning", "Environmental Analysis","Networking","Communication"
//   ],

//   Law: [
//     "Legal Research", "Writing",
//     "Critical Thinking", "Communication", "Argumentation","Networking","Communication"
//   ]
// };