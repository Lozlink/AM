-- Add status column to cars table
-- Valid values: 'in_stock', 'sold', 'deposit_taken'
ALTER TABLE cars
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'in_stock'
CHECK (status IN ('in_stock', 'sold', 'deposit_taken'));

-- Set all existing cars to 'in_stock'
UPDATE cars SET status = 'in_stock' WHERE status IS NULL;
