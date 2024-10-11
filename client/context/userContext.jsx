/* 
The purpose of the userContext.jsx file is to create a React context 
for managing and sharing user state across different components in your application. 

basically so the whole app can receive this state
*/
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Correct import statement

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Retrieve user from local storage if available
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigate = useNavigate(); // Initialize useHistory

    useEffect(() => {
        if (!user) {
            axios
                .get("/profile")
                .then((response) => {
                    setUser(response.data);
                    // Save user to local storage
                    localStorage.setItem("user", JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [user]);

     // Function to log out the user
    const logout = () => {
    console.log("Logging out...");
    axios.post("/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/"); // Redirect to homepage
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};