-- ENSF 608 Final Project - Query Demonstration
-- Group Members: Gregory Slowski, Drew Burritt, Thomas Scott

USE VETAPP608;
-- # 1 SHOW TABLES
SELECT * FROM ANIMAL;
SELECT * FROM USER;
SELECT * FROM ANIMAL_REQUEST;
SELECT * FROM ANIMAL_STATUS;
SELECT * FROM HEALTH_RECORD;
SELECT * FROM WEIGHT;
SELECT * FROM TREATMENT;
SELECT * FROM PRESCRIPTION;
SELECT * FROM REMINDERS;
SELECT * FROM IMAGE;
SELECT * FROM COMMENTS;
SELECT * FROM STUDENT;

-- # 2 A basic retrieval query
SELECT animalId, Name, Species, Breed FROM ANIMAL WHERE animalId = 53195;

-- # 3 A retrieval query with ordered results
SELECT  Name, Species, Breed, BirthDate FROM ANIMAL ORDER BY BirthDate;

-- # 4 A nested retrieval query 
	-- Get available animals
SELECT * FROM ANIMAL WHERE animalId NOT IN (SELECT animalId FROM ANIMAL_REQUEST WHERE state IN ("requested","Accept_by_Admin", "Ready"));

-- # 5 A retrieval query using joined tables
SELECT A.Name, T.Description FROM  (ANIMAL AS A LEFT OUTER JOIN TREATMENT AS T ON T.AnimalId = A.AnimalId);

-- # 6 An update operation with any necessary triggers
SELECT * FROM REMINDERS;
UPDATE REMINDERS SET DueDate="2021-12-25", Text="this is an updated reminder!" WHERE ReminderId = '1';
SELECT * FROM REMINDERS;

-- # 7 A deletion operation with any necessary triggers
SELECT * FROM REMINDERS;
DELETE FROM REMINDERS WHERE ReminderId = '2';
SELECT * FROM REMINDERS;