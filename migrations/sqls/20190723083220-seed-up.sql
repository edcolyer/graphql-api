CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  location VARCHAR(80),
  password VARCHAR(200) -- TODO: make NOT NULL
);

CREATE TABLE Posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  view_count INTEGER NOT NULL DEFAULT 0,
  parent_id INTEGER,
  content VARCHAR(1000) NOT NULL DEFAULT '',
  owner_user_id INTEGER NOT NULL,
  posted_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  edited_timestamp TIMESTAMP,

  FOREIGN KEY (parent_id) REFERENCES Posts (id) ON DELETE CASCADE,
  FOREIGN KEY (owner_user_id) REFERENCES Users (id) ON DELETE CASCADE
);

ALTER DATABASE forum SET timezone TO 'Universal';
SELECT pg_reload_conf();
