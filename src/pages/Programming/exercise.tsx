import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import Frame_386 from '../../images/icon/Frame 386.svg';

export const Exercise = ({
  id,
  name,
  sets,
  reps,
  weight,
  rest,
  time,
  index,
}: any) => {
  const {
    attributes,
    listeners = {},
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const [showText, setShowText] = useState(false);
  const [isElementShow, setIsElementShow] = useState(false);
  // const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!id) {
      // If the id is not available during drag-and-drop, reset the showText state
      setShowText(false);
    }
  }, [id]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleButtonClick = () => {
    // setClickCount((prevCount) => prevCount + 1);
    // setTimeout(() => {
    // if (clickCount === 1 && id) {
    setShowText(!showText);
    // }
    //   setClickCount(0);
    // }, 300);
  };

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
  const addSet = (index: number) => {
    console.log('Addset I ', index);
    const updatedExercises = [...exercises];
    updatedExercises[index].sets =
      updatedExercises[index].sets === '-'
        ? 1
        : updatedExercises[index].sets + 1;
    setExercises(updatedExercises);
  };

  const [isAddSetShow, setIsAddSetShow] = useState(exercises.map(() => false));
  const toggleAddSet = (index: number) => {
    console.log('Toggle add set called for index:', index);
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

  return (
    <tbody
      className="w-full"
      // ref={(node) => {
      //   setNodeRef(node);
      //   listeners.ref && listeners.ref(node);
      // }}
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
    >
      <React.Fragment key={index}>
        <tr className="dark:bg-boxdark w-full">
          <td>
            <button
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}

              // onClick={() => toggleAddSet(index)}
            >
              <img src={Frame_386} width={'14px'} height={'14px'}></img>
            </button>
          </td>
          <th
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={handleButtonClick}
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {name}
            {/* <select
              name="exercise"
              className="w-full py-2 rounded appearance-none hover:border border-fitflo
                                     bg-white font-normal outline-none transition text-sm text-[14px] text-[#6B7280]"
            >
              <option value="">Select exercise</option>
              <option value="Leg Raise (Captains's chair)">
                Leg Raise (Captains's chair)
              </option>
              <option value="Hanging Knee Raise(Captains's chair)">
                Hanging Knee Raise(Captains's chair)
              </option>
              <option value="Tricep Dips">Tricep Dips</option>
            </select> */}
          </th>
          <td
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="px-6 py-4"
          >
            {sets}
          </td>
          <td
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="px-6 py-4"
          >
            {reps}
          </td>
          <td
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="px-6 py-4"
          >
            {weight}
          </td>
          <td
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="px-6 py-4"
          >
            {rest}
          </td>
          <td
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="px-6 py-4"
          >
            {time}
          </td>

          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="hidden items-center justify-center p-2.5 sm:flex xl:p-5"
          >
            <td>
              <button
                className="border border-stroke rounded-lg"
                onClick={(event: React.MouseEvent) => {
                  // setMenuPosition({
                  //   top: event.clientY + 10,
                  //   left: event.clientX,
                  // });
                  setShowMenu(!showMenu);
                  setSelectedExerciseId(id);
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
              {showMenu && selectedExerciseId === id && (
                <div
                  className="bg-white p-4 w-52 right-5 absolute shadow-2xl"
                  // style={{
                  //   top: '147px',
                  //   left: '632px',
                  // }}
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

        <tr className="dark:bg-boxdark border-b border-[#9CA3AF] w-full">
          {/* {isAddSetShow[index] && ( */}
          {showText && (
            <>
              <td></td>
              <td
                className="text-fitflo cursor-pointer underline"
                // onClick={() => addSet(index)}
                onClick={() => setIsElementShow(true)}
              >
                + Add Set
              </td>
              {isElementShow && (
                <>
                  <td className="px-6 py-4">{sets + 1}</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <button
                    className="px-6 py-4 ml-7"
                    onClick={() => setIsElementShow(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </tr>
      </React.Fragment>
    </tbody>
  );
};
