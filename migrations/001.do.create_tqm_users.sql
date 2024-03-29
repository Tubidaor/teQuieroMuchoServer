CREATE TABLE tqm_users (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY,
  user_id uuid NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  gender TEXT NOT NULL,
  birthday DATE NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);