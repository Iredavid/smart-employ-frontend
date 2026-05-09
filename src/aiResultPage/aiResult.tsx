import Modal from "@mui/material/Modal";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled, type Theme } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts/hooks";

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

function DonutChart({ score }: { score: number }) {
  const data = [
    {
      label: "Group A",
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
  result,
  score,
  open,
  handleClose,
}: {
  result: string;
  score: number;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center px-4">
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* MODAL CARD */}
        <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* HEADER */}
          <div className="mb-6 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              AI Result
            </h2>
            <p className="text-sm text-gray-500">Your personalized analysis</p>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* CHART */}
            <div className="shrink-0">
              <DonutChart score={score} />
            </div>

            {/* TEXT RESULT */}
            <div className="text-center md:text-left">
              <p className="text-gray-700 text-base leading-relaxed">
                {result}
              </p>

              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full">
                  Score: {score}%
                </span>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClose}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
