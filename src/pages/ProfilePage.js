import React, { useEffect, useState } from 'react'

import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'

function ProfilePage() {
  return (
    <div>
      <TopAppBar pageTitle="Your profile" />
      <UserProfileCard profileEmail={'Driver@gmail.com'} />
    </div>
  )
}

export default ProfilePage
