import React from "react";

const usePrevious = (value) => {
  const ref = React.useRef("start");

  React.useEffect(() => {
    ref.current = value;
  }, []);

  return ref.current;
};

export default usePrevious;
