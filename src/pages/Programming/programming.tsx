import Plusicon from '../../images/icon/plus-Icon.png';
import './css/programming.css';
import AllProgramming from './allProgramming';
// import Createprogram from './createprogram';
import { useEffect, useState } from 'react';
import WorkoutProgramming from './workoutProgramming';
import ProgramProgramming from './programProgramming';
import WorkoutModal from './workoutModal';
import Createprogram from './createprogram';

function programming() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsWorkoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsWorkoutModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.classList.contains('bg-black')) {
        // Clicked on the overlay, close the modal
        handleCloseModal();
        setShowModal(false);
      }
    };

    if (isWorkoutModalOpen || showModal) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isWorkoutModalOpen, showModal]);

  const onChangeTab = (type: string) => {
    setSelectedTab(type);
  };

  const tabBorder = (color: string, type: string) => {
    let border: string, selectColor: string;
    if (selectedTab == color) {
      border = '3px solid #0891B2';
      selectColor = '#0891B2';
    } else {
      border = '';
      selectColor = '';
    }
    return type == 'border' ? { borderBottom: border } : { color: selectColor };
  };

  let renderTab: any = {
    All: <AllProgramming />,
    Workouts: <WorkoutProgramming />,
    Programs: <ProgramProgramming />,
  };

  return (
    <>
      <div className="main">
        <div className="flex justify-between items-center">
          <p className='text-title-md2 font-medium text-[#111827] text-[15px] mt-3'>Start with a Template</p>
        <div className="flex justify-end gap-4.5">
          <button
            className="inline-flex items-center w-[165px] h-[38px] justify-center gap-[8px] rounded-[6px] bg-[#2563EB]  text-center font-medium text-white hover:bg-opacity-90 "
            type="button"
            onClick={handleOpenModal}
          >
            <span>
              <img src={Plusicon} alt="" />
            </span>
            Create Workout
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center w-[165px] h-[38px] justify-center gap-[8px] rounded-[6px] bg-fitflo  text-center font-medium text-white hover:bg-opacity-90 "
            type="submit"
          >
            <span>
              <img src={Plusicon} alt="" />
            </span>
            Create Program
          </button>
        </div>
        </div>
        <br />

        <div className="flex flex-wrap justify-between bg-white border border-[#CBD5E1] dark:bg-boxdark p-[12px] lg:w-full rounded-lg">
          <a href="#">
            <div
              onClick={() => setShowModal(true)}
              className="w-[167px] h-[116.65px] my-1 rounded border border-1 border-[#E2E8F0] bg-[#ebfeff] py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="relative top-[-4px] left-[70px] w-[69px] h-[20px]">
                <p className="inline-flex rounded-full bg-success px-[10px] py-[2px] text-xs text-[12px] bg-opacity-10 dark:text-white font-medium text-success">
                  {' '}
                  Program{' '}
                </p>
              </div>
              <div>
                <p
                  style={{ fontSize: '14px' }}
                  className="text-[#111827] dark:text-white mt-6 font-medium text-sm text-[14px] align-text-bottom"
                >
                  {' '}
                  Strength & conditioning{' '}
                </p>
              </div>
            </div>
          </a>

          <a href="#">
            <div
              onClick={handleOpenModal}
              className="w-[167px] h-[116.65px] my-1 rounded border border-1 border-[#E2E8F0] bg-[#eff6ff] py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="relative top-[-4px] left-[70px]  w-[69px] h-[20px]">
                <p className="inline-flex rounded-full bg-primary px-[10px] py-[2px] bg-opacity-10 text-[12px] text-xs text-black dark:text-white font-medium text-primary">
                  {' '}
                  Workout{' '}
                </p>
              </div>
              <div>
                <p
                  style={{ fontSize: '14px' }}
                  className="text-[#111827] dark:text-white mt-11 font-medium text-sm text-[14px] align-text-bottom"
                >
                  {' '}
                  Legs{' '}
                </p>
              </div>
            </div>
          </a>

          <a href="#">
            <div
              onClick={() => setShowModal(true)}
              className="w-[167px] h-[116.65px] my-1 rounded border border-1 border-[#E2E8F0] bg-[#ebfeff] py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="relative top-[-4px] left-[70px]  w-[69px] h-[20px]">
                <p className="inline-flex rounded-full bg-success px-[10px] py-[2px] bg-opacity-10 text-[12px] text-xs dark:text-white font-medium text-success">
                  {' '}
                  Program{' '}
                </p>
              </div>
              <div>
                <p
                  style={{ fontSize: '14px' }}
                  className="text-[#111827] dark:text-white mt-6 font-medium text-sm text-[14px] align-text-bottom"
                >
                  {' '}
                  Muscle <br /> Endurance{' '}
                </p>
              </div>
            </div>
          </a>

          <a href="#">
            <div
              onClick={handleOpenModal}
              className="w-[167px] h-[116.65px] my-1 rounded border border-1 border-[#E2E8F0] bg-[#eff6ff] py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="relative top-[-4px] left-[70px]  w-[69px] h-[20px]">
                <p className="inline-flex rounded-full bg-primary px-[10px] py-[2px] bg-opacity-10 text-[12px] text-xs dark:text-white font-medium text-primary">
                  {' '}
                  Workout{' '}
                </p>
              </div>
              <div>
                <p
                  style={{ fontSize: '14px' }}
                  className="text-[#111827] dark:text-white mt-11 font-medium text-sm text-[14px] align-text-bottom"
                >
                  {' '}
                  Core & cardio{' '}
                </p>
              </div>
            </div>
          </a>

          <a href="#">
            <div
              onClick={handleOpenModal}
              className="w-[167px] h-[116.65px] my-1 rounded border border-1 border-[#E2E8F0] bg-[#ebfeff] py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="relative top-[-4px] left-[70px] w-[69px] h-[20px]">
                <p className="inline-flex rounded-full bg-primary px-[10px] py-[2px] bg-opacity-10 text-[12px] text-xs dark:text-white font-medium text-primary">
                  {' '}
                  Workout{' '}
                </p>
              </div>
              <div>
                <p
                  style={{ fontSize: '14px' }}
                  className="text-[#111827] dark:text-white mt-6 font-medium text-sm text-[14px] align-text-bottom"
                >
                  {' '}
                  Upper Body (free weights)
                </p>
              </div>
            </div>
          </a>

          <a href="#">
            <div
              onClick={handleOpenModal}
              className="w-[167px] h-[116.65px] my-1 rounded border-1 border border-[#E2E8F0]  py-[12px] px-4.5 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="h1 mt-8 text-[#1F2937] dark:text-white text-center font-medium text-sm text-[14px]">
                All Templates <br /> →
              </div>
            </div>
          </a>
        </div>
        <br />

        <div className="programmingheader">
          <h1 className="text-xl font-semibold text-[15px] text-black dark:text-white p-2">
            Programming
          </h1>
          <div className="flex justify-between items-center border-b border-b-2 border-[#E5E7EB]">
            <header>
              <div className="wrapper navbar">
                <nav>
                  <ul>
                    <li
                      style={tabBorder('All', 'border')}
                      onClick={() => onChangeTab('All')}
                    >
                      <a style={tabBorder('All', 'text-color')} href="#">
                        <p style={{ fontSize: '14px' }}>All</p>
                      </a>
                    </li>
                    <li
                      style={tabBorder('Workouts', 'border')}
                      onClick={() => onChangeTab('Workouts')}
                    >
                      <a style={tabBorder('Workouts', 'text-color')} href="#">
                        <p style={{ fontSize: '14px' }}>Workouts</p>
                      </a>
                    </li>
                    <li
                      style={tabBorder('Programs', 'border')}
                      onClick={() => onChangeTab('Programs')}
                    >
                      <a style={tabBorder('Programs', 'text-color')} href="#">
                        <p style={{ fontSize: '14px' }}> Programs</p>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            <div>
              <select
                name=""
                id=""
                className="bg-transparent px-2 text-grayf font-medium text-[14px]"
              >
                <option value="">Difficulty</option>
              </select>
              <select
                name=""
                id=""
                className="bg-transparent px-2 text-grayf font-medium text-[14px]"
              >
                <option value="">Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        {renderTab[selectedTab]}
      </div>

      {/* create program modal */}
      <div className="max-h-screen flex items-center justify-center">
        {showModal && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 overflow-auto  ${
              { showModal } ? '' : 'hidden'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div className="inset-0 items-center justify-center z-50 md:w-[80%] lg:w-[85%] xl:w-[95%]">
              <Createprogram onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </div>

      {/* create workout modal */}
      <div className="max-h-screen flex items-center justify-center">
        {isWorkoutModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 overflow-auto  ${
              { isWorkoutModalOpen } ? '' : 'hidden'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div
              className="inset-0 items-center justify-center z-50 md:w-[80%] lg:w-[85%] xl:w-[95%]"
              // style={{ marginTop: window.innerWidth < 770 ? '200%' : '' }}
            >
              <WorkoutModal onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default programming;
