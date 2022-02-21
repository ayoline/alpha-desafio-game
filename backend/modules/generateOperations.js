function generateOperations(_qtt, _lvl) {
	console.time();

	const difficultyByLevel = [
		{
			op: '+',
			qtt: 2,
			min: 2,
			max: 20,
			questions: 3
		},
		{
			op: '+',
			qtt: 3,
			min: 2,
			max: 30,
			questions: 3
		},
		{
			op: '-',
			qtt: 2,
			min: 2,
			max: 20,
			questions: 3
		},
		{
			op: '-',
			qtt: 3,
			min: 2,
			max: 20,
			questions: 3
		},
		{
			op: ['+', '-'],
			qtt: 2,
			min: 2,
			max: 30,
			questions: 3
		},
		{
			op: ['+', '-'],
			qtt: 3,
			min: 2,
			max: 100,
			questions: 3
		},
		{
			op: '*',
			qtt: 2,
			min: 2,
			max: 10,
			questions: 3
		},
		{
			op: '/',
			qtt: 2,
			min: 2,
			max: 10,
			questions: 3
		},
		{
			op: ['*', '/'],
			qtt: 2,
			min: 2,
			max: 30,
			questions: 3
		},
		{
			op: ['*', '/'],
			qtt: 3,
			min: 2,
			max: 50,
			questions: 3
		}
	];
	const qtt = _qtt;
	const lvl = _lvl;
	const entries = [];
	const operands = difficultyByLevel[lvl].op;
	const operations = [];
	const results = [];
  const args = {
    'firstOperator': [],
    'firstOperands': [],
    'secondOperator': [],
    'secondOperands': [],
    'thirdOperator': []
  };

	let level = {};

	//Populating the entries array
	console.timeLog();
	while(entries.length < qtt) {
		entries.push(validateEntry(entries, 0));
	};
	console.log(entries);
	console.timeLog();

	//Populating the operators array
	console.timeLog();
	populateOperators(difficultyByLevel[lvl].qtt);
  
	console.log(args.firstOperator);
	console.log(args.secondOperator);
	console.log(args.thirdOperator);
  console.log(args);
	console.timeLog();

	//Populating the results array
	console.timeLog();
	getResult(args/*firstOperator,firstOperands,secondOperator,secondOperands,thirdOperator*/);
	console.timeLog();

	//Populating the operations array
	console.timeLog();
	getFinalOperations(difficultyByLevel[lvl].qtt, difficultyByLevel[lvl].questions);
	console.timeLog();

  //Populating the level object
	level = {
		"operations": operations
	};

	//Function to get the complete math operations
	function getFinalOperations(_qtt, _qts) {
		const qtt = _qtt;
		const qts = _qts;

		if(qtt === 2) {
			for(let i = 0; i < qts; i++) {
				operations.push(
					`q0${i+1}: ${args.firstOperator[i]} ${args.firstOperands[i]} ${args.secondOperator[i]} = ${results[i]}`
				);
			};
		} else if(qtt === 3) {
			for(let i = 0; i < qtt; i++) {
				operations.push(
					`q0${i+1}: ${args.firstOperator[i]} ${args.firstOperands[i]} ${args.secondOperator[i]} ${args.secondOperands[i]} ${args.thirdOperator[i]} = ${results[i]}`
				);
			};
		};
	};

	//Function to populate the operators and operands arrays
	function populateOperators(_qtt) {
		const qtt = _qtt;

		if(qtt === 2) {
			while(args.firstOperator.length < 3 && args.secondOperator.length < 3) {
				args.firstOperator.push(validateEntry(args.firstOperator, 1));
				args.secondOperator.push(validateEntry(args.secondOperator, 1));
				args.firstOperands.push(operands[rand(operands.length)]);
			};
		} else if(qtt === 3) {
			while(args.firstOperator.length < 3 && args.secondOperator.length < 3) {
				args.firstOperator.push(validateEntry(args.firstOperator, 1));
				args.secondOperator.push(validateEntry(args.secondOperator, 1));
				args.thirdOperator.push(validateEntry(args.thirdOperator, 1));
				args.firstOperands.push(difficultyByLevel[lvl].op[0]);
				args.secondOperands.push(difficultyByLevel[lvl].op[1] || difficultyByLevel[lvl].op[0]);
			};
		};
	};

	//Function to get the result of the operation
	function getResult(_obj) {
    const obj = _obj;
		const fO = obj.firstOperator;
		const fOp = obj.firstOperands;
		const sO = obj.secondOperator;
		const sOp = obj.secondOperands;
		const tO = obj.thirdOperator;

		let tmpRes;
		let res;

    console.log(sOp.length);

		if(sOp.length > 0) {
			for(let i = 0; i <= fO.length; i++) {
				if(fOp[i] === '+') {
					tmpRes = +(fO[i] + sO[i]);
					if(sOp[i] === '+') {
						res = +(tmpRes + tO[i]);
					};
					results.push(res);
					tmpRes = '';
					res = '';
				} else if(fOp[i] === '-') {
					tmpRes = +(fO[i] - sO[i]);
					if(sOp[i] === '-') {
						res = +(tmpRes - tO[i]);
					};
					results.push(res);
					tmpRes = '';
					res = '';
				} else if (fOp[i] === '*') {
					tmpRes = +(fO[i] * sO[i]);
					if(sOp[i] === '*') {
						res = +(tmpRes * tO[i]);
					};
					results.push(res);
					tmpRes = '';
					res = '';
				} else if(fOp[i] === '/') {
					tmpRes = +(Math.floor(fO[i] / sO[i]));
					if(sOp[i] === '/') {
						res = +(Math.floor(tmpRes / tO[i]));
					};
					results.push(res);
					tmpRes = '';
					res = '';
				};
			};
		} else {
			for(let i = 0; i <= fO.length; i++) {
				if(fOp[i] === '+') {
					res = +(fO[i] + sO[i]);
					results.push(res);
					res = '';
				} else if(fOp[i] === '-') {
					res = +(fO[i] - sO[i]);
					results.push(res);
					res = '';
				} else if (fOp[i] === '*') {
					res = +(fO[i] * sO[i]);
					results.push(res);
					res = '';
				} else if(fOp[i] === '/') {
					res = +(Math.floor(fO[i] / sO[i]));
					results.push(res);
					res = '';
				};
			};
		}
	};

	//Function to generate a random number
	function rand(_min = 0, _max) {
		const min = _min;
		const max = _max;

		if(max) 
			return Math.floor(Math.random() * (max - min + 1)) + min;
		 else 
			return Math.floor(Math.random() * min);
	};

	//Function to validate if the entry is already in the array
	function validateEntry(_arr, _type) {
		const arr = _arr;
		const type = _type;

		let value = (type === 0) ? Math.floor(Math.random() * (difficultyByLevel[lvl].max - difficultyByLevel[lvl].min) + difficultyByLevel[lvl].min) : entries[rand(entries.length)];

		if(type === 0) {
			while(arr.includes(value)) {
				value = rand();
			};
		} else if(type === 1) {
			while(arr.includes(value)) {
				value = entries[rand(entries.length)];
			};
		};

		return value
	};

	console.log(level);
	console.timeEnd();

	return level;	
};

//module.exports = auxiliarFunction;

generateOperations(10,1);