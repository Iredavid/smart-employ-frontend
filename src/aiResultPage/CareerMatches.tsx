import { Paper, Chip, LinearProgress, Typography, Box } from "@mui/material";

interface CareerMatch {
  career: string;
  score: number;
  Skill_missing?: string[];
}

export default function CareerMatches({
  career_matches,
}: {
  career_matches: CareerMatch[];
}) {
  return (
    <Paper
      elevation={0}
      className="rounded-3xl px-5 py-8 sm:px-8 border border-gray-200 bg-white"
    >
      <Typography variant="h5" fontWeight={700} mb={1}>
        Career Matches
      </Typography>

      <Typography variant="body2" color="text.secondary" className="mb-6" marginBottom={2}>
        Careers ranked according to your predicted skills and employability
        profile.
      </Typography>

      <div className="flex flex-wrap gap-5">
        {career_matches?.map((career, i) => (
          <Paper
            key={i}
            elevation={0}
            className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 flex-1 basis-full sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)] min-w-65 lg:max-w-100"
          >
            {/* Career Name + Score */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight={600}>
                {career.career}
              </Typography>

              <Typography variant="h5"  fontWeight={700} sx={{ color: "#4F46E5" }}>
                {career.score}%
              </Typography>
            </Box>

            {/* Progress */}
            <LinearProgress
              variant="determinate"
              value={career.score}
              sx={{
                height: 12,
                borderRadius: 8,
                // color: "4F46E5",
                backgroundColor: "#6366F17A",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 8,
                  backgroundColor: "#6366F1",
                },
              }}
            />
            <h6 className="mt-5 mb-3 font-bold text-md">Skills Gaps</h6>
            {/* Status */}
            <Box display="flex" flexWrap="wrap" gap={1}>
              {career.Skill_missing?.map((data, index) => (
                <Chip key={index} label={data} variant="filled" color="default" />
              ))}
            </Box>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
