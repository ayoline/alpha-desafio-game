function verifyPlayerInput(_playerString, _result) {
    const parsedPlayerString = _playerString.replaceAll("x", "*");

    function validatePlayerInput(_string) {
        const stringArr = _string.split(" ");
        let isValid = true;

        stringArr.forEach((currElement, index) => {
            if (index % 2 == 0) {
                if (!Number.isInteger(parseInt(currElement))) {
                    isValid = false;
                }
            } else {
                if (
                    !currElement == "+" ||
                    !currElement == "-" ||
                    !currElement == "*" ||
                    !currElement == "/"
                ) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    if (validatePlayerInput(parsedPlayerString)) {
        const calculate = Function("return " + parsedPlayerString);
        const playerResult = calculate();

        return playerResult == _result;
    } else {
        return "Invalid String";
    }
}

module.exports = verifyPlayerInput;