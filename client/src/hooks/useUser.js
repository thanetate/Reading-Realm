import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";

export function useUser() {
	const [user, setUser] = useAtom(testAtom);
	const [localStorageUser, setLocalStorageUser] = useState(null);

	//loads user data from local storage when component mounts
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setLocalStorageUser(parsedUser);
			if (!user) {
				setUser(parsedUser);
			}
		}
	}, [setUser, user]);

	//updates local storage wherever the user state changes
	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
	}, [user]);

	return { user, localStorageUser };
}
