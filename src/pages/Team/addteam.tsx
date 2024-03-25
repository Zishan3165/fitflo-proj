import { useRef } from 'react';
import TeamCreatedPopup from './teamcreatedpopup';
import { useState } from 'react';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../firestoreConfig/firestore';

function addteam({
  onClose,
  displayedTeams,
  setDisplayedTeams,
  getTeams,
}: any) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEmailValidation, setIsEmailValidation] = useState(false);
  const modalRef: any = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const myStyle = {
    overflow: 'scroll',
  };

  const [photo, setPhoto] = useState(null as any);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [accreditations, setAccreditations] = useState('');

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('bio', bio);
    formData.append('accreditations', accreditations);
    formData.append('signedUp', new Date().toLocaleString());
    formData.append('password', '100002');
    if (!firstName || !lastName || !email || !role) {
      console.log('Please fill in all required fields');
      return;
    }
    // const newTeam = {
    //   firstName,
    //   lastName,
    //   email,
    //   role,
    //   photo,
    //   bio,
    //   accreditations,
    //   isActive: true,
    //   signedUp: new Date().toLocaleString(),
    //   asssignedPrivatePrograms: '0',
    //   password: '100002',
    //   programList: [],
    // };

    // displayedTeams.push(newTeam);

    try {
      // await addDoc(collection(db, 'Manage Team'), {
      //   ...newTeam
      // });
      const response = await fetch(`${firebaseHostURL}teams/?gymId=${gymId}`, {
        method: 'POST',
        body: formData,
        headers: {
           Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const teamData = await response.json();
      if (
        teamData.error ==
        'The email address is already in use by another account.'
      ) {
        setIsEmailValidation(true);
        return;
      }
      console.log('submit data', teamData);
      setDisplayedTeams([...displayedTeams, formData]);
      onClose();
      setShowPopup(true);
      getTeams();
    } catch (error) {
      console.log(error);
    }
    // setDisplayedTeams(displayedTeams);
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        setPhoto(file);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    }
  };

  return (
    <>
      <div className="">
        {/* <!-- Contact Form --> */}
        <div
          ref={modalRef}
          onClick={closeModal}
          style={myStyle}
          x-show="modalOpen"
          x-transition
          className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-10 py-10"
        >
          <div className="rounded-lg bg-white py-3 px-2 dark:bg-boxdark md:py-2 md:px-3.5 w-[816px] h-[587px] overflow-auto">
            <div className="mb-4.5 flex flex-col gap-0 xl:flex-row">
              <div className="w-full lg:w-[372px] lg:h-[477px]">
                <div className="mb-4.5 flex p-4 w-[372px] h-[96px]">
                  <div className="lg:h-[68px] w-[272px]">
                    <h3 className="mt-5.5 pb-2 text-[18px] font-bold text-black dark:text-white ">
                      {' '}
                      Add a new Team Member{' '}
                    </h3>
                    <p className="mb-10 text-[14px]">
                      {' '}
                      Members can assign workouts and programs to members.{' '}
                    </p>
                  </div>
                  <form onSubmit={handleAdd}>
                    {/* add image section */}
                    {photo ? (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Selected"
                        className="h-[96px] w-[96px] bg-fitflo text-center mt-4"
                        style={{ borderRadius: '50%' }}
                      />
                    ) : (
                      <label htmlFor="imageInput" className="cursor-pointer">
                        <div
                          className="h-[96px] w-[96px] bg-fitflo"
                          style={{ borderRadius: '50%' }}
                        >
                          <h3 className="relative text-[14px] top-[36px] left-[35px] font-bold text-white dark:text-white">
                            Add
                          </h3>
                        </div>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          className="hidden"
                          name="photo"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </form>
                </div>
                <form onSubmit={handleAdd} className="w-[372px] h-[324px]">
                  <div className="p-2.5">
                    <div className="mb-3.5">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
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
                      {!firstName && (
                        <small className="text-danger">
                          First name is required
                        </small>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
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
                      {!lastName && (
                        <small className="text-danger">
                          Last name is required
                        </small>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailValidation(false);
                        }}
                      />
                      {!email && (
                        <small className="text-danger">Email is required</small>
                      )}
                      {isEmailValidation && (
                        <small className="text-danger">
                          The email address is already in use by another
                          account.
                        </small>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
                        Role <span className="text-meta-1">*</span>
                      </label>
                      <select
                        id="cars"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select role</option>
                        <option value="Trainer">Trainer</option>
                        <option value="Operator">Operator</option>
                      </select>
                      {!role && (
                        <small className="text-danger">
                          Role name is required
                        </small>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="w-full w-[372px] h-[477px]">
                <div className="mb-4.5 flex flex-col gap-0 xl:flex-row p-5 w-[372px] h-[96px]"></div>
                <form onSubmit={handleAdd} className="w-[372px] h-[324px]">
                  <div className="p-2">
                    <div className="mb-6">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                      <p className="text-[14px]">
                        Write a few sentences about your skills, any special
                        focus, and career highlights
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block text-black dark:text-white text-[14px]">
                        Accreditations
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="accreditations"
                        value={accreditations}
                        onChange={(e) => setAccreditations(e.target.value)}
                      ></textarea>
                      <p className="text-[14px]">
                        List formal training, degrees or certificates
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <form onSubmit={handleAdd} className="flex justify-end gap-4.5 p-3">
              <button
                onClick={onClose}
                className="flex justify-center rounded border border-black py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2.5 rounded bg-fitflo py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      {showPopup && <TeamCreatedPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default addteam;
