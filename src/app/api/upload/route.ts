
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Helper function to handle file uploads
async function handleFileUploads(files: File[]) {
    if (!files.length) {
        return { error: 'No files provided', status: 400, uploadedFiles: [] }
    }

    const uploadedFiles = []

    for (const file of files) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`
        const buffer = Buffer.from(await file.arrayBuffer())

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('vehicle-images')
            .upload(`vehicles/${fileName}`, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            })

        if (uploadError) {
            console.error('Storage upload error:', uploadError)
            continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('vehicle-images')
            .getPublicUrl(uploadData.path)

        uploadedFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: urlData.publicUrl,
            uploadURL: urlData.publicUrl, // Uppy expects this
            response: {
                body: {
                    url: urlData.publicUrl // Admin form expects this
                }
            }
        })
    }

    return { uploadedFiles, error: null, status: 200 }
}

// POST handler for new uploads
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        const { uploadedFiles, error, status } = await handleFileUploads(files)

        if (error) {
            return NextResponse.json({ error }, { status })
        }

        return NextResponse.json(uploadedFiles)
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

// PUT handler for updating existing vehicle images
export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]
        const vehicleId = formData.get('vehicleId')

        if (!vehicleId) {
            return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 })
        }

        const { uploadedFiles, error, status } = await handleFileUploads(files)

        if (error) {
            return NextResponse.json({ error }, { status })
        }

        // Get existing vehicle data
        const { data: vehicleData, error: fetchError } = await supabase
            .from('cars')
            .select('images')
            .eq('id', vehicleId)
            .single()

        if (fetchError) {
            console.error('Error fetching vehicle:', fetchError)
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
        }

        // Extract image URLs from uploaded files
        const newImageUrls = uploadedFiles.map(file => file.url || file.uploadURL || file.response?.body?.url)

        // Combine with existing images
        const existingImages = vehicleData.images || []
        const updatedImages = [...existingImages, ...newImageUrls]

        // Update the vehicle record
        const { error: updateError } = await supabase
            .from('cars')
            .update({ images: updatedImages })
            .eq('id', vehicleId)

        if (updateError) {
            console.error('Error updating vehicle:', updateError)
            return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
        }

        return NextResponse.json({
            message: 'Vehicle images updated successfully',
            images: updatedImages,
            uploadedFiles
        })
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }
}

// PATCH handler (alias for PUT)
export async function PATCH(request: NextRequest) {
    return PUT(request)
}