function checkForBlankEntry(entry) {
	for (i = 0; i < entry.length; i++) {
		if (entry[i] === '' || entry[i] === null) {
			return false
		}
	}
	return true
}

function checkForOnlyAlphabet(entry) {
	for (i = 0; i < entry.length; i++) {
		if (!/^[a-zA-Z]+$/.test(entry[i])) {
			return false
		}
	}
	return true
}

function checkForEmailFormat(email) {
    if ((/^[^@]+@[a-z]+\.[a-z]{2,4}$/).test(email)) {
        return true
    } else {
        return false
    }
}

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