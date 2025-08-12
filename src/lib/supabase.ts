import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseService = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// If you don't need realtime, you can disable it:
// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   realtime: false
// })

export interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  color: string
  description: string
  images: string[]
  features: string[]
  vin: string
  stock_number: string
  condition: 'excellent' | 'good' | 'fair'
  created_at: string
} 