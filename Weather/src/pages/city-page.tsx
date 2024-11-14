import React from 'react'
import { useParams } from 'react-router-dom'
const city_page = () => {
    const {cityName}=useParams()
  return (
    <div>{`${cityName}`}</div>
  )
}

export default city_page