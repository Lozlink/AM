import { supabase } from '@/lib/supabase'
import { Car } from '@/lib/supabase'
import VehiclesPageClient from './VehiclesPageClient'

export const dynamic = 'force-dynamic'

async function getCars(): Promise<Car[]> {
  console.log('🔍 Starting getCars function...')
  console.log('🔧 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('🔑 Anon Key exists:', !!process.env.SUPABASE_ANON_KEY)

  try {
    console.log('📡 Making Supabase request...')

    // Try a simple count first
    const { count, error: countError } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })

    console.log('📊 Count query:', { count, countError })

    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })

    console.log('📊 Full query response:')
    console.log('  - Data:', data)
    console.log('  - Error:', error)
    console.log('  - Data length:', data?.length || 0)

    if (error) {
      console.error('❌ Supabase error details:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('💥 Catch block error:', error)
    return []
  }
}

export default async function VehiclesPage() {
  const cars = await getCars()
  console.log('🎯 Final cars in component:', cars?.length || 0)

  return <VehiclesPageClient cars={cars} />
}
