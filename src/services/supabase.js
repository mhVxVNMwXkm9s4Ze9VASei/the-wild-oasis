import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://phwqumzetrbohpeqtqxa.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod3F1bXpldHJib2hwZXF0cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5OTQ0NjAsImV4cCI6MjAxMjU3MDQ2MH0.ptWXJdRcZISyKJLTFCj13Iw6LpmHuV0e332IHEKL0SQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
