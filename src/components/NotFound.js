import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h2 className="text-4xl font-extrabold text-red-700 tracking-tight sm:text-5xl">
                  Address not found!
                </h2>
                <p className="mt-1 text-base text-gray-500 mt-8 text-center">
                  Please enter valid address and try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
