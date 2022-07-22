import React, { useState, useEffect, useRef } from "react";
import Header from "../layout/Header";
import {
  getCryptoTransaction,
  resetCrypto,
  getCryptoTransactionAddress,
} from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { data } from "../static/static";
import NotFound from "./NotFound";

const Dashboard = () => {
  const dispatch = useDispatch();
  const cryptoDetail = useSelector((state) => state.data);
  const [search, setSearch] = useState(
    "0xef5323409964067fec899091685b48458f361d84"
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [suggestion, setSuggestion] = useState(data);
  const [suggestionModal, setSuggestionModal] = useState(false);
  const suggestionRef = useRef(null);
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setCheckSearch(true);
    }
    const newList = data.filter((el) => el?.address?.includes(e.target.value));
    setSuggestion(newList);
    setSuggestionModal(true);
  };
  const listHandler = (item) => {
    setSearch(item);
    setSuggestionModal(false);
  };

  function handleCopyText(text) {
    navigator.clipboard.writeText(text);
    setCopySuccess(!copySuccess);
  }

  const handleinput = () => {
    setSuggestionModal(true);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (search) {
        dispatch(resetCrypto());
        dispatch(getCryptoTransaction(search));
        dispatch(getCryptoTransactionAddress(search));
      }
    }, 1500);

    return () => clearTimeout(getData);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestionModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionRef]);

  return (
    <div>
      {checkSearch}
      <div className="min-h-full">
        <div className="flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full border-b-2 border-indigo-500 pl-8 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0  sm:text-sm"
                      placeholder="Enter an address to view assets and transactions"
                      type="search"
                      value={search}
                      onChange={handleChange}
                      autoComplete="off"
                      onClick={handleinput}
                    />
                    {suggestionModal && (
                      <div className="shadow-lg" ref={suggestionRef}>
                        <ul>
                          {suggestion.map((text) => (
                            <li
                              className="w-full h-auto bg-white z-10 text-black p-2"
                              key={text.id}
                              onClick={() => listHandler(text?.address)}
                            >
                              {text.address}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <span className="sr-only">View notifications</span>
                </button>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            <div className="mt-8">
              {!cryptoDetail.loading && cryptoDetail?.data?.data?.address && cryptoDetail?.error === "" ? (
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl leading-6 font-medium text-indigo-500">
                    Welcome to the Dashboard!
                  </h1>

                  <h2 className="text-base leading-6 font-small text-indigo-500 pt-5">
                    Overview
                  </h2>
                  <div className="mt-2">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-green-500 truncate">
                                Address
                              </dt>
                              <dd>
                                <div
                                  onClick={() =>
                                    handleCopyText(
                                      cryptoDetail?.data.data?.address
                                    )
                                  }
                                  className="text-lg font-medium text-gray-900 flex items-center"
                                >
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <p>{cryptoDetail?.data.data?.address}</p>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-2 cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                  </svg>
                                  {copySuccess && (
                                    <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                      {copySuccess ? "copied!" : ""}
                                    </p>
                                  )}
                                </div>
                              </dd>
                            </dl>
                            <dl>
                              <dt className="text-sm font-medium text-green-500 truncate mt-6">
                                Currency
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {cryptoDetail?.data?.data?.quote_currency}
                                </div>
                              </dd>
                            </dl>
                            <dl>
                              <dt className="text-sm font-medium text-green-500 truncate mt-6">
                                Updated at
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {new Date(
                                    cryptoDetail?.data?.data?.updated_at
                                  ).toLocaleString()}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {!cryptoDetail.loading &&
              cryptoDetail?.data?.data?.address &&
              cryptoDetail?.error === "" ? (
                <>
                  <div>
                    <Header />
                  </div>
                </>
              ) : cryptoDetail?.error ? (
                <NotFound />
              ) : (
                <Loading />
              )}

              <div className="shadow sm:hidden">
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-4 bg-white hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex-1 flex space-x-2 truncate">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="flex flex-col text-gray-500 text-sm truncate">
                            <span className="truncate">
                              Payment to Molly Sanders
                            </span>
                            <span>
                              <span className="text-gray-900 font-medium">
                                $20,000
                              </span>{" "}
                              USD
                            </span>
                            <time dateTime="2020-07-11">July 11, 2020</time>
                          </span>
                        </span>

                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>

                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      {" "}
                      Previous{" "}
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      {" "}
                      Next{" "}
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
