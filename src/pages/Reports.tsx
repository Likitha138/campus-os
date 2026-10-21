import { Download, FileBarChart, FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Reports() {
  const reports = [
    ["Academic Performance Report", "PDF", "Updated today"],
    ["Attendance Summary", "PDF", "Updated today"],
    ["Semester Progress Report", "PDF", "Updated yesterday"],
    ["Campus Activity Report", "CSV", "Updated yesterday"],
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="REPORTING"
        title="Reports"
        description="Generate and access academic and campus reports."
      />

      <div className="report-grid">
        {reports.map(([name, format, updated]) => (
          <div className="report-card" key={name}>
            <div className="report-icon">
              {format === "PDF" ? (
                <FileText size={20} />
              ) : (
                <FileBarChart size={20} />
              )}
            </div>

            <div>
              <strong>{name}</strong>
              <span>{format} · {updated}</span>
            </div>

            <button>
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}