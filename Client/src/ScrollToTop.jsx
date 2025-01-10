import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page whenever the route changes
  }, [location]); // Dependency on location ensures the effect runs on route change

  return null;
};

export default ScrollToTopOnRouteChange;
