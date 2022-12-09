import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([5, 4, 3, 2, 1]);

  const anchorRef: any = useRef();
  const itemsRef: any = useRef();

  function addItem() {
    setItems([Math.floor(Math.random() * 200), ...items]);

    setTimeout(() => {
      itemsRef.current.scroll({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setTimeout(() => {
          setItems(items => [
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 200),
            ...items,
          ]);
        }, 500);
      }
    }, options);

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <button onClick={addItem}>add item</button>
      <main ref={itemsRef} className="App">
        { items.map((item, index) => (
          <div className="item" key={index}>
            <p>Item: {item}, Index: {index}</p>
          </div>
        ))}

        <p ref={anchorRef}>loading...</p>
      </main>
    </div>
  )
}

export default App
