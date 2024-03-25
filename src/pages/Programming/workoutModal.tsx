import { X } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Frame_386 from '../../images/icon/Frame 386.svg';
import CreateWorkoutPopup from './createWorkoutPopup';
import Draggable from 'react-draggable';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import userImage from '../../images/user/user-11.png';
import '../../css/common.css';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Exercise } from './exercise';
import './css/createprogram.css';

interface ModalProps {
  onClose: () => void;
}

const WorkoutModal: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(
    'data:image/jpeg;base64,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',
  );
  const imageInputRef = useRef(null as any);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const [showWorkoutPopup, setShowWorkoutPopup] = useState(false);
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Machine chest press',
      sets: 5,
      reps: 85,
      weight: '40 kgs',
      rest: '30 sec',
      time: '-',
    },
    {
      id: 2,
      name: 'Dumbell bench press',
      sets: 3,
      reps: '10,8,6..',
      weight: '20 kgs',
      rest: '-',
      time: '-',
    },
    {
      id: 3,
      name: 'Dumbell bench press',
      sets: 3,
      reps: '10,8,6..',
      weight: '20 kgs',
      rest: '-',
      time: '-',
    },
    {
      id: 4,
      name: 'Dumbell bench press',
      sets: 3,
      reps: '10,8,6..',
      weight: '20 kgs',
      rest: '-',
      time: '-',
    },
    {
      id: 5,
      name: 'Dumbell bench press',
      sets: 3,
      reps: '10,8,6..',
      weight: '20 kgs',
      rest: '-',
      time: '-',
    },
  ] as any);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const getExercisePos = (id: any) =>
    exercises.findIndex((exercise: any) => exercise.id === id);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setExercises((exercise: any) => {
      const originalPos = getExercisePos(active.id);
      const newPos = getExercisePos(over.id);

      return arrayMove(exercise, originalPos, newPos);
    });
  };
  const addExercise = () => {
    const newExercise = {
      name: 'Select name',
      sets: '-',
      reps: '-',
      weight: '-',
      rest: '-',
      time: '-',
    };

    setExercises([...exercises, newExercise]);
  };
  const addSet = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets =
      updatedExercises[index].sets === '-'
        ? 1
        : updatedExercises[index].sets + 1;
    setExercises(updatedExercises);
  };

  const [isAddSetShow, setIsAddSetShow] = useState(exercises.map(() => false));
  const toggleAddSet = (index: number) => {
    const updatedVisibility = [...isAddSetShow];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsAddSetShow(updatedVisibility);
  };

  const [showMenu, setShowMenu] = useState(false);
  const [, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const removeExercise = () => {
    const updatedExercises = exercises.filter(
      (exercise: any) => exercise.id !== selectedExerciseId,
    );
    setExercises(updatedExercises);
    setShowMenu(false);
  };

  const Row = ({
    index,
    exercise,
    toggleAddSet,
    removeExercise,
    moveRow,
  }: any) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'ROW',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'ROW',
      hover: (draggedItem: any) => {
        if (draggedItem.index !== index) {
          moveRow(draggedItem.index, index);
        }
      },
    });

    return (
      <tr
        ref={(node) => drag(drop(node))}
        className={`dark:bg-boxdark border-b border-stroke bg-white ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <td>
          <button onClick={() => toggleAddSet(index)}>
            <img src={Frame_386} width={'14px'} height={'14px'}></img>
          </button>
        </td>
        <th scope="row" className="px-6 py-4 row-text-1 dark:text-white">
          {exercise.name}
        </th>
        <td className="px-6 py-4">{exercise.sets}</td>
        <td className="px-6 py-4">{exercise.reps}</td>
        <td className="px-6 py-4">{exercise.weight}</td>
        <td className="px-6 py-4">{exercise.rest}</td>
        <td className="px-6 py-4">{exercise.time}</td>
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <td>
            <button
              className="border border-stroke rounded-lg"
              onClick={(event: React.MouseEvent) => {
                setMenuPosition({
                  top: event.clientY + 10,
                  left: event.clientX,
                });
                setShowMenu(!showMenu);
                setSelectedExerciseId(exercises[index].id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[40px] h-[30px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
            {showMenu && selectedExerciseId === exercise.id && (
              <div
                className="bg-white p-4 w-52 absolute shadow-lg"
                style={{
                  top: '147px',
                  left: '632px',
                }}
              >
                <ul>
                  <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                    + Add variables sets
                  </li>
                  <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                    + Add Notes
                  </li>
                  <li className="p-1 border-t border-stroke  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                    Show/hide Sets
                  </li>
                  <li
                    className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]"
                    onClick={removeExercise}
                  >
                    Delete exercise
                  </li>
                </ul>
              </div>
            )}
          </td>
        </div>
      </tr>
    );
  };

  const moveRow = (fromIndex: number, toIndex: number) => {
    const updatedExercises = [...exercises];
    const [movedRow] = updatedExercises.splice(fromIndex, 1);
    updatedExercises.splice(toIndex, 0, movedRow);
    setExercises(updatedExercises);
  };

  return (
    <div>
      <div
        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        className="grid grid-cols-1 sm:grid-cols-1 items-center justify-center border border-stroke"
      >
        {/* form header */}
        <div
          style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          className="bg-[#F9FAFB] p-[24px] dark:bg-boxdark border-b border-stroke"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] text-black dark:text-white font-medium text-xl">
              New Workout
            </h1>
            <button onClick={onClose}>
              <X size={30} />
            </button>
          </div>
          <span className="text-[14px]">
            Get started by filling in the information below to create a new
            workout
          </span>
        </div>

        {/* form body */}
        <div className="flex flex-col md:flex-row h-[34rem] overflow-auto bg-white">
          {/* Form Section (col-md-4 equivalent) */}
          <div className="order-1 md:w-1/3 p-3 border-r border-stroke bg-white dark:bg-boxdark p-4">
            <div className="w-full mb-2.5">
              <label className="block text-black font-bold dark:text-white text-[14px]">
                Workout name
              </label>
              <input
                type="text"
                placeholder="High Intensity Program"
                className="w-full rounded border-[1.5px] text-[14px] text-grayf border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px] ">
                Objective
              </label>
              <div className="relative bg-transparent dark:bg-form-input">
                <select className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">Strength</option>
                </select>
                <span className="absolute top-1/2 right-4 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px]">
                Training level
              </label>
              <div className="relative bg-transparent dark:bg-form-input">
                <select className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">Beginner</option>
                </select>
                <span className="absolute top-1/2 right-4 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px]">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full text-grayf rounded text-[14px] border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
              <span className="text-[14px]">Max Characters 60/140</span>
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px]">
                Cover photo
                <div className="flex">
                  <img
                    src={selectedImage}
                    alt="Workout"
                    className="w-[80px] h-[80px] rounded-lg border border-stroke mr-[20px]"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    name="image"
                    className="hidden text-[14px]"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                  />
                  <button
                    className="bg-white dark:text-white font-medium mt-6 w-[81px] text-[14px] h-[38px] dark:bg-boxdark border-[#D1D5DB] text-black px-2 mr-3 border rounded-[6px] hover:bg-blue-600"
                    onClick={handleButtonClick}
                  >
                    {' '}
                    Change
                  </button>
                </div>
              </label>
            </div>
            <div className="w-full mb-2.5">
              <label className="block mb-2 font-bold text-black dark:text-white text-[14px]">
                Privacy
              </label>
              <input type="radio" name="private" checked />{' '}
              <b className="text-[14px]">Private</b> <br />
              <small className="ml-4 text-[14px]">
                Only assigned people view this program
              </small>{' '}
              <br />
              <input type="radio" name="public" />{' '}
              <b className="text-[14px]">Public</b> <br />
              <small className="ml-4 text-[14px]">
                All members can view this program
              </small>
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px]">
                Assigned member to
              </label>
              <div className="relative">
                <div className="absolute bottom-[16px] right-0 ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="w-full rounded border-[1.5px] text-[14px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Search Member"
                  required
                />
              </div>
            </div>

            <div className="w-full mb-2.5">
              <label className="block font-bold text-black dark:text-white text-[14px]">
                Assigned by
              </label>
              <div className="relative bg-transparent dark:bg-form-input">
                <select className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">&nbsp; &nbsp; &nbsp;Tom Cook</option>
                </select>
                <span className="absolute top-1/2 right-4 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#6B7280"
                    className="w-[20px] h-[20px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
                <img
                  src={userImage}
                  alt="User"
                  className="h-[24px] w-[24px] absolute bottom-3.5 left-2 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* List Section (col-8 equivalent) */}
          <div className="order-2 md:w-2/3 p-2 bg-white dark:bg-boxdark p-4">
            <form>
              <div className="relative md:w-[100%] xl:w-[95%]">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-3 ps-10 focus:outline-none text-sm text-[14px] text-grayf border border-[#D1D5DB] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Template"
                  required
                />
                <button
                  type="submit"
                  className="text-black absolute end-[0.039rem] bottom-[0.1rem] bg-gray hover:bg-blue-800 focus:ring-4 text-[14px]
                  focus:outline-none border-l border-[#D1D5DB] focus:ring-blue-300 font-medium text-sm p-[0.73rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                  }}
                >
                  Use Template
                </button>
              </div>
            </form>

            <div className="relative overflow-x-auto">
              <h1 className="text-[18px] text-black dark:text-white font-bold mt-4 mb-2">
                Workout
              </h1>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={exercises}
                  strategy={verticalListSortingStrategy}
                >
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 dark:bg-boxdark dark:text-gray-400">
                      <tr className="border-b border-[#9CA3AF]">
                        <th></th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Exercise
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Sets
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Reps
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Weight
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Rest
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white text-[14px]"
                        >
                          Time
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    {exercises.map((exercise: any, index: number) => (
                      <Exercise
                        key={exercise.id}
                        id={exercise.id}
                        name={exercise.name}
                        sets={exercise.sets}
                        reps={exercise.reps}
                        weight={exercise.weight}
                        rest={exercise.rest}
                        time={exercise.time}
                        index={index}
                      ></Exercise>
                    ))}

                    {/* <tbody> 
                      <React.Fragment key={index}>
                      <Draggable>
                          <Row
                            key={exercise.id}
                            index={index}
                            exercise={exercise}
                            toggleAddSet={toggleAddSet}
                            removeExercise={removeExercise}
                            moveRow={moveRow}
                          />
                        </Draggable>
                        <tr className="dark:bg-boxdark border-b border-stroke">
                          <td>
                            <button onClick={() => toggleAddSet(index)}>
                              <img
                                src={Frame_386}
                                width={'14px'}
                                height={'14px'}
                              ></img>
                            </button>
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {exercise.name}
                          </th>
                          <td className="px-6 py-4">{exercise.sets}</td>
                          <td className="px-6 py-4">{exercise.reps}</td>
                          <td className="px-6 py-4">{exercise.weight}</td>
                          <td className="px-6 py-4">{exercise.rest}</td>
                          <td className="px-6 py-4">{exercise.time}</td>
                          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <td>
                              <button
                                className="border border-stroke rounded-lg"
                                onClick={(event: React.MouseEvent) => {
                                  setMenuPosition({
                                    top: event.clientY + 10,
                                    left: event.clientX,
                                  });
                                  setShowMenu(!showMenu);
                                  setSelectedExerciseId(exercises[index].id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-[40px] h-[30px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                  />
                                </svg>
                              </button>
                              {showMenu &&
                                selectedExerciseId === exercise.id && (
                                  <div
                                    className="bg-white p-4 w-52 absolute shadow-lg"
                                    style={{
                                      top: '147px',
                                      left: '632px',
                                    }}
                                  >
                                    <ul>
                                      <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                                        + Add variables sets
                                      </li>
                                      <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                                        + Add Notes
                                      </li>
                                      <li className="p-1 border-t border-stroke  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                                        Show/hide Sets
                                      </li>
                                      <li
                                        className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]"
                                        onClick={removeExercise}
                                      >
                                        Delete exercise
                                      </li>
                                    </ul>
                                  </div>
                                )}
                            </td>
                          </div>
                        </tr>

                        <tr>
                          {isAddSetShow[index] && (
                            <td
                              colSpan={6}
                              className="text-cyan cursor-pointer underline"
                              onClick={() => addSet(index)}
                            >
                              + Add Set
                            </td>
                          )}
                        </tr>
                      </React.Fragment>
                      </tbody> */}
                  </table>
                  <button
                    className="p-4 text-fitflo underline"
                    onClick={addExercise}
                  >
                    + Add Exercise
                  </button>
                </SortableContext>
              </DndContext>
            </div>
            <div className="justify-right text-right p-4">
              <button
                className="bg-white dark:text-white dark:bg-boxdark border-[#CBD5E1] h-[38px] text-grayf px-2 mr-3 border rounded-[6px] hover:bg-blue-600"
                onClick={onClose}
              >
                ⟳ Clear Workout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* form footer */}
      <div
        style={{
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
        className="justify-right text-right p-4 dark:bg-boxdark bg-white sticky bottom-0 border-t border-stroke"
      >
        <button
          className="bg-white dark:text-white w-[81px] h-[38px] dark:bg-boxdark border-[#D1D5DB] text-black px-2 mr-3 border rounded-[6px] hover:bg-blue-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={() => setShowWorkoutPopup(true)}
          className="inline-flex items-center w-[165px] h-[38px] justify-center gap-[8px] rounded-[6px] bg-fitflo  text-center font-medium text-white hover:bg-opacity-90 "
          type="submit"
        >
          Create Workout
        </button>
      </div>
      {showWorkoutPopup && (
        <CreateWorkoutPopup onClose={() => setShowWorkoutPopup(false)} />
      )}
    </div>
  );
};

export default WorkoutModal;
