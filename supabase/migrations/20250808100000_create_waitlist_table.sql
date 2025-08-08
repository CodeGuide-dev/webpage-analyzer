-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow anyone to insert (for waitlist signup)
CREATE POLICY "Allow public insert" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read (for checking if email exists)
CREATE POLICY "Allow public read" ON public.waitlist
    FOR SELECT USING (true);

-- Only allow updates/deletes by authenticated users (admin functionality)
CREATE POLICY "Allow authenticated updates" ON public.waitlist
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes" ON public.waitlist
    FOR DELETE USING (auth.role() = 'authenticated');