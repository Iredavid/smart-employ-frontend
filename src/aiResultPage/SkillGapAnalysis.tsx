import { Paper, Typography, Chip, Box } from "@mui/material";
import {
  TrendingUp,
  PriorityHigh,
  CheckCircle,
  Flag,
  School,
  Code,
  Forum,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";
interface ActionPlan {
  title: string;
  detail: string;
  priority: "High" | "Medium" | "Low";
}

export default function SkillGapAnalysis({
  recommendation,
}: {
  recommendation: {
    action_plan: ActionPlan[];
    closing_note: string;
  };
}) {
  const getActionIcon = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes("internship") || t.includes("experience"))
      return (
        <WorkspacePremium
          sx={{
            color: "#4F46E5",
            fontSize: 22,
          }}
        />
      );
    if (t.includes("project"))
      return (
        <Work
          sx={{
            color: "#4F46E5",
            fontSize: 22,
          }}
        />
      );
    if (t.includes("communication"))
      return (
        <Forum
          sx={{
            color: "#4F46E5",
            fontSize: 22,
          }}
        />
      );
    if (t.includes("web") || t.includes("development") || t.includes("python"))
      return (
        <Code
          sx={{
            color: "#4F46E5",
            fontSize: 22,
          }}
        />
      );
    if (t.includes("academic"))
      return (
        <School
          sx={{
            color: "#4F46E5",
            fontSize: 22,
          }}
        />
      );

    return (
      <TrendingUp
        sx={{
          color: "#4F46E5",
          fontSize: 22,
        }}
      />
    );
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return {
          bg: "#FEE2E2",
          color: "#DC2626",
          icon: <PriorityHigh fontSize="small" />,
        };

      case "Medium":
        return {
          bg: "#FEF3C7",
          color: "#D97706",
          icon: <Flag fontSize="small" />,
        };

      default:
        return {
          bg: "#DCFCE7",
          color: "#16A34A",
          icon: <CheckCircle fontSize="small" />,
        };
    }
  };

  return (
    <Paper
      elevation={0}
      className="rounded-3xl border border-gray-200 px-5 py-8 sm:px-8 bg-white"
    >
      <Typography variant="h5" fontWeight={700}>
        Action Plan to Improve Employability
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        These recommendations are prioritized to improve your employability and
        increase your compatibility with your target career path.
      </Typography>

      <div className="space-y-5">
        {recommendation.action_plan.map((plan) => {
          const priority = getPriorityColor(plan.priority);

          return (
            <Paper
              key={plan.title}
              elevation={0}
              className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300"
            >
              <Box display="flex" flexDirection={"column"} gap={2}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                      {getActionIcon(plan.title)}
                    </div>

                    <Typography fontWeight={700} fontSize={18}>
                      {plan.title}
                    </Typography>
                  </div>
                  <Chip
                    icon={priority.icon}
                    label={plan.priority}
                    sx={{
                      backgroundColor: priority.bg,
                      color: priority.color,
                      fontWeight: 700,
                    }}
                  />
                </div>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, lineHeight: 1.8 }}
                >
                  {plan.detail}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </div>

      <Paper
        elevation={0}
        className="mt-6 rounded-2xl bg-indigo-50 border border-indigo-100 p-5"
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          Final Recommendation
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {recommendation.closing_note}
        </Typography>
      </Paper>
    </Paper>
  );
}
