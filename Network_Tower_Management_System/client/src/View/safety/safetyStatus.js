import React from 'react'
import { useLocation } from 'react-router-dom';

const SafetyStatus = () => {
    const location = useLocation();

  const passValue = location.state.passValue;
  console.log(passValue);
  return (
    <div>safetyStatus</div>
  )
}

export default SafetyStatus