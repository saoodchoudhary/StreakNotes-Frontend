import React from 'react'
import StreakScore from '../components/homepage/StreakScore'
import WeekMonth from '../components/homepage/WeekMonth'
import AddFavicon from '../components/homepage/AddFavicon'

const HomePage = () => {
  return (
    <div>
      <StreakScore/>
      <WeekMonth/>
      <AddFavicon/>
    </div>
  )
}

export default HomePage
