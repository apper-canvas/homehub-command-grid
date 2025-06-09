import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, className, id, name, onKeyDown, onBlur, ...rest }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            id={id}
            name={name}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            {...rest}
        />
    );
};

export default Input;