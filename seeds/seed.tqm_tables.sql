BEGIN;

TRUNCATE
  tqm_users
  RESTART IDENTITY CASCADE;

INSERT INTO tqm_users (user_id, first_name, last_name, email, birthday, gender, password, date_created)
VALUES
  ('ut1', 'juan','baltazar', 'juan.baltazar1@gmail.com', '12/05/1983', 'male','$2a$12$Qe5PWg22gVg.nD9/CCqoOeOjzyPGjELTXj8ktkUcTeTd4pDs.6ayq', '07/07/2020'),
  ('ut2', 'megan', 'baltazar', 'megan.laurel17@gmail.com', '10/17/1981', 'female', '$2a$12$Qe5PWg22gVg.nD9/CCqoOeOjzyPGjELTXj8ktkUcTeTd4pDs.6ayq', '07/07/2020');


COMMIT;