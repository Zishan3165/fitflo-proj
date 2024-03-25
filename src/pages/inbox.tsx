import { Link } from 'react-router-dom';
import user1 from '../images/user/user-01.png';
import user2 from '../images/user/user-02.png';
import user3 from '../images/user/user-03.png';
import user4 from '../images/user/user-04.png';
import user5 from '../images/user/user-05.png';
import user6 from '../images/user/user-06.png';

const Inbox = () => {
  return (
    <>
      <div className="container">
        <h2 className="text-title-md2 font-medium text-[#111827] text-[20px]">
          Messages
        </h2>
        <div className="flex justify-between items-center py-2">
          <div className="w-[536px] h-[33px]">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-[98%] p-2 ps-10 text-sm text-gray-900 border border-stroke focus:outline-none rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search Messages"
                  required
                />
                <button
                  style={{
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                  }}
                  type="submit"
                  className="text-black gap-[8px] w-[79px] h-[36px] border-l mr-0.5 border-[#D1D5DB] absolute end-[0.7rem] bottom-[0.01rem] bg-[#F9FAFB] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <Link
            to="/new-message"
            className="inline-flex text-[14px] items-center justify-center gap-[12px] rounded-lg w-[155px] bg-[#0891B2] font-inter text-white hover:bg-opacity-90 md:h-[38px] lg:h-[38px]"
            type="submit"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[14px] h-[14px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </span>
            New Message
          </Link>
        </div>
        {/* <!-- ====== Inbox Section Start ====== --> */}
        <main className="u-min-h-screen">
          <div className="mx-auto max-w-screen-2xl 2xl:p-10 mt-3">
            <div className="sm:h-[calc(100vh-174px)]">
              <div className="rounded-lg  bg-white dark:border-strokedark dark:bg-boxdark ">
                <div className="no-scrollbar rounded-lg bg-white dark:border-strokedark dark:bg-boxdark gap-[20px] overflow-auto">
                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user1}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Henry Dholi{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            I came across your profile and cam across your
                            profile and...{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> 9:34AM </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user2}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Mariya Desoja{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            I like your confidence like your confidence💪{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> Thursday </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user3}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Robert Jhon{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            Can you share your offer? like your confidence...{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> Friday </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user4}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Cody Fisher{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            I'm waiting for you response! like your
                            confidence...{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> 08/09/2023 </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user5}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Jenny Wilson{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            I'm waiting for you response! like your
                            confidence....{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> 08/09/2023 </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer border-b border-stroke items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user6}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Marcus Siphron{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            Hello, how are you ? like your confidence.waiting
                            for you response
                          </p>
                        </div>
                        <p className="text-[14px]"> 08/09/2023 </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>

                  <Link to="/existing-chats">
                    <div className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={user4}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="w-full">
                          <h5 className="text-sm font-bold text-black dark:text-white">
                            {' '}
                            Cody Fisher{' '}
                          </h5>
                          <p className="text-sm text-black dark:text-white">
                            {' '}
                            I'm waiting for you response! like your
                            confidence...{' '}
                          </p>
                        </div>
                        <p className="text-[14px]"> 08/09/2023 </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-[20px] h-[20px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <!-- ====== Inbox Section End ====== --> */}
    </>
  );
};

export default Inbox;
