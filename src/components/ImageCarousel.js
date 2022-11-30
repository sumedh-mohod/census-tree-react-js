import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';

function ImageCarousel(props) {
  const { imagelist, activeindex } = props;
  // console.log('activeindexactiveindex', activeindex);
  const [activeChild, setActiveChild] = useState(activeindex);

  const items = useMemo(() => imagelist, []);

  const changeChild = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
       
        setActiveChild((a) => (a - 1 < 0 ? items.length - 1 : a - 1));
      } else if (e.key === 'ArrowRight') {
      
        setActiveChild((a) => (a + 1 > items.length - 1 ? 0 : a + 1));
      }
    },
    [items]
  );

  useEffect(() => {
    document.addEventListener('keydown', changeChild);

    return function cleanup() {
      document.removeEventListener('keydown', changeChild);
    };
  });

  return (
    <div className="App" style={{marginTop: '15px'}}>
      <Carousel
        index={activeChild} // <-- This controls the activeChild
        autoPlay={false} // <-- You probaly want to disable this for our purposes
        navButtonsAlwaysVisible
      >
        {items.map((img, i) => {
          return (
            <Typography align="center" key={i}>
              {img?.original ? (
                <img src={img?.original} alt="img" height="600px" style={{ borderRadius: '15px' }} />
              ) : img?.image_url ? (
                <img src={img?.image_url} alt="img" height="600px" style={{ borderRadius: '15px' }} />
              ) : (
                <img src={img} alt="img" height="600px" style={{ borderRadius: '15px' }} />
              )}
            </Typography>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
