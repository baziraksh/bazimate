-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE item_type AS ENUM ('note', 'syllabus', 'paper');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Create profiles table
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    college TEXT,
    branch TEXT,
    year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notes table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    subject TEXT NOT NULL,
    semester INTEGER NOT NULL,
    branch TEXT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0,
    uploaded_by UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create syllabus table
CREATE TABLE syllabus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    branch TEXT NOT NULL,
    semester INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create previous_papers table
CREATE TABLE previous_papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    subject TEXT NOT NULL,
    year INTEGER NOT NULL,
    branch TEXT NOT NULL,
    semester INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    item_type item_type NOT NULL,
    item_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    item_type item_type NOT NULL,
    item_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id) -- One review per user per item
);

-- Create indexes for better performance
CREATE INDEX idx_notes_branch_semester ON notes(branch, semester);
CREATE INDEX idx_notes_subject ON notes(subject);
CREATE INDEX idx_notes_uploaded_by ON notes(uploaded_by);
CREATE INDEX idx_syllabus_branch_semester ON syllabus(branch, semester);
CREATE INDEX idx_previous_papers_year_branch ON previous_papers(year, branch);
CREATE INDEX idx_previous_papers_subject ON previous_papers(subject);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_reviews_item ON reviews(item_type, item_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE syllabus ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for notes
CREATE POLICY "Anyone can view notes" ON notes
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert notes" ON notes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own notes" ON notes
    FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own notes" ON notes
    FOR DELETE USING (auth.uid() = uploaded_by);

-- RLS Policies for syllabus
CREATE POLICY "Anyone can view syllabus" ON syllabus
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert syllabus" ON syllabus
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for previous_papers
CREATE POLICY "Anyone can view previous papers" ON previous_papers
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert previous papers" ON previous_papers
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for purchases
CREATE POLICY "Users can view their own purchases" ON purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases" ON purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
