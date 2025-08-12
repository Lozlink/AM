-- Create vehicle_images table
CREATE TABLE IF NOT EXISTS vehicle_images (
                                              id SERIAL PRIMARY KEY,
                                              filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    public_url VARCHAR(500) NOT NULL,
    vehicle_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_filename ON vehicle_images(filename);

-- Enable Row Level Security
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON vehicle_images
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON vehicle_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON vehicle_images
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON vehicle_images
  FOR DELETE USING (auth.role() = 'authenticated');