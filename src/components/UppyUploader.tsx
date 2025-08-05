'use client'

import { useEffect, useRef } from 'react'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'

// Import Uppy styles
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

interface UppyUploaderProps {
  onUploadComplete?: (files: any[]) => void
  maxFiles?: number
  allowedFileTypes?: string[]
}

export default function UppyUploaderBasic({
                                            onUploadComplete,
                                            maxFiles = 10,
                                            allowedFileTypes = ['image/*']
                                          }: UppyUploaderProps) {
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dashboardRef.current) return

    // @ts-ignore - Skip TypeScript checking for Uppy generics
    const uppy = new Uppy({
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: 10 * 1024 * 1024,
        maxNumberOfFiles: maxFiles,
        allowedFileTypes: allowedFileTypes,
      }
    })

    uppy.use(Dashboard, {
      target: dashboardRef.current,
      inline: true,
      width: '100%',
      height: 400,
      proudlyDisplayPoweredByUppy: false,
      note: 'Images only, up to 10MB each',
      theme: 'light'
    })

    uppy.use(XHRUpload, {
      endpoint: '/api/upload',
      method: 'POST',
      formData: true,
      fieldName: 'files'
    })

    uppy.on('complete', (result: any) => {
      if (onUploadComplete && result.successful) {
        onUploadComplete(result.successful)
      }
    })

    return () => {
      uppy.destroy()
    }
  }, [maxFiles, allowedFileTypes, onUploadComplete])

  return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg">
        <div ref={dashboardRef} />
      </div>
  )
}