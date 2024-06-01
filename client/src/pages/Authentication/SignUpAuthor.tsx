import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import DefaultLayout from '../../layout/DefaultLayout';
import AuthIllestration from '../../components/AuthIllestration';
import AuthorSignupForm from './AuthorSignupForm';

const SignUpAuthor: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                {/* <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" /> */}
                <h1 className='text-2xl font-bold'>Young Scientists Counsil</h1>
              </Link>
              <p className="2xl:px-20">
                Start your Science Researching Journy.
              </p>

              <span className="mt-15 inline-block">
                <AuthIllestration width="350" height="350" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up as an Author
              </h2>

              <AuthorSignupForm />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUpAuthor;
