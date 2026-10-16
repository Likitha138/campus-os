import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Save,
  CheckCircle2,
} from "lucide-react";

function Settings() {
  const [name, setName] = useState("Likitha");
  const [email, setEmail] = useState("student@campusos.edu");
  const [course, setCourse] = useState("BCA");
  const [semester, setSemester] = useState("6th Semester");
  const [notifications, setNotifications] =
    useState("All Notifications");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">
        <div>
          <div className="settings-eyebrow">
            CAMPUS OS
          </div>

          <h1>Settings</h1>

          <p>
            Manage your Campus OS profile and preferences.
          </p>
        </div>
      </div>


      {/* SETTINGS GRID */}

      <div className="settings-grid">

        {/* PROFILE */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <User size={22} />
            </div>

            <div>
              <h2>Student Profile</h2>

              <p>
                Update your academic profile information.
              </p>
            </div>

          </div>


          <div className="settings-form">

            <div className="settings-field">

              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>


            <div className="settings-field">

              <label>Student ID</label>

              <input
                type="text"
                value="STU2026001"
                disabled
              />

            </div>


            <div className="settings-field">

              <label>Course</label>

              <input
                type="text"
                value={course}
                onChange={(e) =>
                  setCourse(e.target.value)
                }
              />

            </div>


            <div className="settings-field">

              <label>Semester</label>

              <input
                type="text"
                value={semester}
                onChange={(e) =>
                  setSemester(e.target.value)
                }
              />

            </div>


            <div className="settings-field">

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            <div className="settings-field">

              <label>
                Notification Preference
              </label>

              <select
                value={notifications}
                onChange={(e) =>
                  setNotifications(e.target.value)
                }
              >

                <option>
                  All Notifications
                </option>

                <option>
                  Important Only
                </option>

                <option>
                  Attendance Alerts
                </option>

                <option>
                  No Notifications
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* ACCOUNT */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <Shield size={22} />
            </div>

            <div>
              <h2>Account Information</h2>

              <p>
                Your Campus OS account details.
              </p>
            </div>

          </div>


          <div className="account-details">

            <div className="account-row">

              <span>Account Status</span>

              <strong className="status-active">
                Active
              </strong>

            </div>


            <div className="account-row">

              <span>User Role</span>

              <strong>
                Student
              </strong>

            </div>


            <div className="account-row">

              <span>Access Level</span>

              <strong>
                Standard
              </strong>

            </div>


            <div className="account-row">

              <span>Campus</span>

              <strong>
                Campus OS
              </strong>

            </div>

          </div>

        </section>


        {/* NOTIFICATIONS */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              <Bell size={22} />
            </div>

            <div>
              <h2>Notification Settings</h2>

              <p>
                Control how Campus OS notifies you.
              </p>
            </div>

          </div>


          <div className="notification-options">

            <label className="notification-option">

              <div>
                <strong>
                  Attendance Alerts
                </strong>

                <span>
                  Get notified when attendance
                  falls below the required percentage.
                </span>
              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="notification-option">

              <div>
                <strong>
                  Assignment Reminders
                </strong>

                <span>
                  Receive reminders about upcoming
                  assignments.
                </span>
              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="notification-option">

              <div>
                <strong>
                  Campus Events
                </strong>

                <span>
                  Receive notifications about
                  campus events.
                </span>
              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>

          </div>

        </section>

      </div>


      {/* SAVE AREA */}

      <div className="settings-actions">

        {saved && (
          <div className="settings-saved">

            <CheckCircle2 size={18} />

            Changes saved successfully.

          </div>
        )}


        <button
          type="button"
          className="settings-save-button"
          onClick={handleSave}
        >

          <Save size={18} />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default Settings;