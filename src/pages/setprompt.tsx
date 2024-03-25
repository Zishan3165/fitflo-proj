import { useRef } from 'react';
import { X } from 'lucide-react';

function setprompt({ onClose }: any) {
  const modalRef: any = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const myStyle = {
    overflow: 'scroll',
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backrop-blur-sm flex justify-center items-center"
      style={myStyle}
    >
      <div className="mt-10 flex flex-col gap-5 text-black p-6 bg-white">
        <button onClick={onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="flex flex-col gap-20">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-[30rem] mb-4 overflow-auto">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Set Prompt
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Age <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your age"
                      className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Height <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your height"
                      className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Weight <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your weight"
                    className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Goal <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your goal"
                    className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Gender <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="cars"
                    id="cars"
                    className="w-full text-black rounded border-[1.5px] border-stroke  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black"
                  >
                    <option value="volvo">Select</option>
                    <option value="saab">Male</option>
                    <option value="mercedes">Female</option>
                    <option value="audi">Both</option>
                  </select>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    onClick={onClose}
                    className="flex justify-center rounded border border-black py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-[#0891B2] py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default setprompt;
