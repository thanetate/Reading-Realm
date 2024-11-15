import { atom } from "jotai";
import axios from "axios";

//atom to store in an object
export const testAtom = atom(null);

//atom to fetch the user data from the database
export const fetchTestAtom = atom(
	(get) => get(testAtom),
	async (get, set) => {
		try {
			const response = await axios.get("/profile");
			const userData = response.data;
			set(testAtom, userData);
			console.log("User Data from Atom:", userData);
		} catch (error) {
			console.error("Error fetching user", error);
		}
	}
);

//atom to update the user in the database
export const updateUserAtom = atom(
	null,
	async (get, set, { userId, newDetails }) => {
		try {
			console.log("Updating user:", userId, newDetails);
			const payload = { userId, newDetails };
			console.log("Payload being sent to server:", payload);

			const response = await axios.put("/updateUser", payload);
			console.log("Server response:", response);

			if (response.data.success) {
				set(testAtom, response.data.user);
				console.log("Updated user in DB:", response.data.user);
			} else {
				console.error("Failed to update user:", response.data.message);
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	}
);

//atom to log out the user
export const logoutUserAtom = atom(null, async (get, set) => {
	try {
		console.log("Logging out...");
		await axios.post("/logout");
		set(testAtom, null);
		localStorage.removeItem("user");
		console.log("User logged out successfully");
	} catch (error) {
		console.error("Error logging out:", error);
	}
});
