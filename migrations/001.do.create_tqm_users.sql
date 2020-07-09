CREATE TABLE tqm_users (
  user_id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  gender TEXT NOT NULL,
  birthday DATE NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL
);