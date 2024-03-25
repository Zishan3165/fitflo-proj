import { useRef, useState, useEffect } from 'react';
import MemberCreatedPopup from './membercreatedpopup';
import '../Programming/css/allProgramming.css';
import userImage from '../../images/user/user-11.png';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firestoreConfig/firestore';

function Addmembers({ onCancel, members, setMembers, getMembers }: any) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null as any);
  const modalRef: any = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      onCancel();
    }
  };
  const myStyle = {
    overflow: 'scroll',
  };

  const [programs, setPrograms] = useState([] as any);

  const getPrograms = async () => {
    const querySnapshot = await getDocs(collection(db, 'Programs'));
    const programData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPrograms(programData);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  useEffect(() => {}, [programs]);

  const [selectedProgram, setSelectedProgram] = useState(null as any);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [trainingLevel, setTrainingLevel] = useState('');
  const [gender, setGender] = useState('');

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const newMember = {
      firstName,
      lastName,
      email,
      phone,
      trainingLevel,
      gender,
      signedUp: new Date().toLocaleString(),
      skill: trainingLevel,
      selectedProgram,
    };

    members.push(newMember);

    try {
      await addDoc(collection(db, 'users', 'U2010uhrfLS8pPf2XZHK', 'users'), {
        ...newMember,
      });
    } catch (error) {
      console.log(error);
    }
    setMembers(members);
    onCancel();
    getMembers();
    setPopupData(newMember);
    setShowPopup(true);
  };

  const handleProgramChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedProgram = programs.find(
      (program: any) => program.name === selectedValue,
    );
    setSelectedProgram(selectedProgram);
    console.log(selectedProgram);
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={closeModal}
        style={myStyle}
        x-show="modalOpen"
        x-transition
        className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-10 py-10"
      >
        <div className="rounded-lg bg-white py-3 px-2 dark:bg-boxdark md:py-2 md:px-3.5 mt-30  overflow-auto h-[700px] lg:w-[1008px]">
          <div className=" py-2 px-4 dark:border-strokedark">
            <h3 className="font-semibold text-black dark:text-white">
              Add New Member
            </h3>
          </div>
          <form onSubmit={handleAdd}>
            <div className="flex flex-col gap-0 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <form onSubmit={handleAdd}>
                  <div className="p-7.5">
                    <div className="mb-3.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="first"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email address<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Phone"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Training Level
                      </label>
                      <select
                        id="cars"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="trainingLevel"
                        value={trainingLevel}
                        onChange={(e) => setTrainingLevel(e.target.value)}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advance">Advance</option>
                      </select>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Gender
                      </label>
                      <select
                        id="cars"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div x-data="{ checkboxToggle: false }">
                      <label
                        htmlFor="checkboxLabelFour"
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="">
                        <input type="checkbox" name="private" checked/>
                          
                        </div>
                      <p className='ml-4'>Agree to Terms and Condition</p> 
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="w-full xl:w-1/2">
                <form onSubmit={handleAdd}>
                  <div className="p-7.5">
                    <div className="mb-4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Assign Program
                      </label>
                      <select
                        name="programs"
                        id="programs"
                        value={selectedProgram ? selectedProgram.name : ''}
                        onChange={handleProgramChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Select a program
                        </option>
                        {Array.isArray(programs) &&
                          programs.map((program) => (
                            <option key={program.name} value={program.name}>
                              {program.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button className="flex w-full justify-center rounded bg-[#06B6D4] p-3 font-bold text-white">
                      Customise
                    </button>
                  </div>
                </form>

                <div className="main px-8 ">
                  <div className="rounded-lg dark:border-strokedark dark:bg-boxdark pcard lg:w-[384px]  p-5 bg-[#f0f2f2]">
                    {selectedProgram && (
                      <>
                        <a href="#" className="block pcardimg lg:w-[336px] ">
                          <img
                            src={selectedProgram.photo}
                            alt="Cards"
                            className="rounded-lg"
                          />
                          <div className="absolute top-[11px] lg:left-[230px] block">
                            <p className="rounded-full bg-fitflo py-0.5 px-4  font-medium text-white">
                              Program
                            </p>
                          </div>
                        </a>
                        <div className="">
                          <h4
                            className="text-xl font-bold text-black dark:text-white"
                            style={{ fontSize: '14px' }}
                          >
                            <a href="#">{selectedProgram.name}</a>
                          </h4>
                          <pre
                            style={{ fontSize: '12px', fontFamily: 'inter' }}
                          >
                            {selectedProgram.trainingLevel} •{' '}
                            {selectedProgram.workoutList.length} Workouts • N/A
                            Weeks
                          </pre>
                          <div className="flex items-center gap-3 py-3 px-1">
                            <div className="h-[16px] w-[16px] rounded-full">
                              <img src={userImage} alt="User" />
                            </div>
                            <div>
                              <p
                                style={{ fontSize: '12px' }}
                                className="text-xs font-medium"
                              >
                                By {selectedProgram.creatorName}
                              </p>
                            </div>
                          </div>
                          <p
                            className="font-bold text-black mt-4"
                            style={{ fontSize: '23px' }}
                          >
                            {' '}
                            Workouts
                          </p>
                          <p
                            className="font-bold text-black mt-4"
                            style={{ fontSize: '19px' }}
                          >
                            {' '}
                            Arms and Chest
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4.5 p-3">
              <button
                className="bg-white dark:text-white w-[81px] h-[38px] dark:bg-boxdark border-[#D1D5DB] text-black px-2 mr-3 border rounded-[6px] hover:bg-blue-600"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center h-[38px] gap-2.5 rounded bg-fitflo py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                type="submit"
                onClick={() => setShowPopup(true)}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPopup && popupData && (
        <MemberCreatedPopup
          onClose={() => setShowPopup(false)}
          popupData={popupData}
        />
      )}
    </>
  );
}

export default Addmembers;
