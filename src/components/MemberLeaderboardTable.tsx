
const TableOne = () => {
  return (
    <>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-[36px]">
        <div className="flex flex-col">
          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 bg-[#F3F4F6] dark:bg-meta-4 sm:grid-cols-5"
          >
            <div className="p-1  xl:p-5">
            <h1 className="text-black dark:text-white font-semibold ml-2 text-[19px]">
          Member Leaderboard<span className="font-normal text-[15px]">&nbsp;(Last 7 days)</span>
        </h1>
            </div>
            <div className="p-1 text-center xl:p-5">
              <h5
                className="text-sm font-medium xsm:text-base text-black dark:text-white"
                style={{ fontSize: '12px' }}
              >
                Last Session
              </h5>
            </div>
            <div className="p-1 text-center xl:p-5">
              <h5
                className="text-sm font-medium  xsm:text-base text-black dark:text-white"
                style={{ fontSize: '12px' }}
              >
                Completed Workouts
              </h5>
            </div>
            <div className="hidden p-1 text-center sm:block xl:p-5">
              <h5
                className="text-sm font-medium  xsm:text-base text-black dark:text-white"
                style={{ fontSize: '12px' }}
              >
                Exersise Logged
              </h5>
            </div>
            <div className="hidden p-1 text-center sm:block xl:p-5">
              <h5
                className="text-sm font-medium  xsm:text-base text-black dark:text-white"
                style={{ fontSize: '12px' }}
              >
                Badges Earned
              </h5>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white font-bold text-[14px] sm:block">👤 test</p>
              </div>
              <span className="hidden sm:block ml-5 text-[14px] text-[#6B7280]">
                nicopa2884@vip$e.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2023-12-07</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">13</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">59</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">3</p>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white font-bold text-[14px] sm:block">👤 test</p>
              </div>
              <span className="hidden sm:block text-[14px] text-[#6B7280] ml-5">
                tst@gmail.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2024-1-03</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">82</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">298</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">3</p>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white font-bold text-[14px] sm:block">👤 tee</p>
              </div>
              <span className="hidden sm:block text-[14px] text-[#6B7280] ml-5">
                tiboje9990@utwoko.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2023-12-23</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">52</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2</p>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white font-bold text-[14px] sm:block">👤 no</p>
              </div>
              <span className="hidden sm:block text-[14px] text-[#6B7280] ml-5">
                test@gmail.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2023-12-07</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">13</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">59</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">3</p>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white text-[14px] font-bold sm:block">👤 tester</p>
              </div>
              <span className="hidden sm:block text-[14px] text-[#6B7280] ml-5">
                nicopa2884@vip$e.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2023-12-07</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">13</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">59</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">3</p>
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="container items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white font-bold text-[14px] sm:block">👤 testu</p>
              </div>
              <span className="hidden sm:block text-[14px] text-[#6B7280] ml-5">
                tst@gmail.com
              </span>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">2024-1-03</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">82</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">298</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#6B7280] text-[14px] dark:text-white">3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOne;
