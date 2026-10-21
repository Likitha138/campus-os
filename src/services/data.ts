import { students } from "../data/students";
import { events } from "../data/events";
import { buildings } from "../data/campus";

export const dataService = {
  getStudents: () => students,

  getEvents: () => events,

  getBuildings: () => buildings,

  getStudentById: (id: string) =>
    students.find((student) => student.id === id),

  getEventById: (id: string) =>
    events.find((event) => event.id === id),
};