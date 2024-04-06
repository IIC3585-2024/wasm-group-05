export function find_prime_factors(n) {
  var i = 2;
  while (i * i <= n) {
    if (n % i) {
      i++;
    } else {
      n /= i;
      console.log(i);
    }
  }
  if (n > 1) {
    console.log(n);
  }
}

export function run() {
  const method = document.querySelector("#method").value;
  const number = document.querySelector("#number").value;
  if (method === "js") {
    find_prime_factors(number);
  } else {
    var result = Module.ccall(
      "find_prime_factors",
      "number",
      ["number"],
      [number]
    );
    // the function is void still
  }
}
