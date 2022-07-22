import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <div className="hidden sm:block">
          <div className="border-b border-orange-200 mt-8">
            <nav
              className="mb-px flex space-x-8 mx-auto px-4 sm:px-6 lg:px-8"
              aria-label="Tabs"
            >
              <Link
                to="/"
                className="border-transparent text-orange-500 hover:text-orange-600 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md"
              >
                Portfolio
              </Link>

              <Link
                to="history"
                className="border-transparent text-orange-500 hover:text-orange-600 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md"
              >
                History
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
