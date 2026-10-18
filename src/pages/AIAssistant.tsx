// ============================================================
// src/pages/AIAssistant.tsx
// ============================================================

import { useState } from "react";
import {
  ArrowUp,
  Bot,
  BrainCircuit,
  Car,
  Compass,
  Sparkles,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { user: boolean; text: string }[]
  >([
    {
      user: false,
      text:
        "Hello. I am Campus AI. Ask me about campus activity, traffic, buildings, academic performance or navigation.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const current = message;

    setMessages((items) => [
      ...items,
      {
        user: true,
        text: current,
      },
      {
        user: false,
        text:
          "Based on the current simulated campus state, I recommend checking the relevant operational module for live details.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        title="Campus AI"
        description="Ask questions about the digital twin and receive intelligent operational insights."
        icon={<BrainCircuit size={22} />}
      />

      <section className="ai-workspace">
        <div className="ai-chat">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <Bot size={20} />
            </div>

            <div>
              <strong>Campus AI</strong>
              <span>
                <i />
                Intelligence engine online
              </span>
            </div>

            <Sparkles size={18} />
          </div>

          <div className="ai-messages">
            {messages.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className={`ai-message ${
                  item.user ? "user" : "assistant"
                }`}
              >
                {!item.user && (
                  <span className="ai-message-icon">
                    <Bot size={13} />
                  </span>
                )}

                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="ai-input">
            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask Campus AI..."
            />

            <button
              type="button"
              onClick={sendMessage}
              aria-label="Send"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>

        <aside className="ai-suggestion-panel">
          <div>
            <span>INTELLIGENCE MODULES</span>
            <h2>Try asking</h2>
          </div>

          {[
            [
              <Car size={16} />,
              "Where is traffic highest?",
            ],
            [
              <Compass size={16} />,
              "Find the fastest route.",
            ],
            [
              <Sparkles size={16} />,
              "What is happening on campus?",
            ],
            [
              <BrainCircuit size={16} />,
              "Explain my performance.",
            ],
          ].map(([icon, text]) => (
            <button
              type="button"
              key={text as string}
              onClick={() =>
                setMessage(text as string)
              }
            >
              <span>{icon}</span>
              {text}
            </button>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default AIAssistant;