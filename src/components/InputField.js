import React from 'react';

export default function InputField({element, type, id, label, value, error, onChange, name, onBlur }) {
    return (
        <div className="input-field">
            <p className="label">{label}</p>
                {element ? element : <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={label}

                />}
            <p className="error">{error}</p>
        </div>
    )
}