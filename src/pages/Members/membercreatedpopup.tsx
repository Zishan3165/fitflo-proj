import { useRef } from 'react';
import FitFloWhiteicon from '../../images/icon/FitFlo-Icon-White.png';
import Rightwhiteicon from '../../images/icon/right-whiteicon.png';
import userImage from '../../images/user/user-11.png';

function MemberCreatedPopup({ onClose , popupData }: any) {
  console.log("popup",popupData)
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
          <div className="w-full  rounded-lg bg-[#0891B2] h-[564px] overflow-auto dark:bg-boxdark ">
            <div className="mb-4.5 flex flex-col gap-5 xl:flex-row items-center justify-center">
              <div className="text-center gap-[32px]">
                <br />
                <br />
                <br />
                <br />
                <span
                  className="mx-auto inline-block h-18 w-18 bg-[#41bcd1] px-4 py-7"
                  style={{ borderRadius: '50%' }}
                >
                  <img className="h-5 w-10" src={Rightwhiteicon} alt="" />
                </span>
                <h3
                  className="mt-5.5 pb-2 text-xl font-bold text-white dark:text-white sm:text-2xl"
                  style={{ fontSize: '30px' }}
                >
                  {' '}
                  Member Created{' '}
                </h3>
                <p
                  className="mb-5 font-medium text-white "
                  style={{ fontSize: '16px' }}
                >
                  {' '}
                  {popupData.firstName} {popupData.lastName} Created with customized {popupData.selectedProgram.name}
                </p>

                <div className="w-full ">
                  <div className="flex justify-center gap-4.5">
                    <div className="h-15 w-15 px-5 py-5 rounded bg-[#45bdd1]">
                      <img src={FitFloWhiteicon} alt="" />
                    </div>

                    <h3
                      className="pb-2 text-sm font-medium text-white dark:text-white sm:text-2xl "
                      style={{ fontSize: '18px' }}
                    >
                      {' '}
                      Note: Tell your Team Member to <br /> check their email an
                      invite
                    </h3>
                  </div>
                </div>
                <p
                  className="mb-1 font-medium text-white "
                  style={{ fontSize: '16px' }}
                >
                  {' '}
                  Fitflo is free and available on IOS and Android for members{' '}
                </p>
                <br />
                <br />
                <br />
              </div>
              
              <div className="">
                <div className="lg:px-20 md:px-20 lg:py-5">
                  <div className="rounded  dark:border-strokedark dark:bg-boxdark h-[390px] w-[280px] px-5 py-5 bg-white">
                    <a href="#" className="block   w-full  h-[175px] w-[231px]">
                      <img src={popupData.selectedProgram.photo} alt="Cards" className="rounded" />
                    </a>
                    <div className="mt-6">
                      <h4
                        className="text-xl font-semibold text-black dark:text-white"
                        style={{ fontSize: '14px' }}
                      >
                        <a href="#">{popupData.selectedProgram.name}</a>
                      </h4>
                      <p style={{ fontSize: '12px' }}>
                        {' '}
                        Strength . {popupData.selectedProgram.workoutList.length} Workouts . N/A Weeks
                      </p>
                      <div className="flex items-center gap-3 py-3 px-1">
                        <div className="h-[16px] w-[16px] rounded-full">
                          <img src={userImage} alt="User" />
                        </div>
                        <div>
                          <p
                            style={{ fontSize: '12px' }}
                            className="text-xs font-medium"
                          >
                            By {popupData.selectedProgram.creatorName}
                          </p>
                        </div>
                      </div>
                      <p
                        className="font-bold text-black mt-2"
                        style={{ fontSize: '23px' }}
                      >
                        {' '}
                        Workouts
                      </p>
                      <p
                        className="font-bold text-black mt-1"
                        style={{ fontSize: '19px' }}
                      >
                        {' '}
                        Arms and Chest
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4.5 bg-white p-3 mt-12">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2.5 rounded bg-[#0891B2] py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                type="submit"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCreatedPopup;
