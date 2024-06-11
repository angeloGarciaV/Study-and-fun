USE gatito_leon;

-- Insertando datos en la tabla 'users'
INSERT INTO users (username, password, email) VALUES
('user1', 'hashed_password1', 'user1@example.com'),
('user2', 'hashed_password2', 'user2@example.com'),
('user3', 'hashed_password3', 'user3@example.com');

-- Insertando datos en la tabla 'game_state'
INSERT INTO game_state (user_id, stage, state) VALUES
(1, 1, 'Iniciado'),
(1, 2, 'No Iniciado'),
(2, 1, 'Iniciado');

-- Insertando datos en la tabla 'scores'
INSERT INTO scores (user_id, score) VALUES
(1, 100),
(2, 200);
