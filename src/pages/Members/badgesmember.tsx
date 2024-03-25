import GreenTikIcon from '../../images/icon/green-tik-icon.png';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firestoreConfig/firestore';
import { useEffect, useState } from 'react';

function BadgesMember() {
  const [userBadges, setUserBadges] = useState([] as any);

  const getUserBadges = async () => {
    const querySnapshot = await getDocs(collection(db, 'Manage Badges'));
   
    const badges = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserBadges(badges);
  };

  useEffect(() => {
    getUserBadges();
  }, []);

  useEffect(() => {}, [userBadges]);

  return (
    <>
      <div className="p-8">
        <div className="grid grid-cols-8 rounded-lg border border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-4 flex items-center">
            <p className="font-medium text-[#374151] text-[14px]">BADGE</p>
          </div>
          <div className="col-span-3  items-center sm:flex">
            <p className="font-medium text-[#374151] text-[14px]">MILESTONE</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-[#374151] text-[14px]">COMPLETED</p>
          </div>
        </div>
        {Array.isArray(userBadges) &&
          userBadges.map((userBadge: any) => (
            <div className="grid grid-cols-6 border border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className="h-12.5 w-12.5 rounded-md bg-black px-3 py-3"
                    style={{ borderRadius: '50%' }}
                  >
                    <img src={userBadge.Icon_image} alt="user" />
                  </div>
                  <div>
                    <h5 className="font-bold text-black dark:text-white text-[14px]">
                      {userBadge.badge_name}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-span-3 items-center sm:flex">
                <p className="text-[14px] font-medium text-[#4B5563] dark:text-white">
                  {userBadge.milestone}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex gap-2">
                <img src={GreenTikIcon} alt="" />
                <p className="text-[14px] font-medium text-[#4B5563] dark:text-white">
                  16/08/2020
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BadgesMember;
