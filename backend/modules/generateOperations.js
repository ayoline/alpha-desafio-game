function generateOperations(_qtt, _lvl) {
  // Need to remove the 'lvl object' from code (it's just a debug feature)
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
  const response = [];

  //Don't forget to remove this variable from code (it's just a debug feature)
	let level = {};

	//Populating the entries array
	while(entries.length < qtt) {
		entries.push(validateEntry(entries, 0));
	};

	//Populating the operators array
	populateOperators(difficultyByLevel[lvl].qtt);



  // console.log(args);

	//Populating the results array
  getResult(args);

	//Populating the operations array
	getFinalOperations(difficultyByLevel[lvl].qtt, difficultyByLevel[lvl].questions);

  //Populating the level object ------- Need to remove this from code (it's just a debug feature)
	level = {
		"operations": operations
	};

  // The bigger problem for now is handle with the erros in the 'getResult' function
  response.push(entries);
  response.push(results);

	//Function to get the complete math operations
	function getFinalOperations(_qtt) {
		const qtt = _qtt;
		if(qtt === 2) {
			operations.push(
        `q1: ${args.firstOperator[0]} ${args.firstOperands[0]} ${args.secondOperator[0]} = ${results[0]}`
      );
		} else if(qtt === 3) {
			operations.push(
        `q1: ${args.firstOperator[0]} ${args.firstOperands[0]} ${args.secondOperator[0]} ${args.secondOperands[0]} ${args.thirdOperator[0]} = ${results[0]}`
      );
		};

    return operations;
	};

	//Function to populate the operators and operands arrays
	function populateOperators(_qtt) {
		const qtt = _qtt;
    let method = 'push';

		if(qtt === 2) {
			args.firstOperator.push(validateEntry(args.firstOperator, 1));
			args.secondOperator.push(validateEntry(args.secondOperator, 1));
			args.firstOperands.push(operands[rand(operands.length)]);
		} else if(qtt === 3) {
			args.firstOperator.push(validateEntry(args.firstOperator, 1));
			args.secondOperator.push(validateEntry(args.secondOperator, 1));
			args.thirdOperator.push(validateEntry(args.thirdOperator, 1));
			args.firstOperands.push(difficultyByLevel[lvl].op[0]);
			args.secondOperands.push(difficultyByLevel[lvl].op[1] || difficultyByLevel[lvl].op[0]);
		};

    // getResult(args);

    return args;
	};

  // Need to ensure that there are no negative or fractional results in the response
  function getResult(_obj, _index = 0) {
    const obj = _obj;
    let i = _index;
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
    function oneOperandRes(_index = 0) {
      const i = _index;
      if(fOp[i] === '+') {
        tmpRes = +(fO[i] + sO[i]);
      } else if(fOp[i] === '-') {
        tmpRes = +(fO[i] - sO[i]);
      } else if (fOp[i] === '*') {
        tmpRes = +(fO[i] * sO[i]);
      } else if(fOp[i] === '/') {
        tmpRes = +(Math.floor(fO[i] / sO[i]));
      };
  
      return tmpRes;
    };
    // Function to get the result of the next operations
    function nextOperandRes(_obj, _index) {
      if(sOp.length > 0) {
        if(sOp[0] === '+') {
          res = +(tmpRes + tO[0]);
        } else if(sOp[0] === '-') {
          res = +(tmpRes - tO[0]);
        } else if (sOp[0] === '*') {
          res = +(tmpRes * tO[0]);
        } else if(sOp[0] === '/') {
          res = +(tmpRes / tO[0]);
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

		if(max) 
			return Math.floor(Math.random() * (max - min + 1)) + min;
		 else 
			return Math.floor(Math.random() * min);
	};

	//Function to validate if the entry is already in the array
	function validateEntry(_arr, _type) {
		const arr = _arr;
		const type = _type;
    const max = difficultyByLevel[lvl].max;
    const min = difficultyByLevel[lvl].min;

		let value = (type === 0) ? Math.floor(Math.random() * (max - min) + min) : entries[rand(entries.length)];

		if(type === 0) {
			while(arr.includes(value)) {
				value = rand(min,max);
			};
		} else if(type === 1) {
			while(arr.includes(value)) {
				value = entries[rand(entries.length)];
			};
		};

		return value
	}; 

  console.log(level);
	console.log(response);
	return level;	
};

// module.exports = generateOperations;

// for(let i = 0; i < 10; i++) {
  generateOperations(10,0);
  generateOperations(10,2);
// };