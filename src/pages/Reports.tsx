import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

function Reports() {
  return (
    <div>
      <PageHeader
        title="Academic Reports"
        description="Generate and review your academic reports."
      />

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <BarChart3 size={20} />
            </div>
          </div>

          <div className="stat-label">Academic Score</div>
          <div className="stat-value">85%</div>
          <div className="stat-change">Positive trend</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="stat-label">Performance Trend</div>
          <div className="stat-value">+8%</div>
          <div className="stat-change">Compared to last semester</div>
        </div>
      </div>

      <div className="glass-card table-card">
        <h2 className="section-title">Available Reports</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <FileText size={16} style={{ marginRight: 8 }} />
                Semester Performance Report
              </td>

              <td>
                <span className="badge badge-info">Academic</span>
              </td>

              <td>03 Sep 2026</td>

              <td>
                <button className="secondary-btn">
                  <Download size={15} />
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <FileText size={16} style={{ marginRight: 8 }} />
                Attendance Report
              </td>

              <td>
                <span className="badge badge-info">Attendance</span>
              </td>

              <td>01 Sep 2026</td>

              <td>
                <button className="secondary-btn">
                  <Download size={15} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;