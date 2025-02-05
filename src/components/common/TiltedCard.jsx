import React, { useState } from "react";

const TiltedCard = ({
    imageSrc,
    altText,
    captionText,
    containerHeight = "300px",
    containerWidth = "300px",
    imageHeight = "300px",
    imageWidth = "300px",
    rotateAmplitude = 12,
    scaleOnHover = 1.2,
    showTooltip = false,
    displayOverlayContent = false,
    overlayContent
}) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = e.currentTarget;
        const x = ((e.clientX - offsetLeft) / offsetWidth - 0.5) * 2;
        const y = ((e.clientY - offsetTop) / offsetHeight - 0.5) * -2;

        setRotation({
            x: y * rotateAmplitude,
            y: x * rotateAmplitude
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: containerWidth, height: containerHeight }}
        >
            <div
                className="relative transition-transform duration-300 ease-out"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scaleOnHover})`
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Image */}
                <img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />

                {/* Overlay (Optional) */}
                {displayOverlayContent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                        {overlayContent}
                    </div>
                )}

                {/* Tooltip (Optional) */}
                {showTooltip && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                        {captionText}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TiltedCard;
