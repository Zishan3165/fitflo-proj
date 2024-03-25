import userIcon from '../images/icon/Stats/Icon.svg';

const CardOne = () => {
  return (
    <div className="rounded-[9px] h-[100px] lg:w-[472px] border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-[20px]">
        <div className="flex h-[48px] w-[48px] items-center justify-center rounded  bg-[#CFFAFE]">
          <img src={userIcon} alt="user" className="w-[24px] h-[24px]" />
        </div>

        <div>
          <span className="text-[14px] text-sm font-medium">
            Registered Users
          </span>
          <div className="flex gap-[8px]">
            <h4 className="font-semibold text-[24px] text-black dark:text-white">
              897
            </h4>
            <span className="flex items-center gap-1 mt-2 text-sm font-medium text-meta-3">
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
              21 (Last 7 days)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
