USE Study_and_fun;

-- Insertar datos en la tabla 'users' primero
INSERT INTO users (username, password, email) VALUES
('lisa', 'hashed_password_lisa', 'lisa@example.com'),
('marta', 'hashed_password_marta', 'marta@example.com'),
('nina', 'hashed_password_nina', 'nina@example.com'),
('oscar', 'hashed_password_oscar', 'oscar@example.com'),
('paul', 'hashed_password_paul', 'paul@example.com'),
('quinn', 'hashed_password_quinn', 'quinn@example.com'),
('rachel', 'hashed_password_rachel', 'rachel@example.com');

-- Asegúrate de que los IDs insertados aquí existen en la tabla 'users'
-- Insertar datos en la tabla 'game_state'
INSERT INTO game_state (user_id, stage, state) VALUES
(1, 1, 'Iniciado'),
(1, 2, 'Iniciado'),
(2, 1, 'Completado'),
(3, 1, 'Iniciado'),
(4, 1, 'No Iniciado'),
(5, 1, 'Completado'),
(6, 1, 'Iniciado'),
(7, 1, 'Completado');

-- Insertar datos en la tabla 'scores'
INSERT INTO scores (user_id, score) VALUES
(1, 220),
(2, 210),
(3, 190),
(4, 160),
(5, 230),
(6, 170),
(7, 240);
