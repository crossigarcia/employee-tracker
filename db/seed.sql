use employee_tracker; 

INSERT INTO department
    (name)
VALUES
    ('Curatorial'),
    ('Conservation'),
    ('Facilities'),
    ('Human Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Chief Curator', 750000, 1),
    ('Curatorial Assistant', 500000, 1),
    ('Head of Conservation', 50000, 2),
    ('Associate Conservator', 1000000, 2),
    ('Facilities Director', 1000000, 3),
    ('Security Guard', 60000, 3),
    ('Preparator', 250000, 3),
    ('HR Leader', 250000, 4),
    ('HR Assistant', 50000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Minerva', 'McGonagall', 1, NULL),
    ('Luna', 'Lovegood', 2, 1),
    ('Severus', 'Snape', 3, NULL),
    ('Draco', 'Malfoy', 4, 3),
    ('Rubeus', 'Hagrid', 5, NULL),
    ('Harry', 'Potter', 6, 5),
    ('Ronald', 'Weasley', 7, 5),
    ('Remus', 'Lupin', 8, NULL),
    ('Hermione', 'Granger', 9, 8);
