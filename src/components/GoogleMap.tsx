'use client'
import { useLoadScript, GoogleMap as GoogleMapComponent, Marker } from '@react-google-maps/api'
import { useMemo, useState, useEffect } from 'react'

interface GoogleMapProps {
    address: string
    height?: string
    width?: string
    zoom?: number
}

const libraries: ("places" | "geometry")[] = ["places"]

export default function GoogleMap({
                                      address = "12/1017 Canley Vale road, Wetherill Park, 2164",
                                      height = "400px",
                                      width = "100%",
                                      zoom = 15
                                  }: GoogleMapProps) {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
    const [geocodeError, setGeocodeError] = useState<string | null>(null)

    // Get API key with fallback
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    })

    const mapOptions = useMemo(() => ({
        disableDefaultUI: false,
        clickableIcons: true,
        scrollwheel: true,
    }), [])

    useEffect(() => {
        if (!isLoaded || !window.google || !apiKey) return

        const geocoder = new window.google.maps.Geocoder()

        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results?.[0]?.geometry?.location) {
                const location = results[0].geometry.location
                setCoordinates({
                    lat: location.lat(),
                    lng: location.lng()
                })
                setGeocodeError(null)
            } else {
                setGeocodeError(`Geocoding failed: ${status}`)
                console.error('Geocode error:', status)
            }
        })
    }, [address, isLoaded, apiKey])

    // Show error if no API key
    if (!apiKey) {
        return (
            <div
                style={{ height, width }}
                className="rounded-lg shadow-md border border-red-200 bg-red-50 flex items-center justify-center"
            >
                <p className="text-red-600">Google Maps API key not configured</p>
            </div>
        )
    }

    if (loadError) {
        return (
            <div
                style={{ height, width }}
                className="rounded-lg shadow-md border border-red-200 bg-red-50 flex items-center justify-center"
            >
                <p className="text-red-600">Error loading maps</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div
                style={{ height, width }}
                className="rounded-lg shadow-md border border-gray-200 bg-gray-100 flex items-center justify-center"
            >
                <p className="text-gray-600">Loading map...</p>
            </div>
        )
    }

    if (geocodeError || !coordinates) {
        return (
            <div
                style={{ height, width }}
                className="rounded-lg shadow-md border border-yellow-200 bg-yellow-50 flex items-center justify-center"
            >
                <p className="text-yellow-700">Unable to load location</p>
            </div>
        )
    }

    return (
        <div style={{ height, width }} className="rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <GoogleMapComponent
                options={mapOptions}
                zoom={zoom}
                center={coordinates}
                mapTypeId={window.google?.maps?.MapTypeId?.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            >
                <Marker
                    position={coordinates}
                    title="AM Auto Group"
                />
            </GoogleMapComponent>
        </div>
    )
}