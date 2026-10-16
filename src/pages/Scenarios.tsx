import { Network, Save, GitCompare } from "lucide-react";
import PageHeader from "../components/PageHeader";

function ScenariosPage() {
  return (
    <div className="page-container">

      <PageHeader
        title="Campus Scenarios"
        subtitle="Save and compare different campus configurations"
      />

      <div className="page-grid">

        <div className="feature-card">
          <Save size={28} />

          <h2>Save Scenario</h2>

          <p>
            Save the current campus configuration.
          </p>

          <button className="feature-button">
            Save Scenario
          </button>
        </div>

        <div className="feature-card">
          <GitCompare size={28} />

          <h2>Compare</h2>

          <p>
            Compare two campus planning scenarios.
          </p>

          <button className="feature-button">
            Compare Scenarios
          </button>
        </div>

        <div className="feature-card">
          <Network size={28} />

          <h2>Scenario Planning</h2>

          <p>
            Evaluate changes before applying them to the campus.
          </p>

        </div>

      </div>

      <div className="campus-workspace">

        <Network size={40} />

        <h2>Scenario Workspace</h2>

        <p>
          Saved campus scenarios will appear here.
        </p>

      </div>

    </div>
  );
}

export default ScenariosPage;