import { useRef } from 'react';
import userImage from '../../images/user/user-11.png';
import workoutImage from '../../images/cards/Workout.png';
import tick from '../../images/icon/Tick.svg';

function ProgramCreatedPopup({ onClose }: any) {
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
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
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
            <div className="bg-fitflo rounded-lg w-[1008px] gap-[40px] pt-4 lg:h-[502px]">
              {/* Equal two sections */}
              <div className="flex flex-col gap-0 xl:flex-row items-center justify-center h-[460px] overflow-auto">
                {/* First section */}
                <div className="w-[376px] px-[16px] gap-[32px] items-center justify-center">
                  <img src={tick} alt=""  className="h-[40px] w-[40px] ml-27 mb-4"/>
                  <h1 className="font-extrabold mb-6 text-3xl tracking-right text-[30px]">
                    Program Created
                  </h1>
                  <p style={{ fontSize: '16px' }} className="text-[#CFFAFE]">
                    Sarah Sondersonn created with customized Beginners Strength
                    Program
                  </p>
                </div>

                {/* Second section */}
                <div className="w-[338px] h-[470px] p-[40px]">
                  <div className="flex flex-col w-[258px] h-[390px] bg-white bg-clip-border rounded-[6px] p-[24px] items-center justify-center">
                    <a
                      href="#"
                      className="block pcardimg lg:w-[336px] lg:ml-35"
                    >
                      <img
                        src={workoutImage}
                        alt="Cards"
                        className="rounded-lg"
                      />
                      <div className="absolute top-[2px] left-[94px] block pt-[10px] pr-[10px]">
                        <p className="rounded-full bg-fitflo py-0.5 px-4  font-medium text-white">
                          Program
                        </p>
                      </div>
                    </a>
                    <div className="p-1 mb-4">
                      <h4
                        className="text-xl font-bold text-black dark:text-white"
                        style={{ fontSize: '14px' }}
                      >
                        Beginners Strength Program
                      </h4>
                      <pre
                        className="text-[#6B7280] text-small"
                        style={{ fontSize: '12px', fontFamily: 'inter' }}
                      >
                        Strength . 24 Workouts . 8 Weeks
                      </pre>
                      <div className="flex items-center gap-[8px] py-3 px-1">
                        <div className="h-[16px] w-[16px] rounded-full">
                          <img src={userImage} alt="User" />
                        </div>
                        <div>
                          <p
                            style={{ fontSize: '12px' }}
                            className="text-xs text-[#6B7280] font-medium "
                          >
                            By Johnny Dipsmor
                          </p>
                        </div>
                      </div>
                      <p
                        className="font-bold text-black mt-4"
                        style={{ fontSize: '23px' }}
                      >
                        Workouts
                      </p>
                      <p
                        className="font-bold text-black mt-4"
                        style={{ fontSize: '19px' }}
                      >
                        Arms and Chest
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
                className="flex w-full justify-between sticky bottom-0 bg-white py-[12px] px-[24px]"
              >
                <h1></h1>
                <button className="bg-fitflo rounded w-[70px] h-[38px]">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramCreatedPopup;
