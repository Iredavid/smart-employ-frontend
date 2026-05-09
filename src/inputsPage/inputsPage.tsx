import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import LinearProgress from "@mui/material/LinearProgress";
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
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from "react-router-dom";


const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface EmployabilityFormData {
  department: string;
  cgpa: string;
  skills: string[];
  internship: string;
}

export default function LinearIndeterminate() {
  return <Box sx={{ width: "100%" }}>{/* <LinearProgress /> */}</Box>;
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
      const text = await fetch("https://smart-employability-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
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
    <div className="relative">
      <Link to="/" >
    <Button startIcon={<KeyboardReturnIcon />} size="large">
  Go back
</Button>
      </Link>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Slide direction="down" in={isError} mountOnEnter unmountOnExit>
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle> An error occured</AlertTitle>
            Unable to generate employability rating. Please try again.
          </Alert>
        </Slide>

        {/* {isLoading ? <LinearIndeterminate /> : null} */}
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full md:h-full h-screen max-w-3xl bg-white rounded-2xl md:shadow-lg p-6 pt-0 md:p-8 flex flex-col">
          <div className="">
            <h1 className="lg:text-2xl md:text-2xl sm:text-2xl text-xl font-bold text-gray-800 mb-2">
              Employability Assessment
            </h1>
            <p className="text-gray-500 mb-6">
              Fill in your details to receive an AI-powered employability rating
              and career guidance.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 flex-1 relative md:pb-0 pb-5">
            {/* Academic Info */}
            <div className="grid sm:grid-cols-2 md:gap-4 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <DepartmentSelect
                  value={formData.department}
                  onChange={(e: string) => handleDepartmentChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g 3.45"
                  className="w-full border border-gray-300 hover:border-black rounded-sm px-3 py-3.75 focus:outline-none focus:border-blue-600 focus:border-2"
                  required
                />
              </div>
            </div>
            <label className="block my-4 text-sm font-medium">
              Universal Skills
            </label>
            <ChipsArray />
            {/* Experience */}
            <div className="grid sm:grid-cols-2 md:gap-4 gap-5">
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Department based Skills or Interests
                </label>
                <SkillSelect
                  key={formData.department}
                  value={departmentBasedSkills}
                  onChange={(e: string[]) => handleSkillChange(e)}
                  availableSkills={availableSkills}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Internship Experience
                </label>
                <select
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  className="w-full border border-gray-300 hover:border-black focus:border-blue-600 focus:border-2 rounded-sm px-3 py-3.75 outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <button
              // disabled={isLoading}
              type="submit"
              className="p-5 m-auto block bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition md:w-auto"
            >
              Get Employability Rating
            </button>
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

{
  /* Soft Skills */
}
{
  /* <div>
              <label className="block text-sm font-medium mb-3">
                Soft Skills
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {formData.softSkills.map((skill) => (
                  <div key={skill.name} className="">
                    <div className="flex justify-between text-sm mb-1 capitalize">
                      <span>{skill.name.replace(/([A-Z])/g, " $1")}</span>
                      <span>{skill.value}/5</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={skill.value}
                      name={skill.name}
                      onChange={(e) =>
                        handleSoftSkillChange(
                          skill.name,
                          Number(e.target.value),
                        )
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div> */
}

{
  /* Submit */
}
