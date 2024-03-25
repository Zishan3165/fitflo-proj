import { useRef } from 'react';

function Editprogram({ onClose }: any) {
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
    <>
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
              className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-2 py-3 p-2"
            >
              <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark ">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <span className="mx-auto inline-block mt-3.5">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.1"
                          width="60"
                          height="60"
                          rx="30"
                          fill="#DC2626"
                        />
                        <path
                          d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                          stroke="#DC2626"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="w-full xl:w-1/1 ">
                    <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                      {' '}
                      This is a Public Program{' '}
                    </h3>
                    <p className="mb-10 font-medium text-black">
                      {' '}
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry Lorem Ipsum been.{' '}
                    </p>
                    <div className="-mx-3 flex flex-wrap gap-y-1">
                      <div className="w-full px-1 2xsm:w-1/2">
                        <button onClick={onClose}  className="inline-flex items-center justify-center gap-2.5 rounded bg-[#06B6D4] py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                          {' '}
                          Cancel{' '}
                        </button>
                      </div>
                      <div className="w-full px-1 2xsm:w-1/2">
                        <button className="flex justify-center rounded border border-black py-2 px-12 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                          {' '}
                          Edit{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editprogram;
