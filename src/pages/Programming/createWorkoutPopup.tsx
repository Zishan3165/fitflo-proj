import { useRef } from 'react';
import userImage from '../../images/user/user-11.png';
import workoutImage from '../../images/cards/Workout.png';
import tick from '../../images/icon/Tick.svg';

function WorkoutCreatedPopup({ onClose }: any) {
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
            <div className="bg-fitflo rounded-lg w-[1008px] pt-4 lg:h-[502px]">
              {/* Equal two sections */}
              <div className="flex flex-col gap-0 xl:flex-row items-center justify-center h-[460px] overflow-auto">
                {/* First section */}
                <div className="w-[376px] px-[16px] gap-[32px] text-center">
                <img src={tick} alt="" className="h-[40px] w-[40px] ml-40 mb-4"/>
                  <h1 className="font-extrabold mb-8" style={{ fontSize: '30px' }}>
                    Workout Created
                  </h1>
                  <p style={{ fontSize: '16px' }} className="text-[#CFFAFE]">
                    You created a 'High Intensity Workout'
                  </p>
                </div>

                {/* Second section */}
                <div className="w-[338px] h-[470px] p-[40px]">
                  <div className="flex flex-col p-[24px] w-[258px] gap-[12px] bg-white  bg-clip-border rounded-[6px] items-center justify-center">
                    <div className="bg-clip-border rounded-xl bg-blue-gray-500 ">
                      <img
                        src={workoutImage}
                        alt="card-image"
                        width={'200px'}
                        height={'165px'}
                      />
                    </div>
                    <div>
                      <h5 className="block mb-2 font-sans font-bold text-[23px] antialiased font-semibold leading-snug tracking-normal text-black">
                        High Intensity Workout
                      </h5>
                      <p className="text-[#6B7280] text-[12px] text-xs font-normal">14 exercise</p>
                      <div className="flex items-center gap-[8px] py-2 px-1">
                        <div className="h-[16px] w-[16px] rounded-full">
                          <img src={userImage} alt="User" />
                        </div>
                        <div>
                          <p
                            className="text-[12px] text-xs font-normal text-[#6B7280] font-medium "
                          >
                            By Johny Dipsmor{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
               className="flex w-full justify-between sticky bottom-0 bg-white py-[12px] px-[24px]">
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

export default WorkoutCreatedPopup;
