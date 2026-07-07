import { Box } from "@mui/material";

import ScoreCard from "./ScoreCard";
import CareerMatches from "./CareerMatches";
import SkillGapAnalysis from "./SkillGapAnalysis";
import Recommendations from "./Recommendations";
import ChatPanel from "./ChatPanel";

export default function EmployabilityReportPage() {
  const data = JSON.parse(localStorage.getItem("aiResult")!);
  sessionStorage.setItem("interactionId", data.kwags);
  // console.log(data);
  return (
    <div className="min-h-screen bg-slate-50">
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
