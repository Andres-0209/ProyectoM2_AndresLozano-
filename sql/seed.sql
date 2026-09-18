INSERT INTO authors (name, email, bio) VALUES 
('Gabriel García Márquez', 'contacto@fundaciongabo.com', 'Escritor y periodista colombiano, máximo exponente del realismo mágico y ganador del Premio Nobel de Literatura en 1982.'),
('Isabel Allende', 'info@isabelallende.com', 'Escritora chilena y una de las autoras en español más leídas del mundo, famosa por novelas como "La casa de los espíritus".'),
('Stephen King', 'sking@stephenking.com', 'Prolífico autor estadounidense, maestro del terror, la ficción sobrenatural, el misterio y la fantasía.');

INSERT INTO posts (author_id, title, content, published) VALUES 
(1, 'Cien años de soledad', 'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.', true),
(2, 'La casa de los espíritus', 'Barrabás llegó a la familia por vía marítima, anotó la niña Clara con su delicada caligrafía. Ya entonces tenía el hábito de escribir las cosas importantes...', true),
(3, 'El Resplandor', 'Jack Torrance pensó: Oficialoso imbécil. A esto se reducía todo, según él. Un oficialoso imbécil al que le gustaba usar palabras grandes...', true);
