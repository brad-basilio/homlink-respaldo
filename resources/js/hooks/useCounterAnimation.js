import { useState, useEffect, useRef } from 'react';

export const useCounterAnimation = (endValue, duration = 2000, startOnView = true, options = {}) => {
    const [currentValue, setCurrentValue] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnView);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    // Options with defaults
    const {
        threshold = 0.3,
        rootMargin = '0px 0px -50px 0px',
        easingFunction = 'easeOutCubic',
        decimals = 0
    } = options;

    useEffect(() => {
        if (!startOnView) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [startOnView, hasAnimated, threshold, rootMargin]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        let animationFrame;

        const easingFunctions = {
            linear: (t) => t,
            easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
            easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
            easeOutElastic: (t) => {
                const c4 = (2 * Math.PI) / 3;
                return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
            }
        };

        const easing = easingFunctions[easingFunction] || easingFunctions.easeOutCubic;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easedProgress = easing(progress);
            
            let currentNumber;
            if (decimals > 0) {
                currentNumber = parseFloat((easedProgress * endValue).toFixed(decimals));
            } else {
                currentNumber = Math.floor(easedProgress * endValue);
            }
            
            setCurrentValue(currentNumber);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCurrentValue(endValue); // Ensure we end exactly at the target value
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isVisible, endValue, duration, easingFunction, decimals]);

    return { currentValue, elementRef, isVisible, hasAnimated };
};
