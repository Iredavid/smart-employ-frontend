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

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
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
    "
    >
      {/* Header */}

      <div className="border-b px-6 py-5">
        <h2 className="font-bold text-lg">AI Career Advisor</h2>

        <p className="text-sm text-gray-500">
          Ask questions about your employability report
        </p>
      </div>

      {/* Chat */}

      <Box
        className="flex-1 overflow-y-auto px-4 py-5"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <SmartToyIcon sx={{ fontSize: 60 }} />

            <p className="mt-4">Ask anything about your report.</p>

            <p className="text-sm">
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
                  width: 36,
                  height: 36,
                }}
              >
                {message.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
              </Avatar>

              <Paper
                elevation={0}
                className={`rounded-3xl px-4 py-3 max-w-75 md:max-w-105 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Paper>
            </Box>
          </Box>
        ))}

        {loading && (
          <Box display="flex" gap={2}>
            <Avatar>
              <SmartToyIcon />
            </Avatar>

            <Paper elevation={0} className="rounded-3xl px-5 py-4 bg-slate-100">
              <CircularProgress size={22} />
            </Paper>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {/* FAQ */}

      {messages.length === 0 && (
        <Box display="flex" flexWrap="wrap" gap={1} px={2} pb={2}>
          {faq.map((question) => (
            <Chip
              key={question}
              clickable
              onClick={() => sendMessage(question)}
              label={question}
            />
          ))}
        </Box>
      )}

      {/* Input */}

      <div className="border-t p-4 bg-white">
        <Box display="flex" gap={2}>
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
          />

          <IconButton
            color="primary"
            disabled={loading}
            onClick={() => sendMessage()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </div>
    </Paper>
  );
}
// import { Paper, TextField, IconButton, Box, Chip } from "@mui/material";

// import SendIcon from "@mui/icons-material/Send";
// import { useState } from "react";

// export default function ChatPanel() {
//   const [formData, setFormData] = useState({ input: "" });
//   const faq = [
//     "Why was I recommended Data Analyst?",
//     "What certifications should I take?",
//     "How can I improve my employability score?",
//     "Create a 3-month learning roadmap",
//     "where can i get more internship training?",
//   ];
//   return (
//     <Paper
//       elevation={0}
//       className="
//       rounded-3xl
//       border
//       border-slate-200
//       lg:h-[85vh]
//       flex
//       flex-col
//       sticky
//       top-5
//       "
//     >
//       <div className="p-5 border-b">
//         <h2 className="font-bold">AI Career Advisor</h2>

//         <p className="text-sm text-gray-500">Ask about your report</p>
//       </div>

//       <div className="flex-1 flex flex-col gap-2 overflow-y-auto p-4 space-y-4">
//         <div className="bg-slate-100 p-3 rounded-2xl ml-auto max-w-[80%]">
//           How can I improve my employability score?
//         </div>

//         <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-[80%]">
//           Focus on cloud computing and internships.
//         </div>
//       </div>

//       <div className="">
//         <div className="p-4 border-t flex gap-2">
//           <TextField
//             size="small"
//             fullWidth
//             placeholder="Ask about your report..."
//             onChange={(e) => {
//               setFormData({ input: e.target.value });
//             }}
//           />

//           <IconButton
//             color="primary"
//             onClick={async () => {
//               const interaction_id = sessionStorage.getItem("interactionId");
//               const response = await fetch("http://127.0.0.1:5000/chat", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ ...formData, interaction_id }),
//               });

//               const data = await response.json();
//               console.log(data);
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </div>

//         <Box display="flex" flexWrap="wrap" gap={1} px={2} pb={2}>
//           {faq.map((question, index) => (
//             <Chip
//               key={index}
//               label={question}
//               variant="filled"
//               color="default"
//             />
//           ))}
//         </Box>
//       </div>
//     </Paper>
//   );
// }
