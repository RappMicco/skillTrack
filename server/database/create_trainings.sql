CREATE TABLE trainings (
	training_id SERIAL PRIMARY KEY,
	training_name VARCHAR(100) UNIQUE NOT NULL,
	training_provider VARCHAR(30) NOT NULL
);