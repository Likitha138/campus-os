import { Bot, MessageSquare, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Hello! I am the Campus OS intelligence assistant. Ask me about campus activity, traffic, events or student insights.",
  ]);

  const send = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      `You: ${message}`,
      "AI: I would analyze the connected campus data and provide a recommendation here.",
    ]);

    setMessage("");
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="AI INTELLIGENCE"
        title="Campus AI Assistant"
        description="Ask questions about your simulated campus environment."
      />

      <div className="ai-layout">
        <div className="ai-chat">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <Bot size={22} />
            </div>

            <div>
              <strong>Campus Intelligence</strong>
              <span>
                <span className="live-dot" /> AI engine ready
              </span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((item, index) => (
              <div
                className={`ai-message ${
                  index % 2 === 1 ? "user-message" : ""
                }`}
                key={`${item}-${index}`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="ai-input">
            <MessageSquare size={18} />
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about the campus..."
            />
            <button onClick={send}>
              <Send size={16} />
            </button>
          </div>
        </div>

        <div className="data-card ai-insights">
          <Sparkles size={22} />
          <span className="eyebrow">SUGGESTED QUESTIONS</span>

          {[
            "Which zone has the highest traffic?",
            "What events are scheduled today?",
            "Which buildings have high occupancy?",
            "How is the campus environment?",
          ].map((question) => (
            <button
              key={question}
              onClick={() => setMessage(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}