import Userimg from '../../images/icon/userimg.png';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';

function WorkoutMember({ memberData }: any) {
  if (!memberData) {
    return <div>Loading...</div>;
  }
  const [userWorkouts, setUserWorkouts] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 5;
  const maxVisiblePages = 5;

  useEffect(() => {
    if (memberData && memberData.programList) {
      const userWorkouts = memberData.programList.flatMap(
        (userProgram: any) => userProgram.workoutList,
      );
      setUserWorkouts(userWorkouts);
    }
  }, [memberData, currentPage]);

  useEffect(() => {}, [userWorkouts]);

  const totalWorkouts = userWorkouts.length;
  const totalPages = Math.ceil(totalWorkouts / workoutsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const visiblePages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2),
    );

    for (
      let i = startPage;
      i <= Math.min(startPage + maxVisiblePages - 1, totalPages);
      i++
    ) {
      visiblePages.push(
        <li key={i}>
          <a
            className={`flex items-center justify-center border border-stroke py-[5px] px-4 font-medium 
              ${
                currentPage === i
                  ? 'bg-gray text-fitflo'
                  : 'hover:border-fitflo hover:bg-gray hover:text-fitflo dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark'
              }`}
            href="#"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return visiblePages;
  };

  const visibleWorkouts = userWorkouts.slice(
    (currentPage - 1) * workoutsPerPage,
    currentPage * workoutsPerPage,
  );

  return (
    <>
      <div className="p-8">
        <div className="grid grid-cols-8 rounded-lg border border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-4 flex items-center">
            <p className="font-medium text-[14px] text-[#374151]">WORKOUT</p>
          </div>
          <div className="col-span-3  items-center sm:flex">
            <p className="font-medium text-[14px] text-[#374151]">DETAILS</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-[14px] text-[#374151]">LOGGED</p>
          </div>
        </div>
        {visibleWorkouts.map((userWorkout: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-6 border border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-4 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="rounded-md">
                  <img
                    style={{ height: '40px', width: '40px' }}
                    src={userWorkout ? userWorkout.photo : Userimg}
                    alt="user"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-[#1F2937] dark:text-white text-[14px]">
                    {userWorkout.workoutName}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-span-3 items-center sm:flex">
              <p className="text-sm font-medium text-[#4B5563] dark:text-white text-[14px]">
                {userWorkout.trainingLevel} • {userWorkout.exerciseList.length}{' '}
                Exercises • N/A Week
              </p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm font-medium text-[#4B5563] dark:text-white text-[14px]">
                08/08/2020
              </p>
            </div>
          </div>
        ))}
        {totalWorkouts == 0 && (
          <p className="flex text-fitflo ml-4 p-4  font-bold">
            Loading.. <Spinner />
          </p>
        )}

        {/* //pagination */}
        <div className="flex justify-between items-center p-4">
          <p>
            Showing{' '}
            {Math.min((currentPage - 1) * workoutsPerPage + 1, totalWorkouts)}{' '}
            to {Math.min(currentPage * workoutsPerPage, totalWorkouts)} of{' '}
            {totalWorkouts} results
          </p>
          <div className="p-4 sm:p-6 xl:p-7.5">
            <nav>
              <ul className="flex flex-wrap items-center">
                <li>
                  <a
                    className="flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-fitflo hover:bg-gray hover:text-fitflo dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark"
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                  >
                    <svg
                      className="fill-current"
                      width="8"
                      height="16"
                      viewBox="0 0 8 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.17578 15.1156C7.00703 15.1156 6.83828 15.0593 6.72578 14.9187L0.369531 8.44995C0.116406 8.19683 0.116406 7.80308 0.369531 7.54995L6.72578 1.0812C6.97891 0.828076 7.37266 0.828076 7.62578 1.0812C7.87891 1.33433 7.87891 1.72808 7.62578 1.9812L1.71953 7.99995L7.65391 14.0187C7.90703 14.2718 7.90703 14.6656 7.65391 14.9187C7.48516 15.0312 7.34453 15.1156 7.17578 15.1156Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </li>

                {renderPageNumbers()}

                <li>
                  <a
                    className="flex h-9 w-9 items-center justify-center rounded-r-md border border-stroke border-l-transparent hover:border-fitflo hover:bg-gray hover:text-fitflo dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark"
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                  >
                    <svg
                      className="fill-current"
                      width="8"
                      height="16"
                      viewBox="0 0 8 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.819531 15.1156C0.650781 15.1156 0.510156 15.0593 0.369531 14.9468C0.116406 14.6937 0.116406 14.3 0.369531 14.0468L6.27578 7.99995L0.369531 1.9812C0.116406 1.72808 0.116406 1.33433 0.369531 1.0812C0.622656 0.828076 1.01641 0.828076 1.26953 1.0812L7.62578 7.54995C7.87891 7.80308 7.87891 8.19683 7.62578 8.44995L1.26953 14.9187C1.15703 15.0312 0.988281 15.1156 0.819531 15.1156Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkoutMember;
