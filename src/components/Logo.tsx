interface LogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-16',
        md: 'h-24',
        lg: 'h-32',
        xl: 'h-40',
        '2xl': 'h-48',
        '3xl': 'h-56'
    }

    return (
        <div className={`flex items-center ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/brandmark-design.svg"
                alt="AM Auto Group Logo"
                className={`${sizeClasses[size]} w-auto`}
            />
        </div>
    )
}