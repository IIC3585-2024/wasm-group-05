#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>
#include "factors.h"

// based on https://cp-algorithms.com/algebra/factorization.html#trial-division
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

EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors_wheel(char* num) {

  long long int n = atoll(num);
  long long int i = 2;
  struct factors *head = NULL;
  struct factors *current = NULL;

  while ( n % 2 == 0) {
    add_factor(&head, &current, 2);
    n = n / 2;
  }

  for (i = 3; i * i <= n; i = i + 2) {
    while (n % i == 0) {
      add_factor(&head, &current, i);
      n = n / i;
    }
  }

  if (n > 1) {
    add_factor(&head, &current, n);
  }

  return head;
}


EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors_trivial_extended(char* num) {
  long long int n = atoll(num);
  long long int i = 2;
  int dividors[3] = {2, 3, 5};
  
  struct factors *head = NULL;
  struct factors *current = NULL;

  for (int j = 0; j < 3; j++) {
    while (n % dividors[j] == 0) {
      add_factor(&head, &current, dividors[j]);
      n = n / dividors[j];
    }
  }

  int increments[8] = {4, 2, 4, 2, 4, 6, 2, 6};
  i = 0;
  int d = 7;
  for (d = 7; d * d <= n; d += increments[i + 1]) {
    while (n % d == 0) {
      add_factor(&head, &current, d);
      n = n / d;
    }
    if (i == 7) { i = 0; }
  }

  if (n > 1) {
    add_factor(&head, &current, n);
  }

  return head;
}




EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors_o2(char* num) {
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

EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors_wheel_o2(char* num) {

  long long int n = atoll(num);
  long long int i = 2;
  struct factors *head = NULL;
  struct factors *current = NULL;

  while ( n % 2 == 0) {
    add_factor(&head, &current, 2);
    n = n / 2;
  }

  for (i = 3; i * i <= n; i = i + 2) {
    while (n % i == 0) {
      add_factor(&head, &current, i);
      n = n / i;
    }
  }

  if (n > 1) {
    add_factor(&head, &current, n);
  }

  return head;
}


EMSCRIPTEN_KEEPALIVE
struct factors* find_prime_factors_trivial_extended_o2(char* num) {
  long long int n = atoll(num);
  long long int i = 2;
  int dividors[3] = {2, 3, 5};
  
  struct factors *head = NULL;
  struct factors *current = NULL;

  for (int j = 0; j < 3; j++) {
    while (n % dividors[j] == 0) {
      add_factor(&head, &current, dividors[j]);
      n = n / dividors[j];
    }
  }

  int increments[8] = {4, 2, 4, 2, 4, 6, 2, 6};
  i = 0;
  int d = 7;
  for (d = 7; d * d <= n; d += increments[i + 1]) {
    while (n % d == 0) {
      add_factor(&head, &current, d);
      n = n / d;
    }
    if (i == 7) { i = 0; }
  }

  if (n > 1) {
    add_factor(&head, &current, n);
  }

  return head;
}