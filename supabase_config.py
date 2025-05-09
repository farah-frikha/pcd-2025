from supabase import create_client, Client

SUPABASE_URL = "https://mfglguifmhbxtjjeawxz.supabase.co"  # remplace par ton URL
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZ2xndWlmbWhieHRqamVhd3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NTQ4NjcsImV4cCI6MjA2MTUzMDg2N30.mqA2fcUklMYgpHYRdt3R4jQ7YaTWgL9-0ZqRBAGLlnw"  # remplace par ta clé

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
