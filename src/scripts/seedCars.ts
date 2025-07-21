import { supabase } from '@/lib/supabase';

async function seedCars() {
  const cars = [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      price: 23990,
      mileage: 42000,
      fuel_type: 'Petrol',
      transmission: 'Automatic',
      color: 'Silver',
      description: 'Reliable sedan, full service history, one owner. Excellent condition with low mileage for its age.',
      images: [
        'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=800&h=600&fit=crop'
      ],
      features: ['Bluetooth', 'Reverse Camera', 'Cruise Control', 'Alloy Wheels'],
      vin: 'JTNB11HK003123456',
      stock_number: 'AM001',
      condition: 'excellent',
    },
    {
      make: 'Mazda',
      model: 'CX-5',
      year: 2018,
      price: 27990,
      mileage: 61000,
      fuel_type: 'Diesel',
      transmission: 'Automatic',
      color: 'Red',
      description: 'Spacious SUV, great for families, well maintained. Perfect for weekend getaways.',
      images: [
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop'
      ],
      features: ['Leather Seats', 'Navigation', 'Sunroof', 'AWD'],
      vin: 'JM0KF4WLA00123456',
      stock_number: 'AM002',
      condition: 'good',
    },
    {
      make: 'Hyundai',
      model: 'i30',
      year: 2020,
      price: 21990,
      mileage: 31000,
      fuel_type: 'Petrol',
      transmission: 'Manual',
      color: 'Blue',
      description: 'Sporty hatchback, low kms, balance of new car warranty. Fun to drive and economical.',
      images: [
        'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&h=600&fit=crop'
      ],
      features: ['Apple CarPlay', 'Alloy Wheels', 'Heated Seats', 'Sport Mode'],
      vin: 'KMHH351EMLU123456',
      stock_number: 'AM003',
      condition: 'excellent',
    },
    {
      make: 'Ford',
      model: 'Ranger',
      year: 2017,
      price: 32990,
      mileage: 78000,
      fuel_type: 'Diesel',
      transmission: 'Automatic',
      color: 'White',
      description: 'Powerful ute, perfect for work or recreation. Towing capacity and off-road capability.',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
      ],
      features: ['4WD', 'Towing Package', 'Tonneau Cover', 'Bluetooth'],
      vin: 'MMFJXXGAJGJ123456',
      stock_number: 'AM004',
      condition: 'good',
    },
    {
      make: 'Honda',
      model: 'CR-V',
      year: 2019,
      price: 25990,
      mileage: 45000,
      fuel_type: 'Petrol',
      transmission: 'Automatic',
      color: 'Black',
      description: 'Reliable SUV with excellent fuel economy. Great family car with plenty of space.',
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
      ],
      features: ['Honda Sensing', 'Apple CarPlay', 'Alloy Wheels', 'Roof Rails'],
      vin: '5FNRL38467B123456',
      stock_number: 'AM005',
      condition: 'excellent',
    }
  ];

  console.log('Starting to seed cars...');

  for (const car of cars) {
    const { error } = await supabase.from('cars').insert([car]);
    if (error) {
      console.error('Error inserting car:', car.make, car.model, error);
    } else {
      console.log('✓ Inserted car:', car.make, car.model, '-', car.stock_number);
    }
  }
  
  console.log('Seeding complete!');
}

seedCars().catch(console.error); 