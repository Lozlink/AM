
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (!files.length) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 })
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

        return NextResponse.json(uploadedFiles)

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}