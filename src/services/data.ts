import {
  activityData,
  alertsData,
  attendanceData,
  campusLocations,
  dashboardStats,
  eventsData,
  marksData,
  scenarios,
  students,
  trafficData,
  trafficVehicles,
} from "../data/campus";

export const getDemoDashboardData = () => ({
  stats: dashboardStats,
  activity: activityData,
  locations: campusLocations,
  events: eventsData,
  alerts: alertsData,
});

export const getDemoActivityData = () =>
  activityData;

export const getDemoTrafficData = () => ({
  chart: trafficData,
  vehicles: trafficVehicles,
});

export const getDemoAttendanceData = () =>
  attendanceData;

export const getDemoMarksData = () =>
  marksData;

export const getDemoStudents = () =>
  students;

export const getDemoEvents = () =>
  eventsData;

export const getDemoScenarios = () =>
  scenarios;

export const getDemoLocations = () =>
  campusLocations;