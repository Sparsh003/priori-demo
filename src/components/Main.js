import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Main = () => {
  const assets = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const postsPerPage = 20;
  let arrayForHoldingPosts = [];
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(20);

  const loopWithSlice = (start, end) => {
    setPostsToShow([])
    const slicedPosts = assets && assets.data.data?.items.slice(start, end);
    if (slicedPosts) {
      arrayForHoldingPosts = [...postsToShow, ...slicedPosts];
      setPostsToShow(arrayForHoldingPosts);
    }
  };

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  useEffect(() => {
    if (!assets.loading) loopWithSlice(0, postsPerPage);
  }, [assets]);

  return (
    <>
    {!assets.loading && assets?.data.data?.address ? (
      <div>
        <h2 className="mx-auto px-4 text-lg leading-6 font-medium text-indigo-500 sm:px-6 lg:px-8">
          Wallet
        </h2>
        
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-8">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Assets
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Price
                      </th>
                      <th
                        className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                        scope="col"
                      >
                        Balance
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Sent On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {postsToShow?.map((el, index) => (
                      <tr className="bg-white" key={index}>
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a
                              href="#"
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={el?.logo_url}
                                  alt="logo"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon";
                                  }}
                                />
                              </div>
                              <p className="text-gray-500 truncate group-hover:text-gray-900 items-center">
                                {el?.contract_name}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            ${el?.quote_rate}{" "}
                          </span>
                          USD
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                            {el?.balance}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {new Date(el?.last_transferred_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full text-center p-10">
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleShowMorePosts}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                      />
                    </svg>
                    Load more
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
        ) : null}
    </>
  );
};

export default Main;
