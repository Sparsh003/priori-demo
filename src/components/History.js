import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state?.data);

  const postsPerPage = 20;
  let arrayForHoldingPosts = [];
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(20);

  const loopWithSlice = (start, end) => {
    setPostsToShow([]);
    const slicedPosts =
      transaction && transaction.address.data?.items.slice(start, end);
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
    if (!transaction.loading) {
      setPostsToShow([]);
      loopWithSlice(0, postsPerPage);
    }
  }, [transaction]);

  return (
    <div>
      {postsToShow.length > 0 && (
        <h2 className="mx-auto px-4 text-lg leading-6 font-medium text-indigo-500 sm:px-6 lg:px-8">
          Transactions
        </h2>
      )}
      {postsToShow &&
        postsToShow.map((trans, index) => (
          <div className="px-4 sm:px-6 lg:px-8" key={index}>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {new Date(
                                    trans.block_signed_at
                                  ).toLocaleString()}
                                </div>
                                <div className="text-gray-500">
                                  {trans.from_address}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="text-gray-900">
                              {trans.to_address}
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <span
                              className={`inline-flex rounded-full ${
                                !trans.successful
                                  ? "bg-red-100"
                                  : "bg-green-100"
                              }  px-2 text-xs font-semibold leading-5 ${
                                !trans.successful
                                  ? "text-red-800"
                                  : "text-green-800"
                              }`}
                            >
                              {!trans.successful ? "failed" : "successful"}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            {trans.gas_price}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {postsToShow.length > 0 && (
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
      )}
    </div>
  );
};

export default History;
