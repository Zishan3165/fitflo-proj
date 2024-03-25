import { useState } from 'react';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import MemberLeaderboardTable from '../../components/MemberLeaderboardTable.tsx';
import {
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import Chart from 'react-apexcharts';

const ECommerce = () => {
  const chartConfig: any = {
    type: 'bar',
    height: 240,
    series: [
      {
        name: '',
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#01B1CF'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#374151',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: [
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: '#374151',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  const [selectedOption, setSelectedOption] = useState('daily');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="container">
        {/* cards */}
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[5rem] xl:grid-cols-3 2xl:gap-[0rem] w-[1054px] lg:h-[100px] "></div> */}
        <div className="flex flex-col gap-[20px] xl:flex-row item-center">
          <CardOne />
          <CardTwo />
          <CardThree />
        </div>
      </div>

      {/* equipments */}
      <div className="shadow-default container bg-white dark:bg-boxdark p-[18px] lg:h-[340px] gap-[12px] rounded-lg mt-4">
        <h1 className="text-black dark:text-white font-semibold ml-3 text-[19px]">
          Most Popular<span className="font-normal text-[15px]">&nbsp;(Last 7 days)</span>
        </h1>
        <div className="grid grid-cols-1 gap-[26px] md:grid-cols-2 xl:grid-cols-2 bg-white dark:bg-boxdark lg:h-[281px]">
          <div className="h-[281px] gap-[12px] p-[18px]">
            <Tooltip
              content="We offer a huge range of free workout plans"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <p className="text-black dark:text-white font-bold justify-between text-[14px] cursor-pointer">
                Workouts
              </p>
            </Tooltip>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] mb-3 rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Strength & cardio
                <br />
                <small className="text-[#4B5563] text-[13px] font-normal">
                  137 completed
                </small>
              </p>
            </div>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] mb-3 rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Full body beginner
                <br />
                <small className="text-[#4B5563] text-[13px] font-normal">
                  31 completed
                </small>
              </p>
            </div>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Full body beginner
                <br />
                <small className="text-[#4B5563] text-[13px] font-normal">
                  30 completed
                </small>
              </p>
            </div>
          </div>

          <div className="h-[281px] gap-[12px] p-[18px]">
            <Tooltip
              content="Home gym equipments for men and Women"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <p className="text-black dark:text-white justify-between font-bold text-[14px] cursor-pointer">
                Equipment
              </p>
            </Tooltip>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] mb-3 rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Dumbbells <br />
                <small className="text-[#4B5563] text-[13px] font-normal">121 uses</small>
              </p>
              <br />
            </div>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] mb-3 rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Kettlebells
                <br />
                <small className="text-[#4B5563] text-[13px] font-normal">79 uses</small>
              </p>
            </div>
            <div className="flex items-center gap-[4px] w-full bg-[#F9FAFB] rounded-[9px] p-[8px]">
              <div className="flex-shrink-0">
                <img
                  width={'47px'}
                  height={'47px'}
                  src="data:image/jpeg;base64,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"
                  alt="Brand"
                  className="rounded-lg"
                />
              </div>
              <p className="text-black dark:text-white sm:block font-semibold text-[15px] px-[12px] dark:bg-black">
                Cable Pulley Machine(single)
                <br />
                <small className="text-[#4B5563] text-[13px] font-normal">51 uses</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 lg:h-[312px]">

        {/* signup chart */}
        <div className="shadow-default col-span-12 xl:col-span-12 rounded-[9px]">
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col lg:h-[41px] mt-[24px] ml-[23px] rounded-none md:flex-row md:items-center dark:bg-boxdark"
            >
              <div className="flex w-full justify-between rounded-lg gap-4 p-4">
                <div className="">
                  <Typography
                    variant="h6"
                    color="black"
                    className="dark:text-white font-semibold text-[19px]"
                  >
                    Member Sign-up
                  </Typography>
                  <small className="color-gray">
                    By {selectedOption === 'monthly' ? 'month' : selectedOption}
                  </small>
                </div>
                <div className="flex gap-[12px] mt-1">
                  <button
                    className={`rounded-[12px] h-[41px] text-[14px] text-sm font-normal text-${
                      selectedOption === 'monthly' ? 'white' : '#475569'
                    } ${
                      selectedOption === 'monthly'
                        ? 'bg-[#1F2937] p-2'
                        : 'hover:text-white hover:bg-[#1F2937] p-2'
                    }`}
                    onClick={() => handleOptionChange('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    style={{ padding: '10px, 15px, 11px, 15px' }}
                    className={`rounded-[12px] w-[63px] h-[41px] text-[14px] text-sm font-normal text-${
                      selectedOption === 'weekly' ? 'white' : '#475569'
                    } ${
                      selectedOption === 'weekly'
                        ? 'bg-[#1F2937] '
                        : 'hover:text-white hover:bg-[#1F2937]'
                    }`}
                    onClick={() => handleOptionChange('weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    style={{ padding: '10px, 15px, 11px, 15px' }}
                    className={`rounded-[12px] w-[63px] h-[41px] text-[14px] text-sm font-normal text-${
                      selectedOption === 'daily' ? 'white' : '#475569'
                    } ${
                      selectedOption === 'daily'
                        ? 'bg-[#1F2937]'
                        : 'hover:text-white hover:bg-[#1F2937]'
                    }`}
                    onClick={() => handleOptionChange('daily')}
                  >
                    Daily
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardBody className="px-2 pb-0 bg-white dark:bg-boxdark rounded-[9px]">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>

        {/* Member Leaderboard Table */}
        <div className="col-span-12 xl:col-span-12">
          <MemberLeaderboardTable />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
