/*
  # Daily Intel — Interactive Daily Challenge

  ## Overview
  Creates tables for the "Daily Intel" feature: a daily true/false challenge
  where users decide if a statement is "Documented" (verified from public
  records) or "Disinformation" (false or unproven). Users build streaks by
  answering correctly on consecutive days. Login (auth) persists streaks
  across devices; anonymous users get a local streak via localStorage.

  ## New Tables

  ### daily_intel_questions
  - `id` - UUID primary key
  - `statement` - the statement presented to the user
  - `answer` - boolean: true = Documented, false = Disinformation
  - `explanation` - revealed after answering, with context and sourcing
  - `source` - short source citation
  - `category` - which Fallout section it relates to
  - `publish_date` - the date this question is scheduled for
  - `created_at` - creation timestamp

  ### daily_intel_answers
  - `id` - UUID primary key
  - `user_id` - UUID, references auth.users, defaults to auth.uid()
  - `question_id` - UUID, references daily_intel_questions
  - `user_answer` - boolean: the user's guess
  - `correct` - boolean: whether the user's answer matched
  - `answered_at` - timestamp of answer
  - `streak` - integer: the user's streak count at time of answer

  ## Security
  - RLS enabled on all tables
  - Questions are readable by everyone (anon + authenticated)
  - Answers are owner-scoped: authenticated users can only read/insert their own answers
  - No one can modify questions through the API
*/

CREATE TABLE IF NOT EXISTS daily_intel_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  statement text NOT NULL,
  answer boolean NOT NULL,
  explanation text NOT NULL,
  source text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  publish_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_intel_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read questions" ON daily_intel_questions;
CREATE POLICY "Anyone can read questions"
  ON daily_intel_questions FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS daily_intel_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES daily_intel_questions(id) ON DELETE CASCADE,
  user_answer boolean NOT NULL,
  correct boolean NOT NULL,
  answered_at timestamptz DEFAULT now(),
  streak integer NOT NULL DEFAULT 0,
  UNIQUE(user_id, question_id)
);

ALTER TABLE daily_intel_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own answers" ON daily_intel_answers;
CREATE POLICY "Users can read own answers"
  ON daily_intel_answers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own answers" ON daily_intel_answers;
CREATE POLICY "Users can insert own answers"
  ON daily_intel_answers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own answers" ON daily_intel_answers;
CREATE POLICY "Users can update own answers"
  ON daily_intel_answers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own answers" ON daily_intel_answers;
CREATE POLICY "Users can delete own answers"
  ON daily_intel_answers FOR DELETE
  TO authenticated USING (auth.uid() = user_id);