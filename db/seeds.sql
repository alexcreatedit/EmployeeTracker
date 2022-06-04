INSERT INTO department (name)
VALUES  ('Executive'),
        ('Customer Service'),
        ('Human Resources'),
        ('Sales'),
        ('Finance'),
        ('Development'),
        ('Management');

INSERT INTO role (title, salary, department_id)
VALUES  ('CEO', 1000000, 1),
        ('VP', 300000, 1),
        ('Customer Service Rep', 65000, 2),
        ('Human Resources Rep', 70000, 3),
        ('Sales Lead', 215000, 4),
        ('Accountant', 125000, 5),
        ('Developer', 115000, 6),
        ('Management', 150000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Alex', 'Ortega', 1, NULL),
        ('Faye', 'Ortega', 2, NULL),
        ('Marcela', 'Sawyerr', 3, 2),
        ('Justin', 'Sawyerr', 4, 2),
        ('Eli', 'Rojas', 5, 3),
        ('Edgar', 'Montenegro', 6, 3),
        ('Robert', 'Carrillo', 6, 4),
        ('India', 'Carrillo', 7, 4),
        ('August', 'Ortega', 8, 5),
        ('Korabella', 'Ortega', 8, 5);