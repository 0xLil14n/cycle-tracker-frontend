import { component$, useClientEffect$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const items = [
    { id: 1, content: 'content 1' },
    { id: 1, content: 'content 1' },
  ];
  const ref = useSignal<Element>();
  useClientEffect$(() => {
    const handleScroll = () => {
      console.log('ref', ref);
    };
  });
  return (
    <div ref={ref}>
      carousel
      {items.map((item, index) => (
        <div key={item.id} className="carousel-item">
          {item.content}
        </div>
      ))}
    </div>
  );
});
// const Carousel = ({ items }) => {
//   const containerRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Calculate the middle position of the container
//       const middle = containerRef.current.scrollLeft + containerRef.current.offsetWidth / 2;

//       // Find the item that is closest to the middle position
//       let closestIndex = 0;
//       let closestDistance = Number.MAX_VALUE;
//       for (let i = 0; i < items.length; i++) {
//         const distance = Math.abs(items[i].offsetLeft + items[i].offsetWidth / 2 - middle);
//         if (distance < closestDistance) {
//           closestIndex = i;
//           closestDistance = distance;
//         }
//       }

//       // Set the active index to the closest item
//       setActiveIndex(closestIndex);

//       // If the active index is the first or last item, smoothly scroll to the corresponding duplicate item
//       if (activeIndex === 0) {
//         setActiveIndex(items.length - 2);
//         containerRef.current.scrollLeft = items[activeIndex].offsetLeft;
//       } else if (activeIndex === items.length - 1) {
//         setActiveIndex(1);
//         containerRef.current.scrollLeft = items[activeIndex].offsetLeft;
//       }
//     };

//     containerRef.current.addEventListener('scroll', handleScroll);

//     return () => {
//       containerRef.current.removeEventListener('scroll', handleScroll);
//     };
//   }, [items, activeIndex]);

//   return (
//     <div className="carousel-container" ref={containerRef}>
//       {items.map((item, index) => (
//         <div key={item.id} className="carousel-item">
//           {item.content}
//         </div>
//       ))}
//       {/* Duplicate the first and last items and place them at the beginning and end of the carousel */}
//       <div className="carousel-item">{items[0].content}</div>
//       <div className="carousel-item">{items[items.length - 1].content}</div>
//     </div>
