# Vercel Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository with your code
- Supabase project set up
- dotenvx CLI installed

## Environment Variables Setup

### 1. Create Production Environment File
Create a `.env.production` file with your production environment variables:

```bash
# Create production environment file
dotenvx create .env.production
```

Add your production environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Encrypt Production Environment File
```bash
dotenvx encrypt .env.production
```

### 3. Vercel Environment Variables
In your Vercel dashboard, add these environment variables:
```
DOTENVX_PASSWORD=your_dotenvx_password
DOTENVX_ENV_FILE=.env.production.encrypted
```

### 4. Get Supabase Credentials
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Add these to your `.env.production` file

### 5. Local Development
For local development, create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** The build process uses `dotenvx run -f .env.production` for production deployments.

## Database Setup

### 1. Create Tables in Supabase
Run the SQL scripts in your Supabase SQL editor:

#### Cars Table (if not already created):
```sql
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('excellent', 'good', 'fair')),
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  color TEXT NOT NULL,
  features TEXT[],
  stock_number TEXT NOT NULL,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Inquiries Table:
```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('general', 'vehicle', 'quote', 'partnership')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on inquiries" ON inquiries
  FOR ALL USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2. Seed Sample Data (Optional)
Run the seed script to add sample cars:
```bash
npm run seed
```

## Deployment Steps

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings

### 2. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build` (uses dotenvx run -f .env.production)
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Environment Variables
Add these environment variables in the Vercel dashboard:
```
DOTENVX_PASSWORD=your_dotenvx_password
DOTENVX_ENV_FILE=.env.production.encrypted
```

**Note:** The actual environment variables (NEXT_PUBLIC_SUPABASE_URL, etc.) should be in your encrypted `.env.production` file, not in Vercel's environment variables.

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Post-Deployment

### 1. Test Functionality
- Check all pages load correctly
- Test contact form submission
- Verify vehicle filtering works
- Test admin page functionality

### 2. Custom Domain (Optional)
- Add your custom domain in Vercel settings
- Configure DNS records as instructed

### 3. Monitoring
- Set up Vercel Analytics if needed
- Monitor function logs for any errors

## Troubleshooting

### Common Issues:
1. **Environment Variables Not Working**: Make sure they're added to Vercel dashboard
2. **Database Connection Errors**: Verify Supabase URL and keys are correct
3. **Build Failures**: Check build logs for missing dependencies

### Support:
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs 