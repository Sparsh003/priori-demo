import React from "react";

const Loading = () => {
  return (
      <div className=" flex justify-center flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
        <div>
          <p className="mt-2">Please wait loading.....</p>
        </div>
      </div>
    
  );
};

export default Loading;
