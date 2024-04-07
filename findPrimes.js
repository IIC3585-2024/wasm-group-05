import { find_prime_factors, find_prime_factors_wheel, find_prime_factors_trivial_extended } from "./js/algorithms.js";

function algorithm_time(func, func_name) {
  let start = Date.now();
  func();
  let end = Date.now();
  console.log(`Execution time for ${func_name}: ${end - start} ms`);
}

export function run() {
  const method = document.querySelector("#method").value;
  const number = document.querySelector("#number").value;
  if (method === "js") {
    
    algorithm_time(() => find_prime_factors(number), "find_prime_factors");
    algorithm_time(() => find_prime_factors_wheel(number), "find_prime_factors_wheel");
    algorithm_time(() => find_prime_factors_trivial_extended(number), "find_prime_factors_trivial_extended");
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
