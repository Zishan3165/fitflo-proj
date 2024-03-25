import { useEffect, useState } from 'react';
import Addteam from './addteam';
import { Link, useNavigate } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firestoreConfig/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { gymId, firebaseHostURL, getAuthToken } from '../UiElements/host';

const Team = () => {
  const [showModal, setShowModal] = useState(false);
  const [displayedTeams, setDisplayedTeams] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTeams, setAllTeams] = useState(null as any);
  const [teamsPerPage, setTeamsPerPage] = useState(null as any);
  const maxVisiblePages = 5;

  // const getTeams = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'Manage Team'));
  //   const teams = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setAllTeams(teams);
  //   const startIndex = (currentPage - 1) * teamsPerPage;
  //   const endIndex = startIndex + teamsPerPage;
  //   const teamData = teams.slice(startIndex, endIndex);
  //   setDisplayedTeams(teamData);
  // };

  const getTeams = async () => {
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

      setDisplayedTeams(responseData.data);
      setAllTeams(
        responseData.pagination && responseData.pagination.pagesItemsTotal,
      );
      setTeamsPerPage(
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
    getTeams();
  }, [currentPage]);

  useEffect(() => {}, [displayedTeams]);
  const [openMenu, setOpenMenu] = useState(displayedTeams.map(() => false));
  const toggleMenu = (index: number) => {
    const updatedVisibility = [...openMenu];
    updatedVisibility[index] = !updatedVisibility[index];
    setOpenMenu(updatedVisibility);
  };
  const totalteams = allTeams;
  const totalPages = Math.ceil(totalteams / teamsPerPage);

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
            className={`flex items-center justify-center  py-[5px] px-4 font-medium 
              ${
                currentPage == i
                  ? 'text-fitflo border border-fitflo bg-[#ECFEFF]'
                  : 'hover:border-fitflo border border-stroke hover:bg-gray hover:text-fitflo dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark'
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
    navigate('/team-workout-page', { state: { memberData: selectedMember } });
  };


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

  const typography: any = {
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0.05em',
    textAlign: 'left',
    color: '#6B7280',
  };

  return (
    <>
      <h2 className="text-title-md2 font-bold text-black text-[23px]">
        Team Members
      </h2>
      <div className="flex justify-between items-center mb-6">
        <p className="p-1">{totalteams} results</p>
        <div className="flex">
          <div className="relative z-20 bg-transparent dark:bg-form-input mr-6">
            <select className="relative z-20 lg:w-[124px] text-[14px]  appearance-none rounded-lg border border-stroke bg-white py-1.5 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Sort by</option>
            </select>
            <span className="absolute top-1/2 z-30 right-4 -translate-y-1/2">
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
          <div className="relative z-20 bg-transparent dark:bg-form-input mr-6">
            <select className="relative z-20 lg:w-[124px] text-[14px] appearance-none rounded-lg border border-stroke bg-white py-1.5 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Filter</option>
            </select>
            <span className="absolute top-1/2 z-30 right-4 -translate-y-1/2">
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
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded bg-[#0891B2] py-1.5 text-[15px] text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-6"
          >
            New Team Member
          </button>
        </div>
      </div>
      {/* <!-- ====== Members Section Start ====== --> */}
      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table
          size="small"
          aria-label="a dense table"
          className="border border-[#E5E7EB] bg-white dark:border-strokedark dark:bg-boxdark gap-[20px] w-full"
        >
          <TableHead className="py-4.5 px-4 h-[40px] bg-[#F9FAFB] dark:border-strokedark md:px-6 2xl:px-7.5">
            <TableRow>
              <TableCell className="w-[474px]" style={typography}>
                NAME
              </TableCell>
              <TableCell className="w-[149px]" style={typography}>
                SIGNED UP
              </TableCell>
              <TableCell className="w-[152px]" style={typography}>
                ROLE
              </TableCell>
              <TableCell style={{ width: '40px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(displayedTeams) &&
              displayedTeams.map((team: any, index: number) => (
                <>
                  <TableRow
                    key={team.id}
                    onClick={() => handleMemberClick(team)}
                    className="h-[77px]"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to="/team-workout-page">
                        <div className="flex items-center">
                          <img
                            src={team.photo}
                            alt="user"
                            className="h-[40px] w-[40px] border rounded-full mr-4"
                          />
                          <div>
                            <h5 className="font-medium text-black dark:text-white text-[14px]">
                              {team.firstName} {team.lastName}
                            </h5>
                            <p className="font-sm text-[#6B7280] text-[14px]">
                              {team.email}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to="/team-workout-page">
                        <p className="text-sm font-medium text-[#6B7280] dark:text-white text-[14px]">
                          {formatDate(team.signedUp)}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to="/team-workout-page">
                        <p className="inline-flex rounded-full bg-[#DBEAFE] py-1 px-3 text-sm font-medium text-[#1E40AF] text-[12px]">
                          {team.role}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => toggleMenu(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#6B7280"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                  {openMenu[index] && (
                    <div className="bg-white p-3 lg:w-[224px] lg:h-[80px] mr-15 right-4 absolute rounded-[6px]">
                      <ul>
                        <li className="p-1 font-medium text-[#374151] text-[14px] cursor-pointer rounded dark:border-strokedark">
                          Edit Details
                        </li>
                        <li className="p-1 font-medium text-[#374151] text-[14px] cursor-pointer rounded dark:border-strokedark">
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* //pagination */}
      <div className="flex justify-between items-center ">
        <p>
          Showing {Math.min((currentPage - 1) * teamsPerPage + 1, totalteams)}{' '}
          to {Math.min(currentPage * teamsPerPage, totalteams)} of {totalteams}{' '}
          results
        </p>
        <div className="p-4 sm:p-6 xl:p-7.5">
          <nav>
            <ul className="flex flex-wrap items-center bg-white">
              <li>
                <a
                  className="flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-fitflo hover:bg-gray hover:text-fitflo dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark"
                  href="#"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
        <Addteam
          displayedTeams={displayedTeams}
          setDisplayedTeams={setDisplayedTeams}
          onClose={() => setShowModal(false)}
          getTeams={getTeams}
        />
      )}
      {/* <!-- ====== Members Section End ====== --> */}
    </>
  );
};

export default Team;
