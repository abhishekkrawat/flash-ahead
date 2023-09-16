import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qalrwrjexvconhlgbzxq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHJ3cmpleHZjb25obGdienhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUyOTkxOTMsImV4cCI6MjAwMDg3NTE5M30.ADsw8ga3NxEM7ZqPNftH-zEh7qEdePKmNJ9namEjt_w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
