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

INSERT INTO tqm_gen_questions (question_id, question, category, section)
VALUES
  ('e773a595-5990-4678-a63c-9ea11f3df831', 'How do you feel mentally, today?', 'Personal', 'Opening'),
  ('4b565474-112b-462a-abbc-17cceaf34e9c', 'How do you feel emotionally, today?', 'Personal', 'Opening'),
  ('6918450a-acca-478b-a890-0659ac50c839', 'How do you feel physically, today?', 'Personal', 'Opening'),
  ('502bda60-984e-42b0-8673-8f35c838eaff', 'How do you feel about your relationship with partner?', 'Overall', 'Relationship'),
  ('f7464740-6c7b-4654-a190-4f6f30395ba8', 'How do you feel about your sex life with partner?', 'Sex', 'Relationship'),
  ('04684f9d-d0d6-4f81-9d7b-336938edba51', 'How do you feel about your emotional connection with partner?', 'Friendship', 'Relationship'),
  ('6379ee97-a00e-4c31-9cc6-d28469a06f4b', 'How do you feel about the trust between you and partner?', 'Trust', 'Relationship'),
  ('ca925037-2b20-4d7d-ac41-f3b22452b385', 'How do you feel about the honesty between you and partner?', 'Communication', 'Relationship'),
  ('84d2cf7e-8bf7-43cd-97c9-2f1e44f961a2', 'How do you feel about the communication between you and partner?', 'Communication', 'Relationship'),
  ('dbb7564d-3a31-4fec-90fa-2f4e9401ab7b', 'How do you feel about the compromises made between you and partner?', 'Compromises', 'Relationship'),
  ('b8dc039d-5438-4df6-828b-61418a1f70dd', 'How do you feel about your independece?', 'Personal', 'Opening'),
  ('b67382bb-ce5a-4585-a748-3085e30b7c45', 'How do you feel about your partnership with partner?', 'Friendship', 'Relationship'),
  ('6775cc23-9349-4f79-8f70-6d4d1f655cf5', 'How do you feel about your friendship with partner?', 'Friendship', 'Relationship'),
  ('2e6f62f6-a780-4315-995a-0c2f2809e830', 'How do you feel about parenting with partner?', 'Parenting', 'Relationship');

  INSERT INTO tqm_user_relationship (id, relationship_id, user_id, partner_id, anniversary, date_created)
  VALUES
    ('1', 'f94cb634-474b-440a-8390-d58e784bde0e', '73b8bb71-c339-4029-bc70-6204928aa77b', '13c0713a-ec31-4378-8aad-37a4c9f4a304', '5/04/2012', '8/21/2020' );

COMMIT;
