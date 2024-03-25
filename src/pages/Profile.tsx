import { gymId, firebaseHostURL, getAuthToken } from './UiElements/host';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [gymData, setGymData] = useState([] as any);

  const getGymProfileData = async () => {
    try {
      const apiUrl = `${firebaseHostURL}me?gymId=${gymId}`;
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
      setGymData(responseData.data);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    }
  };

  useEffect(() => {
    getGymProfileData();
  }, []);

  useEffect(() => {}, [gymData]);

  if (!gymData) {
    return <p>Gym Data is not present here!!</p>;
  }

  return (
    <>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Gym Profile
      </h2>
      <div className="flex justify-end gap-4.5 py-3">
        <button
          className="flex justify-center bg-[#0891B2] rounded py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
        >
          Edit
        </button>
      </div>

      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-8 py-8 pb-6 lg:pb-8 xl:pb-11.5">
          <div className="h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur ">
            <div className="relative drop-shadow-2">
              <img
                style={{ height: '96px', width: '96px' }}
                src={gymData.gymLogo}
                alt="profile"
              />
            </div>
          </div>
          <div className="ml-2">
            <h3
              className=" text-2xl font-medium text-[#111827] dark:text-white"
              style={{ fontSize: '14px' }}
            >
              {gymData.gymName}
            </h3>
          </div>
        </div>
        <div className="rounded-sm  dark:bg-boxdark">
          <form>
            <div className="flex flex-col gap-5.5 px-10 ">
              <div>
                <label
                  className=" block text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Gym Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="gymName"
                  value={gymData.gymName}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className=" block text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="email"
                  value={gymData.email}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Gym Location
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="location"
                  value={gymData.location}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Website
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="website"
                  value={gymData.website}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>

              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  This Week Total Exercise
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="thisWeekTotalExe"
                  value={gymData.thisWeekTotalEx}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  This Week Total Workout
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="thisWeekTotalWork"
                  value={gymData.thisWeekTotalWork}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Last week Total Exercise
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="lastWeekTotalEx"
                  value={gymData.lastWeekTotalEx}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>
              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Last Week Total Workout
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="lastWeekTotalWork"
                  value={gymData.lastWeekTotalWork}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>

              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Members
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="ofMembers"
                  value={gymData.ofMembers}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>

              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Premises
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="ofPremises"
                  value={gymData.ofPremises}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>

              <div>
                <label
                  className="text-[#5F8B95] dark:text-white ml-5"
                  style={{ fontSize: '12px' }}
                >
                  Status
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="status"
                  value={gymData.status === true ? 'Active' : 'Inactive'}
                  className="w-full text-black bg-transparent py-3 px-5 font-xl outline-none transition border-b border-[#5F8B95]  dark:border-[#5F8B95]"
                />
              </div>

              <div className="flex justify-end gap-4.5 py-3">
                <button
                  className="flex justify-center rounded border border-black py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center bg-[#0891B2] rounded py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
