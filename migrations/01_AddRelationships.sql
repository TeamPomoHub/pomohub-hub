
ALTER TABLE Session ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User" (id);

ALTER TABLE Session ADD COLUMN user_id INTEGER;