import { useState, useEffect } from "react";
import Form from "./Form";
import Team from "./Team";
import axios from "axios";

function App() {
	const [member, setMember] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		terms: "",
	});

	const [team, setTeam] = useState([]);

	const handleFormChange = (event) => {
		event.preventDefault();
		const { name, value, checked } = event.target;
		setMember({ ...member, [event.target.name]: event.target.value });
		if (name === "terms") {
			setMember({ ...member, [name]: checked });
		} else {
			setMember({ ...member, [name]: value });
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		setTeam([...team, member]);
		axios
			.post("https://reqres.in/api/users", member)
			.then(function (response) {
				console.log(response);
				setTeam([...team, response.data]);
			})
			.catch(function (error) {
				console.log(error);
			});

		setMember({
			name: "",
			lastName: "",
			email: "",
			password: "",
			term: "",
		});
	};

	const resetForm = () => {
		setMember({
			name: "",
			surname: "",
			email: "",
			password: "",
			terms: "",
		});
	};

	return (
		<div className="App">
			<h2>Welcome to the Team!</h2>
			<Form
				onFormChange={handleFormChange}
				member={member}
				onFormSubmit={handleFormSubmit}
				resetForm={resetForm}
			/>

			<Team team={team} className="team" />
		</div>
	);
}

export default App;
