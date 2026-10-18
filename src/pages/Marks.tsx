// ============================================================
// src/pages/Marks.tsx
// ============================================================

import {
  Award,
  BarChart3,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { marksData } from "../services/data";

function Marks() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks Intelligence"
        description="Understand academic performance through centralized assessment analytics."
        icon={<BarChart3 size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Average Score"
          value="88%"
          detail="Current semester"
          icon={<Award size={18} />}
          trend="+5.1%"
          tone="green"
        />

        <StatCard
          label="Highest Score"
          value="96%"
          detail="Project evaluation"
          icon={<TrendingUp size={18} />}
          tone="blue"
        />

        <StatCard
          label="Subjects"
          value="05"
          detail="Tracked subjects"
          icon={<BookOpen size={18} />}
          tone="purple"
        />

        <StatCard
          label="Performance"
          value="Excellent"
          detail="AI classification"
          icon={<Award size={18} />}
          tone="orange"
        />
      </div>

      <section className="content-card">
        <div className="card-header">
          <div>
            <span>ASSESSMENT MATRIX</span>
            <h2>Academic Results</h2>
          </div>
        </div>

        <div className="marks-table">
          <div className="marks-header">
            <span>SUBJECT</span>
            <span>INTERNAL</span>
            <span>TOTAL</span>
            <span>PERFORMANCE</span>
          </div>

          {marksData.map((item) => {
            const percentage =
              (item.internal / item.total) * 100;

            return (
              <div
                className="marks-row"
                key={item.subject}
              >
                <strong>{item.subject}</strong>

                <span>
                  {item.internal}
                </span>

                <span>
                  {item.total}
                </span>

                <div className="marks-performance">
                  <div>
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <strong>
                    {Math.round(percentage)}%
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Marks;