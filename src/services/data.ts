// ============================================================
// src/services/data.ts
// ============================================================

export const campusStats = {
  buildings: 24,
  rooms: 215,
  students: 3248,
  occupancy: 63,
  activeVehicles: 48,
  events: 2,
  alerts: 2,
  aqi: 42,
};

export const buildings = [
  {
    id: "BLD-A",
    name: "Block A",
    type: "Academic",
    occupancy: 68,
    status: "Operational",
  },
  {
    id: "BLD-B",
    name: "Block B",
    type: "Academic",
    occupancy: 51,
    status: "Operational",
  },
  {
    id: "BLD-C",
    name: "Block C",
    type: "Academic",
    occupancy: 37,
    status: "Operational",
  },
  {
    id: "LIB-01",
    name: "Library",
    type: "Academic Facility",
    occupancy: 82,
    status: "Operational",
  },
  {
    id: "ADM-01",
    name: "Admin Block",
    type: "Administration",
    occupancy: 59,
    status: "Operational",
  },
  {
    id: "AUD-01",
    name: "Main Auditorium",
    type: "Events",
    occupancy: 64,
    status: "Operational",
  },
];

export const vehicles = [
  {
    id: "VH-001",
    type: "Car",
    road: "Main Road",
    speed: 32,
    status: "Moving",
  },
  {
    id: "VH-002",
    type: "Bus",
    road: "East Gate",
    speed: 18,
    status: "Moving",
  },
  {
    id: "VH-003",
    type: "Bike",
    road: "Library Road",
    speed: 12,
    status: "Slow",
  },
  {
    id: "VH-004",
    type: "Car",
    road: "Parking Zone",
    speed: 0,
    status: "Stopped",
  },
  {
    id: "VH-005",
    type: "Bus",
    road: "North Road",
    speed: 24,
    status: "Moving",
  },
];

export const activityData = [
  { time: "08:00", value: 42 },
  { time: "09:00", value: 56 },
  { time: "10:00", value: 68 },
  { time: "11:00", value: 74 },
  { time: "12:00", value: 63 },
  { time: "13:00", value: 58 },
  { time: "14:00", value: 71 },
  { time: "15:00", value: 78 },
  { time: "16:00", value: 69 },
  { time: "17:00", value: 61 },
];

export const alerts = [
  {
    id: "ALT-001",
    title: "Traffic congestion detected",
    zone: "Zone C",
    severity: "High",
    time: "2 min ago",
  },
  {
    id: "ALT-002",
    title: "Library occupancy increasing",
    zone: "Library",
    severity: "Medium",
    time: "8 min ago",
  },
  {
    id: "ALT-003",
    title: "Vehicle stopped",
    zone: "Parking Zone",
    severity: "Low",
    time: "14 min ago",
  },
];

export const events = [
  {
    id: "EV-001",
    title: "Student Innovation Summit",
    location: "Main Auditorium",
    time: "10:00 AM",
    attendees: 420,
  },
  {
    id: "EV-002",
    title: "AI Workshop",
    location: "Block A",
    time: "02:00 PM",
    attendees: 180,
  },
];

export const attendanceData = [
  {
    subject: "Web Technology",
    percentage: 92,
  },
  {
    subject: "Data Analytics",
    percentage: 87,
  },
  {
    subject: "Cloud Computing",
    percentage: 81,
  },
  {
    subject: "Machine Learning",
    percentage: 89,
  },
  {
    subject: "Project",
    percentage: 96,
  },
];

export const marksData = [
  {
    subject: "Web Technology",
    internal: 42,
    total: 50,
  },
  {
    subject: "Data Analytics",
    internal: 44,
    total: 50,
  },
  {
    subject: "Cloud Computing",
    internal: 39,
    total: 50,
  },
  {
    subject: "Machine Learning",
    internal: 46,
    total: 50,
  },
  {
    subject: "Project",
    internal: 48,
    total: 50,
  },
];