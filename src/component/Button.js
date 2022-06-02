import clsx from 'clsx'
import React from 'react'

const Button = ({ text, variant, size, onButtonClick }) => {

    let variantClassName = ``
    let sizeClassName = ``

    switch (variant) {
        case 'dark-blue':
            variantClassName = `btn-primary`
            break;
        case 'grey':
            variantClassName = `btn-secondary`
            break;
        case 'green':
            variantClassName = `btn-success`
            break;
        case 'red':
            variantClassName = `btn-danger`
            break;
        case 'blue':
            variantClassName = `btn-info`
            break;
        case 'yellow':
            variantClassName = `btn-warning`
            break;
        case 'light':
            variantClassName = `btn-light`
            break;
        case 'dark':
            variantClassName = `btn-dark`
            break;
        default:
            break;
    }

    switch (size) {
        case 'small':
            sizeClassName = `btn-sm`
            break;
        case 'large':
            sizeClassName = `btn-lg`
            break;
        default:
            break;
    }

    return (
        <button onClick={onButtonClick} className={clsx('btn', variantClassName, sizeClassName)}>{text}</button>
    )
}

export default Button