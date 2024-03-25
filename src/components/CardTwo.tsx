
const CardTwo = () => {
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
            <path d="M4 16V20H8V22H2V16H4ZM22 16V22H16V20H20V16H22ZM7.5 7C7.5 9.48528 9.51472 11.5 12 11.5C14.4853 11.5 16.5 9.48528 16.5 7H18.5C18.5 9.50729 17.0804 11.683 15.0011 12.7672L15 19H9L8.99992 12.7677C6.92007 11.6837 5.5 9.50769 5.5 7H7.5ZM12 5C13.3807 5 14.5 6.11929 14.5 7.5C14.5 8.88071 13.3807 10 12 10C10.6193 10 9.5 8.88071 9.5 7.5C9.5 6.11929 10.6193 5 12 5ZM8 2V4L4 3.999V8H2V2H8ZM22 2V8H20V4H16V2H22Z"></path>
          </svg>
        </div>

        <div>
          <span className="text-[14px] text-sm font-medium">
            Workouts Completed{' '}
          </span>
          <div className="flex gap-[8px]">
            <h4 className="font-semibold text-[24px] text-black dark:text-white">
              212
            </h4>
            <span className="flex items-center mt-2 text-sm font-medium text-danger">
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
              36 (Last 7 days)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
