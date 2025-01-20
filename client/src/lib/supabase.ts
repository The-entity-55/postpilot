import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvtxavtrxwuhgtexxral.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dHhhdnRyeHd1aGd0ZXh4cmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyODgwOTQsImV4cCI6MjA1Mjg2NDA5NH0.aBGz83CImv8wRfzB2fhqgpU-nSx3L6-ySGKjL7GCVcE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)