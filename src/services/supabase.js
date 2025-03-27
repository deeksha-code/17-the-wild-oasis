import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mhserqpvctwrqnfazpcc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2VycXB2Y3R3cnFuZmF6cGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NDI0MzQsImV4cCI6MjA1NzQxODQzNH0.RaGmXUrSTculooEXZiDEkGZ3auMnzx-ci91hs9AIFj0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
