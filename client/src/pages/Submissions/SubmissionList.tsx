import useLisrSections from '../../api/sections/useListSections';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
function SubmissionList() {

  const {data,isLoading,error,isSuccess}=useLisrSections()
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Submissions" />
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Work name
            </th>
            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Supervisor name
            </th>
            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              event
            </th>
            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Section
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isSuccess ? (
            data.data.map((item: any) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {/* Add your action buttons here */}
                    <button className="hover:text-primary">Action 1</button>
                    <button className="hover:text-primary">Action 2</button>
                    <button className="hover:text-primary">Action 3</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </DefaultLayout>
  );
}

export default SubmissionList;
