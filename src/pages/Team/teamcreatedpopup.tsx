import { useRef } from 'react';
import FitFloWhiteicon from '../../images/icon/FitFlo-Icon-White.png';
import Rightwhiteicon from '../../images/icon/right-whiteicon.png';

function teamCreatedPopup({ onClose }: any) {
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
    <div className="">
      {/* <!-- Contact Form --> */}
      <div
        ref={modalRef}
        onClick={closeModal}
        style={myStyle}
        x-show="modalOpen"
        x-transition
        className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-10 py-5"
      >
        <div className="w-full  rounded-lg bg-[#06B6D4]  text-center dark:bg-boxdark ">
          <br />
          <br />
          <br />
          <span
            className="mx-auto inline-block h-18 w-18 bg-[#41bcd1] px-4 py-7"
            style={{ borderRadius: '50%' }}
          >
            <img className="h-5 w-10" src={Rightwhiteicon} alt="" />
          </span>
          <h3 className="mt-5.5 pb-2 text-[30px] text-white dark:text-white sm:text-2xl font-extrabold">
            {' '}
            New Team Member Created{' '}
          </h3>
          <p className="mb-5 font-medium text-white text-[16px]">
            {' '}
            Sarah Sondersonn will have access to:{' '}
          </p>
          <ul className="py-1 px-5 ml-5 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li className="font-medium text-white text-[16px]">
              {' '}
              Sign up and personalise onboarding for new members{' '}
            </li>
            <li className="font-medium text-white text-[16px]">
              {' '}
              Create workouts and programs{' '}
            </li>
            <li className="font-medium text-white text-[16px]">
              {' '}
              Assign programs to members{' '}
            </li>
          </ul>

          <div className="w-full">
            <div className="flex justify-center gap-4.5 mt-8">
              <div className="h-15 w-15 px-5 py-5 rounded bg-[#60c1d1]">
                <img src={FitFloWhiteicon} alt="" />
              </div>

              <h3 className=" pb-2 text-[18px] font-bold text-white dark:text-white sm:text-2xl ">
                {' '}
                Note: Tell your Team Member to <br /> check their email an
                invite
              </h3>
            </div>
          </div>
          <br />
          <div className="flex justify-end gap-4.5 bg-white p-3">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2.5 rounded bg-[#06B6D4] py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              type="submit"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default teamCreatedPopup;
