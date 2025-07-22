'use client'

import Image from 'next/image'

interface LogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-16',
        md: 'h-24',
        lg: 'h-32',
        xl: 'h-40'
    }

    return (
        <div className={`flex items-center ${className}`}>
            <Image
                src="/brandmark-design.svg"
                alt="AM Auto Agents Logo"
                width={size === 'sm' ? 600 : size === 'md' ? 800 : size === 'lg' ? 1000 : 1200}
                height={size === 'sm' ? 32 : size === 'md' ? 64 : size === 'lg' ? 80 : 96}
                className={`${sizeClasses[size]} w-auto`}
                priority
            />
        </div>
    )
}