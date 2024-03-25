// import Breadcrumb from '../components/Breadcrumb';
// import TableOne from '../components/TableOne';
// import TableThree from '../components/TableThree';
import EquipmentTable from '../components/EquipmentTable';

const Tables = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Equipment" /> */}

      <div className="container bg-white p-[50px] dark:bg-boxdark">
        {/* <TableOne /> */}
        <EquipmentTable />
        {/* <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
