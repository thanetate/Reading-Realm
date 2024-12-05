//TODO: fix this warning - Could not Fast Refresh ("UserContext" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react-swc#consistent-components-exports
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { testAtom } from "../src/atoms/testAtom"; // Import testAtom

//create a UserContext with an empty object 
export const UserContext = createContext({});

//to provide user state to its children
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from local storage if available
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [, setTestAtom] = useAtom(testAtom); // Add this line to sync testAtom
    const navigate = useNavigate();

    // Sync testAtom whenever the user changes
    useEffect(() => {
        setTestAtom(user); // Sync testAtom with the user state
        localStorage.setItem("user", JSON.stringify(user));
    }, [user, setTestAtom]); // Add setTestAtom to the dependency array

    //function to logout user
    const logout = () => {
        console.log("Logging out...");
        //calls logout endpoint
        axios.post("/logout")
            .then(() => {
                setUser(null);
                //removes user from local storage
                localStorage.removeItem("user");
                //redirects to login page
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };
  
    //function to update the user
    const updateUser = (userId, newDetails) => {
        console.log("Updating user:", userId, newDetails);
        axios.put("/updateUser", { userId, newDetails })
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user);
                    console.log("User updated:", response.data.user);
                } else {
                    console.error("Failed to update user:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    };

    //return component with the functions as its value
    return (
        <UserContext.Provider value={{ user, setUser, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

//define prop types for the component
UserContextProvider.propTypes = {
    //children props should be required and a React node
    children: PropTypes.node.isRequired,
};
