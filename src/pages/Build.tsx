import {
  Building2,
  Car,
  Check,
  Leaf,
  Minus,
  Plus,
  Save,
  SolarPanel,
  Trophy,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

export default function Build() {
  const objects = [
    {
      name: "Proposed Building",
      icon: Building2,
    },
    {
      name: "Parking Area",
      icon: Car,
    },
    {
      name: "Green Area",
      icon: Leaf,
    },
    {
      name: "Solar Panels",
      icon: SolarPanel,
    },
    {
      name: "Sports Facility",
      icon: Trophy,
    },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Future Campus Builder"
        subtitle="Design and evaluate proposed campus infrastructure."
      />

      <div className="builder-layout">
        <aside className="builder-sidebar">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  BUILD TOOLS
                </span>
                <h3>Infrastructure</h3>
              </div>
            </div>

            <div className="builder-tools">
              {objects.map((object) => {
                const Icon = object.icon;

                return (
                  <button key={object.name}>
                    <Icon size={17} />
                    <span>{object.name}</span>
                    <Plus size={14} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  CANVAS
                </span>
                <h3>Controls</h3>
              </div>
            </div>

            <div className="builder-controls">
              <button>
                <Minus size={15} />
                Zoom out
              </button>

              <button>
                <Plus size={15} />
                Zoom in
              </button>

              <button>
                <Save size={15} />
                Save layout
              </button>
            </div>
          </div>
        </aside>

        <section className="builder-canvas">
          <div className="builder-canvas-top">
            <div>
              <span>FUTURE CAMPUS</span>
              <strong>Campus 2030</strong>
            </div>

            <button className="primary-button compact">
              <Save size={14} />
              Save Scenario
            </button>
          </div>

          <div className="future-campus-scene">
            <div className="future-grid" />

            <div className="future-road future-road-1" />
            <div className="future-road future-road-2" />

            <div className="future-building building-main">
              <Building2 size={25} />
              <span>New Academic Hub</span>
            </div>

            <div className="future-building building-library">
              <Building2 size={21} />
              <span>Innovation Centre</span>
            </div>

            <div className="future-green">
              <Leaf size={21} />
              <span>Green Zone</span>
            </div>

            <div className="future-solar">
              <SolarPanel size={20} />
              <span>Solar Array</span>
            </div>

            <div className="future-parking">
              <Car size={18} />
              <span>Smart Parking</span>
            </div>
          </div>

          <div className="builder-summary">
            <div>
              <span>PROPOSED BUILDINGS</span>
              <strong>02</strong>
            </div>

            <div>
              <span>GREEN COVER</span>
              <strong>+18%</strong>
            </div>

            <div>
              <span>PARKING CAPACITY</span>
              <strong>+240</strong>
            </div>

            <div>
              <span>SOLAR CAPACITY</span>
              <strong>320 kW</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="panel planning-notes">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              PLANNING ANALYSIS
            </span>
            <h3>Future Campus Impact</h3>
          </div>
        </div>

        <div className="impact-grid">
          <div>
            <Check size={16} />
            <strong>Improved circulation</strong>
            <span>
              New road connections reduce simulated
              congestion.
            </span>
          </div>

          <div>
            <Check size={16} />
            <strong>Higher capacity</strong>
            <span>
              Academic capacity increases by 18%.
            </span>
          </div>

          <div>
            <Check size={16} />
            <strong>Energy efficiency</strong>
            <span>
              Solar infrastructure offsets simulated
              energy demand.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}