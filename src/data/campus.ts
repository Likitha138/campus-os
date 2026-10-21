export const campusStats = {
  buildings: 24,
  rooms: 215,
  students: 3248,
  occupancy: 63,
  traffic: "Moderate",
  events: 2,
  aqi: 42,
};

export const buildings = [
  {
    id: "BLD-001",
    name: "Main Academic Block",
    type: "Academic",
    floors: 4,
    rooms: 48,
    occupancy: 72,
  },
  {
    id: "BLD-002",
    name: "Central Library",
    type: "Library",
    floors: 3,
    rooms: 18,
    occupancy: 81,
  },
  {
    id: "BLD-003",
    name: "Science & Innovation Block",
    type: "Laboratory",
    floors: 4,
    rooms: 36,
    occupancy: 58,
  },
  {
    id: "BLD-004",
    name: "Administration Block",
    type: "Administration",
    floors: 3,
    rooms: 24,
    occupancy: 45,
  },
];

export const activityData = [
  { time: "08 AM", students: 420 },
  { time: "09 AM", students: 980 },
  { time: "10 AM", students: 1420 },
  { time: "11 AM", students: 1760 },
  { time: "12 PM", students: 1510 },
  { time: "01 PM", students: 1120 },
  { time: "02 PM", students: 1680 },
  { time: "03 PM", students: 1910 },
  { time: "04 PM", students: 1240 },
];

export const trafficData = [
  { zone: "North Gate", vehicles: 84, status: "High" },
  { zone: "Main Road", vehicles: 63, status: "Moderate" },
  { zone: "Library Road", vehicles: 41, status: "Low" },
  { zone: "Admin Road", vehicles: 29, status: "Low" },
];

export const rooms = [
  { room: "A-101", building: "Main Block", capacity: 60, occupancy: 47 },
  { room: "A-204", building: "Main Block", capacity: 50, occupancy: 32 },
  { room: "LAB-03", building: "Science Block", capacity: 40, occupancy: 35 },
  { room: "LIB-12", building: "Library", capacity: 30, occupancy: 24 },
];