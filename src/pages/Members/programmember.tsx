import '../Programming/css/allProgramming.css';
import userImage from '../../images/user/user-11.png';

function ProgramMember({ memberData }: any) {
  if (!memberData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main p-8">
        <br />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 overflow-auto">
          {Array.isArray(memberData.programList) &&
            memberData.programList.map((userProgram: any) => (
              <div
                key={userProgram.id}
                className="rounded dark:border-strokedark dark:bg-boxdark pcard"
              >
                <a href="#" className="block pcardimg">
                  <img
                    src={userProgram.photo}
                    alt="Cards"
                    className="rounded"
                  />
                  <div className="top-right">
                    <p className="text-sm font-medium text-black dark:text-white">
                      <p className="inline-flex rounded-full bg-fitflo bg-opacity-9 py-1 text-[#CFFAFE] px-4 text-sm font-sm ">
                        {' '}
                        Program{' '}
                      </p>
                    </p>
                  </div>
                </a>
                <div className="">
                  <h4
                    className="text-xl font-semibold text-black dark:text-white"
                    style={{ fontSize: '14px' }}
                  >
                    <a href="#">{userProgram.name}</a>
                  </h4>
                  <p style={{ fontSize: '12px' }}>
                    {' '}
                    Strength . {userProgram.workoutList.length} Workouts . N/A
                    Weeks
                  </p>
                  <div className="flex items-center gap-3 py-3 px-1">
                    <div className="h-[16px] w-[16px] rounded-full">
                      <img src={userImage} alt="User" />
                    </div>
                    <div>
                      <p
                        style={{ fontSize: '12px' }}
                        className="text-xs font-medium"
                      >
                        By {userProgram.creatorName || 'Johney Dipsmor'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProgramMember;
