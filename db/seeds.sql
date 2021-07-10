-- department seeds
INSERT INTO department (name)
VALUES 
    ("Production"),
    ("Sales"),
    ("Human Resouces"),
    ("IT");

-- role seeds
INSERT INTO role (title, salary, department_id)
VALUES 
    ("Production Technician", 40000, 1),
    ("Production Manager", 70000, 1),
    ("Sales Specialist", 42000, 2),
    ("Sales Manager", 80000, 2),
    ("HR Director", 100000, 3),
    ("HR Coordinator", 45000, 3),
    ("IT Manager", 80000, 4),
    ("IT Project Coordinator", 52000, 4);

-- employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Leslie", "Knope", 5, null),
    ("Donna", "Meagle", 6, 5),
    ("Ron", "Swanson", 4, null),
    ("Jerry", "Gergich", 3, 4),
    ("Ann", "Perkins", 8, 7),
    ("Tom", "Haverford", 7, null),
    ("Andy", "Dwyer", 1, 2),
    ("April", "Ludgate", 2, null);