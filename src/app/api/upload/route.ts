
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            )
        }

        const uploadedFiles = []

        for (const file of files) {
            if (file.size === 0) continue

            // Generate unique filename
            const fileExtension = file.name.split('.').pop()
            const uniqueFileName = `${uuidv4()}.${fileExtension}`

            // Convert file to buffer
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('vehicle-images')
                .upload(`vehicles/${uniqueFileName}`, buffer, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.error('Supabase upload error:', uploadError)
                continue
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('vehicle-images')
                .getPublicUrl(`vehicles/${uniqueFileName}`)

            // Store file metadata in database (optional - for tracking uploads)
            const { data: dbData, error: dbError } = await supabase
                .from('vehicle_images')
                .insert({
                    filename: uniqueFileName,
                    original_name: file.name,
                    file_size: file.size,
                    file_type: file.type,
                    storage_path: uploadData.path,
                    public_url: urlData.publicUrl,
                    uploaded_at: new Date().toISOString()
                })
                .select()
                .single()

            if (dbError) {
                console.error('Database insert error:', dbError)
                // Continue anyway, file is uploaded to storage
            }

            uploadedFiles.push({
                id: dbData?.id || null,
                name: file.name,
                originalName: file.name,
                fileName: uniqueFileName,
                url: urlData.publicUrl,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
                storagePath: uploadData.path
            })
        }

        return NextResponse.json({
            message: 'Files uploaded successfully',
            files: uploadedFiles
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload files' },
            { status: 500 }
        )
    }
}