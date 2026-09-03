import { Save, User } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { student } from "../services/data";

function Settings() {
  const handleSave = () => {
    alert("Profile changes saved successfully!");
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Manage your Campus OS profile and preferences."
      />

      {/* Student Profile Card */}
      <div className="glass-card chart-card">

        {/* Card Header */}
        <div className="stat-top">
          <div>
            <h2 className="section-title">
              Student Profile
            </h2>

            <p className="stat-label">
              Update your academic profile information.
            </p>
          </div>

          <div className="stat-icon">
            <User size={21} />
          </div>
        </div>

        {/* Form */}
        <div className="form-grid">

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="student-name">
              Full Name
            </label>

            <input
              id="student-name"
              type="text"
              defaultValue={student.name}
              placeholder="Enter your full name"
            />
          </div>

          {/* Student ID */}
          <div className="form-group">
            <label htmlFor="student-id">
              Student ID
            </label>

            <input
              id="student-id"
              type="text"
              defaultValue={student.id}
              disabled
            />
          </div>

          {/* Course */}
          <div className="form-group">
            <label htmlFor="course">
              Course
            </label>

            <input
              id="course"
              type="text"
              defaultValue={student.course}
              placeholder="Enter your course"
            />
          </div>

          {/* Semester */}
          <div className="form-group">
            <label htmlFor="semester">
              Semester
            </label>

            <input
              id="semester"
              type="text"
              defaultValue={student.semester}
              placeholder="Enter your semester"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              defaultValue={student.email}
              placeholder="Enter your email"
            />
          </div>

          {/* Notification Preference */}
          <div className="form-group">
            <label htmlFor="notifications">
              Notification Preference
            </label>

            <select
              id="notifications"
              defaultValue="all"
            >
              <option value="all">
                All Notifications
              </option>

              <option value="important">
                Important Only
              </option>

              <option value="none">
                Disable Notifications
              </option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="primary-btn"
            onClick={handleSave}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Account Information */}
      <div
        className="glass-card chart-card"
        style={{ marginTop: "24px" }}
      >
        <h2 className="section-title">
          Account Information
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>
              Account Status
            </label>

            <input
              type="text"
              value="Active"
              disabled
              readOnly
            />
          </div>

          <div className="form-group">
            <label>
              User Role
            </label>

            <input
              type="text"
              value="Student"
              disabled
              readOnly
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;