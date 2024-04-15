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

  return [func_name, factorization, (end - start)/iterations];
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
  let primeDom = [];
  if (method === "js") {
    primeDom.push(createDomElement(algorithm_time(() => find_prime_factors(number), "find_prime_factors (JS)")));
    primeDom.push(createDomElement(algorithm_time(() => find_prime_factors_wheel(number), "find_prime_factors_wheel (JS)")));
    primeDom.push(createDomElement(algorithm_time(() => find_prime_factors_trivial_extended(number), "find_prime_factors_trivial_extended (JS)")));
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

    primeDom.push(createDomElement(algorithm_time(() => wasm_get_factors(result), "find_prime_factors (C)")));
    primeDom.push(createDomElement(algorithm_time(() => wasm_get_factors(result_wheel), "find_prime_factors_wheel (C)")));
    primeDom.push(createDomElement(algorithm_time(() => wasm_get_factors(result_trivial), "find_prime_factors_trivial_extended (C)")));

    Module.ccall("free_factors", "number", ["number"], [result]);
    Module.ccall("free_factors", "number", ["number"], [result_wheel]);
    Module.ccall("free_factors", "number", ["number"], [result_trivial]);
  }

  for (let i = 0; i < primeDom.length; i++) {
    setInnerHTML("#results", primeDom[i]);
  }
}

function createDomElement(textArray) {
  const element = document.createElement("tr");
  textArray.forEach(data => {
    const childElement = document.createElement("td");
    childElement.textContent = data;
    element.appendChild(childElement);
  });

  return element;
}

const getElement = (selector) => document.querySelector(selector);

const setInnerHTML = (selector, childElement) => {
  const element = getElement(selector);
  if (element) element.appendChild(childElement);
};
