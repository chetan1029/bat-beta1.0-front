import React, { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollProps {
    children?: any;
    next: any;
    hasMore?: boolean;
}

const InfiniteScroll = ({ children, next, hasMore }: InfiniteScrollProps) => {
    const loader: any = useRef(null);

    const handleObserver = useCallback((entities) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore === true) {
            next();
        }
    }, [hasMore, next]);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [handleObserver]);

    return <>
        <div>
            {children}
            <div className="loading" ref={loader}>&nbsp;</div>
        </div>
    </>;
}

export default InfiniteScroll;