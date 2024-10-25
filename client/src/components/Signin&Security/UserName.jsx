import PropTypes from "prop-types";

function UserName ({name, setName}) {

    //handle input changes
	const handleNameChange = (e) => setName(e.target.value);

    return (
        <>
            <div className="middle-username-title">User name</div>
			<input
				className="middle-username-box"
				value={name}
				onChange={handleNameChange}
			/>
        </>
    );
};  

UserName.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
};

export default UserName;