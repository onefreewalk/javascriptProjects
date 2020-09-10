// array.prototype.sort()

// The sort() method sorts the elements of an array in place and returns the stored array.
// The default sort order is ascending, built upon converting the elements into strings, then 
// comparing their sequences of UTF-16 code units values.

    // const arr = [1, 2, 110, 3, 4, 330];

    // const sortedArray = arr.sort(function(a, b) {
    //   return a - b;
    // });

    // console.log("This is the sort output:");
    // console.log(sortedArray);

// array.prototype.filter()
// filter() method created a new array with all elements that pass the test implemented by the provided function.

    // const arr = [20, 23, 25, 30, 21, 50, 60]

    // const under30 = arr.filter(function(item) {
    //   return item < 30;
    // });

    // console.log("This is the filter output:");

    // console.log(under30);

// array.prototype.reduce()
// reduce() method executes a reducer function(that you provide) on each element to the array.
// returning a single output value.

    //   const arr = [1,2,3,4,5,6,7];

    //   const total = arr.reduce((acc, nextNum) => (acc + nextNum), 0);

    //   console.log(total);