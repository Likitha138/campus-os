import {
  BarChart3,
  Download,
  FileText,
  PieChart,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const reports = [
  {
    title: "Campus Occupancy Report",
    type: "Simulation",
    date: "20 Oct 2026",
    icon: BarChart3,
  },
  {
    title: "Student Academic Report",
    type: "Academic",
    date: "20 Oct 2026",
    icon: TrendingUp,
  },
  {
    title: "Traffic Analysis Report",
    type: "Operations",
    date: "19 Oct 2026",
    icon: PieChart,
  },
  {
    title: "Event Capacity Report",
    type: "Events",
    date: "18 Oct 2026",
    icon: FileText,
  },
];

export default function Reports() {
  return (
    <div className="page">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate and review campus intelligence reports."
        actions={
          <button className="primary-button">
            <Download size={15} />
            Generate Report
          </button>
        }
      />

      <div className="report-dashboard">
        <div className="report-hero">
          <div className="report-hero-content">
            <span>ANALYTICS CENTER</span>
            <h2>
              Understand the campus through data.
            </h2>
            <p>
              Combine academic, activity, traffic,
              events and environment information into
              actionable reports.
            </p>

            <button className="primary-button">
              Generate Custom Report
            </button>
          </div>

          <div className="report-hero-visual">
            <div className="report-orbit orbit-one" />
            <div className="report-orbit orbit-two" />
            <BarChart3 size={44} />
          </div>
        </div>

        <div className="report-stat-grid">
          <div>
            <span>Reports generated</span>
            <strong>126</strong>
          </div>

          <div>
            <span>Data sources</span>
            <strong>09</strong>
          </div>

          <div>
            <span>Analytics models</span>
            <strong>12</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              RECENT REPORTS
            </span>
            <h3>Generated Reports</h3>
          </div>
        </div>

        <div className="report-list">
          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <div
                className="report-row"
                key={report.title}
              >
                <div className="report-icon">
                  <Icon size={18} />
                </div>

                <div className="report-info">
                  <strong>{report.title}</strong>
                  <span>
                    {report.type} · {report.date}
                  </span>
                </div>

                <button className="secondary-button compact">
                  <Download size={14} />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}