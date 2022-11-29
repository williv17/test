BEGIN;

TRUNCATE
  pups,
  users,
  pup_comments
  RESTART IDENTITY CASCADE;

COMMIT;