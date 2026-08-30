import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface DailyIntelQuestion {
  id: string
  statement: string
  answer: boolean
  explanation: string
  source: string
  category: string
  publish_date: string
}

export interface DailyIntelAnswer {
  id: string
  user_id: string
  question_id: string
  user_answer: boolean
  correct: boolean
  answered_at: string
  streak: number
}
