// =========================================================
// CAMPUS OS — STUDENT DATA
// Students used by the event-identification system
// =========================================================

export type Student = {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  semester: number;
  section: string;
  interests: string[];
  attendance: number;
  skills: string[];
};

export const students: Student[] = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    email: "aarav@campusos.edu",
    department: "BCA",
    year: 3,
    semester: 6,
    section: "A",
    interests: ["Artificial Intelligence", "Web Development", "Data Science"],
    attendance: 86,
    skills: ["React", "JavaScript", "Python"],
  },

  {
    id: "STU002",
    name: "Ananya Rao",
    email: "ananya@campusos.edu",
    department: "BCA",
    year: 3,
    semester: 6,
    section: "A",
    interests: ["AI", "Machine Learning", "Data Science"],
    attendance: 91,
    skills: ["Python", "SQL", "Machine Learning"],
  },

  {
    id: "STU003",
    name: "Rahul Kumar",
    email: "rahul@campusos.edu",
    department: "BCA",
    year: 2,
    semester: 4,
    section: "B",
    interests: ["Cyber Security", "Networking"],
    attendance: 78,
    skills: ["Linux", "Networking"],
  },

  {
    id: "STU004",
    name: "Sneha Patil",
    email: "sneha@campusos.edu",
    department: "BCA",
    year: 3,
    semester: 6,
    section: "B",
    interests: ["Web Development", "UI/UX", "AI"],
    attendance: 88,
    skills: ["React", "Figma", "TypeScript"],
  },

  {
    id: "STU005",
    name: "Vikram Singh",
    email: "vikram@campusos.edu",
    department: "MCA",
    year: 1,
    semester: 2,
    section: "A",
    interests: ["Artificial Intelligence", "Cloud Computing"],
    attendance: 83,
    skills: ["Python", "AWS"],
  },

  {
    id: "STU006",
    name: "Pooja Gowda",
    email: "pooja@campusos.edu",
    department: "BCA",
    year: 3,
    semester: 6,
    section: "A",
    interests: ["Data Science", "Artificial Intelligence"],
    attendance: 94,
    skills: ["Python", "Pandas", "SQL"],
  },

  {
    id: "STU007",
    name: "Karthik R",
    email: "karthik@campusos.edu",
    department: "BBA",
    year: 2,
    semester: 4,
    section: "A",
    interests: ["Entrepreneurship", "Marketing"],
    attendance: 81,
    skills: ["Marketing", "Excel"],
  },

  {
    id: "STU008",
    name: "Meghana S",
    email: "meghana@campusos.edu",
    department: "BCA",
    year: 1,
    semester: 2,
    section: "B",
    interests: ["Programming", "Web Development"],
    attendance: 89,
    skills: ["HTML", "CSS", "JavaScript"],
  },
];