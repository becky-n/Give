
import "./UserCard.css";
import clsx from 'clsx';

const UserCard = ({ user, group, timeLeft }) => {
  return (
    <div className="user-card">
      <div className="avatar">
        <img
          src={user.profilePic}
          alt={user.name}
          className={clsx('user-profile-pic', { 'withBackground': user.profilePic })}
        />
      </div>
      <div className="user-info">
        <p className="username">@{user.name}</p>
          <p className="group">
            posted to <span className="group-name">{group.name}</span>
          </p> 
      </div>
      <div className="time">
        <span>{timeLeft} left</span>
      </div>
    </div>
  );
};

export default UserCard;
