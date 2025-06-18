import { supabase } from '@/lib/supabase'
import { Car } from '@/lib/supabase'
import VehiclesPageClient from './VehiclesPageClient'

async function getCars(): Promise<Car[]> {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching cars:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching cars:', error)
    return []
  }
}

export default async function VehiclesPage() {
  const cars = await getCars()
  
  return <VehiclesPageClient cars={cars} />
} 