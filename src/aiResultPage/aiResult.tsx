/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@mui/material/Modal";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled, type Theme } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts/hooks";
import type { Recommendations } from "../inputsPage/inputsPage";

const StyledText = styled("text")(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 28,
  fontWeight: 700,
}));

interface PieCenterLabelProps {
  children: React.ReactNode;
}

function PieCenterLabel({ children }: PieCenterLabelProps): React.ReactElement {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

function DonutChart({ score, career }: { score: number; career: string }) {
  const data = [
    {
      label: career,
      value: score,
      color: score > 50 ? "#4CAF50" : "#F44336",
    },
    { label: "Group B", value: 100 - score, color: "#FFFFFF" },
  ];

  return (
    <div className="flex items-center justify-center">
      <PieChart
        series={[{ innerRadius: 70, outerRadius: 95, data, cornerRadius: 6 }]}
        {...settings}
      >
        <PieCenterLabel>{score}%</PieCenterLabel>
      </PieChart>
    </div>
  );
}
export function AiResult({
  score,
  open,
  handleClose,
  recommendations,
}: {
  result: string;
  score: number;
  open: boolean;
  handleClose: () => void;
  recommendations: Recommendations;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center px-4">
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* MODAL CARD */}
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* HEADER */}
          <div className="p-5 md:p-6 border-b bg-linear-to-r from-indigo-50 to-white">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              AI Career Report
            </h2>
            <p className="text-sm text-gray-500">
              Personalized employability analysis
            </p>
          </div>

          {/* BODY */}
          <div className="p-5 md:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* CHART */}
              <div className="shrink-0">
                <DonutChart
                  score={score}
                  career={recommendations.summary.career}
                />
              </div>

              {/* SUMMARY */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                  <span className="px-3 py-1 text-xs md:text-sm bg-indigo-100 text-indigo-700 rounded-full">
                    {recommendations.summary.career}
                  </span>

                  {/* <span className="px-3 py-1 text-xs md:text-sm bg-green-100 text-green-700 rounded-full">
                    {recommendations.summary.employability_score}
                  </span> */}
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {recommendations.summary.message}
                </p>
              </div>
            </div>

            {/* STRENGTHS */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Strengths
              </h3>

              <div className="flex flex-wrap gap-2">
                {recommendations.strengths.map((s: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION PLAN */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Action Plan
              </h3>

              <div className="space-y-3">
                {recommendations.action_plan.map((a: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl border p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <p className="font-medium text-gray-800 text-sm md:text-base">
                        {a.title}
                      </p>

                      <span
                        className={`text-[10px] md:text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          a.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : a.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {a.priority}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      {a.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CLOSING NOTE */}
            <div className="pt-2 border-t">
              <p className="text-xs md:text-sm text-gray-500 italic">
                {recommendations.closing_note}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t flex justify-center bg-gray-50">
            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
