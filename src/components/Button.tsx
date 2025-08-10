import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

export const Button = ({
                           children,
                           variant = 'primary',
                           onClick,
                           type = 'button',
                           disabled = false,
                           className = '',
                       }: ButtonProps) => {
    let baseClasses =
        'px-4 py-2 rounded-2xl border-2 transition-color duration-200 font-medium'

    const variants: Record<typeof variant, string> = {
        primary:
            "bg-[var(--color-primary)] border-[var(--color-primary-border)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-gradient-start)]",
        secondary:
            "bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300",
        danger:
            "bg-red-500 border-red-600 text-white hover:bg-red-600 active:bg-red-700",
    }
    return (

        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >{children}
        </button>

    );
};

export default Button;