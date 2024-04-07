import {
  find_prime_factors,
  find_prime_factors_wheel,
  find_prime_factors_trivial_extended,
} from "./js/algorithms.js";

function algorithm_time(func, func_name) {
  let start = performance.now();
  func();
  let end = performance.now();
  console.log(`Execution time for ${func_name}: ${end - start} ms`);
}

function wasm_get_factors(pointer) {
  let array = [];
  let i = 0;
  while (pointer !== 0) {
    let factor = Number(Module.getValue(pointer, "i64"));
    let next = Module.getValue(pointer + 8, "i32");
    array.push(factor);
    pointer = next;
    i++;
  }
  console.log(array);
}

export function run() {
  const method = document.querySelector("#method").value;
  const number = document.querySelector("#number").value;
  if (method === "js") {
    
    algorithm_time(() => find_prime_factors(number), "find_prime_factors");
    algorithm_time(() => find_prime_factors_wheel(number), "find_prime_factors_wheel");
    algorithm_time(() => find_prime_factors_trivial_extended(number), "find_prime_factors_trivial_extended");
  } else {
    let result = Module.ccall(
      "find_prime_factors",
      "number",
      ["string"],
      [number]
    );

    let result_wheel = Module.ccall(
      "find_prime_factors_wheel",
      "number",
      ["string"],
      [number]
    );

    let result_trivial = Module.ccall(
      "find_prime_factors_trivial_extended",
      "number",
      ["string"],
      [number]
    );

    algorithm_time(() => wasm_get_factors(result), "find_prime_factors");
    algorithm_time(() => wasm_get_factors(result_wheel), "find_prime_factors_wheel");
    algorithm_time(() => wasm_get_factors(result_trivial), "find_prime_factors_trivial_extended");

    Module.ccall("free_factors", "number", ["number"], [result]);
    Module.ccall("free_factors", "number", ["number"], [result_wheel]);
    Module.ccall("free_factors", "number", ["number"], [result_trivial]);
  }
}
