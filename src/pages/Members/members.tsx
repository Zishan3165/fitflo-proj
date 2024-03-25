import Addmembers from './addmembers';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { collection, getDocs, doc } from 'firebase/firestore';
// import { db } from '../../firestoreConfig/firestore';
import { Spinner } from '@material-tailwind/react';
import userimg from '../../images/icon/userimg.png';
import {gymId,firebaseHostURL,getAuthToken} from '../UiElements/host';

const Members = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const [totalMembers, setTotalMembers] = useState([] as any);
  const [totalMembers, setTotalMembers] = useState(null as any);
  const [members, setMembers] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(null as any);
  // const membersPerPage = 10;
  const maxVisiblePages = 5;
  

  // const getMembers = async () => {
  //   const userDocRef = doc(db, 'users', 'U2010uhrfLS8pPf2XZHK');
  //   const operatorsCollectionRef = collection(userDocRef, 'users');
  //   const querySnapshot = await getDocs(operatorsCollectionRef);

  //   const allMembers = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   // Filter members based on the search query All Gyms', 'gXaH6YwQTwOUrBnl4eT0jcfQRtw1
  //   const filteredMembers = allMembers.filter((member: any) =>
  //     `${member.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

  //   setTotalMembers(filteredMembers);

  //   // Update current page
  //   setCurrentPage(1);

  //   // Update members for the current page
  //   const startIndex = 0;
  //   const endIndex = Math.min(filteredMembers.length, membersPerPage);
  //   setMembers(filteredMembers.slice(startIndex, endIndex));
  // };

  const getMembers = async () => {
    try {
      const apiUrl = `${firebaseHostURL}members/?page=${currentPage}&gymId=${gymId}`;
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
      const filteredMembers = responseData.data.filter((member: any) =>
        `${member.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setMembers(filteredMembers);
      setTotalMembers(
        responseData.pagination && responseData.pagination.pagesItemsTotal,
      );
      setMembersPerPage(
        responseData.pagination && responseData.pagination.pagesItemsLimit,
      );
      setCurrentPage(
        responseData.pagination && responseData.pagination.pageNumber,
      );
    } catch (error) {
      console.error('Error fetching equipment data:', error);
    }
  };

  useEffect(() => {
    getMembers();
  }, [searchQuery, currentPage]);

  useEffect(() => {}, [members]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Update members for the new page
    // const startIndex = (newPage - 1) * membersPerPage;
    // const endIndex = startIndex + membersPerPage;
    // setMembers(totalMembers.slice(startIndex, endIndex));
  };

  // const total = totalMembers.length;
  const total = totalMembers;
  const totalPages = Math.ceil(total / membersPerPage);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
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
                currentPage == i
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

  const navigate = useNavigate();
  const handleMemberClick = (selectedMember: any) => {
    navigate('/member-detail', { state: { memberData: selectedMember } });
  };

  // Function to format date
  const formatDate = (date: any) => {
    if (typeof date === 'string') {
      return date;
    } else if (date && date.seconds && date.nanoseconds) {
      const formattedDate = new Date(date.seconds * 1000).toLocaleDateString(
        'en-GB',
      );
      return formattedDate;
    } else {
      // Handle other cases or return the original value if not recognized
      return date;
    }
  };

  return (
    <>
      <h2 className="text-title-md2 font-medium text-[#111827] text-[20px]">
        Members
      </h2>
      {/* <!-- ====== Members Section Start ====== --> */}
      <div className="mb-4.5 mt-4 flex flex-col gap-8 xl:flex-row">
        <div className="">
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
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
                style={{ height: '38px', width: '440px' }}
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block bottom-1 w-full p-4 ps-10 text-sm focus:outline-none text-gray-900 border border-[#D1D5DB] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Members.."
                required
              />
              <button
                type="submit"
                style={{
                  height: '35px',
                  width: '79px',
                  borderRight: 'none',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
                className="text-black absolute end-0.5 border-l border-[#D1D5DB]  bg-gray bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-[14]  text-medium  "
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="relative z-20 bg-transparent dark:bg-form-input mr-6">
          <select className="relative z-20 lg:w-[124px] text-[14px] text-[#374151] appearance-none rounded-lg border border-stroke bg-white py-1.5 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="">Sort by</option>
          </select>
          <span className="absolute top-1/2 z-30 right-4 -translate-y-1/2">
            <svg
              className="fill-current"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#374151"
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

      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <div>
            <div className="flex justify-end gap-4.5">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded bg-[#0891B2] py-2 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 6C8.15685 6 9.5 4.65685 9.5 3C9.5 1.34315 8.15685 0 6.5 0C4.84315 0 3.5 1.34315 3.5 3C3.5 4.65685 4.84315 6 6.5 6Z"
                      fill="white"
                    />
                    <path
                      d="M6.5 8C9.81371 8 12.5 10.6863 12.5 14H0.5C0.5 10.6863 3.18629 8 6.5 8Z"
                      fill="white"
                    />
                    <path
                      d="M14.5 4C14.5 3.44772 14.0523 3 13.5 3C12.9477 3 12.5 3.44772 12.5 4V5H11.5C10.9477 5 10.5 5.44771 10.5 6C10.5 6.55228 10.9477 7 11.5 7H12.5V8C12.5 8.55228 12.9477 9 13.5 9C14.0523 9 14.5 8.55228 14.5 8V7H15.5C16.0523 7 16.5 6.55228 16.5 6C16.5 5.44772 16.0523 5 15.5 5H14.5V4Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Add Members
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium text-[#6B7280] text-[12px]">NAME</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium text-[#6B7280] text-[12px]">SKILL</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-[#6B7280] text-[12px]">STATUS</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-[#6B7280] text-[12px]">SIGNED UP</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-[#6B7280] text-[12px]">PLAN</p>
          </div>
        </div>

        {Array.isArray(members) &&
          members.map((member: any) => (
            <div
              key={member.id}
              onClick={() => handleMemberClick(member)}
              className="grid grid-cols-6 hover:border-b hover:border-l hover:border-r hover:bg-[#ECFEFF] hover:border-fitflo border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="rounded-md">
                    <img
                      style={{
                        height: '40px',
                        width: '40px',
                        borderRadius: '20px',
                      }}
                      src={(member && member.image) || userimg}
                      alt="user"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-black dark:text-white text-[14px]">
                      {' '}
                      {member && member.firstName}
                    </h5>
                    <p className="font-sm text-[14px]">
                      {member && member.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm fontaddmembers-medium text-[#6B7280] dark:text-white">
                  {member && member.trainingLevel
                    ? member.trainingLevel
                    : member.role || 'N/A'}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-black dark:text-white">
                  <p className="inline-flex rounded-full bg-[#D1FAE5] py-1 px-3 text-sm font-medium text-[#065F46]">
                    {member && member.status === true ? 'Active' : 'Deactive'}
                  </p>
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-[#6B7280] dark:text-white">
                  {formatDate(member.signedUp)}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-[#6B7280] dark:text-white">
                  Current
                </p>
              </div>
            </div>
          ))}

        {total == 0 && (
          <p className="flex text-fitflo ml-4 p-4  font-bold">
            Loading.. <Spinner />
          </p>
        )}

        {/* //pagination */}
        <div className="flex justify-between items-center p-4">
          <p>
            Showing {Math.min((currentPage - 1) * membersPerPage + 1, total)} to{' '}
            {Math.min(currentPage * membersPerPage, total)} of {total} results
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

        {showModal && (
          <Addmembers
            members={members}
            setMembers={setMembers}
            onCancel={() => setShowModal(false)}
            getMembers={getMembers}
          />
        )}
      </div>

      {/* <!-- ====== Members Section End ====== --> */}
    </>
  );
};

export default Members;
