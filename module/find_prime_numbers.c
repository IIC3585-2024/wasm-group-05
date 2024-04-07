#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>
#include "factors.h"


EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors(char* num) {
  long long int n = atoll(num);
  long long int i = 2;
  struct factors *head = NULL;
  struct factors *current = NULL;

  while (i * i <= n) {
    if (n % i) {
      i++;
    } else {
      n = n / i;
      add_factor(&head, &current, i);
    }
  }
  if (n > 1) {
    add_factor(&head, &current, n);
  }
  return head;
}