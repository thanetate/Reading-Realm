import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";

export default function ReadingGoalsProfilePage() {
	// Navigate to redirect page
	const navigate = useNavigate();
	// Reading user data from atom
	const [user] = useAtom(testAtom);

	const [goal, setGoal] = useState({
		_id: null,
		totalBooks: 0,
		startDate: "",
		endDate: "",
		booksRead: 0,
	});

	useEffect(() => {
		if (user) {
			fetchReadingGoals(user.id);
		}
	}, [user]);

	const fetchReadingGoals = async (userId) => {
		try {
			const response = await axios.get(
				"http://localhost:8000/reading-goals/get",
				{
					params: { _id: userId },
				}
			);
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				setGoal({
					_id: userId,
					totalBooks: response.data.readingGoal.totalBooks || 0,
					startDate: response.data.readingGoal.startDate || "",
					endDate: response.data.readingGoal.endDate || "",
					booksRead: response.data.readingGoal.booksRead || 0,
				});
			}
		} catch (error) {
			console.error("Error fetching reading goals:", error);
			toast.error("Failed to fetch reading goals");
		}
	};

	const goToReadingGoals = () => {
		navigate("/dashboard/reading-goals");
	};

	return (
		<div>
			<div className="d-card-bottom-right">
				<div className="bottom-right-title">Reading Goals</div>
				<div className="d-readingGoal">
					<button className="btn" onClick={goToReadingGoals}>
						Reading Goals Page
					</button>
					<p>Total Books: {goal.totalBooks}</p>
					<p>Start Date: {goal.startDate}</p>
					<p>End Date: {goal.endDate}</p>
					<p>Books Read: {goal.booksRead}</p>
				</div>
			</div>
		</div>
	);
}
