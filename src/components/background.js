import React, {useEffect, useState, useRef} from "react"

const Background = ({ areCardsDealt }) => {
  const [counter, setCounter] = useState(15);
  const [isGrowing, setIsGrowing] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [randomSeed, setRandomSeed] = useState(Math.floor(Math.random() * (100 - 1) + 1));

  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (counter >= 550) {
        setIsGrowing(false);
      } else if (counter <= 15) {
        setIsGrowing(true);
      }
      if(isGrowing){
        if (counter >= 550) {
          setCounter(prevCount => prevCount = 545);
        } else {
          setCounter(prevCount => (prevCount + deltaTime * 0.02));
        }
      } else {
        if (counter <= 15) {
          setCounter(prevCount => prevCount = 20);
        } else {
          setCounter(prevCount => (prevCount - deltaTime * 0.02));
        }
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [counter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoaded &&
      <svg className="background-image" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="filter" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
            <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="1" seed={randomSeed} stitchTiles="stitch" result="turbulence"/>
            <feFlood floodColor="#000000" floodOpacity="1" result="flood"/>
            <feComposite in="flood" in2="turbulence" operator="out" result="composite1"/>
            <feComposite in="composite1" in2="SourceAlpha" operator="in" result="composite2"/>
            <feDisplacementMap id="wave-filter" in="composite1" in2="turbulence" scale={counter} xChannelSelector="A" yChannelSelector="A" x="0%" y="0%" width="100%" height="100%" result="displacementMap"/>
          </filter>
        </defs>
        <svg style={{ zIndex: 0}}>
          <image width="100%" height="100%" href="https://picsum.photos/500/" filter="url(#filter)">
          </image>
        </svg>
      </svg>
      }
    </div>
  );
}

export default Background
