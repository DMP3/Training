let arr = [5, 15, 23, 56, 35]
let original_sum = 0;
let new_sum = 0;

arr.forEach((value, i) => {
  original_sum += value
  if (value % 2 == 0) {
    value += i
  } else {
    value -= i
  }
  new_sum += value
  console.log('%d: %s', i, value);
})
console.log(original_sum)
console.log(new_sum)