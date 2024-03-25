import Rightbackicon from '../../images/icon/right-back-icon.png';
import { Link, useLocation } from 'react-router-dom';
import BadgesMember from './badgesmember';
import ExerciseMember from './exercisemember';
import ProgramMember from './programmember';
import WorkoutMember from './workoutmember';
import AddMember from './addmembers';
import { useEffect, useState } from 'react';

function MemberDetail() {
  const location = useLocation();
  const [memberData, setMemberData] = useState({} as any);
  useEffect(() => {
    const memberData = location.state?.memberData || null;
    setMemberData(memberData)
    console.log("From member detail",memberData)
  },[memberData])
 
  if (!memberData) {
    return <div>Loading...</div>;
  }
  
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('WorkoutMember');

  const onChangeTab = (type: string) => {
    setSelectedTab(type);
  };

  const tabBorder = (color: string, type: string) => {
    let border: string, selectColor: string;
    if (selectedTab == color) {
      border = '3px solid #3BA2B8';
      selectColor = '#3BA2B8';
    } else {
      border = '';
      selectColor = '';
    }
    return type == 'border' ? { borderBottom: border } : { color: selectColor };
  };

  let renderTab: any = {
    WorkoutMember: <WorkoutMember memberData={memberData}/>,
    ExerciseMember: <ExerciseMember memberData={memberData} />,
    ProgramMember: <ProgramMember memberData={memberData} />,
    BadgesMember: <BadgesMember />,
  };

  return (
    <>
      <Link to="/members">
        <button className="flex gap-3 text-black-100" type="submit">
          <img className="h-3 w-2 mt-1.5" src={Rightbackicon} alt="" />
          <p>Back to Members</p>
        </button>
      </Link>
      <br />
      <div className="mb-4.5 flex flex-col gap-0 xl:flex-row">
        <div className="w-full xl:w-1/1 bg-[#F9FAFB]">
          <div className="flex gap-10 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3
              onClick={() => onChangeTab('WorkoutMember')}
              className="font-medium dark:text-white  py-2 "
              style={tabBorder('WorkoutMember', 'border')}
            >
              <a style={tabBorder('WorkoutMember', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}>Workouts</p>
              </a>
            </h3>
            <h3
              onClick={() => onChangeTab('ExerciseMember')}
              className="font-medium text-black-100 dark:text-white py-2 "
              style={tabBorder('ExerciseMember', 'border')}
            >
              <a style={tabBorder('ExerciseMember', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}>Exercises</p>
              </a>
            </h3>
            <h3
              className="font-medium text-black-100 dark:text-white py-2 "
              style={tabBorder('ProgramMember', 'border')}
              onClick={() => onChangeTab('ProgramMember')}
            >
              <a style={tabBorder('ProgramMember', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}> Programs</p>
              </a>
            </h3>
            <h3
              className="font-medium text-black-100 dark:text-white py-2 "
              style={tabBorder('BadgesMember', 'border')}
              onClick={() => onChangeTab('BadgesMember')}
            >
              <a style={tabBorder('BadgesMember', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}> Badges</p>
              </a>
            </h3>
          </div>

          {renderTab[selectedTab]}
        </div>

        <div className="w-full xl:w-1/3 bg-[#fff]">
          <div className="w-full max-w-142.5 rounded-lg bg-white text-center dark:bg-boxdark ">
            <div className="flex justify-end p-5 ">
              <button
                onClick={() => setShowModal(true)}
                className="border border-2 border-fitflo rounded-lg p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 border border-2 border-stroke rounded-lg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </button>
            </div>
            <span className="mx-auto inline-block">
              <img
                style={{
                  borderRadius: '64px',
                }}
                src={memberData.photo}
                width={"88px"}
                height={"88px"}
                alt="Avatar"
              />
            </span>
            <h3
              className=" pb-1 font-bold text-black dark:text-white sm:text-2xl"
              style={{ fontSize: '14px' }}
            >
              {memberData.firstName}  {memberData.lastName}
            </h3>
            <p className="font-lg mb-2" style={{ fontSize: '14px' }}>
              {' '}
              {memberData.email}
            </p>
            <p className="inline-flex rounded-full bg-[#D1FAE5] py-1 px-3 text-sm font-medium text-[#065F46] mb-2">
            {memberData.status}
            </p>
          </div>
          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <div className="py-2.5 px-2.5 md:px-1 xl:px-1 bg-[#fafafa] border-t border-stroke dark:border-strokedark">
              <h4
                className="text-medium text-black-100 dark:text-white text-center"
                style={{ fontSize: '14px' }}
              >
                Total Workouts <span className="text-black">{memberData.workoutcompleted || 0}</span>
              </h4>
            </div>
            <div className="py-2.5 px-2.5 md:px-1 xl:px-1 bg-[#fafafa] border-t border-stroke dark:border-strokedark">
              <h4
                className="text-medium text-black-100 dark:text-white text-center"
                style={{ fontSize: '14px' }}
              >
                Total Exercises <span className="text-black">{memberData.exercisecompleted || 0}</span>
              </h4>
            </div>
            <div className="py-2.5 px-2.5 md:px-1 xl:px-1 bg-[#fafafa] border-t border-stroke dark:border-strokedark">
              <h4
                className="text-medium text-black-100 dark:text-white text-center"
                style={{ fontSize: '14px' }}
              >
                Workout Time <span className="text-black">N/A</span>
              </h4>
            </div>
          </div>

          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-2 md:px-6 xl:px-2">
              <h4 className="text-16 font-bold text-black dark:text-white">
                Information
              </h4>
            </div>
            <div className="grid grid-cols-6  border-t border-stroke py-4.5 px-2 dark:border-strokedark ">
              <div className="col-span-3 flex items-center">
                <p className="font-medium text-sm">Gender</p>
              </div>
              <div className="col-span-3 hidden items-center sm:flex flex justify-end ">
                <p className="font-bold text-sm text-black"> {memberData.gender || 'N/A'}</p>
              </div>
            </div>
            <div className="grid grid-cols-6  border-t border-stroke py-4.5 px-2 dark:border-strokedark ">
              <div className="col-span-3 flex items-center">
                <p className="font-medium text-sm">Skill</p>
              </div>
              <div className="col-span-3 hidden items-center sm:flex flex justify-end ">
                <p className="font-bold text-sm text-black"> {memberData.trainingLevel || memberData.role || 'N/A'}</p>
              </div>
            </div>
            <div className="grid grid-cols-6  border-t border-stroke py-4.5 px-2 dark:border-strokedark ">
              <div className="col-span-3 flex items-center">
                <p className="font-medium text-sm">Signed up</p>
              </div>
              <div className="col-span-3 hidden items-center sm:flex flex justify-end ">
                <p className="font-bold text-sm text-black">{memberData.signedUp || '--'}</p>
              </div>
            </div>
            <div className="grid grid-cols-6  border-t border-stroke py-4.5 px-2 dark:border-strokedark ">
              <div className="col-span-3 flex items-center">
                <p className="font-medium text-sm">fitness goal</p>
              </div>
              <div className="col-span-3 hidden items-center sm:flex flex justify-end ">
                <p className="font-bold text-sm text-black">N/A</p>
              </div>
            </div>
            <div className="p-3">
              <button className="flex w-full justify-center rounded bg-[#0891B2] p-3 font-medium text-gray">
                {' '}
                Message{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <AddMember onClose={() => setShowModal(false)} />}
    </>
  );
}

export default MemberDetail;
