import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Number of Tickets: {user.ticketsBought}</p>
      <p>Account Status: {user.isBlocked ? 'Blocked' : 'Active'}</p>
    </div>
  );
};

export default UserProfile;
