import { useEffect, useState, useRef } from 'react';
import './css/allProgramming.css';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firestoreConfig/firestore';
import Programgallerymodel from './programgallerymodel';
import userImage from '../../images/user/user-11.png';
import WorkoutGalleryModal from './workoutGalleryModal';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';
import { Spinner } from '@material-tailwind/react';

function allProgramming() {
  const [isProgramGalleryModalOpen, setIsProgramGalleryModalOpen] =
    useState(false);
  const [isWorkoutGalleryModalOpen, setIsWorkoutGalleryModalOpen] =
    useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentWorkoutPage, setCurrentWorkoutPage] = useState(1);
  const [currentProgramPage, setCurrentProgramPage] = useState(1);
  const [programLoading, setProgramLoading] = useState(false);
  const [workoutLoading, setWorkoutLoading] = useState(false);
  const [endOfProgramPage, setEndOfProgramPage] = useState(false);
  const [endOfWorkoutPage, setEndOfWorkoutPage] = useState(false);
  const loaderRef = useRef(null);

  const openWorkoutGalleryModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsWorkoutGalleryModalOpen(true);
    setIsProgramGalleryModalOpen(false);
  };

  const openGalleryModal = (program: any) => {
    setSelectedProgram(program);
    setIsProgramGalleryModalOpen(true);
    setIsWorkoutGalleryModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.classList.contains('bg-black')) {
        setIsProgramGalleryModalOpen(false);
        setIsWorkoutGalleryModalOpen(false);
      }
    };

    if (isProgramGalleryModalOpen || isWorkoutGalleryModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isProgramGalleryModalOpen, isWorkoutGalleryModalOpen]);

  const [programs, setPrograms] = useState([] as any);
  const [workouts, setWorkouts] = useState([] as any);

  // const getPrograms = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'Programs'));
  //   const programData = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setPrograms(programData);
  // };

  const getPrograms = async () => {
    setProgramLoading(true);
    try {
      const apiUrl = `${firebaseHostURL}programs/?page=${currentProgramPage}&gymId=${gymId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${getAuthToken()}`,
          },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      if (
        responseData.data.length === 0 ||
        currentProgramPage > responseData.pagination.pagesTotal
      ) {
        setEndOfProgramPage(true);
      } else {
        // Check for duplicate items before adding to programs array
        const newPrograms = responseData.data.filter(
          (program: any) => !programs.some((p: any) => p.id === program.id),
        );
        setPrograms((prevPrograms: any) => [...prevPrograms, ...newPrograms]);
        setCurrentProgramPage((prevPage) => prevPage + 1);
      }
    } catch (error: any) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setProgramLoading(false);
    }
  };

  // const getWorkouts = async () => {
  //   const querySnapshot = await getDocs(
  //     query(collection(db, 'Gym Workouts'), limit(10)),
  //   );
  //   const workoutData = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setWorkouts(workoutData);
  // };

  const getWorkouts = async () => {
    setWorkoutLoading(true);
    try {
      const apiUrl = `${firebaseHostURL}workouts/?page=${currentWorkoutPage}&gymId=${gymId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${getAuthToken()}`,
          },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();

      if (
        responseData.data.length === 0 ||
        currentWorkoutPage > responseData.pagination.pagesTotal
      ) {
        setEndOfWorkoutPage(true);
      } else {
        // Check for duplicate items before adding to workouts array
        const newWorkouts = responseData.data.filter(
          (workout: any) => !workouts.some((p: any) => p.id === workout.id),
        );
        setWorkouts((prevWorkouts: any) => [...prevWorkouts, ...newWorkouts]);
        setCurrentWorkoutPage((prevPage) => prevPage + 1);
      }
    } catch (error: any) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setWorkoutLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !programLoading &&
          !endOfProgramPage 
        ) {
          console.log('Reached end of page, fetching more data...');
          getPrograms();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [programLoading, endOfProgramPage]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !workoutLoading &&
          !endOfWorkoutPage
        ) {
          console.log('Reached end of page, fetching more data...');
          getWorkouts();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [workoutLoading, endOfWorkoutPage]);

  useEffect(() => {}, [programs, workouts]);

  return (
    <>
      <div className="main">
        <br />
        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-[10px] xl:grid-cols-5"> */}
        <div className="flex flex-wrap justify-between max-w-[1048px]">
          {Array.isArray(programs) &&
            programs.map((program: any, index: number) => (
              <div
                key={program.id + '-' + index}
                onClick={() => openGalleryModal(program)}
                className="rounded dark:border-strokedark dark:bg-boxdark"
              >
                <a href="#" className="block pcardimg">
                  <img
                    src={program.photo}
                    alt="Cards"
                    className="rounded-[11.79px] w-[200px] h-[165px] object-fill"
                  />
                  <div className="absolute top-[11px] left-[121px] block w-[69px] h-[20px]">
                    <p className="rounded-full bg-fitflo px-[10px] py-[2px] text-xs text-[12px] font-medium text-white">
                      Program
                    </p>
                  </div>
                </a>
                <div className="">
                  <h4
                    className="text-xl font-semibold text-black dark:text-white pt-[12px]"
                    style={{ fontSize: '14px', fontFamily: 'inter' }}
                  >
                    <a href="#">{program.name}</a>
                  </h4>
                  <pre style={{ fontSize: '12px', fontFamily: 'inter' }}>
                    Strength .{' '}
                    {program.workoutCount > 1
                      ? program.workoutCount + ' Workouts'
                      : program.workoutCount + ' Workout'}{' '}
                    . {program.duration} Weeks
                  </pre>
                  <div className="flex items-center gap-2 py-2">
                    <div className="h-[16px] w-[16px] rounded-full">
                      <img src={userImage} alt="User" />
                    </div>
                    <div>
                      <p
                        style={{ fontSize: '12px', fontFamily: 'inter' }}
                        className="text-xs font-medium"
                      >
                        By {program.creatorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {Array.isArray(workouts) &&
            workouts.map((workout: any, index: Number) => (
              <div
                key={workout && workout.id + '-' + index}
                onClick={() => openWorkoutGalleryModal(workout)}
                className="rounded dark:border-strokedark dark:bg-boxdark"
              >
                <a href="#" className="block pcardimg">
                  <img
                    src={(workout && workout.photo) || ''}
                    alt="Cards"
                    className="rounded-[11.79px] w-[200px] h-[165px] object-fill"
                  />
                  <div className="absolute top-[11px] left-[121px] block w-[69px] h-[20px]">
                    <p className="rounded-full bg-[#2563EB] px-[10px] py-[2px] text-xs text-[12px] font-medium text-white">
                      Workout
                    </p>
                  </div>
                </a>
                <div className="">
                  <h4
                    className="text-xl font-semibold text-black dark:text-white pt-[12px]"
                    style={{ fontSize: '14px', fontFamily: 'inter' }}
                  >
                    <a href="#">{(workout && workout.workoutName) || ''}</a>
                  </h4>
                  <pre style={{ fontSize: '12px', fontFamily: 'inter' }}>
                    {(workout && workout.trainingLevel) || ''} •{' '}
                    {(workout && workout.exerciseCount) || 0} Exercises •{' '}
                    {(workout && workout.duration) || 'NA'} Week
                  </pre>
                  <div className="flex items-center gap-2 py-2">
                    <div className="h-[16px] w-[16px] rounded-full">
                      <img src={userImage} alt="User" />
                    </div>
                    <div>
                      <p
                        style={{ fontSize: '12px', fontFamily: 'inter' }}
                        className="text-xs font-medium"
                      >
                        By {workout && workout.creatorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div
            className="scroll-list-bottom text-fitflo ml-4 p-4  font-bold"
            ref={loaderRef}
          >
            {workoutLoading || programLoading && <Spinner />}
          </div>
        </div>
      </div>

      {/* program gallery modal */}
      <div className="max-h-screen flex items-center justify-center">
        {isProgramGalleryModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 overflow-auto  ${
              { isGalleryModalOpen: isProgramGalleryModalOpen } ? '' : 'hidden'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div className="inset-0 items-center justify-center z-50 w-full mt-20 md:w-[80%] lg:w-[85%] xl:w-[65%]">
              <Programgallerymodel
                onClose={() => {
                  setIsProgramGalleryModalOpen(false);
                  setIsWorkoutGalleryModalOpen(false);
                }}
                programData={selectedProgram}
              />
            </div>
          </div>
        )}
      </div>

      {/* workout gallery modal */}
      <div className="max-h-screen flex items-center justify-center">
        {isWorkoutGalleryModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 overflow-auto  ${
              { isWorkoutGalleryModalOpen } ? '' : 'hidden'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div className="inset-0 items-center justify-center z-50 w-full mt-20 md:w-[80%] lg:w-[85%] xl:w-[65%]">
              <WorkoutGalleryModal
                onCancel={() => {
                  setIsWorkoutGalleryModalOpen(false);
                  setIsProgramGalleryModalOpen(false);
                }}
                workoutData={selectedWorkout}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default allProgramming;
