import React, { useEffect, useState } from 'react';
import Logo from '../images/logo/logo.png';
import Button from '@material-tailwind/react/components/Button';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { gymId, firebaseHostURL, getAuthToken } from './UiElements/host';
import QRCode from 'qrcode.react';

const GymEquipmentPage: React.FC = () => {
  const location = useLocation();
  const equipmentData = location.state?.equipmentData || null;
  const [displayedExercises, setDisplayedExercises] = useState([] as any);
  const [initialDisplayCount, setInitialDisplayCount] = useState(4);
  const websiteUrl = equipmentData.qr_link;

  useEffect(() => {
    axios
      .get(
        `${firebaseHostURL}equipments/${equipmentData.id}/exercises?gymId=${gymId}`,
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
      .then((response: any) => {
        setDisplayedExercises(response.data.data);
      })
      .catch((error: any) => {
        console.error('Error fetching :', error);
      });
  }, [equipmentData]);

  useEffect(() => {}, [displayedExercises]);

  const showAllExercises = () => {
    setInitialDisplayCount(displayedExercises.length);
  };

  if (!equipmentData) {
    // You can show a loading spinner or message while fetching data
    return <div>Loading...</div>;
  }

  const printPDF = () => {
    const pdfUrl = '../../public/qrcode.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'qrcode.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <Link to="/equipment" className="font-bold">
          {'← Return'}
        </Link>
        <h1 className="text-black dark:text-white font-bold p-4">
          {equipmentData.equipment_name}
        </h1>
        <div className="mt-4 flex flex-col md:flex-row bg-white dark:bg-boxdark rounded-lg">
          <div className="md:w-1/3 p-3 xl:p-8">
            <div className="flex-shrink-0">
              <img
                src={equipmentData.equipment_images}
                height={'180px'}
                width={'180px'}
                alt="Product"
              />
            </div>
          </div>

          <div className="md:w-2/3 p-2 xl:p-8">
            <h1 className="text-black dark:text-white font-bold text-[19px]">
              {equipmentData.equipment_name}
            </h1>
            <span className="text-[15px]">{equipmentData.category}</span>
            <p className="text-[15px] text-grayf pt-[20px]">
              {equipmentData.equipment_details}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 p-4">
          <div>
            <h1 className="text-black dark:text-white font-bold">Exercises</h1>
            <span>{displayedExercises.length} exercise available</span>
          </div>
          <Button
            style={{ backgroundColor: '#0891B2' }}
            onClick={showAllExercises}
          >
            Show All
          </Button>
        </div>
        <div className="flex flex-wrap bg-white dark:bg-boxdark mt-4 p-5 rounded-lg">
          {displayedExercises
            .slice(0, initialDisplayCount)
            .map((exercise: any) => (
              <div className="flex-1" key={exercise.exercises_name}>
                <div className="w-50 rounded-md">
                  <img
                    style={{ borderRadius: '20px' }}
                    src={exercise.exercises_image}
                    alt="Product"
                    height={'165px'}
                    width={'200px'}
                  />
                </div>
                <h1 className="text-black dark:text-white font-bold mt-6">
                  {exercise.exercises_name}
                </h1>
                <span className="text-grayf text-sm">
                  Primary muscle group: {exercise.primary_muscle}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 p-4">
          <div>
            <h1 className="text-black dark:text-white font-bold">
              Equipment instructions
            </h1>
            <span>Print and paste QR code into equipment</span>
          </div>
          <Button style={{ backgroundColor: '#0891B2' }} onClick={printPDF}>
            Print PDF
          </Button>
        </div>
        <div className="mt-4 flex flex-col md:flex-row bg-white dark:bg-boxdark rounded-lg">
          <div className="md:w-1/3 p-3 xl:p-8">
            <div className="flex-shrink-0 pt-25 pl-5">
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi40_ScZ-IgM5uY48fK51hiAm1uSVTQP8TGA&usqp=CAU"
                alt="Product"
              /> */}
              <QRCode value={websiteUrl} />
            </div>
          </div>

          <div className="md:w-2/3 p-2 xl:p-8">
            <div className="flex items-center gap-3 p-2.5 xl:p-8">
              <div className="flex-shrink-0">
                <img src={Logo} alt="Product" />
              </div>
            </div>
            <h1 className="text-black dark:text-white font-bold p-4 text-[30px]">
              {equipmentData.equipment_name}
            </h1>
            <h1 className="text-black dark:text-white font-bold">
              Scan here to view equipment details and excersise videos
            </h1>
            <li className="text-black dark:text-white mt-4">
              Acess FREE dynamic and personalized workouts
            </li>
            <li className="text-black dark:text-white">
              Easily track and log progress
            </li>
            <li className="text-black dark:text-white">
              Receive badges and rewards as you achieve milestones
            </li>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 p-4">
          <div>
            <h1 className="text-black dark:text-white font-bold">
              Equipment instructions
            </h1>
            <span>Print and paste QR code into equipment</span>
          </div>
          <Button style={{ backgroundColor: '#0891B2' }} onClick={printPDF}>
            Print PDF
          </Button>
        </div>

        <div className="mt-4 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 bg-white dark:bg-boxdark rounded-lg">
          <div className="container gap-3 p-2.5 xl:p-8">
            <div className="flex gap-3 p-2.5 xl:p-8 justify-center text-center">
              <div className="flex-shrink-0">
                <img src={Logo} alt="Product" />
              </div>
            </div>
            <h1 className="text-black dark:text-white justify-center text-center text-[30px] font-bold p-4">
              {equipmentData.equipment_name}
            </h1>
            <div className="text-center">
              <h1 className="text-black dark:text-white font-bold">
                Scan here to view equipment details and excersise videos
              </h1>
              <li className="text-black dark:text-white mt-4">
                Acess FREE dynamic and personalized workouts
              </li>
              <li className="text-black dark:text-white">
                Easily track and log progress
              </li>
              <li className="text-black dark:text-white">
                Receive badges and rewards as you achieve milestones
              </li>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 p-2.5 xl:p-8">
            <div className="flex-shrink-0">
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi40_ScZ-IgM5uY48fK51hiAm1uSVTQP8TGA&usqp=CAU"
                alt="Product"
              /> */}
              <QRCode value={websiteUrl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GymEquipmentPage;
