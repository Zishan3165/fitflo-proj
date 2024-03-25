import './css/allProgramming.css';
import { X } from 'lucide-react';
import userImage from '../../images/user/user-11.png';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Createprogram from './createprogram';

interface ModalProps {
  onClose: () => void;
  programData: any;
}

const Programgallerymodel: React.FC<ModalProps> = ({
  onClose,
  programData,
}) => {
  const [displayedProgramData, setDisplayedProgramData] = useState([] as any);
  const [exercises, setExercises] = useState([] as any);
  const [repsValue, setRepsValue] = useState([] as any[]);
  const [weightValue, setWeightValue] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${firebaseHostURL}programs/${
          programData && programData.id
        }/?gymId=${gymId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      )
      .then((response: any) => {
        setDisplayedProgramData(response.data && response.data.data);
      })
      .catch((error: any) => {
        console.error('Error fetching :', error);
      });
  }, [programData]);

  useEffect(() => {
    setDisplayedProgramData(displayedProgramData);
    if (
      displayedProgramData &&
      displayedProgramData.workoutList &&
      displayedProgramData.workoutList.length > 0
    ) {
      const combinedExerciseList = displayedProgramData.workoutList.reduce(
        (accumulator: any, workout: any) =>
          accumulator.concat(workout.exerciseList),
        [],
      );
      if (combinedExerciseList) {
        setExercises(combinedExerciseList);
        combinedExerciseList.forEach((exercise: any) => {
          const { experience_levels } = exercise;

          // Extract repet and weight values
          const repetValues = experience_levels
            .map((level: any) => level.repet)
            .join(', ');
          const weightValues = experience_levels.map((level: any) =>
            parseInt(level.weight, 10),
          );

          // Calculate average weight
          const averageWeight = weightValues.length
            ? weightValues.reduce(
                (sum: number, weight: number) => sum + weight,
                0,
              ) / 2
            : 0;

          setRepsValue((prevRepsValues: any) => [
            ...prevRepsValues,
            repetValues,
          ]);
          setWeightValue((prevWeightValues: any) => [
            ...prevWeightValues,
            averageWeight,
          ]);

          return {
            repet: repetValues,
            averageWeight: averageWeight,
          };
        });
      }
    }
  }, [displayedProgramData]);

  return (
    <>
      <div
        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        className="bg-white px-5 pt-6 dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div className="flex justify-between items-center mb-2">
          <h3></h3>
          <button onClick={onClose}>
            <X size={30} />
          </button>
        </div>
        <div className="overflow-auto h-[400px] p-2">
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <div className="rounded dark:border-strokedark dark:bg-boxdark">
                <a href="#" className="block pcardimg">
                  <img
                    src={displayedProgramData && displayedProgramData.photo}
                    alt="Cards"
                    className="rounded-[11.79px] w-[200px] h-[165px]"
                  />
                  <div className="absolute top-[11px] left-[121px] block">
                    <p className="rounded-full bg-fitflo px-[10px] py-[2px] text-xs text-[12px] font-medium text-white">
                      Program
                    </p>
                  </div>
                </a>
                <div className="">
                  <h4
                    className="text-xl font-semibold text-black dark:text-white"
                    style={{ fontSize: '14px', fontFamily: 'inter' }}
                  >
                    <a href="#">
                      {displayedProgramData && displayedProgramData.name}
                    </a>
                  </h4>
                  <pre style={{ fontSize: '12px', fontFamily: 'inter' }}>
                    Strength •{' '}
                    {displayedProgramData.workoutCount > 1
                      ? displayedProgramData.workoutCount + ' Workouts'
                      : displayedProgramData.workoutCount + ' Workout'}{' '}
                    • {displayedProgramData && displayedProgramData.duration}{' '}
                    Weeks
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
                        By{' '}
                        {displayedProgramData &&
                          displayedProgramData.creatorRole}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/1">
              <div className="p-4">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                  <a href="#">
                    {displayedProgramData && displayedProgramData.name}
                  </a>
                </h4>
                <div className="font-medium prmenu text-[14px]">
                  {' '}
                  {displayedProgramData && displayedProgramData.trainingLevel}•
                  Strength •{' '}
                  {displayedProgramData.workoutCount > 1
                    ? displayedProgramData.workoutCount + ' Workouts'
                    : displayedProgramData.workoutCount + ' Workout'}
                  • {displayedProgramData && displayedProgramData.duration}{' '}
                  Weeks
                </div>
              </div>
              <div className="p-4">
                {displayedProgramData && displayedProgramData.description ? (
                  <p className="text-black text-[14px]">
                    {displayedProgramData.description}
                  </p>
                ) : (
                  <p className="text-black text-[14px]"> </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-sm bg-white pt-6 dark:bg-boxdark xl:pb-1">
            <h4 className="text-xl font-bold text-black dark:text-white">
              Workout
            </h4>
            <div className="flex flex-col p-4">
              <div className="grid grid-cols-3 rounded-sm border-b border-stroke dark:border-strokedark dark:bg-meta-4 sm:grid-cols-6">
                <div className="p-2.5 xl:p-3">
                  <h3 className="text-black font-medium  text-[14px]">
                    Exercise
                  </h3>
                </div>
                <div className="p-2.5 text-center xl:p-3">
                  <h5 className="text-black font-medium  text-[14px]">Sets</h5>
                </div>
                <div className="p-2.5 text-center xl:p-3">
                  <h5 className="text-black font-medium  text-[14px]">Reps</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-3">
                  <h5 className="text-black font-medium  text-[14px]">
                    Weight
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-3">
                  <h5 className="text-black font-medium  text-[14px]">Rest</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-3">
                  <h5 className="text-black font-medium  text-[14px]">Time</h5>
                </div>
              </div>
              {exercises.map((exercise: any, exerciseIndex: number) => (
                <div
                  key={exerciseIndex}
                  className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6"
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-3">
                    <h5 className="text-sm font-medium">
                      {' '}
                      {exercise.exercises_name}
                    </h5>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="font-medium text-sm dark:text-white">
                      {exercise.experience_levels &&
                        exercise.experience_levels.length}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="font-medium text-sm-3">
                      {repsValue[exerciseIndex]}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-3">
                    <p className="font-medium text-sm dark:text-white">
                      {weightValue[exerciseIndex]}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-3">
                    <p className="font-medium text-sm-5">0</p>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-3">
                    <p className="font-medium text-sm-5">
                      {exercise.time || '0'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
        className="border-b border-stroke py-4 px-2 h-[62px] dark:border-strokedark bg-[#F9FAFB] w-full"
      >
        <div className="flex justify-between">
          <button
            className="flex justify-center rounded-lg bg-white border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            {displayedProgramData.operatorCanEdit ? 'Edit' : 'Assign'}
          </button>
          <button
            className="flex justify-center rounded-lg bg-fitflo border py-2 px-5 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Done
          </button>
        </div>
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
    </>
  );
};

export default Programgallerymodel;
