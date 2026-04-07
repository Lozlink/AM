import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseService = process.env.SUPABASE_SERVICE_KEY!

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

export type CarStatus = 'in_stock' | 'sold' | 'under_offer'

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
  status: CarStatus
  created_at: string
} 