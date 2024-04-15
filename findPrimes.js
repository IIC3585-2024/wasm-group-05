import {
  find_prime_factors,
  find_prime_factors_wheel,
  find_prime_factors_trivial_extended,
} from "./js/algorithms.js";

function algorithm_time(func, func_name) {
  let start = performance.now();
  let iterations = 10000;
  let factorization;
  for (let i = 0; i < iterations; i++) {
    factorization = func();
  }
  let end = performance.now();

  let averageTime = ((end - start) / iterations).toFixed(5);

  return [func_name, factorization, averageTime];
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
  return array;
}

export function run() {
  const method = document.querySelector("#method").value;
  const number = document.querySelector("#number").value;
  const intNumber = parseInt(number, 10);

  if (isNaN(intNumber) || intNumber <= 1) {
    alert("Please enter a valid number greater than 1.");
    return;
  }

  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("table").classList.add("hidden");

  setTimeout(() => {
    let primeDom = [];
    if (method === "js") {
      primeDom.push(
        createDomElement(
          algorithm_time(
            () => find_prime_factors(number),
            "find_prime_factors_square (JS)"
          )
        )
      );
      primeDom.push(
        createDomElement(
          algorithm_time(
            () => find_prime_factors_wheel(number),
            "find_prime_factors_wheel (JS)"
          )
        )
      );
      primeDom.push(
        createDomElement(
          algorithm_time(
            () => find_prime_factors_trivial_extended(number),
            "find_prime_factors_trivial_extended (JS)"
          )
        )
      );
    } else {
      let result_square = Module.ccall(
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

      primeDom.push(
        createDomElement(
          algorithm_time(
            () => wasm_get_factors(result_square),
            "find_prime_factors_square (C)"
          )
        )
      );
      primeDom.push(
        createDomElement(
          algorithm_time(
            () => wasm_get_factors(result_wheel),
            "find_prime_factors_wheel (C)"
          )
        )
      );
      primeDom.push(
        createDomElement(
          algorithm_time(
            () => wasm_get_factors(result_trivial),
            "find_prime_factors_trivial_extended (C)"
          )
        )
      );

      Module.ccall("free_factors", "number", ["number"], [result_square]);
      Module.ccall("free_factors", "number", ["number"], [result_wheel]);
      Module.ccall("free_factors", "number", ["number"], [result_trivial]);
    }

    const resultsTable = getElement("#results");
    resultsTable.innerHTML = "";
    for (let i = 0; i < primeDom.length; i++) {
      resultsTable.appendChild(primeDom[i]);
    }
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("table").classList.remove("hidden");
  }, 200);
}

function createDomElement(textArray) {
  const element = document.createElement("tr");
  textArray.forEach((data) => {
    const childElement = document.createElement("td");
    childElement.textContent = data;
    childElement.className = "text-center";
    element.appendChild(childElement);
  });
  return element;
}

const getElement = (selector) => document.querySelector(selector);
