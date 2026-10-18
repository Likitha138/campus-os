import { ArrowRight, CheckCircle2, CircleGauge, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
export default function Assignments(){
  return <div className="generic-page">
    <PageHeader eyebrow="CAMPUS OS · INTELLIGENCE" title="Assignments" description="Explore live campus telemetry, operational intelligence and simulated decision support from the digital twin." action={<button className="primary-btn"><Sparkles size={15}/> Run Analysis</button>}/>
    <section className="feature-grid">
      {['Live telemetry','Risk index','Prediction confidence','Recommended action'].map((x,i)=><div key={x}><span className="eyebrow">METRIC 0{i+1}</span><strong>{x}</strong><small>Updated just now</small></div>)}
    </section>
    <section className="workspace-grid">
      <div className="panel workspace-main">
        <div className="panel-head"><div><span className="eyebrow">LIVE ANALYTICS</span><h3>Operational intelligence workspace</h3></div><CircleGauge size={19}/></div>
        <div className="metric-orbit"><div className="orbit-center"><strong>82</strong><span>Health Index</span></div><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/></div>
        <div className="insight-row"><div><CheckCircle2 size={15}/> Systems <b>98%</b></div><div><CheckCircle2 size={15}/> Freshness <b>2.4s</b></div><div><CheckCircle2 size={15}/> Confidence <b>91%</b></div></div>
      </div>
      <div className="panel"><div className="panel-head"><div><span className="eyebrow">AI INSIGHT</span><h3>Recommended action</h3></div><Sparkles size={18}/></div><div className="ai-card"><b>Campus conditions are stable.</b><p>The simulation currently indicates moderate activity with no critical operational risk. Review the highlighted metric before the next planning cycle.</p><button className="panel-action">Open detailed analysis <ArrowRight size={14}/></button></div></div>
    </section>
  </div>;
}
