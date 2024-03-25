import { Link } from 'react-router-dom';

const NewMessagePage = () => {
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // Handle the selected file as needed
    console.log('Selected File:', file);
  };

  return (
    <>
      <div className="flex p-2">
        <Link to="/inbox" className=" p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[20px] h-[16px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <p className="text-grayf text-[14px] ">Back</p>
      </div>
      <div className="container bg-white rounded-lg">
        <div className="flex mt-2 lg:h-[52px] gap-[12px] p-3 dark:bg-boxdark">
          <span className="text-black font-medium dark:text-white">To</span>:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[14px] h-[14px] mt-1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search member"
            className="text-[14px] focus:outline-none"
          />
        </div>

        <div className="py-50 px-7.5 h-full border-t border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"></div>

        <div className="sticky bottom-0 border-t border-stroke py-5 px-6 dark:border-strokedark bg-white dark:bg-boxdark">
          <form className="flex items-center justify-between space-x-4.5">
            <div className="left-5 top-1/2 inline-flex -translate-y-1/2 mt-6 items-center justify-end ">
              {/* Camera Button */}
              <label className="hover:text-fitflo">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#4B5563"
                  className="w-[28px] h-[28px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </label>

              {/* Attachment Button */}
              <label className="hover:text-fitflo ml-3">
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#4B5563"
                  className="w-[28px] h-[28px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Send a message here"
                className="h-9 w-full rounded-md border border-[#94A3B8] bg-white pl-5 pr-6 font-medium text-black placeholder-[#374151] outline-none focus:border-fitflo dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
              />
            </div>
            <button className="flex h-[36px] w-[36px] max-w-13 items-center justify-center rounded-full bg-fitflo text-white hover:bg-opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[15px] h-[15px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewMessagePage;
