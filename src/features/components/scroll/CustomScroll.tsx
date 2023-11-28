import React, {useRef, useState, useEffect, FC, ReactEventHandler} from 'react';
import "./CustomScroll.scss"

type Props = {
  children?: React.ReactNode
}

const CustomScroll: FC<Props> = (props) =>  {
  const {children} = props

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollTop(scrollContainerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="custom-scroll-container">
      <div className="custom-scroll-content" ref={scrollContainerRef}>
        {children}
      </div>
      <div className="custom-scroll-bar" style={{ top: scrollTop }}>
        <div className="scroll-thumb" />
      </div>
    </div>
  );
}

export default CustomScroll;