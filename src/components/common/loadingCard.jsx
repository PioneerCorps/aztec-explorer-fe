import React from "react";

const LoadingCard = () => {
  return (
    <div className="w-full h-40 bg-purpleOp15 animate-pulse rounded-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purpleOp50 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default LoadingCard;
