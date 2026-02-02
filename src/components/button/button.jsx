import './button.css';

export default function Button({ 
    label, 
    onClick, 
    type = 'button', 
    className = '',
    disabled = false,
    variant = 'primary'
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button button--${variant} ${className}`}
        >
            {label}
        </button>
    );
}