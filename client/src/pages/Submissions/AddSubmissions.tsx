import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import useCreateSubmissions from '../../api/submissions/useCreateSubmissions';
import { Link, useParams } from 'react-router-dom';
import useLisrSections from '../../api/sections/useListSections';

const formFields = {
  workName: '',
  event: '',
  section: '',
  file: null,
  supervisorName: '',
  email: '',
  phoneNumber: '',
  password: '',
};
const AddSubmissions = () => {
  const { eventId } = useParams();
  const [data, setData] = useState({ ...formFields, event: eventId });
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  
  const {
    data: sections,
    isLoading: isSectionsLoading,
    error: sectionError,
  } = useLisrSections();
  const { mutate, isLoading, error } = useCreateSubmissions();
  
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        setData({
          ...formFields,
        });
      },
    });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Submission" />
      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Submission Form
          </h3>
        </div>
        <form className="pt-3 pb-3 pl-5 pr-5">
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Work name
            </label>
            <div className="relative">
              <input
                type="text"
                name="workName"
                value={data.workName}
                onChange={handleChange}
                placeholder="Enter your Work name"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Supervisor name
            </label>
            <div className="relative">
              <input
                type="text"
                name="supervisorName"
                value={data.supervisorName}
                onChange={handleChange}
                placeholder="Enter your Supervisor name"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Select Section
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                value={data.section}
                placeholder="Select Section"
                name="section"
                onChange={(e) => {
                  handleChange(e);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                {isLoading ? (
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    loading
                  </option>
                ) : (
                  <>
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select Section
                    </option>
                    {sections?.data?.map((section: any) => {
                      return (
                        <option
                          value={section.id}
                          className="text-body dark:text-bodydark"
                        >
                          {section.name}
                        </option>
                      );
                    })}
                  </>
                )}
                <option value="UK" className="text-body dark:text-bodydark">
                  UK
                </option>
              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Attach file
            </label>
            <input
              type="file"
              name="file"
              onChange={(e) => setData({ ...data, file: e.target.files[0] })}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-5">
            <input
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              value={isLoading ? 'Loading' : 'Submit'}
              className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
                isLoading
                  ? ' bg-slate-500'
                  : 'bg-primary cursor-pointer hover:bg-opacity-90'
              }`}
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddSubmissions;
