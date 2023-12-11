import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://frguzzvckafsjnivlmug.supabase.co";
const supabaseKey =
  "enter your public key";
export const supabase = createClient(supabaseUrl, supabaseKey);
