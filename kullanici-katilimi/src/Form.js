import "./App.css";
import { useState, useEffect } from "react";
import * as yup from "yup";

const formSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, "Name should contain at least 2 characters.")
		.required("Name is required."),
	surname: yup
		.string()
		.min(2, "Surname should contain at least 2 characters.")
		.required("Surname is required."),
	email: yup
		.string()
		.email()
		.required("Mail is required")
		.notOneOf(
			["waffle@syrup.com"],
			"This email has already been added before."
		),
	password: yup
		.string()
		.min(6, "Password should contain at least 6 characters.")
		.required("Password is required."),
	terms: yup.mixed().oneOf([true], "You must accept the terms of service."),
});

export default function Form(props) {
	const { member, onFormChange, onFormSubmit, resetForm } = props;

	const [errors, setErrors] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		terms: "",
	});

	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		formSchema.isValid(member).then((valid) => setIsValid(valid));
		formSchema
			.validate(member, { abortEarly: false })
			.then(() => {
				setErrors({});
			})
			.catch((err) => {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			});
	}, [member]);

	return (
		<>
			<form className="form">
				<label htmlFor="name">
					Name:
					<input
						placeholder="Name"
						name="name"
						value={member.name}
						onChange={onFormChange}
					/>
				</label>
				<label htmlFor="surname">
					Surname:
					<input
						placeholder="Surname"
						name="surname"
						value={member.surname}
						onChange={onFormChange}
					/>
				</label>
				<label htlmFor="email">
					Email:
					<input
						placeholder="Email"
						name="email"
						value={member.email}
						onChange={onFormChange}
					/>
				</label>
				<label htlmFor="password">
					Password:
					<input
						placeholder="Password"
						name="password"
						value={member.password}
						onChange={onFormChange}
						type="password"
					/>
				</label>
				<label htlmFor="terms">
					<input
						name="terms"
						checked={member.terms}
						onChange={onFormChange}
						type="checkbox"
					/>
					I agree to the terms of service.
				</label>
				<button onClick={onFormSubmit} disabled={!isValid}>
					Submit
				</button>
				<button onClick={resetForm}>Reset</button>
			</form>
		</>
	);
}
