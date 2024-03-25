import './css/allProgramming.css';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firestoreConfig/firestore';
import { useEffect, useState, useRef } from 'react';
import WorkoutGalleryModal from './workoutGalleryModal';
import userImage from '../../images/user/user-11.png';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';
import { Spinner } from '@material-tailwind/react';

function WorkoutProgramming() {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const loaderRef = useRef(null);

  const openGalleryModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsGalleryModalOpen(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.classList.contains('bg-black')) {
        setIsGalleryModalOpen(false);
      }
    };

    if (isGalleryModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isGalleryModalOpen]);

  const [workouts, setWorkouts] = useState([] as any);

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
    setLoading(true);
    try {
      const apiUrl = `${firebaseHostURL}workouts/?page=${currentPage}&gymId=${gymId}`;
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
        currentPage > responseData.pagination.pagesTotal
      ) {
        setEndOfPage(true);
      } else {
        // Check for duplicate items before adding to workouts array
        const newWorkouts = responseData.data.filter(
          (workout: any) => !workouts.some((p: any) => p.id === workout.id),
        );
        setWorkouts((prevWorkouts: any) => [...prevWorkouts, ...newWorkouts]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error: any) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !endOfPage) {
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
  }, [loading, endOfPage]);

  useEffect(() => {}, [workouts]);

  return (
    <>
      <div className="main">
        <br />
        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-[10px] xl:grid-cols-5"> */}
        <div className="flex flex-wrap justify-between max-w-[1048px]">
          {Array.isArray(workouts) &&
            workouts.map((workout: any, index: number) => (
              <div
                key={workout && workout.id + '-' + index}
                onClick={() => openGalleryModal(workout)}
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
                    {workout && workout.exerciseCount} Exercises •{' '}
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
                        By {(workout && workout.creatorRole) || ''}
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
            {loading && <Spinner />}
          </div>
        </div>
      </div>

      {/* workout gallery modal */}
      <div className="max-h-screen flex items-center justify-center">
        {isGalleryModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 overflow-auto  ${
              { isGalleryModalOpen } ? '' : 'hidden'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div className="inset-0 items-center justify-center z-50 w-full mt-20 md:w-[80%] lg:w-[85%] xl:w-[65%]">
              <WorkoutGalleryModal
                onCancel={() => setIsGalleryModalOpen(false)}
                workoutData={selectedWorkout}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WorkoutProgramming;
