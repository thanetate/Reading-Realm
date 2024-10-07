/* 
The purpose of the userContext.jsx file is to create a React context 
for managing and sharing user state across different components in your application. 

basically so the whole app can receive this state
*/
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!user) {
			axios
				.get("/profile")
				.then((response) => {
					setUser(response.data);
				})
				.catch((error) => {
					console.error("Error fetching profile:", error);
				});
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

UserContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
