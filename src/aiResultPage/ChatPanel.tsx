import {
  Paper,
  TextField,
  IconButton,
  Box,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPanel({ career_name }: { career_name: string }) {
  const faq = [
    `Why was I recommended ${career_name}?`,
    "What certifications should I take?",
    "How can I improve my employability score?",
    "Create a 3-month learning roadmap",
    "Where can I get more internship training?",
  ];

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only the chat container itself, never the page.
    // (scrollIntoView on bottomRef would also scroll window/ancestors,
    // which is what was causing the page to jump on mount and on send.)
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: messages.length > 0 ? "smooth" : "auto",
    });
  }, [messages, loading]);

  const sendMessage = async (question?: string) => {
    const text = question || input;

    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const interaction_id = sessionStorage.getItem("interactionId");
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: text,
          interaction_id,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      // console.log(data);

      if (data.interaction_id) {
        sessionStorage.setItem("interactionId", data.interaction_id);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Paper
      elevation={0}
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      flex
      flex-col
      h-[85vh]
      sticky
      top-6
      overflow-hidden
      shadow-[0_2px_20px_rgba(15,23,42,0.06)]
    "
    >
      {/* Header */}

      <div className="border-b border-slate-100 px-6 py-5 bg-linear-to-r from-indigo-500 to-indigo-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm">
            <SmartToyIcon sx={{ color: "white", fontSize: 22 }} />
          </div>

          <div>
            <h2 className="font-bold text-lg text-white leading-tight">
              AI Career Advisor
            </h2>

            <p className="text-sm text-blue-100">
              Ask questions about your employability report
            </p>
          </div>
        </div>
      </div>

      {/* Chat */}

      <Box
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-5 bg-slate-50/60"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2">
              <SmartToyIcon sx={{ fontSize: 32, color: "#2563eb" }} />
            </div>

            <p className="mt-4 font-medium text-gray-600">
              Ask anything about your report.
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Your AI advisor will explain your recommendations, strengths and
              learning roadmap.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={message.role === "user" ? "flex-end" : "flex-start"}
          >
            <Box
              display="flex"
              gap={1}
              alignItems="flex-start"
              flexDirection={message.role === "user" ? "row-reverse" : "row"}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: message.role === "user" ? "#2563eb" : "#e2e8f0",
                  color: message.role === "user" ? "#fff" : "#475569",
                }}
              >
                {message.role === "user" ? (
                  <PersonIcon fontSize="small" />
                ) : (
                  <SmartToyIcon fontSize="small" />
                )}
              </Avatar>

              <Paper
                elevation={0}
                className={`rounded-3xl px-4 py-3 max-w-75 md:max-w-full text-sm leading-relaxed prose prose-sm prose-p:my-1 prose-ul:my-1 prose-ol:my-1 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-md"
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-md shadow-sm"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Paper>
            </Box>
          </Box>
        ))}

        {loading && (
          <Box display="flex" gap={1} alignItems="flex-start">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#e2e8f0",
                color: "#475569",
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Avatar>

            <Paper
              elevation={0}
              className="rounded-3xl rounded-tl-md px-5 py-3 bg-white border border-slate-100 shadow-sm flex items-center"
            >
              <CircularProgress
                size={16}
                thickness={5}
                sx={{ color: "#2563eb" }}
              />
            </Paper>
          </Box>
        )}
      </Box>

      {/* FAQ */}

      {messages.length === 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          px={3}
          pb={3}
          pt={1}
          className="bg-white border-t border-slate-100"
        >
          {faq.map((question) => (
            <Chip
              key={question}
              clickable
              onClick={() => sendMessage(question)}
              label={question}
              sx={{
                bgcolor: "#E0E7FF",
                color: "#6366F1",
                fontWeight: 500,
                border: "1px solid #dbeafe",
                "&:hover": {
                  bgcolor: "#dbeafe",
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Input */}

      <div className="border-t border-slate-100 p-4 bg-white">
        <Box display="flex" gap={1.5} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Ask about your report..."
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                bgcolor: "#f8fafc",
                "& fieldset": {
                  borderColor: "#e2e8f0",
                },
                "&:hover fieldset": {
                  borderColor: "#93c5fd",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
          />

          <IconButton
            disabled={loading}
            onClick={() => sendMessage()}
            sx={{
              bgcolor: "#2563eb",
              color: "white",
              width: 40,
              height: 40,
              "&:hover": {
                bgcolor: "#1d4ed8",
              },
              "&.Mui-disabled": {
                bgcolor: "#e2e8f0",
                color: "#94a3b8",
              },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </div>
    </Paper>
  );
}
