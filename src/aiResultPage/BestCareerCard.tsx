import { Box, Chip, LinearProgress, Paper, Typography } from "@mui/material";

export function BestCareerCard({
  summary,
  career_score,
}: {
  summary: {
    career: string;
    message: string;
  };
  career_score: number;
}) {
  return (
    <Paper
      elevation={0}
      className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 flex-1 basis-full sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)] min-w-70"
    >
      {/* Career Name + Score */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div className="">
          <Typography variant="h6" fontWeight={600}>
            {summary.career}
          </Typography>
          <Chip
            label="Best Career Match"
            color="primary"
            sx={{
              mt: 2,
              fontWeight: 600,
              fontSize: 15,
              backgroundColor: "#6366F1",
            }}
          />
        </div>

        <Typography variant="h5" color="primary" fontWeight={700}>
          {career_score}%
        </Typography>
      </Box>

      {/* Progress */}
      <LinearProgress
        variant="determinate"
        value={career_score}
        sx={{
          height: 12,
          borderRadius: 8,
          backgroundColor: "#6366F17A",
          "& .MuiLinearProgress-bar": {
            borderRadius: 8,
            backgroundColor: "#6366F1",
          },
        }}
      />

      {/* Status */}
      <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
        <Typography
          mt={1}
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
          }}
        >
          {summary.message}
        </Typography>
      </Box>
    </Paper>
  );
}

// <div className="flex flex-col xl:flex-row items-center gap-8">
//   {/* Donut */}

//   <div className="shrink-0">
//     <DonutChart score={career_score} career={summary.career} />
//   </div>

//   {/* Content */}

//   <div className="flex-1 text-center xl:text-left">
//     <Typography variant="h5" fontWeight={700} mt={1}>
//       Best Career Match
//     </Typography>

//     <Chip
//       label={summary.career}
//       color="primary"
//       sx={{
//         mt: 2,
//         fontWeight: 600,
//         fontSize: 15,
//       }}
//     />

//     <Typography
//       mt={3}
//       color="text.secondary"
//       sx={{
//         lineHeight: 1.8,
//       }}
//     >
//       {summary.message}
//     </Typography>

//     <div className="mt-6 flex flex-wrap gap-3 justify-center xl:justify-start">
//       <div className="rounded-xl bg-green-50 px-4 py-3">
//         <Typography variant="caption" color="text.secondary">
//           Match Score
//         </Typography>

//         <Typography fontWeight={700}>{career_score}%</Typography>
//       </div>

//       <div className="rounded-xl bg-blue-50 px-4 py-3">
//         <Typography variant="caption" color="text.secondary">
//           Recommendation
//         </Typography>

//         <Typography fontWeight={700}>High Potential</Typography>
//       </div>
//     </div>
//   </div>
// </div>
