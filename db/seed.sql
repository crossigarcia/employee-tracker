use employee_tracker; 

INSERT INTO department
    (name)
VALUES
    ('Curatorial'),
    ('Conservation'),
    ('Groundskeeping'),
    ('Muggle Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Chief Curator', 750000, 1),
    ('Curatorial Assistant', 500000, 1),
    ('Head of Conservation', 50000, 2),
    ('Associate Conservator', 1000000, 2),
    ('Keeper of Keys', 1000000, 3),
    ('Dragonologist', 60000, 3),
    ('Assistant to the Keeper', 250000, 3),
    ('MR Leader', 250000, 4),
    ('MR Assistant', 50000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Minerva', 'McGonagall', 1, NULL),
    ('Luna', 'Lovegood', 2, 1),
    ('Severus', 'Snape', 3, NULL),
    ('Draco', 'Malfoy', 4, 3),
    ('Rubeus', 'Hagrid', 5, NULL),
    ('Charlie', 'Weasley', 6, 5),
    ('Neville', 'Longbottom', 7, 5),
    ('Charity', 'Burbage', 8, NULL),
    ('Hermione', 'Granger', 9, 8);
