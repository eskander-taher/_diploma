import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ModeratorsList = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Moderators" />
      <div>ModeratorsList</div>
    </DefaultLayout>
  );
}

export default ModeratorsList