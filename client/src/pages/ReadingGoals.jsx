import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function ReadingGoals() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [goal, setGoal] = useState({
        _id: null,
        totalBooks: 0,
        startDate: "",
        endDate: "",
        booksRead: 0
    });

    const [loading, setLoading] = useState(true);
    const [newBooksRead, setNewBooksRead] = useState(0); // State for new books read input

    useEffect(() => {
        if (user && user.id) {
            fetchReadingGoals(user.id);
        } else {
            setLoading(true);
        }
    }, [user]);

    const fetchReadingGoals = async (userId) => {
        try {
            const response = await axios.get("http://localhost:8000/reading-goals/get", {
                params: { _id: userId }
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setGoal({
                    _id: userId,
                    totalBooks: response.data.readingGoal.totalBooks || 0,
                    startDate: response.data.readingGoal.startDate || "",
                    endDate: response.data.readingGoal.endDate || "",
                    booksRead: response.data.readingGoal.booksRead || 0
                });
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching reading goals:", error);
            toast.error("Failed to fetch reading goals");
            setLoading(false);
        }
    };

    const handleCreateGoal = async (e) => {
        e.preventDefault();
        const { _id, totalBooks, startDate, endDate } = goal;
        try {
            const response = await axios.post("http://localhost:8000/reading-goals/set", {
                _id,
                totalBooks,
                startDate,
                endDate,
                booksRead: 0, // Initialize books read to 0 when creating the goal
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success(response.data.message);
                fetchReadingGoals(user.id);
            }
        } catch (error) {
            console.error("Error setting new goal:", error);
            toast.error("Failed to set new goal");
        }
    };

    const handleUpdateBooksRead = async () => {
        const updatedBooksRead = goal.booksRead + parseInt(newBooksRead); // Calculate updated books read
        try {
            // Update the booksRead in the database
            const response = await axios.put("http://localhost:8000/reading-goals/update", {
                _id: user.id,
                booksRead: updatedBooksRead,
            });
    
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success(response.data.message);
                setGoal((prev) => ({
                    ...prev,
                    totalBooks: response.data.readingGoal.totalBooks, // Update totalBooks to reset to 0
                    startDate: response.data.readingGoal.startDate, // Reset startDate
                    endDate: response.data.readingGoal.endDate, // Reset endDate
                    booksRead: response.data.readingGoal.booksRead // Update the booksRead in local state
                }));
            }
    
            setNewBooksRead(0); // Reset the input field
        } catch (error) {
            console.error("Error updating books read:", error);
            toast.error("Failed to update books read");
        }
    };

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Your Reading Goals</h1>
            <button className="btn" onClick={goToDashboard}>Back to Dashboard</button>

            <form onSubmit={handleCreateGoal}>
                <input
                    type="number"
                    placeholder="Total Books"
                    value={goal.totalBooks || ""}
                    onChange={(e) => setGoal({ ...goal, totalBooks: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={goal.startDate || ""}
                    onChange={(e) => setGoal({ ...goal, startDate: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={goal.endDate || ""}
                    onChange={(e) => setGoal({ ...goal, endDate: e.target.value })}
                />
                <button type="submit">Set Goal</button>
            </form>

            {goal.totalBooks > 0 ? (
                <div>
                    <h2>Your Current Goal</h2>
                    <p>Total Books: {goal.totalBooks}</p>
                    <p>Start Date: {goal.startDate}</p>
                    <p>End Date: {goal.endDate}</p>
                    <p>Books Read: {goal.booksRead}</p>

                    <input
                        type="number"
                        placeholder="Books Read"
                        value={newBooksRead} // Bind the value to state
                        onChange={(e) => setNewBooksRead(e.target.value)} // Update state on change
                    />
                    <button onClick={handleUpdateBooksRead}>Update Books Read</button> {/* Calls function on click */}
                </div>
            ) : (
                <p>No goals set yet.</p>
            )}
            <div>
                <h2>Your Progress Chart</h2>
                <div className="chart">
                    <div className="bar" style={{ height: `${goal.totalBooks > 0 ? (goal.booksRead / goal.totalBooks) * 100 : 0}%` }}>
                        <span>{goal.booksRead}</span>
                    </div>
                    <div className="bar" style={{ height: `${goal.totalBooks > 0 ? ((goal.totalBooks - goal.booksRead) / goal.totalBooks) * 100 : 0}%` }}>
                        <span>{goal.totalBooks - goal.booksRead}</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .chart {
                    display: flex;
                    align-items: flex-end;
                    height: 300px; /* Adjust height as needed */
                    width: 100%;
                    border: 1px solid #ccc; /* Optional border */
                }
                .bar {
                    flex: 1; /* Each bar takes equal width */
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    color: white; /* Text color */
                    transition: height 0.5s; /* Smooth transition for height change */
                    position: relative; /* For absolute positioning of the label */
                }
                .bar span {
                    position: absolute; /* Absolute positioning for the label */
                    bottom: 100%; /* Position above the bar */
                    left: 50%; /* Center the label horizontally */
                    transform: translateX(-50%); /* Adjust for centering */
                    margin-bottom: 5px; /* Space between label and bar */
                }
                .bar:nth-child(1) {
                    background-color: rgba(75, 192, 192, 1); /* Books Read */
                }
                .bar:nth-child(2) {
                    background-color: rgba(255, 99, 132, 1); /* Books Left */
                }
            `}</style>
        </div>
    );
}