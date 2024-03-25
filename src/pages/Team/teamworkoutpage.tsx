import Rightbackicon from '../../images/icon/right-back-icon.png';
import Addteam from './addteam';
import TeamProgramAssign from './teamprogramassign';
import ProgramCreated from './programcreated';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function teamworkoutpage() {
  const location = useLocation();
  const [memberData, setMemberData] = useState({} as any);
  useEffect(() => {
    const memberData = location.state?.memberData || null;
    setMemberData(memberData);
  }, [memberData]);

  if (!memberData) {
    return <div>Loading...</div>;
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('TeamProgramAssign');

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
    TeamProgramAssign: <TeamProgramAssign />,
    ExerciseMember: <ProgramCreated />,
  };

  return (
    <>
      <Link to="/team">
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
              onClick={() => onChangeTab('TeamProgramAssign')}
              className="font-medium dark:text-white  py-2 "
              style={tabBorder('TeamProgramAssign', 'border')}
            >
              <a style={tabBorder('TeamProgramAssign', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}>Program Assigned</p>
              </a>
            </h3>
            <h3
              onClick={() => onChangeTab('ExerciseMember')}
              className="font-medium text-black-100 dark:text-white py-2 "
              style={tabBorder('ExerciseMember', 'border')}
            >
              <a style={tabBorder('ExerciseMember', 'text-color')} href="#">
                <p style={{ fontSize: '14px' }}>Programs Created</p>
              </a>
            </h3>
          </div>

          {renderTab[selectedTab]}
        </div>
        <div className="w-full xl:w-1/3 bg-white p-5">
          <div className="w-full max-w-142.5 rounded-lg bg-white text-center dark:bg-boxdark ">
            <div className="flex justify-end p-5">
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
                  className="w-8 h-8  border border-2 border-stroke rounded-lg"
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
                className="w-full"
                style={{
                  borderRadius: '50%',
                  verticalAlign: 'bottom',
                  display: 'block',
                  height: '88px',
                  width: '88px',
                }}
                src={memberData.photo}
                alt=""
              />
            </span>
            <h3 className=" pb-1 font-medium text-[#111827] text-[14px]">
              {memberData.firstName} {memberData.lastName}
            </h3>
            <p className="font-sm text-[14px]"> {memberData.email} </p>
            <p className="font-sm text-[14px]"> Ph.- N/A </p>
            <p className="font-bold text-[14px]"> {memberData.role} </p>
          </div>
        </div>
      </div>
      {showModal && <Addteam onClose={() => setShowModal(false)} />}
    </>
  );
}

export default teamworkoutpage;
