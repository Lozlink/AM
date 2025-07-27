'use client'

import Image from 'next/image'

interface LogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-16',
        md: 'h-24',
        lg: 'h-32',
        xl: 'h-40',
        '2xl': 'h-48'
    }

    return (
        <div className={`flex items-center ${className}`}>
            <Image
                src="/brandmark-design.svg"
                alt="AM Auto Agents Logo"
                width={size === 'sm' ? 600 : size === 'md' ? 800 : size === 'lg' ? 1000 : size === 'xl' ? 1200 : 1400}
                height={size === 'sm' ? 32 : size === 'md' ? 64 : size === 'lg' ? 80 : size === 'xl' ? 96 : 112}
                className={`${sizeClasses[size]} w-auto`}
                priority
            />
        </div>
    )
}