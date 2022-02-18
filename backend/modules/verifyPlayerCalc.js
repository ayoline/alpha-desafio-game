function verifyPlayerInput(playerString, result) {
    const parsedPlayerString = playerString.replaceAll("x", "*")
    console.log(parsedPlayerString)
    function validatePlayerInput(string) {
        const stringArr = string.split(" ");
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
        return playerResult == result;
    } else {
        return "Invalid String";
    }
}

module.exports = verifyPlayerInput;
