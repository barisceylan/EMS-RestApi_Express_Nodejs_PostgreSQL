CREATE DATABASE ems_database;

CREATE TABLE  employee(
    emp_id SERIAL PRIMARY KEY,    
    name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    e_mail VARCHAR NOT NULL,
    phone BIGINT,
    start_date DATE,
    salary SMALLINT,
    department VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    manager VARCHAR NOT NULL
);


CREATE TABLE  department(
    dep_id SERIAL PRIMARY KEY,    
    department VARCHAR NOT NULL,
    manager VARCHAR NOT NULL,
    location VARCHAR NOT NULL
);

CREATE TABLE  location(
    loc_id SERIAL PRIMARY KEY,    
    location VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    zipcode INT
);

CREATE TABLE  title(
    title_id SERIAL PRIMARY KEY,    
    start_date DATE,
    end_date DATE,
    title VARCHAR NOT NULL,
    department VARCHAR NOT NULL
);


