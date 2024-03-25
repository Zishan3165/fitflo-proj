import Setprompt from './setprompt';
import { useState } from 'react';

function alcopilot() {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      AI Co-Pilot
      </h2>
      <div className="p-30">
        <div className="flex justify-end gap-4.5">
          <button
           onClick={() => setShowModal(true)}
            className="flex justify-center rounded bg-[#0891B2] py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
            style={{ borderRadius: '10px' }}
            type="submit"
          >
            Set Prompt
          </button>
        </div>
        <br />
        <div
          className=" py-40 px-7.5 rounded border border-[#001] bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
          style={{ borderRadius: '25px' }}
        >
          <div className="p-4 sm:p-5 xl:p-7.5"></div>
        </div>
        <br />
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded bg-[#0891B2] py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
            style={{ borderRadius: '10px' }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
      {showModal && <Setprompt onClose={() => setShowModal(false)} />}
    </>
  );
}

export default alcopilot;
