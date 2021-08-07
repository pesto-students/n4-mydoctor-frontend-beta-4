import PwdRules, { MIN_PASSWORD_LENGTH } from "./passwordRules.js";
import {
	Grid,
	Paper,
	TextField,
	Typography,
	Link,
	Button,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
	RadioButtonUnchecked,
	CheckCircleOutline,
	HighlightOff,
} from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TabPanel, Alert } from "@material-ui/lab";
import { signup } from "../state/user/slice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import JSONResult from "../translations/en/i18n.json";
import Login from "./Login";
import Store from "../state/index.js";
import { isFunction } from "lodash";

const Signup = (props) => {
	const [loginPage, setLoginPage] = React.useState([]);
	const [signUp, setSignup] = React.useState(JSONResult.signup);

	const [fullName, setFullName] = React.useState("");
	const [mobile, setMobile] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confPassword, setConfPassword] = React.useState("");

	const [errFullName, setErrFullName] = React.useState(null);
	const [errMobile, setErrMobile] = React.useState(null);
	const [errEmail, setErrEmail] = React.useState("");
	const [errPassword, setErrPassword] = React.useState(null);

	const [showPwdRules, setShowPwdRules] = React.useState(false);

	const pwdRules = [
		{
			ruleFn: PwdRules.hasLowerChar,
			description: JSONResult.loginPage["pwd_rule_lower"],
		},
		{
			ruleFn: PwdRules.hasUpperChar,
			description: JSONResult.loginPage["pwd_rule_upper"],
		},
		{
			ruleFn: PwdRules.hasSpecialChar,
			description: JSONResult.loginPage["pwd_rule_special"],
		},
		{
			ruleFn: PwdRules.hasDigitChar,
			description: JSONResult.loginPage["pwd_rule_digit"],
		},
		{
			ruleFn: PwdRules.hasMinLength,
			description: JSONResult.loginPage["pwd_rule_length"].replace(
				"%d",
				MIN_PASSWORD_LENGTH
			),
		},
		{
			ruleFn: (pwd, confPwd) => pwd === confPwd,
			description: JSONResult.loginPage["pwd_rule_match"],
		},
	];
	const [ruleFlags, setRuleFlags] = useState(pwdRules.map((v) => null));

	function handleFieldChange(targetField, setFunction) {
		setFunction(targetField.value);
	}

	function setFieldError(value, setErrFunction, validationFunction) {
		setErrFunction(!validationFunction(value));
	}

	useEffect(() => {
		setLoginPage(JSONResult.loginPage);
	}, []);
	useEffect(() => {
		setSignup(JSONResult.signup);
	}, []);
	const dispatch = useDispatch();
	const color = { color: "white" };

	function getSignUpDetails() {
		const nameParts = fullName.trim().split(" ");
		const firstName = nameParts[0].trim();
		let lastName = "";
		if (nameParts.length > 1) {
			lastName = nameParts.slice(1).join(" ").trim();
		}
		return {
			firstName,
			lastName,
			email,
			password,
			contactNumber: mobile,
			gender: "Male",
		};
	}

	function updateRules(...args) {
		const newRuleFlags = [];
		for (const rule of pwdRules) {
			newRuleFlags.push(rule.ruleFn(...args));
		}
		setRuleFlags(newRuleFlags);
	}

	function validFullName(fullName) {
		return (
			fullName.trim() !== "" &&
			/^[a-z0-9 ]{2,}$/i.test(fullName) && // Only allowed characters are digits, letters and spaces.
			!/^(\d| )+$/.test(fullName) // Should not contain only digits and spaces though.
		);
	}
	function validMobile(mobile) {
		return /^\d{10}$/.test(mobile);
	}
	function validEmail(email) {
		return /^[a-z0-9\._]{3,}@(([a-z0-9\._]){3,}\.)+[a-z]{2,}$/i.test(email);
	}
	function validPassword(password) {
		return password.trim() !== "";
	}

	function enableRegisterButton() {
		return (
			validFullName(fullName) &&
			validMobile(mobile) &&
			validEmail(email) &&
			validPassword(password) &&
			validPasswordRules()
		);
	}

	function validPasswordRules() {
		return ruleFlags.reduce((prev, curr) => prev && curr, true);
	}

	function doSignup() {
		setError(null);
		if (!!props.onClear && isFunction(props.onClear)) {
			props.onClear();
		}
		dispatch(signup(getSignUpDetails()));
	}

	const [error, setError] = useState(null);

	Store.subscribe(() => {
		if (!!!Store.getState().user.loading && Store.getState().user.error) {
			const error = Store.getState().user.error;
			setError(error.data ?? JSONResult.loginPage["signup_fail"]);
			if (!!props.onClear && isFunction(props.onClear)) {
				props.onClear();
			}
		} else if (!!!Store.getState().user.loading) {
			setError(null);
			if (!!props.onSuccess && isFunction(props.onSuccess)) {
				props.onSuccess(JSONResult.loginPage["signup_success"]);
			}
		}
	});

	return (
		<Grid>
			{error && <Alert severity="error">{error}</Alert>}
			<Paper elevation={10} className="paperStyle" elevation={0}>
				<form>
					<label key={signUp[0].field_id} className="label">
						{signUp[0].field_label}
						{signUp[0].field_mandatory === "yes" ? "*" : ""}
					</label>
					<TextField
						id="outlined-basic"
						variant="outlined"
						required
						style={{ marginBottom: 0.5 + "em" }}
						error={errFullName === true}
						helperText={
							errFullName === true
								? loginPage["invalid_fullname"]
								: ""
						}
						fullWidth
						name={signUp[0].field_label}
						placeholder={signUp[0].field_placeholder}
						type={signUp[0].field_type}
						onInput={(e) => {
							handleFieldChange(e.target, setFullName);
						}}
						onBlur={(e) => {
							setFieldError(
								e.target.value,
								setErrFullName,
								validFullName
							);
						}}
						value={fullName}
					/>
					<label key={signUp[1].field_id} className="label">
						{signUp[1].field_label}
						{signUp[1].field_mandatory === "yes" ? "*" : ""}
					</label>
					<TextField
						id="outlined-basic"
						variant="outlined"
						required
						style={{ marginBottom: 0.5 + "em" }}
						error={errMobile === true}
						helperText={
							errMobile === true
								? loginPage["invalid_mobile"]
								: ""
						}
						fullWidth
						name={signUp[1].field_label}
						placeholder={signUp[1].field_placeholder}
						type={signUp[1].field_type}
						onInput={(e) => {
							handleFieldChange(e.target, setMobile);
						}}
						onBlur={(e) => {
							setFieldError(
								e.target.value,
								setErrMobile,
								validMobile
							);
						}}
						value={mobile}
					/>
					<label key={signUp[2].field_id} className="label">
						{signUp[2].field_label}
						{signUp[2].field_mandatory === "yes" ? "*" : ""}
					</label>
					<TextField
						id="outlined-basic"
						variant="outlined"
						required
						style={{ marginBottom: 0.5 + "em" }}
						error={errEmail === true}
						helperText={
							errEmail === true ? loginPage["invalid_email"] : ""
						}
						fullWidth
						name={signUp[2].field_label}
						placeholder={signUp[2].field_placeholder}
						type={signUp[2].field_type}
						onInput={(e) => {
							handleFieldChange(e.target, setEmail);
						}}
						onBlur={(e) => {
							setFieldError(
								e.target.value,
								setErrEmail,
								validEmail
							);
						}}
						value={email}
					/>
					<label key={signUp[3].field_id} className="label">
						{signUp[3].field_label}
						{signUp[3].field_mandatory === "yes" ? "*" : ""}
					</label>
					<TextField
						id="outlined-basic"
						variant="outlined"
						required
						style={{ marginBottom: 0.5 + "em" }}
						error={errPassword === true}
						helperText={
							errPassword === true
								? loginPage["empty_password"]
								: ""
						}
						fullWidth
						name={signUp[3].field_label}
						placeholder={signUp[3].field_placeholder}
						type={signUp[3].field_type}
						onInput={(e) => {
							updateRules(e.target.value, confPassword);
							handleFieldChange(e.target, setPassword);
						}}
						onFocus={(e) => {
							if (!showPwdRules) {
								setShowPwdRules(true);
							}
						}}
						onBlur={(e) => {
							setFieldError(
								e.target.value,
								setErrPassword,
								validPassword
							);
						}}
						value={password}
					/>
					<label key={signUp[4].field_id} className="label">
						{signUp[4].field_label}
						{signUp[4].field_mandatory === "yes" ? "*" : ""}
					</label>
					<TextField
						id="outlined-basic"
						variant="outlined"
						required
						style={{ marginBottom: 0.5 + "em" }}
						fullWidth
						name={signUp[4].field_label}
						placeholder={signUp[4].field_placeholder}
						type={signUp[4].field_type}
						onInput={(e) => {
							handleFieldChange(e.target, setConfPassword);
							updateRules(password, e.target.value);
						}}
						value={confPassword}
					/>
					{showPwdRules && pwdRules.map((rule, idx) => {
						return (
							<Typography
								component="div"
								style={{
									display: "flex",
									marginTop: 0.25 + "em",
								}}
							>
								{ruleFlags[idx] === null && (
									<RadioButtonUnchecked
										fontSize="small"
										color="primary"
									/>
								)}
								{ruleFlags[idx] === true && (
									<CheckCircleOutline
										fontSize="small"
										style={{ color: green[500] }}
									/>
								)}
								{ruleFlags[idx] === false && (
									<HighlightOff
										color="error"
										fontSize="small"
									/>
								)}
								<label>
									<small>{rule.description}</small>
								</label>
								<br />
							</Typography>
						);
					})}
					<br />
					<Button
						fullWidth
						color="primary"
						variant="contained"
						style={color}
						onClick={() => {
							doSignup();
						}}
						disabled={!enableRegisterButton()}
					>
						{loginPage.register}
					</Button>
				</form>
				<br />
				<Typography>
					{loginPage.already_have_an_account}
					<Link href="/login" className="signin" onClick={(e) => { e.preventDefault(); if (!!props.onSignIn) props.onSignIn(); }}>
						{loginPage.signIn}
					</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default Signup;
