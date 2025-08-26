-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('notes_files', 'notes_files', false),
    ('syllabus_files', 'syllabus_files', false),
    ('papers_files', 'papers_files', false);

-- Storage policies for notes_files bucket
CREATE POLICY "Authenticated users can upload notes files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'notes_files' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view notes files" ON storage.objects
    FOR SELECT USING (bucket_id = 'notes_files');

CREATE POLICY "Users can update their own notes files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'notes_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own notes files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'notes_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Storage policies for syllabus_files bucket
CREATE POLICY "Authenticated users can upload syllabus files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'syllabus_files' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Anyone can view syllabus files" ON storage.objects
    FOR SELECT USING (bucket_id = 'syllabus_files');

CREATE POLICY "Users can update their own syllabus files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'syllabus_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own syllabus files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'syllabus_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Storage policies for papers_files bucket
CREATE POLICY "Authenticated users can upload papers files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'papers_files' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Anyone can view papers files" ON storage.objects
    FOR SELECT USING (bucket_id = 'papers_files');

CREATE POLICY "Users can update their own papers files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'papers_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own papers files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'papers_files' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );
