export type CampusLocation = {
  id: string;
  name: string;
  type: string;
  zone: string;
  occupancy: number;
  capacity: number;
  status: "Open" | "Busy" | "Restricted" | "Closed";
  x: number;
  y: number;
};

export const campusLocations: CampusLocation[] = [
  {
    id: "BLD-001",
    name: "Main Academic Block",
    type: "Academic",
    zone: "Zone A",
    occupancy: 72,
    capacity: 850,
    status: "Busy",
    x: 35,
    y: 36,
  },
  {
    id: "BLD-002",
    name: "Central Library",
    type: "Library",
    zone: "Zone B",
    occupancy: 58,
    capacity: 420,
    status: "Open",
    x: 63,
    y: 31,
  },
  {
    id: "BLD-003",
    name: "Computer Science Block",
    type: "Academic",
    zone: "Zone A",
    occupancy: 81,
    capacity: 600,
    status: "Busy",
    x: 30,
    y: 64,
  },
  {
    id: "BLD-004",
    name: "Administration Block",
    type: "Administration",
    zone: "Zone C",
    occupancy: 42,
    capacity: 260,
    status: "Open",
    x: 72,
    y: 62,
  },
  {
    id: "BLD-005",
    name: "Auditorium",
    type: "Events",
    zone: "Zone B",
    occupancy: 29,
    capacity: 1000,
    status: "Open",
    x: 55,
    y: 72,
  },
  {
    id: "BLD-006",
    name: "Sports Complex",
    type: "Sports",
    zone: "Zone D",
    occupancy: 64,
    capacity: 700,
    status: "Busy",
    x: 83,
    y: 37,
  },
];

export const dashboardStats = [
  {
    label: "Active Students",
    value: "3,248",
    change: "+8.4%",
    trend: "up",
  },
  {
    label: "Campus Occupancy",
    value: "63%",
    change: "+4.2%",
    trend: "up",
  },
  {
    label: "Traffic Load",
    value: "Moderate",
    change: "12 roads",
    trend: "neutral",
  },
  {
    label: "Events Today",
    value: "06",
    change: "+2 scheduled",
    trend: "up",
  },
];

export const activityData = [
  { time: "08:00", students: 820, occupancy: 28 },
  { time: "09:00", students: 1420, occupancy: 42 },
  { time: "10:00", students: 2180, occupancy: 61 },
  { time: "11:00", students: 2640, occupancy: 72 },
  { time: "12:00", students: 2980, occupancy: 81 },
  { time: "13:00", students: 2520, occupancy: 69 },
  { time: "14:00", students: 2240, occupancy: 63 },
  { time: "15:00", students: 2760, occupancy: 75 },
  { time: "16:00", students: 3040, occupancy: 83 },
  { time: "17:00", students: 1880, occupancy: 51 },
];

export const trafficData = [
  { time: "08:00", congestion: 31 },
  { time: "09:00", congestion: 48 },
  { time: "10:00", congestion: 56 },
  { time: "11:00", congestion: 62 },
  { time: "12:00", congestion: 45 },
  { time: "13:00", congestion: 39 },
  { time: "14:00", congestion: 52 },
  { time: "15:00", congestion: 68 },
  { time: "16:00", congestion: 74 },
  { time: "17:00", congestion: 59 },
];

export const attendanceData = [
  { subject: "Data Analytics", attended: 44, total: 48 },
  { subject: "Web Technology", attended: 41, total: 48 },
  { subject: "Cloud Computing", attended: 39, total: 45 },
  { subject: "Software Engineering", attended: 43, total: 47 },
  { subject: "AI & ML", attended: 37, total: 46 },
];

export const marksData = [
  { subject: "Data Analytics", internal: 38, assignment: 18, exam: 42 },
  { subject: "Web Technology", internal: 35, assignment: 17, exam: 39 },
  { subject: "Cloud Computing", internal: 36, assignment: 19, exam: 41 },
  { subject: "Software Engineering", internal: 40, assignment: 18, exam: 44 },
  { subject: "AI & ML", internal: 34, assignment: 17, exam: 38 },
];

export const eventsData = [
  {
    id: "EV-001",
    title: "Annual Tech Fest",
    location: "Auditorium",
    date: "20 Oct 2026",
    time: "10:00 AM",
    attendees: 850,
    status: "Upcoming",
  },
  {
    id: "EV-002",
    title: "Placement Drive",
    location: "Main Academic Block",
    date: "22 Oct 2026",
    time: "09:30 AM",
    attendees: 420,
    status: "Confirmed",
  },
  {
    id: "EV-003",
    title: "Sports Meet",
    location: "Sports Complex",
    date: "25 Oct 2026",
    time: "08:00 AM",
    attendees: 620,
    status: "Planning",
  },
];

export const alertsData = [
  {
    id: "ALT-001",
    title: "Low attendance detected",
    description: "AI & ML attendance has fallen below the recommended threshold.",
    severity: "High",
    time: "12 min ago",
  },
  {
    id: "ALT-002",
    title: "Traffic congestion",
    description: "North campus road is experiencing increased simulated congestion.",
    severity: "Medium",
    time: "28 min ago",
  },
  {
    id: "ALT-003",
    title: "Event capacity warning",
    description: "Annual Tech Fest registration is approaching venue capacity.",
    severity: "Medium",
    time: "46 min ago",
  },
  {
    id: "ALT-004",
    title: "Environment monitor",
    description: "AQI remains within the simulated safe range.",
    severity: "Low",
    time: "1 hr ago",
  },
];

export const scenarios = [
  {
    name: "Normal Campus Day",
    description: "Regular academic activity and moderate traffic.",
    occupancy: 63,
    traffic: 48,
    events: 2,
  },
  {
    name: "Annual Tech Fest",
    description: "High auditorium occupancy with event traffic.",
    occupancy: 82,
    traffic: 76,
    events: 6,
  },
  {
    name: "Examination Day",
    description: "High academic block occupancy with reduced event traffic.",
    occupancy: 91,
    traffic: 54,
    events: 1,
  },
  {
    name: "Heavy Rain",
    description: "Reduced road movement and higher indoor occupancy.",
    occupancy: 78,
    traffic: 68,
    events: 0,
  },
  {
    name: "Emergency Drill",
    description: "Affected zone, blocked road and evacuation simulation.",
    occupancy: 46,
    traffic: 34,
    events: 1,
  },
  {
    name: "Campus 2030",
    description: "Future-campus infrastructure planning scenario.",
    occupancy: 71,
    traffic: 38,
    events: 4,
  },
];

export const students = [
  {
    id: "STU-1001",
    name: "Aarav Kumar",
    department: "Computer Science",
    year: "III Year",
    attendance: 91,
    performance: 86,
    risk: "Low",
  },
  {
    id: "STU-1002",
    name: "Ananya Rao",
    department: "Data Science",
    year: "III Year",
    attendance: 87,
    performance: 91,
    risk: "Low",
  },
  {
    id: "STU-1003",
    name: "Rahul Sharma",
    department: "Computer Science",
    year: "II Year",
    attendance: 68,
    performance: 61,
    risk: "Medium",
  },
  {
    id: "STU-1004",
    name: "Meera N",
    department: "Information Science",
    year: "III Year",
    attendance: 74,
    performance: 69,
    risk: "Medium",
  },
  {
    id: "STU-1005",
    name: "Vikram R",
    department: "Data Science",
    year: "II Year",
    attendance: 59,
    performance: 54,
    risk: "High",
  },
];

export const trafficVehicles = [
  {
    id: "VH-001",
    type: "Car",
    road: "North Gate Road",
    speed: 28,
    status: "Moving",
  },
  {
    id: "VH-002",
    type: "Bus",
    road: "Central Avenue",
    speed: 17,
    status: "Slow",
  },
  {
    id: "VH-003",
    type: "Bike",
    road: "Library Road",
    speed: 31,
    status: "Moving",
  },
  {
    id: "VH-004",
    type: "Car",
    road: "Sports Road",
    speed: 8,
    status: "Stopped",
  },
];

export const notifications = [
  {
    title: "Annual Tech Fest",
    text: "Venue preparation begins tomorrow.",
    time: "10 min ago",
    unread: true,
  },
  {
    title: "Attendance alert",
    text: "3 students require attendance review.",
    time: "35 min ago",
    unread: true,
  },
  {
    title: "Traffic simulation",
    text: "North road congestion has increased.",
    time: "1 hr ago",
    unread: false,
  },
];