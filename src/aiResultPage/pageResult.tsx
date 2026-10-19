import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import ScoreCard from "./ScoreCard";
import CareerMatches from "./CareerMatches";
import SkillGapAnalysis from "./SkillGapAnalysis";
import Recommendations from "./Recommendations";
import ChatPanel from "./ChatPanel";
import { useEffect, useMemo, useState } from "react";

export default function EmployabilityReportPage() {
  const data = useMemo(() => JSON.parse(localStorage.getItem("aiResult")!), []);
  console.log(data);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
    loading: false,
  });
  useEffect(() => {
    const initializeChat = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      setSnackbar({
        open: true,
        message: "Preparing your AI assistant...",
        severity: "info",
        loading: true,
      });
      try {
        const response = await fetch(`${apiUrl}/initializechat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const interactId = await response.json();

        if (!response.ok) {
          throw new Error(interactId?.error || "Server error occurred");
        }

        sessionStorage.setItem("interactionId", interactId.interaction_id);

        setSnackbar({
          open: true,
          message: "AI assistant is ready",
          severity: "success",
          loading: false,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);

        setSnackbar({
          open: true,
          message: error.message || "Failed to initialize chat",
          severity: "error",
          loading: false,
        });
      }
    };

    initializeChat();
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.loading ? null : 5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        {snackbar.loading ? (
          <Box
            sx={{
              bgcolor: "background.paper",
              px: 2.5,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              border: "1px solid #e2e8f0",
              minWidth: 260,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CircularProgress
                size={18}
                thickness={5}
                sx={{ color: "#2563eb" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#334155", fontWeight: 500 }}
              >
                {snackbar.message}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={
              snackbar.severity === "info" ? "success" : snackbar.severity
            }
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              fontWeight: 500,
              alignItems: "center",
              ...(snackbar.severity !== "error" && {
                bgcolor: "#2563eb",
                color: "#fff",
                "& .MuiAlert-icon": { color: "#fff" },
                "& .MuiAlert-action .MuiIconButton-root": { color: "#fff" },
              }),
            }}
          >
            {snackbar.message}
          </Alert>
        )}
      </Snackbar>
      <Box className="max-w-450 mx-auto md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* REPORT AREA */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              <ScoreCard
                employabilityScore={data.employability_score}
                summary={data.recommendations.summary}
                career_score={data.career_score}
              />

              <CareerMatches career_matches={data.top_career_matches} />
              <Recommendations strengths={data.recommendations.strengths} />

              <SkillGapAnalysis recommendation={data.recommendations} />
            </div>
          </div>

          {/* CHATBOT */}
          <div className="col-span-12 lg:col-span-4">
            <ChatPanel career_name={data.career} />
          </div>
        </div>
      </Box>
    </div>
  );
}
