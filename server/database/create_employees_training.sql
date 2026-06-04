CREATE TABLE employees_training (
	emp_training_id SERIAL PRIMARY KEY,
	emp_id INTEGER REFERENCES employees(emp_id),
	status_id INTEGER REFERENCES status(status_id),
	training_id INTEGER REFERENCES trainings(training_id),
	start_date TIMESTAMP,
	end_date TIMESTAMP,
	progress INTEGER DEFAULT 0,
	remarks TEXT
);
