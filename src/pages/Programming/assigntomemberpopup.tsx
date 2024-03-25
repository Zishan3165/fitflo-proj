import { useRef } from 'react';

function AssignToMemberPopup({ onClose }: any) {
  const modalRef: any = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const myStyle = {
    overflow: 'scroll',
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backrop-blur-sm flex justify-center items-center"
      style={myStyle}
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <div className="flex flex-col gap-20">
          {/* <!-- Contact Form --> */}
          <div
            ref={modalRef}
            onClick={closeModal}
            x-show="modalOpen"
            x-transition
            className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
          >
            <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-10 md:px-10.5">
              <span className="mx-auto inline-block">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.6"
                    width="60"
                    height="60"
                    rx="30"
                    fill="#CFFAFE"
                  />
                  <path
                    d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                    stroke="#0891B2"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                {' '}
                Assign to Member{' '}
              </h3>
              <p className="mb-10 font-medium text-black text-sm">
                {' '}
                Please nominate a member you would like to assign Program.{' '}
              </p>
              
              <input
                type="search"
                placeholder="Search Member"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <br />
              <br />
              <div className="-mx-3 flex flex-wrap gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button className="block w-full rounded border border-black bg-gray p-3 text-center font-medium text-black transition  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                    {' '}
                    Cancel{' '}
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button className="block w-full rounded  bg-[#06B6D4] p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                    {' '}
                    Assign member{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignToMemberPopup;
