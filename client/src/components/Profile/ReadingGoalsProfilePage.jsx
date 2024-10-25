import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function ReadingGoalsProfilePage() {
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

    useEffect(() => {
        if (user) {
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

    const goToReadingGoals = () => {
        navigate("/dashboard/reading-goals");
    }

    return (
        <div>
            <button className="btn" onClick={goToReadingGoals}>Reading Goals Page</button>
            <p>Total Books: {goal.totalBooks}</p>
            <p>Start Date: {goal.startDate}</p>
            <p>End Date: {goal.endDate}</p>
            <p>Books Read: {goal.booksRead}</p>
        </div>
    );
}