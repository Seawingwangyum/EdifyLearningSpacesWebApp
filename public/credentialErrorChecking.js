/**
 * Checks if an entry is blank.
 * @param {String} entry -User input
 */
function checkForBlankEntry(entry) {
	for (i = 0; i < entry.length; i++) {
		if (entry[i] === '' || entry[i] === null) {
			return false
		}
	}
	return true
}
/**
 * Checks if the user input only uses the alphabet.
 * @param {String} entry -User input
 */
function checkForOnlyAlphabet(entry) {
	for (i = 0; i < entry.length; i++) {
		if (!/^[a-zA-Z]+$/.test(entry[i])) {
			return false
		}
	}
	return true
}

/**
 * Checks if the input is a valid email.
 * @param {String} email -Email
 */
function checkForEmailFormat(email) {
    if ((/^[^@]+@[a-z]+\.[a-z]{2,4}$/).test(email)) {
        return true
    } else {
        return false
    }
}

/**
 * Checks if the password has the required characters
 * @param {String} password -Password
 */
function checkForPasswordFormat(password) {
	if ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)) {
		return true
	} else {
		return false
	}
}

module.exports = {
	checkForPasswordFormat,
	checkForEmailFormat,
	checkForOnlyAlphabet,
	checkForBlankEntry
}