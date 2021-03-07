/** @format */

/*
To use:
Simply input an 'unordered list' and your 'target integer' into the 'binarySearch' function.
*/

const merge = (left, right) => {
  let orderedArray = [];

  while (left.length && right.length) {
    if (left[0].integer < right[0].integer) {
      orderedArray.push(left.shift());
    } else {
      orderedArray.push(right.shift());
    }
  }

  return [...orderedArray, ...left, ...right];
};

const mergeSort = (array) => {
  if (array.length < 2) {
    return array;
  }

  const mid = array.length / 2;
  const arrayOne = mergeSort(array.splice(0, mid));
  const arrayTwo = mergeSort(array);
  return merge(arrayOne, arrayTwo);
};

const binarySearch = (unorderedList, targetInteger) => {
  // Convert unordered list to list of objects to track original index
  unorderedList = unorderedList.map((item, index) => {
    return { index: index, integer: item };
  });
  let sortedList = mergeSort(unorderedList);

  let start = 0;
  let end = sortedList.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (sortedList[mid].integer === targetInteger) {
      // Integer is in the list so return original index
      return `${targetInteger} is located at index: ${sortedList[mid].index}`;
    } else if (sortedList[mid].integer < targetInteger) {
      // Search for integer on the right side of list
      start = mid + 1;
    } else {
      // Search for integer to the left side of list
      end = mid - 1;
    }
  }
  // Integer not in list
  return `${targetInteger} is not in the given list`;
};
