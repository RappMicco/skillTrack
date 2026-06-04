CREATE TABLE skill_matrix(
	matrix_id SERIAL PRIMARY KEY,
	emp_id INTEGER REFERENCES employees(emp_id),
	skill_id INTEGER REFERENCES skills(skill_id),
	proficiency_id INTEGER REFERENCES skill_proficiency(proficiency_id)
);
