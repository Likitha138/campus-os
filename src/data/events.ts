// =========================================================
// CAMPUS OS — EVENT DATA
// =========================================================

export type EventCategory =
  | "Workshop"
  | "Seminar"
  | "Competition"
  | "Hackathon"
  | "Placement"
  | "Cultural"
  | "Sports"
  | "Other";

export type EventTarget = {
  departments?: string[];
  years?: number[];
  sections?: string[];
  interests?: string[];
  skills?: string[];
  minimumAttendance?: number;
};

export type CampusEvent = {
  id: string;
  title: string;
  description: string;
  category: EventCategory;

  date: string;
  time: string;

  venue: string;

  organizer: string;

  target: EventTarget;

  createdAt: string;

  status: "upcoming" | "live" | "completed";
};

export const campusEvents: CampusEvent[] = [
  {
    id: "EVT001",

    title: "AI & Machine Learning Workshop",

    description:
      "Hands-on workshop covering artificial intelligence, machine learning and practical model development.",

    category: "Workshop",

    date: "2026-10-20",

    time: "10:00 AM - 1:00 PM",

    venue: "Seminar Hall",

    organizer: "Computer Science Department",

    target: {
      departments: ["BCA", "MCA"],
      years: [2, 3],
      interests: ["Artificial Intelligence", "AI", "Machine Learning"],
    },

    createdAt: "2026-10-15T10:30:00",

    status: "upcoming",
  },

  {
    id: "EVT002",

    title: "Campus Hackathon 2026",

    description:
      "A 24-hour innovation challenge where students develop technology solutions for real-world problems.",

    category: "Hackathon",

    date: "2026-11-05",

    time: "9:00 AM",

    venue: "Innovation Lab",

    organizer: "Campus Innovation Cell",

    target: {
      departments: ["BCA", "MCA"],
      years: [2, 3],
      interests: ["Artificial Intelligence", "Web Development"],
      skills: ["React", "Python", "JavaScript"],
    },

    createdAt: "2026-10-15T12:00:00",

    status: "upcoming",
  },
];

export const getEventById = (
  eventId: string
): CampusEvent | undefined => {
  return campusEvents.find((event) => event.id === eventId);
};