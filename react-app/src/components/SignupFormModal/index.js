import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation checks
		const validationErrors = [];
		if (password !== confirmPassword) {
			validationErrors.push("Confirm Password field must be the same as the Password field");
		}
		if (password.length < 6) {
			validationErrors.push("Password must be at least 6 characters");
		}
		if (!emailIsValid(email)) {
			validationErrors.push("Invalid email format");
		}
		if (username.length < 5) {
			validationErrors.push("Username must be at least 5 characters");
		}
		if (firstname.length === 0 || lastname.length === 0) {
			validationErrors.push("First name and Last name are required");
		}

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
		} else {
			const data = await dispatch(signUp(username, email, password, firstname, lastname));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}
	};

	const emailIsValid = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	return (
		<div className="signup-form-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="form-field">
					<label>First Name</label>
					<input
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						required
					/>
				</div>
				<div className="form-field">
					<label>Last Name</label>
					<input
						type="text"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						required
					/>
				</div>
				<div className="form-field">
					<label>Email</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-field">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="form-field">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-field">
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-actions">
					<button type="submit" className="signup-button">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
