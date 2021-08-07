const upperCaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const specialRegex = /[^a-z0-9 ]/i;
const digitRegex = /\d/;

export const MIN_PASSWORD_LENGTH = 6;

function hasUpperChar(pwd) {
	return upperCaseRegex.test(pwd);
}

function hasLowerChar(pwd) {
	return lowerCaseRegex.test(pwd);
}

function hasSpecialChar(pwd) {
	return specialRegex.test(pwd);
}

function hasDigitChar(pwd) {
	return digitRegex.test(pwd);
}

function hasMinLength(pwd) {
	return pwd.length >= MIN_PASSWORD_LENGTH;
}

const rules = {
	hasUpperChar,
	hasLowerChar,
	hasSpecialChar,
	hasDigitChar,
	hasMinLength,
};
export default rules;
