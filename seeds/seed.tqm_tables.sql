BEGIN;

TRUNCATE
  tqm_users
  RESTART IDENTITY CASCADE;

INSERT INTO tqm_users (user_id, first_name, last_name, email, birthday, gender, password, date_created)
VALUES
  ('73b8bb71-c339-4029-bc70-6204928aa77b', 'juan','baltazar', 'juan.baltazar1@gmail.com', '12/05/1983', 'male','$2a$12$Qe5PWg22gVg.nD9/CCqoOeOjzyPGjELTXj8ktkUcTeTd4pDs.6ayq', '07/07/2020'),
  ('13c0713a-ec31-4378-8aad-37a4c9f4a304', 'megan', 'baltazar', 'megan.laurel17@gmail.com', '10/17/1981', 'female', '$2a$12$Qe5PWg22gVg.nD9/CCqoOeOjzyPGjELTXj8ktkUcTeTd4pDs.6ayq', '07/07/2020');

INSERT INTO tqm_text_entries (user_id, text, entry_id, date_created)
VALUES
  ('73b8bb71-c339-4029-bc70-6204928aa77b','sample entry text', '2e537fee-1e43-4357-890c-e96c477ba905', '07/10/2020');

COMMIT;
