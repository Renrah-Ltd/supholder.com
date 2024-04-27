import React, { useEffect, useState } from 'react';

import productOptions from "../products.json"
interface VariantOption {
    price: number;
    url?: string;
}

interface ColorOptions {
    [variant: string]: VariantOption;
}

interface ProductOptions {
    [color: string]: ColorOptions;
}

const BuyNowModal: React.FC = () => {

    function mergeStarProperties(options: ProductOptions): ProductOptions {
        const wildcardProps = options['*'];
        if (!wildcardProps) {
            return options; // Return as is if there's no '*' key
        }

        // Create a deep copy of the options to avoid mutating the original imported object
        const mergedOptions: ProductOptions = JSON.parse(JSON.stringify(options));
        delete mergedOptions['*']; // Remove the wildcard entry

        // Iterate over each color and merge the '*' properties into each variant
        Object.keys(mergedOptions).forEach(color => {
            Object.keys(wildcardProps).forEach(variant => {
                if (mergedOptions[color][variant]) {
                    // If the variant exists, merge properties, with existing specific properties taking precedence
                    mergedOptions[color][variant] = {
                        ...wildcardProps[variant],
                        ...mergedOptions[color][variant]
                    };
                } else {
                    // If the variant does not exist under this color, just copy the wildcard properties
                    mergedOptions[color][variant] = { ...wildcardProps[variant] };
                }
            });
        });

        return mergedOptions;
    }

    // Process the product options with possible wildcard properties
    const processedProductOptions = mergeStarProperties(productOptions);


    const initialColor = Object.keys(processedProductOptions)[0];
    const initialSize = Object.keys(processedProductOptions[initialColor])[0];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>(initialColor);
    const [selectedSize, setSelectedSize] = useState<string>(initialSize);
    const [stripeUrl, setStripeUrl] = useState<string>(processedProductOptions[initialColor][initialSize].url);
    const [price, setPrice] = useState<string>(processedProductOptions[initialColor][initialSize].price);

    useEffect(() => {
        const handleOpenModal = () => setIsOpen(true);

        // Add event listener
        window.addEventListener('openModalEvent', handleOpenModal);

        // Cleanup to remove the event listener
        return () => {
            window.removeEventListener('openModalEvent', handleOpenModal);
        };
    }, []); // Empty dependency array to ensure this only runs once on mount
    const handleCloseModal = (): void => setIsOpen(false);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newColor = event.target.value;
        setSelectedColor(newColor);
        updateStripeUrl(newColor, selectedSize);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
        updateStripeUrl(selectedColor, newSize);
    };

    const updateStripeUrl = (color: string, size: string): void => {
        const { url, price } = processedProductOptions[color][size];
        setStripeUrl(url);
        setPrice(price);
    };

    return (
        <div>

            <div className={"modal" + (isOpen ? " open" : "")}>
                <div className='modal-bg' onClick={handleCloseModal}></div>

                <div className="modal-content">
                    <div className='modal-image'>
                        IMAGE
                    </div>
                    <div>
                        <h2>Pick Your SUP Holder</h2>
                        <form className="buy-now-form">
                            <fieldset>
                                <legend>Color</legend>
                                {Object.keys(processedProductOptions).map((color) => (
                                    <label key={color}>
                                        <input
                                            type="radio"
                                            name="color"
                                            value={color}
                                            checked={selectedColor === color}
                                            onChange={handleColorChange}
                                        />
                                        {color}
                                    </label>
                                ))}
                            </fieldset>
                            <fieldset>
                                <legend>Size</legend>
                                {Object.keys(processedProductOptions[selectedColor]).map((size) => (
                                    <label key={size}>
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={selectedSize === size}
                                            onChange={handleSizeChange}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </fieldset>
                            <a href={stripeUrl} target="_blank" rel="noopener noreferrer">
                                {price > 0 ? <button type="button">Buy Now - ${price.toFixed(2)}</button> : <button disabled type="button">Coming Soon</button>}
                            </a>
                        </form>
                        <button className='modal-close' type="button" onClick={handleCloseModal}>Close</button>
                    </div>

                </div>
                <div className="modal-overlay" onClick={handleCloseModal}></div>
            </div>
        </div>
    );
};

export default BuyNowModal;