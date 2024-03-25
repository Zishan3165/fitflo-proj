import './css/createprogram.css';
import Addmembericon from '../../images/icon/plus-Icon.png';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ProgramCreatedPopup from './createProgramPopup';
import userImage from '../../images/user/user-11.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { Select } from 'antd';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';
import { Spinner } from '@material-tailwind/react';

interface ModalProps {
  onClose: () => void;
}
interface createProgramModal {
  name: string;
  description: string;
  duration: string;
  isPublic: string;
  objective: string;
  trainingLevel: string;
  workoutList: Array<any>;
  photo: File | any;
}

const createprogram: React.FC<ModalProps> = ({ onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setstatus] = useState(false);
  const [openMenu, setOpenMenu] = useState([] as any);
  const [addSets, setAddSets] = useState([] as any);
  const [subCategories, setSubCategories] = useState([] as any);
  const [showProgramCreatedPopup, setShowProgramCreatedPopup] = useState(false);
  const [repsValue, setRepsValue] = useState([] as any[]);
  const [weightValue, setWeightValue] = useState([] as any[]);
  const [isAddExercise, setIsAddExercise] = useState(false);
  const [exerciseData, setExerciseData] = useState([] as any);
  const [newExerciseData, setNewExerciseData] = useState([] as any);
  const [selectedExercise, setSelectedExercise] = useState<Array<any>>([]);
  const [form, setForm] = useState({} as createProgramModal);
  const [exerciseError, setExerciseError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [nameError, setNameError] = useState('');
  const [privacyError, setPrivacyError] = useState('');
  const [objectiveError, setObjectiveError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [trainingError, setTrainingError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [workoutListError, setWorkoutListError] = useState('');
  const [photo, setPhoto] = useState(null as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTeams, setDisplayedTeams] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [members, setMembers] = useState([] as any);
  const [membersCurrentPage, setMembersCurrentPage] = useState(1);
  const [membersloading, setMembersLoading] = useState(false);
  const [endOfMembersPage, setEndOfMembersPage] = useState(false);
  const loaderRef = useRef(null);

  const getExercises = async () => {
    try {
      const apiUrl = `${firebaseHostURL}exercises/?gymId=${gymId}`;
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

      setExerciseData(responseData.data);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  const getTeams = async () => {
    setLoading(true);
    try {
      const apiUrl = `${firebaseHostURL}teams/?page=${currentPage}&gymId=${gymId}`;
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
        // Check for duplicate items before adding to programs array
        const newTeams = responseData.data.filter(
          (team: any) => !displayedTeams.some((p: any) => p.id === team.id),
        );
        setDisplayedTeams((prevTeams: any) => [...prevTeams, ...newTeams]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMembers = async () => {
    setMembersLoading(true);
    try {
      const apiUrl = `${firebaseHostURL}members/?page=${membersCurrentPage}&gymId=${gymId}`;
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
        setEndOfMembersPage(true);
      } else {
        // Check for duplicate items before adding to programs array
        const newMembers = responseData.data.filter(
          (member: any) => !members.some((p: any) => p.id === member.id),
        );
        setMembers((prevMembers: any) => [...prevMembers, ...newMembers]);
        setMembersCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !endOfPage) {
          console.log('fetching teams...');
          getTeams();
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !membersloading && !endOfMembersPage) {
          console.log('fetching Members...');
          getMembers();
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
  }, [membersloading, endOfMembersPage]);

  useEffect(() => {}, [exerciseData, displayedTeams, members]);

  const handleForm = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setValidationError('');
    console.log(e.target.name, e.target.value);
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      try {
        setPhoto(file);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    form.workoutList = [
      {
        workoutName: 'Workout 1 by M',
        exerciseList: selectedExercise,
        //  [
        //   {
        //     "exerciseId": "3c80b372-d4f8-447c-88ff-4fa9080cdc09",
        //     "equipmentDocId": "1VeKRNl7pDa9czgNkSD8",
        //     "equipment": "Dip/Leg Raise Machine",
        //     "photo": "https://firebasestorage.googleapis.com/v0/b/fitflo-6cbc1.appspot.com/o/equipment_images%2F1695118512258?alt=media&token=e5232796-cf5e-48d9-855b-c485f7a32207",
        //     "exercises_image": "https://firebasestorage.googleapis.com/v0/b/fitflo-6cbc1.appspot.com/o/equipment_images%2F1695118512258?alt=media&token=e5232796-cf5e-48d9-855b-c485f7a32207",
        //     "equipmentId": "1695118073417",
        //     "experience_levels": [
        //       {
        //         "exercise_level": "Beginner",
        //         "sets": "1",
        //         "weight": "0",
        //         "repet": "8",
        //         "id": "6320691702890780259000"
        //       },
        //       {
        //         "exercise_level": "Beginner",
        //         "sets": "2",
        //         "weight": "0",
        //         "repet": "8",
        //         "id": "4865551702890780259000"
        //       },
        //       {
        //         "exercise_level": "Beginner",
        //         "sets": "3",
        //         "weight": "0",
        //         "repet": "8",
        //         "id": "311141702890780259000"
        //       }
        //     ],
        //     "exercises_name": "Leg Raise (Captains' Chair)",
        //     "id": "2023-09-19 10:15:12.257Z"
        //   }
        // ]
      },
    ];
    form.photo = photo;
    if (
      !form.name ||
      !form.description ||
      !form.duration ||
      !form.isPublic ||
      !form.objective ||
      !form.trainingLevel ||
      !selectedExercise
    ) {
      if (!form.name) {
        setNameError('Program name is required');
      }
      if (!form.description) {
        setDescriptionError('Description is required');
      }
      if (!form.duration) {
        setDurationError('Duration is required');
      }
      if (!form.isPublic) {
        setPrivacyError('Privacy is required');
      }
      if (!form.objective) {
        setObjectiveError('Objective is required');
      }
      if (!form.trainingLevel) {
        setTrainingError('Training level is required');
      }
      if ([]) {
        setWorkoutListError('Workout list  is required');
      }
      setValidationError('Validation Error');
      return;
    }
    const formData = new FormData();
    formData.append('photo', form.photo);
    formData.append('description', form.description);
    formData.append('duration', form.duration);
    formData.append('isPublic', form.isPublic);
    // form.workoutList.forEach((workout, index) => {
    //   for (const [key, value] of Object.entries(workout)) {
    //     formData.append(`workoutList[${index}][${key}]`, value);
    //   }
    // });
    // formData.append('workoutList', form.workoutList);
    formData.append('name', form.name);
    formData.append('objective', form.objective);
    formData.append('trainingLevel', form.trainingLevel);
    const response = await fetch(`${firebaseHostURL}programs?gymId=${gymId}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    console.log('DATA', data);
    if (data.success) {
      console.log('Program created successfully');
      setForm({
        name: '',
        description: '',
        duration: '',
        isPublic: '',
        objective: '',
        trainingLevel: '',
        workoutList: [],
        photo: null,
      });
      onClose();
    }
  };

  const [selectedImage, setSelectedImage] = useState(
    'data:image/jpeg;base64,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',
  );
  const imageInputRef = useRef(null as any);

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // };

  const handleButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const addExercise = () => {
    if (form.trainingLevel) {
      setIsAddExercise(true);
      setExerciseError('');
    } else {
      setExerciseError('Please select Training Level');
      setIsAddExercise(false);
    }
    const newExercise = {
      exerciseId: uuidv4(),
      exercises_name: '',
      sets: 0,
      reps: '',
      weight: '',
      rest: '',
      time: '',
    };
    setOpenMenu((prevMenu: any) => [...prevMenu, false]);
    setAddSets((prevSet: any) => [...prevSet, false]);
    setSubCategories((prevSubCategories: any) => [...prevSubCategories, []]);
    setNewExerciseData((prevData: any) => [...prevData, newExercise]);
  };

  const addSet = () => {
    const newSet = {
      sets: '',
      reps: '',
      weight: '',
      rest: '',
      time: '',
    };
  };

  // const handleSelectChange = (index: number, value: string | undefined) => {
  //   if (value !== undefined) {
  //     setNewExerciseData((prevData: any) => {
  //       const newData = [...prevData];
  //       newData[index].exercises_name = value;
  //       return newData;
  //     });
  //   }
  // };

  const handleSelectChange = (index: number, value: string) => {
    setWorkoutListError('');
    // Find the selected exercise in exerciseData array
    const selectedExerciseData = exerciseData.find(
      (exercise: any) => exercise.exercises_name === value,
    );
    setSelectedExercise((prevSelectedExercises) => {
      const updatedSelectedExercises = [...prevSelectedExercises];
      updatedSelectedExercises[index] = selectedExerciseData;
      return updatedSelectedExercises;
    });
    if (selectedExerciseData) {
      // Access the selected exercise data here

      const { experience_levels } = selectedExerciseData;
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

      setRepsValue((prevRepsValues: any) => {
        const newRepsValues = [...prevRepsValues];
        newRepsValues[index] = repetValues;
        return newRepsValues;
      });

      setWeightValue((prevWeightValues: any) => {
        const newWeightValues = [...prevWeightValues];
        newWeightValues[index] = averageWeight;
        return newWeightValues;
      });

      console.log(selectedExerciseData);
      console.log('repetValues', repetValues);
      console.log('averageWeight', averageWeight);
    }
  };

  const handleSetsToggle = (index: number) => {
    setAddSets((prevSet: any) => {
      const newSet = [...prevSet];
      newSet[index] = !newSet[index];
      return newSet;
    });
  };
  const handleMenuesToggle = (index: number) => {
    setOpenMenu((prevMenu: any) => {
      const newSet = [...prevMenu];
      newSet[index] = !newSet[index];
      return newSet;
    });
  };
  const handleDeleteExercise = (index: number) => {
    setNewExerciseData((prevData: any) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      handleMenuesToggle(index);
      return newData;
    });
  };
  const handleDeleteSubCategory = (
    exerciseIndex: number,
    subCategoryIndex: number,
  ) => {
    setSubCategories((prevSubCategories: any) => {
      const newSubCategories = [...prevSubCategories];
      newSubCategories[exerciseIndex].splice(subCategoryIndex, 1); // Remove the subcategory at the specified index
      return newSubCategories;
    });
  };
  const handleSubCategoryToggle = (exerciseIndex: number) => {
    setSubCategories((prevSubCategories: any) => {
      const newSubCategories = [...prevSubCategories];

      if (!newSubCategories[exerciseIndex]) {
        // If the subcategory array for the exercise doesn't exist, initialize it.
        newSubCategories[exerciseIndex] = [];
      }

      newSubCategories[exerciseIndex] = [
        ...newSubCategories[exerciseIndex],
        { sets: '', reps: '', weight: '', rest: '', time: '' },
      ];

      return newSubCategories;
    });
  };
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setIsDragging(true);
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setIsDragging(true);
    if (draggedIndex === null || draggedIndex === index) {
      return;
    }

    const copyListItems = [...newExerciseData];
    const draggedItem = copyListItems[draggedIndex];
    copyListItems.splice(draggedIndex, 1);
    copyListItems.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setNewExerciseData(copyListItems);
  };

  const dragEnd = () => {
    setDraggedIndex(null);
    setIsDragging(false);
  };

  return (
    <>
      <div>
        <div
          style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          className="grid grid-cols-1 gap-9 sm:grid-cols-1 items-center justify-center border-b border-stroke"
        >
          <div
            style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            className="flex flex-col gap-9 border border-stroke"
          >
            <div
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
              className="border border-stroke bg-white shadow-default"
            >
              <div
                style={{
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
                className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-gray"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-black dark:text-white text-[20px]">
                    {' '}
                    New Program{' '}
                  </h3>
                  <button onClick={onClose}>
                    <X size={30} />
                  </button>
                </div>
                <p className="text-[14px]">
                  Get Stared by filling in the information below to create a new
                  program
                </p>
              </div>
              <form onSubmit={handleSubmit} className="h-[34rem] overflow-auto">
                <div className="">
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2 p-4 border-r border-stroke">
                      <div className="p-[16px]">
                        <label className="mb-2.5 block font-bold text-black dark:text-white text-[14px]">
                          Program name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name || ''}
                          onChange={(e) => {
                            handleForm(e);
                            setNameError('');
                          }}
                          placeholder="Enter your Program name"
                          className="w-full rounded text-[14px] border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {nameError && (
                          <span className="text-danger text-sm">
                            {nameError}
                          </span>
                        )}
                      </div>

                      <div className="w-full p-[16px]">
                        <label className="block font-bold text-black dark:text-white text-[14px] ">
                          Objective <span className="text-meta-1">*</span>
                        </label>
                        <div className="relative bg-transparent dark:bg-form-input">
                          <select
                            name="objective"
                            value={form.objective || ''}
                            onChange={(e) => {
                              handleForm(e);
                              setObjectiveError('');
                            }}
                            className="relative  w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            {' '}
                            <option value="">Select Objective</option>
                            <option value="Strength">Strength</option>
                            <option value="test 1">test 1</option>
                            <option value="test 2">test 2</option>
                          </select>
                          {objectiveError && (
                            <span className="text-danger text-sm">
                              {objectiveError}
                            </span>
                          )}
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

                      <div className="flex flex-col gap-6 xl:flex-row p-[16px]">
                        <div className="w-full">
                          <label className="mb-2.5 block font-bold text-black dark:text-white text-[14px] ">
                            Training Level{' '}
                            <span className="text-meta-1">*</span>
                          </label>
                          <div className="relative bg-transparent dark:bg-form-input">
                            <select
                              name="trainingLevel"
                              value={form.trainingLevel || ''}
                              onChange={(e) => {
                                handleForm(e);
                                setTrainingError('');
                              }}
                              className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                              {' '}
                              <option value="">Select Training</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Intermidiate">Intermidiate</option>
                            </select>
                            {trainingError && (
                              <span className="text-danger text-sm">
                                {trainingError}
                              </span>
                            )}
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
                        <div className="w-full">
                          <label className="mb-2.5 font-bold block text-black dark:text-white text-[14px]">
                            Duration <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="duration"
                            value={form.duration || ''}
                            onChange={(e) => {
                              handleForm(e);
                              setDurationError('');
                            }}
                            placeholder="Enter your duration"
                            className="w-full text-[14px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                          {durationError && (
                            <span className="text-danger text-sm">
                              {durationError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-[16px]">
                        <label className="mb-2.5 block font-bold text-black dark:text-white text-[14px]">
                          Description <span className="text-meta-1">*</span>
                        </label>
                        <textarea
                          rows={4}
                          name="description"
                          value={form.description || ''}
                          onChange={(e) => {
                            handleForm(e);
                            setDescriptionError('');
                          }}
                          placeholder="Type your message"
                          className="w-full rounded text-[14px] border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                        <span className="text-[14px]">
                          Max Characters 60/140
                        </span>{' '}
                        <br />
                        {descriptionError && (
                          <span className="text-danger text-sm">
                            {descriptionError}
                          </span>
                        )}
                      </div>

                      <div className="w-full px-[16px]">
                        <label className="block font-bold text-black dark:text-white text-[14px] p-[4px]">
                          Cover photo
                          <div className="flex">
                            {photo ? (
                              <img
                                // src={selectedImage}
                                src={URL.createObjectURL(photo)}
                                alt="Workout"
                                className="w-[80px] h-[80px] rounded-lg border border-stroke mr-[20px]"
                              />
                            ) : (
                              <img
                                // src={selectedImage}
                                alt="Select image"
                                className="w-[80px] h-[80px] rounded-lg border border-stroke mr-[20px]"
                              />
                            )}
                            <input
                              type="file"
                              id="imageInput"
                              accept="image/*"
                              name="photo"
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

                      <div className="w-full px-[16px] pt-[20px]">
                        <label className="block mb-2 font-bold text-black dark:text-white text-[14px]">
                          Privacy <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="radio"
                          name="isPublic"
                          value="false"
                          onChange={handleForm}
                          checked={form.isPublic === 'false'}
                        />{' '}
                        <b className="text-[14px] font-medium text-black">
                          Private
                        </b>{' '}
                        <br />
                        <small className="ml-4 text-[14px]">
                          Only assigned people view this program
                        </small>{' '}
                        <br />
                        <input
                          type="radio"
                          name="isPublic"
                          value="true"
                          onChange={(e) => {
                            handleForm(e);
                            setPrivacyError('');
                          }}
                          checked={form.isPublic === 'true'}
                        />{' '}
                        <b className="text-[14px] font-medium text-black">
                          Public
                        </b>{' '}
                        <br />
                        <small className="ml-4 text-[14px]">
                          All members can view this program
                        </small>{' '}
                        <br />
                        {privacyError && (
                          <span className="text-danger text-sm">
                            {privacyError}
                          </span>
                        )}
                      </div>

                      <div className="w-full p-[16px]">
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
                          {/* <input
                            type="search"
                            id="default-search"
                            className="w-full rounded border-[1.5px] text-[14px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Search Member"
                            // required
                          /> */}
                              <select className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            <option value="">
                             Search Member
                            </option>
                            {Array.isArray(members) &&
                              members.map((member: any) => (
                                <option value={member.firstName} key={member.id}>
                                {member.firstName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="w-full p-[16px]">
                        <label className="block font-bold text-black dark:text-white text-[14px]">
                          Assigned by
                        </label>
                        <div className="relative bg-transparent dark:bg-form-input">
                          <select className="relative w-full text-[14px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            <option value="">
                              &nbsp; &nbsp; &nbsp;Tom Cook
                            </option>
                            {Array.isArray(displayedTeams) &&
                              displayedTeams.map((team: any) => (
                                <option value={team.firstName} key={team.id}>
                                  &nbsp; &nbsp; &nbsp;{team.firstName}{' '}
                                  {team.lastName}
                                </option>
                              ))}
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
                      <div
                        className="scroll-list-bottom text-fitflo ml-4 p-4  font-bold"
                        ref={loaderRef}
                      >
                        {loading || membersloading && <Spinner />}
                      </div>
                    </div>

                    <div className="w-full xl:w-1/1 p-5">
                      <div className=" flex flex-col gap-6 xl:flex-row">
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
                            // required
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
                        <div className="w-full xl:w-1/3 ">
                          <div className="flex justify-end gap-4.5 h-11">
                            <button
                              onClick={() => setstatus(true)}
                              className="text-[14px] inline-flex items-center justify-center gap-2.5 rounded-lg bg-fitflo py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                              type="button"
                            >
                              <span>
                                <img src={Addmembericon} alt="" />
                              </span>
                              Add Workout
                            </button>
                          </div>
                        </div>
                      </div>

                      {status && (
                        <div className="relative overflow-x-auto">
                          <h1 className="text-[18px] text-black dark:text-white font-bold mt-4 mb-2">
                            Workout 1
                          </h1>

                          <div className="flex flex-col">
                            <TableContainer
                              component={Paper}
                              style={{ boxShadow: 'none' }}
                            >
                              <Table
                                size="small"
                                aria-label="a dense table"
                                className="bg-white dark:border-strokedark dark:bg-boxdark gap-[20px] w-full"
                              >
                                <TableHead className="py-4.5 px-4 h-[44px] dark:border-strokedark md:px-6 2xl:px-7.5">
                                  <TableRow>
                                    <TableCell
                                      style={{ width: '20px' }}
                                    ></TableCell>
                                    <TableCell className="w-[120rem]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Exercise
                                      </p>
                                    </TableCell>
                                    <TableCell className="w-[200px]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Sets
                                      </p>
                                    </TableCell>
                                    <TableCell className="w-[200px]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Reps
                                      </p>
                                    </TableCell>
                                    <TableCell className="w-[200px]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Weight
                                      </p>
                                    </TableCell>
                                    <TableCell className="w-[200px]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Rest
                                      </p>
                                    </TableCell>
                                    <TableCell className="w-[200px]">
                                      <p className="font-medium text-[14px] text-[#374151]">
                                        Time
                                      </p>
                                    </TableCell>
                                    <TableCell
                                      style={{ width: '20px' }}
                                      align="right"
                                    ></TableCell>
                                  </TableRow>
                                </TableHead>
                                {form.trainingLevel && isAddExercise && (
                                  <>
                                    {newExerciseData.map(
                                      (exercise: any, index: number) => (
                                        <TableBody
                                          key={exercise.exerciseId}
                                          onDragStart={(e) =>
                                            dragStart(e, index)
                                          }
                                          onDragEnter={(e) =>
                                            dragEnter(e, index)
                                          }
                                          onDragOver={(e) => e.preventDefault()}
                                          onDrop={dragEnd}
                                          draggable
                                        >
                                          <TableRow
                                            sx={{
                                              '&:last-child td, &:last-child th':
                                                {
                                                  border: 0,
                                                },
                                            }}
                                            style={{
                                              transition: 'all .3s ease',
                                              backgroundColor:
                                                isDragging &&
                                                draggedIndex === index
                                                  ? '#F9FAFB'
                                                  : 'white',
                                            }}
                                          >
                                            <TableCell
                                              style={{
                                                width: '20px',
                                                borderBottom: 'none',
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="#6B7280"
                                                className="w-[24px] cursor-pointer"
                                                onClick={() =>
                                                  handleSetsToggle(index)
                                                }
                                              >
                                                <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"></path>
                                              </svg>
                                            </TableCell>
                                            <TableCell
                                              className="w-[120rem]"
                                              component="th"
                                              scope="row"
                                              style={{ borderBottom: 'none' }}
                                            >
                                              {/* <select
                                            key={exercise.exerciseId}
                                            name="exercises_name"
                                            value={'' || 
                                              exercise &&
                                              exercise.exercises_name
                                            }
                                            onChange={(e:any) =>
                                              handleSelectChange(
                                                index,
                                                e.target.value,
                                              )
                                            }
                                            className={`w-full py-2 rounded appearance-none hover:border border-fitflo
                                     ${
                                       isDragging && draggedIndex === index
                                         ? 'bg-[#F9FAFB]'
                                         : 'bg-white'
                                     }  font-normal outline-none transition text-sm text-[14px] text-[#6B7280]`}
                                          >
                                            <option value="">
                                              Select exercise
                                            </option>
                                            {exerciseData.map(
                                              (exercise: any) => (
                                                <option
                                                  key={exercise.exerciseId}
                                                  value={
                                                    exercise.exercises_name
                                                  }
                                                >
                                                  {exercise.exercises_name}
                                                </option>
                                              ),
                                            )}
                                          </select> */}

                                              <Select
                                                showSearch
                                                style={{ height: '60px' }}
                                                placeholder={
                                                  <span className="font-normal  text-sm text-[14px] text-[#6B7280]">
                                                    Select exercise
                                                  </span>
                                                }
                                                onChange={(value: string) =>
                                                  handleSelectChange(
                                                    index,
                                                    value,
                                                  )
                                                }
                                                className={`w-full py-2 rounded appearance-none 
                                     ${
                                       isDragging && draggedIndex === index
                                         ? 'bg-[#F9FAFB]'
                                         : 'bg-white'
                                     }  font-normal outline-none transition text-sm text-[14px] text-[#6B7280]`}
                                              >
                                                {exerciseData.map(
                                                  ({
                                                    exercises_name,
                                                    exerciseId,
                                                  }: any) => (
                                                    <Select.Option
                                                      value={exercises_name}
                                                      key={exerciseId}
                                                    >
                                                      {exercises_name}
                                                    </Select.Option>
                                                  ),
                                                )}
                                              </Select>
                                              {workoutListError && (
                                                <span className="text-danger text-sm">
                                                  {workoutListError}
                                                </span>
                                              )}
                                            </TableCell>
                                            <TableCell
                                              style={{ borderBottom: 'none' }}
                                              className="w-[200px]"
                                            >
                                              <p className="text-sm text-[14px] text-[#6B7280]">
                                                {selectedExercise[index]
                                                  ? selectedExercise[index]
                                                      .experience_levels.length
                                                  : 0}
                                              </p>
                                            </TableCell>
                                            <TableCell
                                              style={{ borderBottom: 'none' }}
                                              className="w-[200px]"
                                            >
                                              <p className="text-sm text-[14px] text-[#6B7280]">
                                                {selectedExercise[index]
                                                  ? repsValue[index]
                                                  : 0}
                                              </p>
                                            </TableCell>
                                            <TableCell
                                              style={{ borderBottom: 'none' }}
                                              className="w-[200px]"
                                            >
                                              <p className="text-sm text-[14px] text-[#6B7280]">
                                                {selectedExercise[index]
                                                  ? weightValue[index]
                                                  : 0}
                                              </p>
                                            </TableCell>
                                            <TableCell
                                              style={{ borderBottom: 'none' }}
                                              className="w-[200px]"
                                            >
                                              <p className="text-sm text-[14px] text-[#6B7280]">
                                                0
                                              </p>
                                            </TableCell>
                                            <TableCell
                                              style={{ borderBottom: 'none' }}
                                              className="w-[200px]"
                                            >
                                              <p className="text-sm text-[14px] text-[#6B7280]">
                                                {selectedExercise[index]
                                                  ? selectedExercise[index].time
                                                  : 0}
                                              </p>
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                                width: '20px',
                                              }}
                                            >
                                              <button
                                                className="border border-stroke rounded-lg"
                                                type="button"
                                                onClick={() =>
                                                  handleMenuesToggle(index)
                                                }
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth="1.5"
                                                  stroke="#6B7280"
                                                  className="w-[40px] h-[30px]"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                                  />
                                                </svg>
                                              </button>
                                              {openMenu[index] && (
                                                <div className="bg-white p-4 w-52 right-5 absolute shadow-2xl">
                                                  <ul>
                                                    <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                                                      + Add variables sets
                                                    </li>
                                                    <li className="p-1  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]">
                                                      + Add Notes
                                                    </li>
                                                    <li
                                                      onClick={() => {
                                                        handleSetsToggle(index);
                                                      }}
                                                      className="p-1 border-t border-stroke  cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]"
                                                    >
                                                      Show/hide Sets
                                                    </li>
                                                    <li
                                                      className="p-1 cursor-pointer rounded hover:bg-blue-100 text-[14px] text-[#374151]"
                                                      onClick={() =>
                                                        handleDeleteExercise(
                                                          index,
                                                        )
                                                      }
                                                    >
                                                      Delete exercise
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}
                                            </TableCell>
                                          </TableRow>

                                          {/* {subCategories[index] &&
                                            subCategories[index].map( */}
                                          {addSets[index] &&
                                            selectedExercise[index] &&
                                            selectedExercise[
                                              index
                                            ].experience_levels.map(
                                              (
                                                subCategory: any,
                                                subCategoryIndex: number,
                                              ) => (
                                                <TableRow
                                                  key={subCategoryIndex}
                                                  sx={{
                                                    '&:last-child td, &:last-child th':
                                                      {
                                                        border: 0,
                                                      },
                                                  }}
                                                  style={{
                                                    transition: 'all .3s ease',
                                                    backgroundColor:
                                                      isDragging &&
                                                      draggedIndex === index
                                                        ? '#F9FAFB'
                                                        : 'white',
                                                  }}
                                                >
                                                  <TableCell
                                                    style={{
                                                      width: '20px',
                                                      borderBottom: 'none',
                                                    }}
                                                  ></TableCell>
                                                  <TableCell
                                                    className="w-[120rem]"
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                  ></TableCell>

                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                    className="w-[200px]"
                                                  >
                                                    <p className="text-sm text-[14px] text-[#6B7280]">
                                                      {subCategory.sets}
                                                    </p>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                    className="w-[200px]"
                                                  >
                                                    <p className="text-sm text-[14px] text-[#6B7280]">
                                                      {subCategory.repet}
                                                    </p>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                    className="w-[200px]"
                                                  >
                                                    <p className="text-sm text-[14px] text-[#6B7280]">
                                                      {subCategory.weight}
                                                    </p>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                    className="w-[200px]"
                                                  >
                                                    <p className="text-sm text-[14px] text-[#6B7280]">
                                                      0
                                                    </p>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                    }}
                                                    className="w-[200px]"
                                                  >
                                                    <p className="text-sm text-[14px] text-[#6B7280]">
                                                      -
                                                    </p>
                                                  </TableCell>
                                                  <TableCell
                                                    style={{
                                                      borderBottom: 'none',
                                                      width: '20px',
                                                    }}
                                                  >
                                                    <button
                                                      className=""
                                                      type="button"
                                                      onClick={() =>
                                                        handleDeleteSubCategory(
                                                          index,
                                                          subCategoryIndex,
                                                        )
                                                      }
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="#6B7280"
                                                        className="w-6 h-6"
                                                      >
                                                        <path
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </TableCell>
                                                </TableRow>
                                              ),
                                            )}

                                          <TableRow
                                            sx={{
                                              '&:last-child td, &:last-child th':
                                                {
                                                  border: 0,
                                                },
                                            }}
                                            style={{
                                              transition: 'all .3s ease',
                                              backgroundColor:
                                                isDragging &&
                                                draggedIndex === index
                                                  ? '#F9FAFB'
                                                  : 'white',
                                            }}
                                          >
                                            <TableCell
                                              style={{
                                                width: '20px',
                                                borderBottom: 'none',
                                              }}
                                            ></TableCell>
                                            <TableCell
                                              className="w-[120rem]"
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                            >
                                              {addSets[index] && (
                                                <div className="flex items-center gap-2 underline text-sm">
                                                  <a
                                                    onClick={() =>
                                                      handleSubCategoryToggle(
                                                        index,
                                                      )
                                                    }
                                                    href="#"
                                                    style={{
                                                      color: '#06B6D4',
                                                    }}
                                                  >
                                                    <i className="fa fa-plus"></i>
                                                    + Add Sets
                                                  </a>
                                                </div>
                                              )}
                                            </TableCell>

                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                              className="w-[200px]"
                                            ></TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                              className="w-[200px]"
                                            ></TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                              className="w-[200px]"
                                            ></TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                              className="w-[200px]"
                                            ></TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                              }}
                                              className="w-[200px]"
                                            ></TableCell>
                                            <TableCell
                                              style={{
                                                borderBottom: 'none',
                                                width: '20px',
                                              }}
                                            ></TableCell>
                                          </TableRow>
                                        </TableBody>
                                      ),
                                    )}
                                  </>
                                )}
                              </Table>
                            </TableContainer>
                            <div className="grid grid-cols-3 sm:grid-cols-7">
                              <div className="flex items-center gap-2 p-1 xl:p-2 text-sm">
                                <a
                                  onClick={addExercise}
                                  href="#"
                                  style={{ color: '#06B6D4' }}
                                >
                                  <i className="fa fa-plus"></i>+ Add exercise
                                </a>
                              </div>
                            </div>
                            {exerciseError && !form.trainingLevel && (
                              <span className="text-danger text-sm">
                                {exerciseError}
                              </span>
                            )}
                          </div>

                          <br />
                          <div className="flex justify-end gap-4.5">
                            <button
                              onClick={() => {
                                setstatus(false);
                              }}
                              className="flex justify-center text-[14px] rounded-lg border border-[#CBD5E1] py-1 px-4 font-medium text-[#6B7280] hover:shadow-1 dark:border-strokedark dark:text-white"
                              type="button"
                            >
                              Remove Workout
                            </button>
                          </div>
                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
            className="sticky bottom-0 border-t border-stroke py-4 px-6.5 dark:border-strokedark bg-white"
          >
            <div className="flex justify-end gap-4.5">
              {validationError && (
                <span className="text-danger text-sm font-bold mt-3">
                  {validationError} !!
                </span>
              )}
              <button
                className="bg-white dark:text-white w-[81px] h-[38px] dark:bg-boxdark border-[#D1D5DB] text-black px-2 mr-3 border rounded-[6px] hover:bg-blue-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                // onClick={() => setShowProgramCreatedPopup(true)}
                className="inline-flex items-center w-[165px] h-[38px] justify-center gap-[8px] rounded-[6px] bg-fitflo  text-center font-medium text-white hover:bg-opacity-90 "
                type="submit"
              >
                Create Program
              </button>
            </div>
          </div>
        </form>
      </div>
      {showProgramCreatedPopup && (
        <ProgramCreatedPopup
          onClose={() => setShowProgramCreatedPopup(false)}
        />
      )}
    </>
  );
};

export default createprogram;
