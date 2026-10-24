-- Sample events, only inserted into an empty table.
INSERT INTO events (match_date, match_time, number_of_courts, number_of_players, player_1, player_2)
SELECT * FROM (VALUES
  ('Saturday 11/7', '9:00am', 1, 4, 'Tom', 'Ben'),
  ('Saturday 11/14', '9:00am', 2, 8, '', '')
) AS v
WHERE NOT EXISTS (SELECT 1 FROM events);
