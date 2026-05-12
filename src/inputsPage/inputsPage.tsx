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
import { blue } from "@mui/material/colors";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[600]),
  backgroundColor: blue[600],
  padding: theme.spacing(1.5, 4),
  marginInline: "auto",
  display: "block",
  borderRadius: 10,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: blue[700],
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
      freeSolo
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
  availableSkills,
}: {
  value: string[];
  onChange: (e: string[]) => void;
  availableSkills: string[];
}) {
  return (
    <Autocomplete
      value={value}
      multiple
      onChange={(_, newValue) => onChange(newValue ?? "")}
      id="tags-filled"
      options={availableSkills}
      freeSolo
      renderValue={(value: readonly string[], getItemProps) =>
        value.map((option: string, index: number) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip variant="outlined" label={option} key={key} {...itemProps} />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder="Add skill" />
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
  const availableSkills = facultySkillsMap[faculty] ?? [];
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);

    if (isLoading) return;
    setIsLoading(true);
    try {
      const text = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await text.json();
      console.log("AI Result:", result);
      setCareer(result.career);
      setScore(result.employability_score);
      console.log(result.recommendations);

      handleOpen();
      setIsLoading(false);
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
                  availableSkills={availableSkills}
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
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
