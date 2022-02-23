const fs = require('fs');
// This module requires the following parameters:
// _qtt = quantity of random numbers generated to populate the buttons in the game.
// _lvl = level of difficulty of the current operation.
// Example of use:
// generateOperations(10, 1); generate 10 random numbers with a level of difficulty of 2.
// So far we have only 10 levels of difficulty as an array (0 to 9).

function deliveryOperation(_qtt, _lvl) {
	let arr; //added to insert the number of entries
	const qtt = _qtt;
	const lvl = _lvl;
	if (lvl > 9) return;
	let response = [];
	let validResponse = false;

	arr = generateOperations(qtt, lvl);
	response = arr[0];

	while (validResponse === false) {
		if (response[1] > 0 && (response[1] % 2) === 0) {
			//===================DEBUGGING========================
			console.log('===========================');
			console.log(`Resposta tratada: ${response[1]}`);
			console.log('===========================');
			console.log(arr[2]);
			//===================DEBUGGING========================
			validResponse = true;
		} else {
			response = [];
			arr = generateOperations(qtt, lvl);
			response = arr[0];
		};
	};

	response.push([arr[1]]);
	return response;
};

function generateOperations(_qtt, _lvl) {
	// Need to remove the 'lvl object' from code (it's just a debug feature)
	const difficultyByLevel = JSON.parse(
		fs.readFileSync("data/all-lvl-config.json", "utf8")
	);

	const qtt = _qtt;
	const lvl = _lvl;
	const entries = [];
	const operands = difficultyByLevel[lvl].op;
	const numEntries = difficultyByLevel[lvl].qtt;
	const results = [];
	const args = {
		'firstOperator': [],
		'firstOperands': [],
		'secondOperator': [],
		'secondOperands': [],
		'thirdOperator': []
	};
	const response = [];
	let operations = [];
	let operation;


	//Populating the entries array
	while (entries.length < qtt) {
		entries.push(validateEntry(entries, 0));
	};

	//Populating the operators array
	populateOperators(difficultyByLevel[lvl].qtt);

	//Populating the results array
	getResult(args);

	//Populating the operations array
	getFinalOperations(difficultyByLevel[lvl].qtt, difficultyByLevel[lvl].questions);

	response.push(entries);
	response.push(results);

	//Function to get the complete math operations
	function getFinalOperations(_qtt) {
		const qtt = _qtt;
		operations = [];
		if (qtt === 2) {
			operations.push(
				`${args.firstOperator[0]} ${args.firstOperands[0]} ${args.secondOperator[0]} = ${results[0]}`
			);
		} else if (qtt === 3) {
			operations.push(
				`${args.firstOperator[0]} ${args.firstOperands[0]} ${args.secondOperator[0]} ${args.secondOperands[0]} ${args.thirdOperator[0]} = ${results[0]}`
			);
		};

		return operations;
	};

	//Function to populate the operators and operands arrays
	function populateOperators(_qtt) {
		const qtt = _qtt;
		let method = 'push';

		if (qtt === 2) {
			args.firstOperator.push(validateEntry(args.firstOperator, 1));
			args.secondOperator.push(validateEntry(args.secondOperator, 1, args.firstOperator));
			args.firstOperands.push(operands[rand(operands.length)]);
		} else if (qtt === 3) {
			args.firstOperator.push(validateEntry(args.firstOperator, 1));
			args.secondOperator.push(validateEntry(args.secondOperator, 1, args.firstOperator));
			args.thirdOperator.push(validateEntry(args.thirdOperator, 1, args.firstOperator, args.secondOperator));
			args.firstOperands.push(difficultyByLevel[lvl].op[0]);
			args.secondOperands.push(difficultyByLevel[lvl].op[1] || difficultyByLevel[lvl].op[0]);
		};

		return args;
	};

	// Need to ensure that there are no negative or fractional results in the response
	function getResult(_obj) {
		const obj = _obj;
		const fO = obj.firstOperator;
		const fOp = obj.firstOperands;
		const sO = obj.secondOperator;
		const sOp = obj.secondOperands;
		const tO = obj.thirdOperator;

		let tmpRes;
		let res;

		// Make the first operands and operators
		oneOperandRes();
		// If the operation has more than one operand, terminate the account and return the result
		nextOperandRes();

		// Function to get the result of the first operation
		function oneOperandRes() {
			if (fOp[0] === '+') {
				tmpRes = +(fO[0] + sO[0]);
			} else if (fOp[0] === '-') {
				tmpRes = +(fO[0] - sO[0]);
			} else if (fOp[0] === '*') {
				tmpRes = +(fO[0] * sO[0]);
			} else if (fOp[0] === '/') {
				// tmpRes = +(Math.floor(fO[0] / sO[0]));
				if (Number.isInteger(fO[0] / sO[0])) {
					tmpRes = +(fO[0] / sO[0]);
				} else {
					const rest = fO[0] % sO[0];
					fO[0] -= rest;
					obj.firstOperator = fO[0];
					tmpRes = +(fO[0] / sO[0]);
				}
			};

			return tmpRes;
		};

		// Function to get the result of the next operations
		function nextOperandRes() {
			if (sOp.length > 0) {
				if (sOp[0] === '+') {
					res = +(tmpRes + tO[0]);
				} else if (sOp[0] === '-') {
					res = +(tmpRes - tO[0]);
				} else if (sOp[0] === '*') {
					res = +(tmpRes * tO[0]);
				} else if (sOp[0] === '/') {
					res = +(tmpRes / tO[0]);
					if (Number.isInteger(tmpRes / tO[0])) {
						tmpRes = +(tmpRes / tO[0]);
					} else {
						tO[0] = fO[0];
						obj.thirdOperator = tO[0];
						tmpRes = +(tmpRes / tO[0]);
					}
				};

				results.push(res);
				return res;

			} else {
				results.push(tmpRes);
				return tmpRes;
			};
		};
	};

	//Function to generate a random number
	function rand(_min = 0, _max) {
		const min = _min;
		const max = _max;

		if (max)
			return Math.floor(Math.random() * (max - min + 1)) + min;
		else
			return Math.floor(Math.random() * min);
	};

	//Function to validate if the entry is already in the array
	function validateEntry(_arr, _type, _arr2 = [], _arr3 = []) {
		const arr = _arr;
		const arr2 = _arr2;
		const arr3 = _arr3;
		const type = _type;
		const max = difficultyByLevel[lvl].max;
		const min = difficultyByLevel[lvl].min;

		let value = (type === 0) ? Math.floor(Math.random() * (max - min) + min) : entries[rand(entries.length)];

		if (type === 0) {
			while (arr.includes(value)) {
				value = rand(min, max);
			};
		} else if (type === 1) {
			while (arr.includes(value) || arr2.includes(value) || arr3.includes(value)) {
				value = entries[rand(entries.length)];
			};
		};

		return value
	};

	operation = operations.pop();

	return [response, numEntries, operation];
};

module.exports = deliveryOperation;