import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ycppdsdzvjbtbwigjdqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcHBkc2R6dmpidGJ3aWdqZHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NDg0NzEsImV4cCI6MjAzNjAyNDQ3MX0.Kcm9SKO_foChxvyJ0qa4pJqShKcdVoY-15q_XrMBm7w"
);
