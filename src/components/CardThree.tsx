
const CardThree = () => {
  return (
    <div className="rounded-[9px] h-[100px] lg:w-[472px] border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-[20px]">
        <div className="flex h-[48px] w-[48px] items-center justify-center rounded  bg-[#CFFAFE]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#0E7490"
            className='h-[24px] w-[24px]'
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
          </svg>
        </div>

        <div>
          <span className="text-[14px] text-sm font-medium">
            Exercises Logged
          </span>
          <div className="flex gap-[8px]">
            <h4 className="font-semibold text-[24px] text-black dark:text-white">
              192
            </h4>
            <span className="flex items-center gap-1 mt-2 text-sm font-medium text-danger">
              <svg
                className="fill-danger"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
              58 (Last 7 days)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardThree;
