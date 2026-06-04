CREATE TABLE employees (
	emp_id SERIAL PRIMARY KEY,
	emp_no INTEGER UNIQUE NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	emp_level VARCHAr(10) NOT NULL,
	emp_group VARCHAR(30) NOT NULL,
	is_active boolean DEFAULT true
);
