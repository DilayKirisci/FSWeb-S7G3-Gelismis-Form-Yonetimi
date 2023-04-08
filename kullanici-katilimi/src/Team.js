import "./App.css";
export default function Team(props) {
	const { team, editMember, removeMember, errors } = props;
	return (
		<>
			<h3 style={{ textAlign: "center", marginTop: "70px" }}>Team Members </h3>
			{team.map((team) => {
				return (
					<>
						<ul className="list">
							<button onClick={editMember}>+</button>
							<li>name: {team.name}</li>
							<li>surname: {team.surname}</li>
							<li>email: {team.email}</li>
							<button onClick={removeMember}>-</button>
						</ul>
					</>
				);
			})}
		</>
	);
}
