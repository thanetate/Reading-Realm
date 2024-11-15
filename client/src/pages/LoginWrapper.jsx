import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";
import { useEffect, useState } from "react";

export function LoginWrapper(props) {
	const [user] = useAtom(testAtom);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		//because we fetch local storage on mount
		if (user !== undefined) {
			setLoading(false); //user data is ready
		}
	}, [user]);

	if (loading) {
		return null;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return props.children;
}

LoginWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};
