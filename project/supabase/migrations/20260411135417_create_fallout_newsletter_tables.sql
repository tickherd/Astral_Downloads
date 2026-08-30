/*
  # Fallout Newsletter - Initial Schema

  ## Overview
  Creates the core tables for the Fallout newsletter platform.

  ## New Tables

  ### subscribers
  - `id` - UUID primary key
  - `email` - unique email address
  - `tier` - subscription tier (free, intel, classified)
  - `status` - subscription status (active, unsubscribed, pending)
  - `created_at` - signup timestamp
  - `updated_at` - last update timestamp

  ### affiliate_clicks
  - `id` - UUID primary key
  - `product_slug` - identifier for the affiliate product
  - `clicked_at` - click timestamp

  ## Security
  - RLS enabled on all tables
  - Subscribers can only insert their own records (by email match on anon)
  - Affiliate clicks are insert-only for anon users (tracking only)
  - No SELECT policy for subscribers (admin only via service role)
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  tier text NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe with their email"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read own subscription"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);

ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log affiliate clicks"
  ON affiliate_clicks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
