import { FormEvent, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

function AIAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,
        sender: "ai",
        text:
          "Hello! I am the Campus OS AI Assistant. Ask me about campus buildings, attendance, traffic, events, activity or emergencies.",
      },
    ]);

  const generateResponse = (
    question: string
  ) => {
    const q = question.toLowerCase();

    if (
      q.includes("traffic") ||
      q.includes("vehicle")
    ) {
      return (
        "The current simulated campus traffic is moderate. " +
        "Vehicle movement is being monitored across the main campus roads."
      );
    }

    if (
      q.includes("building") ||
      q.includes("block")
    ) {
      return (
        "Campus OS currently monitors multiple campus buildings, " +
        "including Block A, Block B, Block C, the Library and Auditorium."
      );
    }

    if (
      q.includes("event")
    ) {
      return (
        "Upcoming campus events can be viewed and managed from the Events module. " +
        "You can create new events and specify their location and expected participants."
      );
    }

    if (
      q.includes("attendance")
    ) {
      return (
        "The Attendance module can be used to monitor student attendance, " +
        "identify low-attendance students and generate attendance reports."
      );
    }

    if (
      q.includes("emergency") ||
      q.includes("fire")
    ) {
      return (
        "The Emergency module allows the administrator to simulate an emergency, " +
        "select the affected campus location and activate or resolve the incident."
      );
    }

    if (
      q.includes("activity") ||
      q.includes("student")
    ) {
      return (
        "Campus Activity uses simulated data to estimate student activity, " +
        "occupancy and campus movement at different times of the day."
      );
    }

    if (
      q.includes("environment") ||
      q.includes("temperature") ||
      q.includes("water")
    ) {
      return (
        "The Environment module monitors simulated environmental indicators " +
        "such as temperature, water usage and campus environmental conditions."
      );
    }

    return (
      "Based on the available Campus OS modules, I can help you understand " +
      "campus activity, buildings, traffic, attendance, events, emergencies " +
      "and environmental conditions."
    );
  };

  const sendMessage = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const question = input.trim();

    if (!question) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: question,
    };

    const response: Message = {
      id: Date.now() + 1,
      sender: "ai",
      text: generateResponse(question),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      response,
    ]);

    setInput("");
  };

  return (
    <div className="page-container">

      <PageHeader
        title="AI Assistant"
        subtitle="Ask questions about the Campus OS simulation"
      />

      <div className="ai-chat-card">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "rgba(22,140,255,0.15)",
            }}
          >
            <Bot size={26} />
          </div>

          <div>
            <h2
              style={{
                margin: 0,
              }}
            >
              Campus OS AI
            </h2>

            <span
              style={{
                color:
                  "rgba(255,255,255,0.5)",
                fontSize: 13,
              }}
            >
              Intelligent campus assistant
            </span>
          </div>
        </div>

        {/* CHAT */}
        <div
          style={{
            marginTop: 25,
            minHeight: 380,
            maxHeight: 500,
            overflowY: "auto",
            display: "grid",
            gap: 14,
            padding: 10,
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: "flex",
                justifyContent:
                  message.sender === "user"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                {message.sender === "ai" && (
                  <Bot size={20} />
                )}

                <div
                  style={{
                    padding: "13px 16px",
                    borderRadius: 14,
                    background:
                      message.sender === "user"
                        ? "rgba(22,140,255,0.2)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    lineHeight: 1.5,
                  }}
                >
                  {message.text}
                </div>

                {message.sender === "user" && (
                  <User size={20} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={sendMessage}
          className="ai-chat-input"
        >
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Ask anything about campus..."
          />

          <button
            type="submit"
            title="Send message"
          >
            <Send size={17} />
          </button>
        </form>

        {/* QUICK QUESTIONS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 15,
          }}
        >
          {[
            "What is the traffic status?",
            "Tell me about campus events",
            "How does attendance work?",
            "What buildings are available?",
          ].map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => {
                setInput(question);
              }}
              style={{
                padding:
                  "8px 12px",
                borderRadius: 9,
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background:
                  "rgba(255,255,255,0.04)",
                color:
                  "rgba(255,255,255,0.75)",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              <Sparkles
                size={12}
                style={{
                  display: "inline",
                  marginRight: 5,
                }}
              />

              {question}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;