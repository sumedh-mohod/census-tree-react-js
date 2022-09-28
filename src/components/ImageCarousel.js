import React, { useCallback, useEffect, useMemo, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Typography from "@material-ui/core/Typography";

function ImageCarousel() {
  // State to programmatically set active child
  const [activeChild, setActiveChild] = useState(0);

  // Basically items = [1, 2, 3, 4]
  const items = useMemo(() => [1, 2, 3, 4], []);

  // The Keypress Event Handler
  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        // If supposed previous child is < 0 set it to last child
        setActiveChild((a) => (a - 1 < 0 ? items.length - 1 : a - 1));
      } else if (e.key === "ArrowRight") {
        // If supposed next child is > length -1 set it to first child
        setActiveChild((a) => (a + 1 > items.length - 1 ? 0 : a + 1));
      }
    },
    [items]
  );

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  });

  return (
    <div className="App">
      <Carousel
        index={activeChild} // <-- This controls the activeChild
        autoPlay={false} // <-- You probaly want to disable this for our purposes
        navButtonsAlwaysVisible
      >
        {items.map((i) => {
          return (
            <Typography align="center" key={i}>
              Child {i}
            </Typography>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
