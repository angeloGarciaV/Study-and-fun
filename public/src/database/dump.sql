USE gatito_leon;

-- Insertar datos en la tabla 'users'
INSERT INTO users (username, password, email) VALUES
('alice', 'hashed_password_alice', 'alice@example.com'),
('bob', 'hashed_password_bob', 'bob@example.com'),
('carol', 'hashed_password_carol', 'carol@example.com'),
('dave', 'hashed_password_dave', 'dave@example.com'),
('eve', 'hashed_password_eve', 'eve@example.com'),
('frank', 'hashed_password_frank', 'frank@example.com'),
('grace', 'hashed_password_grace', 'grace@example.com'),
('hank', 'hashed_password_hank', 'hank@example.com'),
('ida', 'hashed_password_ida', 'ida@example.com'),
('judy', 'hashed_password_judy', 'judy@example.com');

-- Insertar datos en la tabla 'game_state'
INSERT INTO game_state (user_id, stage, state) VALUES
(1, 1, 'Iniciado'),
(1, 2, 'Completado'),
(2, 1, 'Iniciado'),
(3, 1, 'No Iniciado'),
(4, 1, 'Iniciado'),
(4, 2, 'Iniciado'),
(5, 1, 'Completado'),
(6, 1, 'Iniciado'),
(7, 1, 'No Iniciado'),
(8, 1, 'Completado'),
(9, 1, 'Iniciado'),
(10, 1, 'Completado');

-- Insertar datos en la tabla 'scores'
INSERT INTO scores (user_id, score) VALUES
(1, 150),
(2, 200),
(3, 180),
(4, 220),
(5, 210),
(6, 190),
(7, 160),
(8, 230),
(9, 170),
(10, 240);
