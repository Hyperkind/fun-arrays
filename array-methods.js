var dataset = require('./dataset.json');

// var bankBalances = dataset.bankBalances;

var bankBalances = dataset.bankBalances.map(function (balance) {
  return {
    amount: balance.amount,
    state: balance.state
  };
});

function roundTo(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter(greaterThan100k);

function greaterThan100k (element) {
  return element.amount > 100000;
}

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = bankBalances.map(roundToNearestDollar);

function roundToNearestDollar (element) {
  var roundedDollarAmt = element.rounded = Math.round(element.amount);
  // return element;
  return {
    amount: element.amount,
    state: element.state,
    rounded: roundedDollarAmt
  };
}

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = bankBalances.map(roundToNearestTenCents);

function roundToNearestTenCents (element) {
  var roundedCentsAmt = Math.round(parseFloat(element.amount) * 10) / 10;
  return {
    amount: roundedCentsAmt,
    state: element.state
  };

}

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = bankBalances.reduce(addAllAmounts).amount;

function addAllAmounts (previous, current) {
  var total = {amount: roundTo(parseFloat(previous.amount), 2) + roundTo(parseFloat(current.amount), 2)
  };
  return total;
}

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin WI
    Illinois IL
    Wyoming WY
    Ohio OH
    Georgia GA
    Delaware DE
  the result should be rounded to the nearest cent
 */
bankBalances = dataset.bankBalances.map(function (balance) {
  return {
    amount: balance.amount,
    state: balance.state
  };
});

var interestStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
function filterStates (element) {
  return interestStates.indexOf(element.state) > -1;
}

var sumOfInterests = bankBalances
  .filter(filterStates)
  .map(function(element) {
    return parseFloat(element.amount);
  })
  .reduce(includedInterest, 0);

function includedInterest (previous, element) {
  return parseFloat((previous + (element * 0.189)).toFixed(2));
}

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */


bankBalances = dataset.bankBalances.map(function (balance) {
  return {
    amount: balance.amount,
    state: balance.state
  };
});

var highInterestStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
function filterHighInterestStates (element) {
  return (highInterestStates.indexOf(element.state) < 0);
}


var sumOfHighInterests = bankBalances
  .filter(filterHighInterestStates)
  .map(function(element) {
    return parseFloat(element.amount);
  })
  .reduce(includedHighInterest, 0);

function includedHighInterest (previous, element) {

}



/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};


// function sumTotal(previous, current, index, array) {
//   var sum = { // need to turn sum into an object because parse float is called upon 'previous.amount', implying that it is an object, not a mere value.
//     amount: myRounder(parseFloat(previous.amount), 2) + myRounder(parseFloat(current.amount), 2)
//   };
//   return sum;
// }

// var sumOfBankBalances = dataset.bankBalances.reduce(sumTotal).amount;
