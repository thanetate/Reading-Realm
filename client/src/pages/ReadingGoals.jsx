import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "../Styles/ReadingGoals.css";
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";



export default function ReadingGoals() {
    const navigate = useNavigate();
    const [user] = useAtom(testAtom);
    const [goal, setGoal] = useState({
        _id: null,
        totalBooks: 0,
        startDate: "",
        endDate: "",
        booksRead: 0
    });

    const [loading, setLoading] = useState(true);
    const [newBooksRead, setNewBooksRead] = useState(0); // State for new books read input
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (user && user._id) {
            fetchReadingGoals(user._id);
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
                fetchReadingGoals(user._id);
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
                _id: user._id,
                booksRead: updatedBooksRead,
            });
    
            if (response.data.error) {
                toast.error(response.data.error);
            } else {

                console.log("updatedBooksRead:", updatedBooksRead, "goal.totalBooks:", goal.totalBooks); //debug
                if (updatedBooksRead >= goal.totalBooks) {
                    toast("Congratulations!\n You've completed your reading goal.",
                        {icon: '🎉',
                            style: {
                                textAlign: 'center'
                            },
                            
                        }
                    );

                    //doesn't work for some reason
                    console.log("showing confetti");
                    setShowConfetti(true); // Show confetti on completion of a reading goal
                    setTimeout(() => setShowConfetti(true), 50);
                    setTimeout(() => setShowConfetti(false), 3000);
                    
                } else {
                    toast.success(response.data.message);
                    setShowConfetti(true); // Show confetti on completing a book
                    setTimeout(() => setShowConfetti(false), 3000);
                }

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
             <Header/>
            <div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
           
            
        <div className="reading-goals-page">	
       



    {/* <h1>Your Reading Goals</h1>
    <button className="btn" onClick={goToDashboard}>
        Back to Dashboard
    </button> */}

    <div className="reading-goals-container">
        
        <div className="left-column">
            <div className="reading-goals-section">
                <h2>Set a New Goal</h2>
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
            </div>
        </div>

       
        <div className="right-column">
           
            <div className="reading-goals-section chart-section">
                <h2>Your Progress Chart</h2>
                <div className="chart">
                  
                    <div
                        className="bar"
                        style={{
                            height: `${goal.totalBooks > 0 ? (goal.booksRead / goal.totalBooks) * 100 : 0}%`,
                        }}
                    >
                        <span>{goal.booksRead}</span>
                    </div>

                   
                    <div
                        className="bar"
                        style={{
                            height: `${goal.totalBooks > 0 ? ((goal.totalBooks - goal.booksRead) / goal.totalBooks) * 100 : 0}%`,
                        }}
                    >
                        <span>{goal.totalBooks - goal.booksRead}</span>
                    </div>
                </div>
            </div>

            <div className="reading-goals-section current-goal-section">
                <h2>Your Current Goal</h2>
                {goal.totalBooks > 0 ? (
                    <>
                        <div className="goal-details">
                            <p>Total Books: {goal.totalBooks}</p>
                            <p>Start Date: {goal.startDate}</p>
                            <p>End Date: {goal.endDate}</p>
                            <p>Books Read: {goal.booksRead}</p>
                        </div>

                    <input
                        type="number"
                        placeholder="Books Read"
                        value={newBooksRead} // Bind the value to state
                        onChange={(e) => setNewBooksRead(e.target.value)} // Update state on change
                    />
                    {showConfetti && <Confetti />}
                        <button onClick={handleUpdateBooksRead}>Update Books Read</button>
                    </>
                ) : (
                    <p>No goals set yet.</p>
                )}
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${goal.totalBooks > 0 ? ((goal.totalBooks - goal.booksRead) / goal.totalBooks) * 100 : 0}%` }}>
                        <span>{goal.totalBooks - goal.booksRead}</span>
            </div>
                    <div className="bar" style={{ height: `${goal.totalBooks > 0 ? ((goal.totalBooks - goal.booksRead) / goal.totalBooks) * 100 : 0}%` }}>
                        <span>{goal.totalBooks - goal.booksRead}</span>
        </div>
    </div>
</div>
</div>
    
    );
}