import {
  Award,
  Download,
  TrendingUp,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { marksData } from "../data/campus";

export default function Marks() {
  return (
    <div className="page">
      <PageHeader
        title="Marks & Performance"
        subtitle="Track internal assessment, assignments and examination performance."
        actions={
          <button className="secondary-button">
            <Download size={15} />
            Export Report
          </button>
        }
      />

      <div className="stats-grid">
        <StatCard
          label="Average Score"
          value="82.6%"
          change="+5.4%"
          trend="up"
          icon="chart"
        />

        <StatCard
          label="Highest Score"
          value="94%"
          change="AI & ML"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Students Above 75%"
          value="2,486"
          change="76.5%"
          trend="up"
          icon="users"
        />

        <StatCard
          label="Needs Attention"
          value="182"
          change="-21"
          trend="up"
          icon="activity"
        />
      </div>

      <div className="two-column-grid">
        <div className="panel large-chart-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SCORE BREAKDOWN
              </span>
              <h3>Subject Performance</h3>
            </div>

            <TrendingUp size={18} />
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={marksData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,.05)"
                  vertical={false}
                />

                <XAxis
                  dataKey="subject"
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111721",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />

                <Bar
                  dataKey="internal"
                  fill="#4f8cff"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="assignment"
                  fill="#39d98a"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="exam"
                  fill="#b28cff"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel performance-summary">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ACADEMIC SUMMARY
              </span>
              <h3>Performance Index</h3>
            </div>

            <Award size={18} />
          </div>

          <div className="performance-score">
            <strong>82.6</strong>
            <span>/ 100</span>
          </div>

          <div className="performance-grade">
            <span>Overall Grade</span>
            <strong>A</strong>
          </div>

          <div className="performance-list">
            <div>
              <span>Internal</span>
              <strong>36.6 / 40</strong>
            </div>

            <div>
              <span>Assignments</span>
              <strong>17.8 / 20</strong>
            </div>

            <div>
              <span>Examination</span>
              <strong>41.2 / 50</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="panel data-table-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              MARKS REGISTER
            </span>
            <h3>Subject-wise Scores</h3>
          </div>
        </div>

        <div className="data-table">
          <div className="data-table-head">
            <span>Subject</span>
            <span>Internal</span>
            <span>Assignments</span>
            <span>Exam</span>
            <span>Total</span>
            <span>Grade</span>
          </div>

          {marksData.map((row) => {
            const total =
              row.internal +
              row.assignment +
              row.exam;

            return (
              <div
                className="data-table-row"
                key={row.subject}
              >
                <strong>{row.subject}</strong>
                <span>{row.internal}</span>
                <span>{row.assignment}</span>
                <span>{row.exam}</span>
                <strong>{total}</strong>
                <span className="status-pill success">
                  A
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}