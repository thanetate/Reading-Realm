import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export function LoginWrapper(props) {
    const {user} = useContext(UserContext);

    if (!user) {
        return <Navigate to='/login'/>;
    }

    return props.children;
}

LoginWrapper.propTypes = {
    children: PropTypes.node.isRequired
}
