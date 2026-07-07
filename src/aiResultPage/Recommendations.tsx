import {
  Paper,
  Typography,
  Box,
  // Chip,
} from "@mui/material";
import { EmojiEvents, CheckCircle } from "@mui/icons-material";

export default function Recommendations({
  strengths,
}: {
  strengths: string[];
}) {
  return (
    <Paper
      elevation={0}
      className="rounded-3xl border border-gray-200 bg-white px-5 py-8 sm:px-8"
    >
      {/* Header */}
      <Typography variant="h5" fontWeight={700}>
        AI Strength Assessment
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Based on your academic profile and employability analysis, these are the
        key strengths that increase your suitability for recommended career
        paths.
      </Typography>

      {/* Hero Card */}
      <Paper
        elevation={0}
        className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <EmojiEvents
              sx={{
                color: "#D97706",
                fontSize: 28,
              }}
            />
          </div>

          <div>
            <Typography fontWeight={700}>Your Competitive Strengths</Typography>

            <Typography variant="body2" color="text.secondary">
              These strengths can be highlighted in your CV, portfolio,
              internship applications, and interviews.
            </Typography>
          </div>
        </Box>
      </Paper>

      {/* Strength Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strengths.map((strength) => (
          <Paper
            key={strength}
            elevation={0}
            className="rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
          >
            <Box display="flex" gap={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.2 }} />

              <Box>
                <Typography fontWeight={600}>{strength}</Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Continue developing this capability to strengthen your
                  employability and improve your career readiness.
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
