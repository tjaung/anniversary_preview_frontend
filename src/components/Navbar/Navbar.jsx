import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./navbar.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  console.log(JSON.stringify(user));

  return (
    <header>
      <div className="container">
        <nav>
          {!user && <div>{/* <Link to="/login"></Link> */}</div>}

          {user && (
            <div>
              <span>Hello {user.user}!</span>
            </div>
          )}
          <button className="btn" onClick={handleClick}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
