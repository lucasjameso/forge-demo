import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yusxiwplgxgqujapibhj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1c3hpd3BsZ3hncXVqYXBpYmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMDA4ODgsImV4cCI6MjA4OTc3Njg4OH0.y3n1nE98PqZ9AVog0044mgrAgwHshnaLPvQ2YzKeJEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
