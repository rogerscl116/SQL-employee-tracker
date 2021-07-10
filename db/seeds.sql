-- department seeds
INSERT INTO department (id, name)
VALUES 
    (1, "Production"),
    (2, "Sales"),
    (3, "Human Resouces"),
    (4, "IT");

-- role seeds
INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Production Technician", 40000, 1),
    (2, "Production Manager", 70000, 1),
    (3, "Sales Specialist", 42000, 2),
    (4, "Sales Manager", 80000, 2),
    (5, "HR Director", 100000, 3),
    (6, "HR Coordinator", 45000, 3),
    (7, "IT Manager", 80000, 4),
    (8, "IT Project Coordinator", 52000, 4);

-- employee seeds
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Leslie", "Knope", 5, null),
    (2, "Donna", "Meagle", 6, 5),
    (3, "Ron", "Swanson", 4, null),
    (4, "Jerry", "Gergich", 3, 4),
    (5, "Ann", "Perkins", 8, 7),
    (6, "Tom", "Haverford", 7, null),
    (7, "Andy", "Dwyer", 1, 2),
    (8, "April", "Ludgate", 2, null);