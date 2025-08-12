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

export default function UppyUploader({
                                       onUploadComplete,
                                       maxFiles = 10,
                                       allowedFileTypes = ['image/*']
                                     }: UppyUploaderProps) {
  const uppyRef = useRef<Uppy | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dashboardRef.current) return

    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: maxFiles,
        allowedFileTypes
      }
    })
        .use(Dashboard, {
          target: dashboardRef.current,
          inline: true,
          height: 400,
          showProgressDetails: true,
          hideUploadButton: false
        })
        .use(XHRUpload, {
          endpoint: '/api/upload',
          fieldName: 'files',
          formData: true
        })

    uppy.on('complete', (result) => {
      if (result.successful && onUploadComplete) {
        onUploadComplete(result.successful)
      }
    })

    uppyRef.current = uppy

    return () => {
      uppy.destroy()
    }
  }, [maxFiles, allowedFileTypes])

  return <div ref={dashboardRef} />
}
