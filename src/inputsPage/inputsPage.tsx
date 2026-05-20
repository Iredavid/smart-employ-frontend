import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import { departmentFacultyMap } from "./department";
import { facultySkillsMap, universalSkills } from "./faculty";
import { AiResult } from "../aiResultPage/aiResult";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import Button, { type ButtonProps } from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link } from "react-router-dom";

type SkillOption = {
  faculty: string;
  skill: string;
};
type Strength = string;

type ActionPlanItem = {
  title: string;
  detail: string;
  priority: "High" | "Medium" | "Low";
};

type summary = {
  career: string;
  employability_score: number;
  message: string;
};

export type Recommendations = {
  summary: summary;
  strengths: Strength[];
  action_plan: ActionPlanItem[];
  closing_note: string;
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#615fff"),
  backgroundColor: "#615fff",
  padding: theme.spacing(1.5, 4),
  marginInline: "auto",
  display: "block",
  borderRadius: 10,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#4f39f6",
    transition: "background-color 0.3s",
  },
}));

interface EmployabilityFormData {
  department: string;
  cgpa: string;
  skills: string[];
  internship: string;
}

export default function LinearIndeterminate() {
  return <Box sx={{ width: "100%" }}>{<LinearProgress />}</Box>;
}

export function DepartmentSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) {
  const departments = Object.keys(departmentFacultyMap);
  return (
    <Autocomplete
      value={value}
      inputValue={value}
      onInputChange={(_, newInputValue) => {
        onChange(newInputValue);
      }}
      onChange={(_, newValue) => onChange(newValue ?? "")}
      disablePortal
      options={departments}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Computer Science"
          className="border"
          required
        />
      )}
    />
  );
}

function SkillSelect({
  value,
  onChange,
  prioritizedSkills,
  faculty,
}: {
  value: string[];
  onChange: (e: string[]) => void;
  prioritizedSkills: SkillOption[];
  faculty: string;
}) {
  return (
    <Autocomplete
      value={prioritizedSkills.filter((opt) => value.includes(opt.skill))}
      multiple
      onChange={(_, newValue) => {
        onChange(newValue.map((item) => item.skill));
      }}
      id="tags-filled"
      options={prioritizedSkills}
      groupBy={(option) =>
        option.faculty === faculty
          ? `⭐ Recommended for ${option.faculty}`
          : option.faculty
      }
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.skill
      }
      renderValue={(value, getItemProps) =>
        value.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });

          const label = typeof option === "string" ? option : option.skill;

          return (
            <Chip key={key} label={label} variant="outlined" {...itemProps} />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} placeholder="Add skill" />
      )}
    />
  );
}

export function EmployabilityForm() {
  const [universalSelectedSkills, setUniversalSelectedSkills] = useState<
    string[]
  >([]);
  const [departmentBasedSkills, setDepartmentBasedSkills] = useState<string[]>(
    [],
  );
  const [formData, setFormData] = useState<EmployabilityFormData>({
    department: "",
    cgpa: "",
    skills: [],
    internship: "",
  });
  const faculty = departmentFacultyMap[formData.department];
  const availableSkills: SkillOption[] = Object.entries(
    facultySkillsMap,
  ).flatMap(([faculty, skills]) =>
    skills.map((skill) => ({
      faculty,
      skill,
    })),
  );
  const prioritizedSkills = availableSkills.sort((a, b) => {
    if (a.faculty === faculty && b.faculty !== faculty) return -1;

    if (a.faculty !== faculty && b.faculty === faculty) return 1;

    return a.faculty.localeCompare(b.faculty);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      skills: [
        ...new Set([...universalSelectedSkills, ...departmentBasedSkills]),
      ],
    }));
  }, [universalSelectedSkills, departmentBasedSkills]);
  useEffect(() => {
    if (!isError) return;

    const timer = setTimeout(() => {
      setIsError(false);
    }, 3000); // ⏱ auto-hide after 4s

    return () => clearTimeout(timer);
  }, [isError]);

  const handleChange = (e: {
    target: { name: string | number; value: string | number };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (dept: string) => {
    setDepartmentBasedSkills([]);

    setFormData((prev) => ({
      ...prev,
      department: dept,
    }));
  };
  const handleSkillChange = (skills: string[]) => {
    setDepartmentBasedSkills(skills);
  };

  const [open, setOpen] = useState(false);
  const [career, setCareer] = useState("");
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState<Recommendations>({
    summary: {
      career: "",
      employability_score: 0,
      message: "",
    },
    strengths: [],
    action_plan: [],
    closing_note: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("https://smart-employability-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // 🔥 THIS is the missing part
      if (!response.ok) {
        throw new Error(data?.error || "Server error occurred");
      }

      console.log("AI Result:", data);

      setCareer(data.career);
      setScore(data.employability_score);
      setRecommendations(data.recommendations);

      handleOpen();
    } catch (error) {
      console.error("Error during AI generation:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  function ChipsArray() {
    const toggleSkill = (skill: string) => {
      setUniversalSelectedSkills((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill],
      );
    };

    return (
      <div className="block mx-auto w-full">
        <div className="flex list-none flex-wrap">
          {universalSkills.map((data) => {
            const isSelected = formData.skills.includes(data.label);

            return (
              <ListItem key={data.key}>
                <Chip
                  label={data.label}
                  deleteIcon={<DoneIcon />}
                  onDelete={() => toggleSkill(data.label)}
                  onClick={() => toggleSkill(data.label)}
                  variant={isSelected ? "filled" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                />
              </ListItem>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Slide direction="down" in={isError} mountOnEnter unmountOnExit>
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle> An error occured</AlertTitle>
            Unable to generate employability rating. Please try again.
          </Alert>
        </Slide>

        {isLoading ? <LinearIndeterminate /> : null}
      </div>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl rounded-3xl bg-white shadow-sm md:shadow-xl border border-gray-100">
          <div className="border-b border-gray-100 px-4 py-4 sm:px-6 md:px-8">
            <Link to="/">
              <Button
                startIcon={<KeyboardReturnIcon />}
                size="medium"
                sx={{ mb: 2 }}
              >
                Go back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Employability Assessment
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Fill in your details to receive an AI-powered employability rating
              and career guidance.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 px-4 py-6 sm:px-6 md:px-8"
          >
            {/* Academic Info */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department
                </label>
                <DepartmentSelect
                  value={formData.department}
                  onChange={(e: string) => handleDepartmentChange(e)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g 3.45"
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  required
                />
              </div>
            </div>
            <label className="mb-3 block text-sm font-medium">
              Universal Skills
            </label>
            <ChipsArray />
            {/* Experience */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Skills */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department based Skills / Interests
                </label>
                <SkillSelect
                  key={formData.department}
                  value={departmentBasedSkills}
                  onChange={(e: string[]) => handleSkillChange(e)}
                  prioritizedSkills={prioritizedSkills}
                  faculty={faculty}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Internship Experience
                </label>
                <select
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="pt-2">
              <ColorButton
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                Get Employability Rating
              </ColorButton>
            </div>
          </form>
          <AiResult
            result={career}
            score={score}
            open={open}
            recommendations={recommendations}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
