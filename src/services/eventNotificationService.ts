// =========================================================
// CAMPUS OS
// EVENT → STUDENT IDENTIFICATION → NOTIFICATION SERVICE
// =========================================================

import type { CampusEvent } from "../data/events";
import type { Student } from "../data/students";

export type EventMatchReason = {
  type:
    | "department"
    | "year"
    | "section"
    | "interest"
    | "skill"
    | "attendance";

  message: string;
};

export type EventMatch = {
  student: Student;

  matched: boolean;

  score: number;

  reasons: EventMatchReason[];
};

export type StudentNotification = {
  id: string;

  studentId: string;

  eventId: string;

  title: string;

  message: string;

  type: "event";

  read: boolean;

  createdAt: string;
};

// ---------------------------------------------------------
// HELPER
// ---------------------------------------------------------

const normalize = (value: string) =>
  value.trim().toLowerCase();

// ---------------------------------------------------------
// CHECK EVENT ELIGIBILITY
// ---------------------------------------------------------

export const identifyStudentForEvent = (
  student: Student,
  event: CampusEvent
): EventMatch => {
  const reasons: EventMatchReason[] = [];

  let score = 0;

  const target = event.target;

  // -------------------------------------------------------
  // DEPARTMENT
  // -------------------------------------------------------

  if (
    target.departments &&
    target.departments.length > 0
  ) {
    const departmentMatch =
      target.departments.some(
        (department) =>
          normalize(department) ===
          normalize(student.department)
      );

    if (!departmentMatch) {
      return {
        student,
        matched: false,
        score: 0,
        reasons: [],
      };
    }

    score += 25;

    reasons.push({
      type: "department",

      message: `Department: ${student.department}`,
    });
  }

  // -------------------------------------------------------
  // YEAR
  // -------------------------------------------------------

  if (
    target.years &&
    target.years.length > 0
  ) {
    const yearMatch =
      target.years.includes(student.year);

    if (!yearMatch) {
      return {
        student,
        matched: false,
        score: 0,
        reasons: [],
      };
    }

    score += 20;

    reasons.push({
      type: "year",

      message: `Year: ${student.year}`,
    });
  }

  // -------------------------------------------------------
  // SECTION
  // -------------------------------------------------------

  if (
    target.sections &&
    target.sections.length > 0
  ) {
    const sectionMatch =
      target.sections.some(
        (section) =>
          normalize(section) ===
          normalize(student.section)
      );

    if (!sectionMatch) {
      return {
        student,
        matched: false,
        score: 0,
        reasons: [],
      };
    }

    score += 10;

    reasons.push({
      type: "section",

      message: `Section: ${student.section}`,
    });
  }

  // -------------------------------------------------------
  // INTEREST
  // -------------------------------------------------------

  if (
    target.interests &&
    target.interests.length > 0
  ) {
    const matchingInterests =
      student.interests.filter((studentInterest) =>
        target.interests!.some(
          (targetInterest) =>
            normalize(studentInterest) ===
            normalize(targetInterest)
        )
      );

    if (matchingInterests.length > 0) {
      score += Math.min(
        matchingInterests.length * 10,
        25
      );

      reasons.push({
        type: "interest",

        message: `Interest match: ${matchingInterests.join(
          ", "
        )}`,
      });
    }
  }

  // -------------------------------------------------------
  // SKILLS
  // -------------------------------------------------------

  if (
    target.skills &&
    target.skills.length > 0
  ) {
    const matchingSkills =
      student.skills.filter((studentSkill) =>
        target.skills!.some(
          (targetSkill) =>
            normalize(studentSkill) ===
            normalize(targetSkill)
        )
      );

    if (matchingSkills.length > 0) {
      score += Math.min(
        matchingSkills.length * 8,
        20
      );

      reasons.push({
        type: "skill",

        message: `Skill match: ${matchingSkills.join(
          ", "
        )}`,
      });
    }
  }

  // -------------------------------------------------------
  // ATTENDANCE
  // -------------------------------------------------------

  if (
    target.minimumAttendance !== undefined
  ) {
    if (
      student.attendance <
      target.minimumAttendance
    ) {
      return {
        student,
        matched: false,
        score: 0,
        reasons: [],
      };
    }

    score += 10;

    reasons.push({
      type: "attendance",

      message: `Attendance: ${student.attendance}%`,
    });
  }

  // -------------------------------------------------------
  // FINAL MATCH
  // -------------------------------------------------------

  return {
    student,

    matched: reasons.length > 0,

    score: Math.min(score, 100),

    reasons,
  };
};

// ---------------------------------------------------------
// IDENTIFY ALL ELIGIBLE STUDENTS
// ---------------------------------------------------------

export const identifyEligibleStudents = (
  students: Student[],
  event: CampusEvent
): EventMatch[] => {
  return students
    .map((student) =>
      identifyStudentForEvent(
        student,
        event
      )
    )
    .filter((match) => match.matched)
    .sort(
      (a, b) =>
        b.score - a.score
    );
};

// ---------------------------------------------------------
// CREATE NOTIFICATIONS
// ---------------------------------------------------------

export const createEventNotifications = (
  students: Student[],
  event: CampusEvent
): StudentNotification[] => {
  const eligibleStudents =
    identifyEligibleStudents(
      students,
      event
    );

  return eligibleStudents.map(
    (match) => ({
      id: `NOTIF-${event.id}-${match.student.id}`,

      studentId: match.student.id,

      eventId: event.id,

      title: `New Event: ${event.title}`,

      message:
        `You have been identified as an eligible student for ${event.title}. ` +
        `The event will be held at ${event.venue} on ${event.date}.`,

      type: "event",

      read: false,

      createdAt:
        new Date().toISOString(),
    })
  );
};