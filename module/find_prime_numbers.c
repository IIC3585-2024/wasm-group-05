#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int find_prime_factors(long long int n) {
  long long int i = 2;
  while (i * i <= n) {
    if (n % i) {
      i++;
    } else {
      n /= i;
      printf("%lld\n", i);
    }
  }
  if (n > 1) {
    printf("%lld\n", n);
  }
  return 0;
}