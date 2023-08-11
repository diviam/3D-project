import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Chip } from '@mui/material';
import './styles/Layout.css';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }) => {
  return (
    <div style={{margin:"30px",width: "auto"}}>
      <Container maxWidth="sm" component={Paper} elevation={3} className="form-container">
        <Typography variant="h2" className="form-title">
          {title}
        </Typography>
        <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
          {children}
        </div>
      </Container>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    skills: [],
    languages: [],
    about: '',
    newSkill: '',
    newLanguage: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    age: '',
    country: '',
    skills: '',
    about: '',
  });

  const handleLanguagesChange = (languages) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: languages,
      newLanguage: '',
    }));
    // Clear error message when user adds a language
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      languages: '',
    }));
  };

  const addLanguage = () => {
    if (formData.newLanguage.trim() !== '') {
      handleLanguagesChange([...formData.languages, { name: formData.newLanguage.trim(), proficiency: 0 }]);
    }
  };

  const updateLanguageProficiency = (index, proficiency) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index].proficiency = proficiency;
    setFormData((prevData) => ({
      ...prevData,
      languages: updatedLanguages,
    }));
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSkillsChange = (skills) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: skills,
      newSkill: '',
    }));
    // Clear error message when user adds a skill
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      skills: '',
    }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim() !== '') {
      handleSkillsChange([...formData.skills, { name: formData.newSkill.trim(), proficiency: 0 }]);
    }
  };

  const updateSkillProficiency = (index, proficiency) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index].proficiency = proficiency;
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    // Perform form validation
    if (formData.name.trim() === '') {
      errors.name = 'Name is required.';
    }
    if (formData.age.trim() === '') {
      errors.age = 'Age is required.';
    } else if (!/^\d+$/.test(formData.age)) {
      errors.age = 'Age must be a number.';
    }
    if (formData.country.trim() === '') {
      errors.country = 'Country is required.';
    }
    if (formData.skills.length === 0) {
      errors.skills = 'At least one skill is required.';
    }
    if (formData.about.trim() === '') {
      errors.about = 'About is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // You can add your logic here to process and submit the form data
    navigate('/portfolio', { state: { formData } });
  };
  return (
    <>
      <Section title="Create Your 3D-Portfolio">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            label="Age"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            required
            error={!!formErrors.age}
            helperText={formErrors.age}
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            required
            error={!!formErrors.country}
            helperText={formErrors.country}
          />
          {/* ... (Your existing "Skills" section code) */}
          
          <div className="skills-section mt-4">
            <Typography variant="h6">Skills</Typography>
            <div className="chips-container">{formData.skills.map((skill, index) => (
              <div key={index} className="skill-chip">
                <Chip
                  label={`${skill.name} - ${skill.proficiency}%`}
                  onDelete={() => handleSkillsChange(formData.skills.filter(s => s !== skill))}
                  variant="outlined"
                  className="m-1"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.proficiency}
                  onChange={(e) => updateSkillProficiency(index, parseInt(e.target.value))}
                />
              </div>
            ))}</div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Add a skill"
                variant="outlined"
                value={formData.newSkill}
                onChange={(e) => handleChange('newSkill', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.newSkill.trim() !== '') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                error={!!formErrors.skills}
                helperText={formErrors.skills}
                style={{ flex: 1, marginTop: formData?.skills?.length ? '10px' : '' }}
              />
              <Button variant="contained" onClick={addSkill} style={{ marginLeft: '8px', backgroundColor: 'rgb(79 70 229 / 12)' }}>
                Add Skill
              </Button>
            </div>
          </div>
          <div className="languages-section mt-4">
            <Typography variant="h6">Languages</Typography>
            <div className="chips-container">
              {formData.languages.map((language, index) => (
                <div key={index} className="skill-chip">
                  <Chip
                    label={`${language.name} - ${language.proficiency}%`}
                    onDelete={() => handleLanguagesChange(formData.languages.filter(l => l !== language))}
                    variant="outlined"
                    className="m-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={language.proficiency}
                    onChange={(e) => updateLanguageProficiency(index, parseInt(e.target.value))}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Add a language"
                variant="outlined"
                value={formData.newLanguage}
                onChange={(e) => handleChange('newLanguage', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.newLanguage.trim() !== '') {
                    e.preventDefault()
                    addLanguage();
                  }
                }}
                error={!!formErrors.languages}
                helperText={formErrors.languages}
                style={{ flex: 1, marginTop: formData?.languages?.length ? '10px' : '' }}
              />
              <Button variant="contained" onClick={addLanguage} style={{ marginLeft: '8px', backgroundColor: 'rgb(79 70 229 / 12)' }}>
                Add Language
              </Button>
            </div>
          </div>
          {/* ... (Your existing TextField and Button components) */}
          <TextField
            label="About"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formData.about}
            onChange={(e) => handleChange('about', e.target.value)}
            sx={{ marginTop: '14px', marginBottom: '14px' }}
            required
            error={!!formErrors.about}
            helperText={formErrors.about}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'rgb(79 70 229 / 12)' }}
            size="large"
          >
            Submit
          </Button>
        </form>
      </Section>
    </>
  );
};

export default App;
