import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Home from './pages/Home';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import AddEvent from './pages/Events/AddEvent';
import EventList from './pages/Events/EventList';
import SubmissionList from './pages/Submissions/SubmissionList';
import ModeratorsList from './pages/Moderators/ModeratorsList';
import NewsList from './pages/News/NewsList';
import NewsAdd from './pages/News/NewsAdd';
import AddSubmissions from './pages/Submissions/AddSubmissions';
import SignUpModerator from './pages/Authentication/SignUpModerator';
import SignUpAuthor from './pages/Authentication/SignUpAuthor';
import Events from './pages/Events/Events';
import Event from './pages/Events/Event';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | SMU" />
              <Home />
            </>
          }
        />
        <Route
          path="/events/add-event"
          element={
            <>
              <PageTitle title="Add new event | SMU" />
              <AddEvent />
            </>
          }
        />
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | SMU" />
              <Events />
            </>
          }
        />
        <Route
          path="/events/:eventId"
          element={
            <>
              <PageTitle title="Events | SMU" />
              <Event />
            </>
          }
        />
        <Route
          path="/events/event-list"
          element={
            <>
              <PageTitle title="Add new event | SMU" />
              <EventList />
            </>
          }
        />
        <Route
          path="/submissions/submission-list"
          element={
            <>
              <PageTitle title="submission list| SMU" />
              <SubmissionList />
            </>
          }
        />
        <Route
          path="/submissions/add-submission"
          element={
            <>
              <PageTitle title="submission list| SMU" />
              <AddSubmissions />
            </>
          }
        />
        <Route
          path="/events/:eventId/add-submission"
          element={
            <>
              <PageTitle title="submission list| SMU" />
              <AddSubmissions />
            </>
          }
        />
        <Route
          path="/moderators/moderator-list"
          element={
            <>
              <PageTitle title="moderators list| SMU" />
              <ModeratorsList />
            </>
          }
        />
        <Route
          path="/news/news-list"
          element={
            <>
              <PageTitle title="news list| SMU" />
              <NewsList />
            </>
          }
        />
        <Route
          path="/news/add-news"
          element={
            <>
              <PageTitle title="add news| SMU" />
              <NewsAdd />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | SMU" />
              <Calendar />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | SMU" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | SMU" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | SMU" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | SMU" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | SMU" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | SMU" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | SMU" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | SMU" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | SMU" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup/mod"
          element={
            <>
              <PageTitle title="Signup | SMU" />
              <SignUpModerator />
            </>
          }
        />
        <Route
          path="/auth/signup/author"
          element={
            <>
              <PageTitle title="Signup | SMU" />
              <SignUpAuthor />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
