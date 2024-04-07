// based on https://cp-algorithms.com/algebra/factorization.html#trial-division
export function find_prime_factors(n) {
  let factorization = [];
  var i = 2;

  while (i * i <= n) {
    if (n % i) {
      i++;
    } else {
      n /= i;
      factorization.push(i);
    }
  }
  if (n > 1) {
    factorization.push(n);
  }
  console.log(factorization);
}

export function find_prime_factors_wheel(n) {
  let factorization = [];
  let i = 2;
  while (n % 2 === 0) {
    factorization.push(2);
    n /= 2;
  }
  for (i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      factorization.push(i);
      n /= i;
    }
  }

  if (n > 1) {
    factorization.push(n);
  }
  console.log(factorization);
}

export function find_prime_factors_trivial_extended(n) {
  let factorization = [];
  let divisors = [2, 3, 5];
  divisors.forEach((divisor) => {
    while (n % divisor === 0) {
      factorization.push(divisor);
      n /= divisor;
    }
  });

  let increments = [4, 2, 4, 2, 4, 6, 2, 6];
  let i = 0;
  let d = 7;
  for (d = 7; d * d <= n; d += increments[i + 1]) {
    while (n % d === 0) {
      factorization.push(d);
      n /= d;
    }

    if (i === 8) {
      i = 0;
    }
  }

  if (n > 1) {
    factorization.push(n);
  }
  console.log(factorization);
}
