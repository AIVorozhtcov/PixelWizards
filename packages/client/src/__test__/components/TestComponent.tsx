import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap'; // <-- import GSAP

export default function App() {
  const container = useRef(null);

  useLayoutEffect(() => {
    // gsap code here...
    gsap.to('.box', { rotation: 180 }); // <-- automatically reverted
  }, []); // <-- scope for selector text (optional)

  return (
    <div
      ref={container}
      className="app h-screen text-black flex justify-center items-center">
      <div className="box">Hello</div>
    </div>
  );
}
