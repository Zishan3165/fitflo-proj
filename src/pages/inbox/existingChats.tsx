import { useState } from 'react';
import { Link } from 'react-router-dom';
import user1 from '../../images/user/user-01.png';
import user2 from '../../images/user/user-02.png';

const ExistingChats = () => {
  const [openDropDown, setOpenDropdown] = useState(false);

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

      <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark bg-white dark:bg-boxdark mt-1">
        <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
          <div className="flex">
            <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
              <img
                src={user1}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
            </div>
            <div className="w-full">
              <h5 className="font-bold text-black dark:text-white ">
                Henry Dholi
              </h5>
            </div>
          </div>
          <div x-data="{openDropDown: false}" className="relative">
            <button onClick={() => setOpenDropdown(!openDropDown)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
            {openDropDown && (
              <div
                x-show="openDropDown"
                className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_62_9787)">
                      <path
                        d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_62_9787">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{' '}
                  Edit{' '}
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                      fill=""
                    />
                    <path
                      d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                      fill=""
                    />
                    <path
                      d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                      fill=""
                    />
                    <path
                      d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                      fill=""
                    />
                  </svg>{' '}
                  Delete{' '}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
          <div className="flex items-center">
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user1}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex">
              <h5 className="font-medium text-black mt-3 dark:text-white">
                Henry Dholi
              </h5>
              <p className="text-xs font-medium p-4">1:55pm</p>
            </div>
          </div>
          <div className="rounded-lg max-w-125 ml-15 bg-[#F3F4F6] p-3">
            <p className="font-medium text-[#111827]">
              {' '}
              Hello, Mariya! I will check the schedule and inform you{' '}
            </p>
          </div>

          <div className="flex items-center">
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user2}
                alt="profile"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex">
              <h5 className="font-medium text-black mt-3 dark:text-white">
                Mariya Desoja
              </h5>
              <p className="text-xs font-medium p-4">1:57pm</p>
            </div>
          </div>
          <div className="rounded-lg max-w-125 ml-15 bg-[#CFFAFE] p-3">
            <p className="font-medium text-[#111827]">
              {' '}
              Hello, Henry! I like your confidence💪{' '}
            </p>
          </div>

          <div className="flex items-center">
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user1}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex">
              <h5 className="font-medium text-black mt-3 dark:text-white">
                Henry Dholi
              </h5>
              <p className="text-xs font-medium p-4">2:00pm</p>
            </div>
          </div>
          <div className="rounded-lg max-w-125 ml-15 bg-[#F3F4F6] p-3">
            <p className="font-medium text-[#111827]">
              {' '}
              You read my mind! Thanks see you then{' '}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <hr className="flex-1 border-t border-stroke" />
            <span className="mx-4 text-[14px] text-[#64748B] dark:text-white font-medium border border-stroke rounded-full p-1">
              08/09/2023
            </span>
            <hr className="flex-1 border-t border-stroke" />
          </div>

          <div className="flex items-center">
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user2}
                alt="profile"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex">
              <h5 className="font-medium text-black mt-3 dark:text-white">
                Mariya Desoja
              </h5>
              <p className="text-xs font-medium p-4">3:55pm</p>
            </div>
          </div>
          <div className="rounded-lg max-w-125 ml-15 bg-[#CFFAFE] p-3">
            <p className="font-medium text-[#111827]">
              {' '}
              Great workout today! keep up the good work.{' '}
            </p>
          </div>

          <div className="flex items-center">
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user1}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex">
              <h5 className="font-medium text-black mt-3 dark:text-white">
                Henry Dholi
              </h5>
              <p className="text-xs font-medium p-4">4:56pm</p>
            </div>
          </div>
          <div className="rounded-lg max-w-125 ml-15 bg-[#F3F4F6] p-3">
            <p className="font-medium text-[#111827]">
              {' '}
              It was tough one but feel so alive! Thanks for the motivation. You
              really got me through it.{' '}
            </p>
          </div>
        </div>

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
export default ExistingChats;
