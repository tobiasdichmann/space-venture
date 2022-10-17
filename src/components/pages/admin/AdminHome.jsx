import React, {useEffect} from 'react'

const AdminHome = () => {
  useEffect(() => {
    document.title = 'Home';
  });

  return (
    <div>
      <p>Welcome to ADMIN!</p>
    </div>
  )
}

export default AdminHome