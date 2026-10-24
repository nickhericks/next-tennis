-- Same columns as the original MySQL `events` table from php-tennis.
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  display CHAR(1) NOT NULL DEFAULT 'Y',
  match_date TEXT NOT NULL,
  match_time TEXT NOT NULL,
  number_of_courts INT NOT NULL,
  number_of_players INT NOT NULL,
  player_1 TEXT NOT NULL DEFAULT '',
  player_2 TEXT NOT NULL DEFAULT '',
  player_3 TEXT NOT NULL DEFAULT '',
  player_4 TEXT NOT NULL DEFAULT '',
  player_5 TEXT NOT NULL DEFAULT '',
  player_6 TEXT NOT NULL DEFAULT '',
  player_7 TEXT NOT NULL DEFAULT '',
  player_8 TEXT NOT NULL DEFAULT ''
);
