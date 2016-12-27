import React from 'react';
import './index.css';

const Profile = () => {
  return (
    <div className="container Profile">

      <div className="Profile-avatar">
        <img src="https://dwmr9z5ou2pfk.cloudfront.net/master/8bba6ed53becc627246d68d7277ec66a.svg" />
      </div>

      <div className="row">
        <div className="card">
          <div className="card-content">

            <div className="input-field">
              <input type="text" placeholder="Name" />
            </div>

            <div className="center">
              <a className="waves-effect waves-light btn">Save</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;