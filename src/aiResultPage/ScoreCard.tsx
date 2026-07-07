import { Paper, Typography } from "@mui/material";
import { BestCareerCard } from "./BestCareerCard";
import { DonutChart } from "./aiResult";

export default function ScoreCard({
  employabilityScore,
  summary,
  career_score,
}: {
  employabilityScore: number;
  summary: { career: string; message: string };
  career_score: number;
}) {
  return (
    <Paper
      elevation={0}
      className="rounded-3xl border border-slate-200 overflow-hidden"
    >
      <div className="grid lg:grid-cols-12 grid-cols-1 px-5 py-8 sm:px-8 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <Typography className="tracking-widest text-center">
            EMPLOYABILITY SCORE
          </Typography>

          <DonutChart
            score={employabilityScore}
            career={"Employability Score"}
          />

          <Typography variant="body2" textAlign={"center"} className="mt-3">
            Your overall readiness for today's job market based on your academic
            profile, technical competencies and professional skills.
          </Typography>
        </div>


        {/* RIGHT */}
        <div className="lg:col-span-8 flex justify-center items-center">
          <BestCareerCard summary={summary} career_score={career_score} />
        </div>
      </div>
    </Paper>
  );
}
