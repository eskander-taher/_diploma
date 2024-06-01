import { useState } from 'react';

import { Link } from 'react-router-dom';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import {
  MdClass,
  MdClose,
  MdError,
  MdGroup,
  MdOutlineDone,
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
} from 'react-icons/md';
import { LiaCitySolid } from 'react-icons/lia';

import { LiaUniversitySolid } from 'react-icons/lia';
import { IoBookOutline, IoPersonOutline } from 'react-icons/io5';
import { PiPassword } from 'react-icons/pi';
import useRegisterAuthor from '../../api/auth/useRegisterAuthor';

const formFields = {
  firstName: '',
  lastName: '',
  middleName: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  password: '',
  re_password: '',
  participantStatus: '',
  city: '',
  region: '',
  university: '',
  faculty: '',
  department: '',
  course: '',
  groupNumber: '',
};

const StatusEnum = [
  'young scientist',
  'specialist',
  'undergraduate',
  'masters',
  'graduate',
];

const AuthorSignupForm = () => {
  const [data, setData] = useState({ ...formFields });
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    active: false,
  });

  const { mutate, isLoading } = useRegisterAuthor();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: (data: any) => {
        setData({
          ...formFields,
        });
        console.log(data);
        setAlert({
          type: 'success',
          message: data.data.message,
          active: true,
        });
      },
      onError(error: any, variables, context) {
        setAlert({
          type: 'error',
          message: error.response.data.error,
          active: true,
        });
      },
    });
  };

  return (
    <form>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          First name
        </label>
        <div className="relative">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="Enter your First name"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <IoPersonOutline />
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Middle name
        </label>
        <div className="relative">
          <input
            type="text"
            name="middleName"
            value={data.middleName}
            onChange={handleChange}
            placeholder="Enter your Last name"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <IoPersonOutline />
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Last name
        </label>
        <div className="relative">
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Enter your Last name"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <IoPersonOutline />
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <MdOutlineEmail />
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <PiPassword />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Re-type Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="re_password"
            value={data.re_password}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <PiPassword />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Phone number
        </label>
        <div className="relative">
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <MdOutlinePhoneEnabled />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          City
        </label>
        <div className="relative">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="Enter your text"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <LiaCitySolid />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Region
        </label>
        <div className="relative">
          <input
            type="text"
            name="region"
            value={data.region}
            onChange={handleChange}
            placeholder="Enter your region"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <LiaCitySolid />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Birthday
        </label>
        <div className="relative">
          <DatePickerOne />
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          University
        </label>
        <div className="relative">
          <input
            type="text"
            name="university"
            value={data.university}
            onChange={handleChange}
            placeholder="Enter your university"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <LiaUniversitySolid />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Faculty
        </label>
        <div className="relative">
          <input
            type="text"
            name="faculty"
            value={data.faculty}
            onChange={handleChange}
            placeholder="Enter your faculty"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <IoBookOutline />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Department
        </label>
        <div className="relative">
          <input
            type="text"
            name="department"
            value={data.department}
            onChange={handleChange}
            placeholder="Enter your department"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <IoBookOutline />
          </span>
        </div>
      </div>
      <div>
        <label className="mb-3 block text-black dark:text-white">
          Select Status
        </label>

        <div className="relative z-20 bg-white dark:bg-form-input">
          <select
            value={data.participantStatus}
            name="participantStatus"
            onChange={handleChange}
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
              data.participantStatus ? 'text-black dark:text-white' : ''
            }`}
          >
            <option value="" disabled className="text-body dark:text-bodydark">
              Select Status
            </option>
            {StatusEnum.map((status) => {
              return (
                <option value={status} className="text-body dark:text-bodydark">
                  {status}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Course
        </label>
        <div className="relative">
          <input
            type="text"
            name="course"
            value={data.course}
            onChange={handleChange}
            placeholder="Enter your course"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <MdClass />
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Group number
        </label>
        <div className="relative">
          <input
            type="text"
            name="groupNumber"
            value={data.groupNumber}
            onChange={handleChange}
            placeholder="Enter your group number"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <span className="absolute right-4 top-4">
            <MdGroup />
          </span>
        </div>
      </div>
      <div className="mb-5">
        <input
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          value={isLoading ? 'Loading' : 'Create account'}
          className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
            isLoading
              ? ' bg-slate-500'
              : 'bg-primary cursor-pointer hover:bg-opacity-90'
          }`}
        />
      </div>

      {!alert.active ? (
        <></>
      ) : alert.type == 'error' ? (
        <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
            <MdError />
          </div>
          <div className="w-full">
            <div className="flex justify-between align-middle">
              <h5 className="mb-3 font-semibold text-[#B45454]">Login Error</h5>
              <MdClose
                className="text-[#CD5D5D] cursor-pointer hover:scale-110"
                size={20}
                onClick={() =>
                  setAlert({
                    type: '',
                    message: '',
                    active: false,
                  })
                }
              />
            </div>
            <ul>
              <li className="leading-relaxed text-[#CD5D5D]">
                All fields are required
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
            <MdOutlineDone />
          </div>
          <div className="w-full">
            <div className="flex justify-between align-middle">
              <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                Success
              </h5>
              <MdClose
                className="dark:text-[#34D399]  cursor-pointer hover:scale-110"
                size={20}
                onClick={() =>
                  setAlert({
                    type: '',
                    message: '',
                    active: false,
                  })
                }
              />
            </div>
            <p className="text-base leading-relaxed text-body">
              {alert.message}
            </p>
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <p>
          Already have an account?{' '}
          <Link to="/auth/signin" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default AuthorSignupForm;
