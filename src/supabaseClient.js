import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yezgtcxnmhpcbnyffcls.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllemd0Y3hubWhwY2JueWZmY2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODM4MjcsImV4cCI6MjA2NTQ1OTgyN30.eaz4h2QjCuBqwlVTrb2kj4DrmrIJi4gU_lvW7VgHd30";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Replace YOUR_PROJECT_ID and YOUR_ANON_KEY with your actual Supabase project ID and anon key.
