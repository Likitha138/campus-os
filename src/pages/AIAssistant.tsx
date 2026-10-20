import {
  ArrowUp,
  Bot,
  BrainCircuit,
  Lightbulb,
  Sparkles,
  User,
} from "lucide-react";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

const suggestions = [
  "Which building has the highest occupancy?",
  "Where should additional parking be added?",
  "Analyse today's traffic situation.",
  "How can the Tech Fest layout be improved?",
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([
    {
      role: "ai",
      text: "Hello. I am Campus Intelligence. I can analyse the simulated campus state, occupancy, traffic, events, emergency scenarios and future-campus plans.",
    },
  ]);

  const send = () => {
    if (!message.trim()) return;

    const current = message;

    setMessages((items) => [
      ...items,
      { role: "user", text: current },
      {
        role: "ai",
        text: `Based on the current simulated campus state, I recommend reviewing occupancy, traffic load and event pressure together before making this decision. The current simulation shows moderate-to-high activity.`,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="page ai-page">
      <PageHeader
        title="Campus Intelligence"
        subtitle="AI-powered analysis and recommendations for the simulated campus."
      />

      <div className="ai-layout">
        <aside className="ai-sidebar">
          <div className="ai-profile">
            <div className="ai-large-icon">
              <BrainCircuit size={27} />
            </div>

            <strong>Campus Intelligence</strong>
            <span>Gemini-powered analysis layer</span>
          </div>

          <div className="ai-capabilities">
            <span>CAPABILITIES</span>

            <div>
              <Sparkles size={15} />
              Campus analysis
            </div>

            <div>
              <Lightbulb size={15} />
              Recommendations
            </div>

            <div>
              <Bot size={15} />
              Scenario reasoning
            </div>
          </div>

          <div className="ai-note">
            <strong>Simulation aware</strong>
            <p>
              AI responses should be interpreted
              against the controlled digital-campus
              dataset.
            </p>
          </div>
        </aside>

        <section className="ai-chat">
          <div className="ai-chat-header">
            <div>
              <span className="panel-kicker">
                CAMPUS AI
              </span>
              <h3>Ask anything about campus</h3>
            </div>

            <span className="status-pill success">
              ONLINE
            </span>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${
                  item.role === "user"
                    ? "user"
                    : "assistant"
                }`}
              >
                <div className="chat-avatar">
                  {item.role === "user" ? (
                    <User size={15} />
                  ) : (
                    <Bot size={15} />
                  )}
                </div>

                <div className="chat-bubble">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="ai-suggestions">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setMessage(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask Campus Intelligence..."
            />

            <button onClick={send}>
              <ArrowUp size={17} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}