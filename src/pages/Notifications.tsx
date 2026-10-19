// =========================================================
// CAMPUS OS — STUDENT NOTIFICATIONS PAGE
// =========================================================

import {
  useMemo,
  useState,
} from "react";

import {
  Bell,
  CalendarDays,
  CheckCheck,
  MapPin,
  Users,
} from "lucide-react";

import {
  campusEvents,
} from "../data/events";

import {
  students,
} from "../data/students";

import {
  createEventNotifications,
  type StudentNotification,
} from "../services/eventNotificationService";

import EventNotificationPanel from "../components/EventNotificationPanel";

export default function Notifications() {
  // Demo student.
  //
  // Replace this later with the currently
  // authenticated Campus OS student ID.

  const currentStudentId =
    "STU001";

  const [readNotifications, setReadNotifications] =
    useState<string[]>([]);

  const notifications =
    useMemo(() => {
      const allNotifications =
        campusEvents.flatMap(
          (event) =>
            createEventNotifications(
              students,
              event
            )
        );

      return allNotifications
        .filter(
          (notification) =>
            notification.studentId ===
            currentStudentId
        )
        .map(
          (notification) => ({
            ...notification,

            read:
              readNotifications.includes(
                notification.id
              ),
          })
        );
    }, [readNotifications]);

  const markRead = (
    notificationId: string
  ) => {
    setReadNotifications(
      (current) => [
        ...current,
        notificationId,
      ]
    );
  };

  const openEvent = (
    eventId: string
  ) => {
    const event =
      campusEvents.find(
        (item) =>
          item.id === eventId
      );

    if (!event) {
      return;
    }

    alert(
      `${event.title}\n\n` +
        `Date: ${event.date}\n` +
        `Time: ${event.time}\n` +
        `Venue: ${event.venue}`
    );
  };

  return (
    <div className="notifications-page">
      {/* HEADER */}

      <div className="notifications-page-header">
        <div>
          <span>
            CAMPUS OS / STUDENT CENTER
          </span>

          <h1>
            Notifications
          </h1>

          <p>
            Important campus updates
            identified specifically for you.
          </p>
        </div>

        <div className="notification-header-icon">
          <Bell size={20} />
        </div>
      </div>

      {/* QUICK SUMMARY */}

      <div className="notification-summary">
        <div>
          <div>
            <Bell size={16} />
          </div>

          <section>
            <strong>
              {
                notifications.filter(
                  (item) =>
                    !item.read
                ).length
              }
            </strong>

            <span>
              Unread
            </span>
          </section>
        </div>

        <div>
          <div>
            <CalendarDays size={16} />
          </div>

          <section>
            <strong>
              {
                notifications.length
              }
            </strong>

            <span>
              Event Alerts
            </span>
          </section>
        </div>

        <div>
          <div>
            <Users size={16} />
          </div>

          <section>
            <strong>
              Personalized
            </strong>

            <span>
              Student Targeting
            </span>
          </section>
        </div>
      </div>

      {/* NOTIFICATIONS */}

      <EventNotificationPanel
        notifications={
          notifications
        }
        onMarkRead={
          markRead
        }
        onOpenEvent={
          openEvent
        }
      />
    </div>
  );
}