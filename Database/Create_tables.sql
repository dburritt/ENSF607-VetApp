-- DROP DATABASE IF EXISTS VETAPP;
CREATE DATABASE VETAPP; 
USE VETAPP;

CREATE TABLE `animal` (
  `AnimalId` varchar(45) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `breed` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AnimalId`),
  UNIQUE KEY `AnimalId_UNIQUE` (`AnimalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS PRESCRIPTION;
CREATE TABLE PRESCRIPTION (
	PrescriptionId			integer	not null,
	TreatmentId				integer not null,
	AnimalId				integer not null,
    Prescription			varchar(50) not null,
    Notes					mediumtext,
	primary key (PrescriptionId),
    foreign key (TreatmentId) references TREATMENT(TreatmentId),
	foreign key (AnimalId) references Animal(AnimalId)
);

DROP TABLE IF EXISTS COMMENTS;
CREATE TABLE COMMENTS (
	CommentId			integer	not null,
	UserId				integer not null,
	AnimalId			integer not null,
    CommentDate			DATETIME not null,
    CommentText			mediumtext not null,
	primary key (PrescriptionId),
    foreign key (UserId) references USER(UserId),
	foreign key (AnimalId) references Animal(AnimalId)
);

DROP TABLE IF EXISTS ANIMAL_STATUS;
CREATE TABLE ANIMAL_STATUS (
	AnimalId			integer	not null,
	AnimalStatus		VARCHAR(100) not null,
    StatusDate			DATETIME not null,
	primary key (AnimalId),
	foreign key (AnimalId) references Animal(AnimalId)
);
