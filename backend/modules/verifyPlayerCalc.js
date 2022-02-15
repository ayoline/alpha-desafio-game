function verifyPlayerInput (playerString, result) {
    
    function validatePlayerInput (string) {
        const stringArr = string.split(' ')
        let isValid = true;
        stringArr.forEach((currElement, index) => {
            if (index % 2 == 0) {
                if (!Number.isInteger(parseInt(currElement))) {
                    isValid = false
                };
            } else {
                if (!currElement == "+" ||! currElement == "-" ||! currElement == "*" ||! currElement == "/") {
                    isValid = false
                };
            }
        })
        return isValid
    }

    if (validatePlayerInput(playerString)) {
        const calculate = Function("return " + playerString)
        const playerResult = calculate()
        return playerResult == result
    } else {
        return "Invalid String"
    }
}

module.exports = verifyPlayerInput;
