import { useNavigate } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firestoreConfig/firestore';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/common.css';
import { gymId, firebaseHostURL, getAuthToken } from '../pages/UiElements/host';

const TableTwo = () => {
  const [displayedEquipments, setDisplayedEquipments] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [allEquipments, setAllEquipments] = useState(null as any);
  const [checkedStates, setCheckedStates] = useState([]);
  const [equipmentsPerPage, setEquipmentsPerPage] = useState(null as any);
  const [maxVisiblePages, setIsMaxVisiblePages] = useState(null as any);

  // const getEquipments = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'Manage Equipment'));
  //   const equipments = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setAllEquipments(equipments);
  //   const startIndex = (currentPage - 1) * equipmentsPerPage;
  //   const endIndex = startIndex + equipmentsPerPage;
  //   const equipmentData = equipments.slice(startIndex, endIndex);
  //   setDisplayedEquipments(equipmentData);
  // };

  const getEquipments = async () => {
    try {
      const apiUrl = `${firebaseHostURL}equipments/?page=${currentPage}&gymId=${gymId}`;
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
      setDisplayedEquipments(responseData.data);
      setAllEquipments(
        responseData.pagination && responseData.pagination.pagesItemsTotal,
      );
      setEquipmentsPerPage(
        responseData.pagination && responseData.pagination.pagesItemsLimit,
      );
      setIsMaxVisiblePages(
        responseData.pagination && responseData.pagination.pagesTotal,
      );
      setCurrentPage(
        responseData.pagination && responseData.pagination.pageNumber,
      );
    } catch (error) {
      console.error('Error fetching equipment data:', error);

      // Retry the request after a delay (e.g., 2 seconds)
      // setTimeout(() => {
      //   getEquipments();
      // }, 2000);
    }
  };

  useEffect(() => {
    getEquipments();
  }, [currentPage]);

  useEffect(() => {
    const initialCheckedStates = displayedEquipments.map(
      (equipment: any) => equipment.status,
    );
    setCheckedStates(initialCheckedStates);
  }, [displayedEquipments]);

  const totalEquiments = allEquipments;
  const totalPages = Math.ceil(totalEquiments / equipmentsPerPage);

  const handlePageChange = (newPage: number) => {
    console.log('current', newPage, 'total', totalPages);
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
            className={`flex items-center justify-center py-[5px] px-4 font-medium 
              ${
                currentPage == i
                  ? 'bg-[#ECFEFF] text-fitflo border border-fitflo'
                  : 'hover:bg-gray hover:text-fitflo border border-stroke dark:border-strokedark dark:hover:border-fitflo dark:hover:bg-graydark'
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
  const handleEquipmentClick = (selectedEquipment: any) => {
    navigate(`/gym-equipment/${selectedEquipment.id}`, {
      state: { equipmentData: selectedEquipment },
    });
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedStates: any = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
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

  const rowText: any = {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    etterSpacing: '0em',
    textAlign: 'left',
    color: '#111827',
  };

  const rowText1: any = {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    etterSpacing: '0em',
    textAlign: 'left',
    color: '#6B7280',
  };

  return (
    <div className="">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white p-1">
        Equipment
      </h2>
      <div className="flex justify-between">
        <h4 className="dark:text-white p-1 text-grayf text-[15px]">
          Select and connect the equipment available at your gym
        </h4>
        <div className="">
          <select className="rounded border-[1.5px] border-stroke ml-5 p-1 text-graylight text-[15px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="volvo">Sort</option>
          </select>
          <select className="rounded border-[1.5px] border-stroke ml-5 p-1 text-graylight text-[15px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="volvo">Filter</option>
          </select>
          <button className="rounded border-[1.5px] border-stroke text-[15px] ml-5 p-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
            Make all active
          </button>
        </div>
      </div>

      <TableContainer
        component={Paper}
        style={{ marginTop: '32px', boxShadow: 'none' }}
      >
        <Table
          size="small"
          aria-label="a dense table"
          className="border border-[#E5E7EB] bg-white dark:border-strokedark dark:bg-boxdark gap-[20px] w-full"
        >
          <TableHead className="py-4.5 px-4 h-[44px] uppercase bg-[#F9FAFB] dark:border-strokedark md:px-6 2xl:px-7.5">
            <TableRow>
              <TableCell className="w-[520px]" style={typography}>
                Equipment
              </TableCell>
              <TableCell className="w-[100px]" style={typography}>
                Active
              </TableCell>
              <TableCell className="w-[200px]" style={typography}>
                Category
              </TableCell>
              <TableCell style={{ width: '40px' }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(displayedEquipments) &&
              displayedEquipments.map((equipment: any, index: number) => (
                <TableRow
                  key={equipment.id}
                  className="h-[77px]"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ borderBottom: 'none' }}
                  >
                    <div
                      onClick={() => handleEquipmentClick(equipment)}
                      className="flex items-center cursor-pointer"
                    >
                      <img
                        src={equipment.equipment_images}
                        alt="Product"
                        className="h-[45px] w-[45px] border rounded-full mr-4"
                      />
                      <p style={rowText}>{equipment.equipment_name}</p>
                    </div>
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    <div>
                      <label
                        htmlFor={`checkboxLabel${index}`}
                        className="cursor-pointer select-none"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={`checkboxLabel${index}`}
                            className="sr-only"
                            checked={checkedStates[index] || false}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <div
                            className={`flex h-[16px] w-[16px] items-center justify-center rounded border border-[#D1D5DB] ${
                              checkedStates[index] &&
                              'border-none bg-fitflo dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`opacity-0 ${
                                checkedStates[index] && '!opacity-100'
                              }`}
                            >
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#fff"
                                  stroke="#fff"
                                  strokeWidth="1"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={() => handleEquipmentClick(equipment)}
                    style={{ borderBottom: 'none' }}
                  >
                    <p style={rowText1} className="cursor-pointer">
                      {equipment.category}
                    </p>
                  </TableCell>
                  <TableCell align="right" style={{ borderBottom: 'none' }}>
                    <button>
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* //pagination */}
      <div className="flex justify-between items-center p-1">
        <p>
          Showing{' '}
          {Math.min((currentPage - 1) * equipmentsPerPage + 1, totalEquiments)}{' '}
          to {Math.min(currentPage * equipmentsPerPage, totalEquiments)} of{' '}
          {totalEquiments} results
        </p>
        <div className="p-4 sm:p-6 xl:p-7.5">
          <nav>
            <ul className="flex flex-wrap items-center">
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
    </div>
  );
};

export default TableTwo;
