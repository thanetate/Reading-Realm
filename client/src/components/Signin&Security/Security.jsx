
function Security() {
  return (
    <div className="security">
          <button className="nav-container">
                    <div className="nav-img"><img src="/icons/security.svg" alt="profile icon" /></div>
                    <div className="nav-name">Sign in & Security</div>
          </button>
          <div className="spacer"></div>
          <div className="middle-username-title">User name</div>
          <input className="middle-username-box"></input>
          <div className="middle-username-title">Email</div>
          <div className="email-address">thanetate1@gmail.com</div>
          <div className="middle-username-title">Password</div>
          <div className="password-err">Password cannot be changed.</div>
          <div className="middle-cancel-btn">Cancel</div>
          <div className="middle-update-btn">Update</div>

    </div>
  )
}

export default Security;
