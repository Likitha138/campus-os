// ============================================================
// src/pages/Reports.tsx
// ============================================================

import {
  BarChart3,
  Download,
  FileBarChart,
  FileText,
  PieChart,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Reports() {
  const reports = [
    ["Academic Performance", "Updated today"],
    ["Attendance Analysis", "Updated today"],
    ["Traffic Intelligence", "Updated 12 min ago"],
    ["Campus Activity", "Updated 18 min ago"],
  ];

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="ANALYTICS CENTER"
        title="Reports"
        description="Generate and review intelligent campus and academic reports."
        icon={<FileBarChart size={22} />}
        action={
          <button type="button" className="primary-button">
            <Download size={16} />
            Export Report
          </button>
        }
      />

      <section className="report-overview-grid">
        <div className="report-summary-card">
          <PieChart size={21} />
          <span>Campus Health</span>
          <strong>86%</strong>
          <small>Overall operational score</small>
        </div>

        <div className="report-summary-card">
          <BarChart3 size={21} />
          <span>Academic Index</span>
          <strong>88%</strong>
          <small>Student performance</small>
        </div>

        <div className="report-summary-card">
          <FileText size={21} />
          <span>Generated Reports</span>
          <strong>24</strong>
          <small>This semester</small>
        </div>
      </section>

      <section className="content-card">
        <div className="card-header">
          <div>
            <span>REPORT LIBRARY</span>
            <h2>Available Reports</h2>
          </div>
        </div>

        <div className="report-list">
          {reports.map(([name, updated]) => (
            <div className="report-row" key={name}>
              <div className="report-icon">
                <FileBarChart size={17} />
              </div>

              <div>
                <strong>{name}</strong>
                <span>{updated}</span>
              </div>

              <button type="button">
                View Report
              </button>

              <button
                type="button"
                className="icon-button"
              >
                <Download size={15} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Reports;