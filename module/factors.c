#include <stdio.h>
#include <stdlib.h>
#include "factors.h"
#include <emscripten.h>

struct factors* new_factor(long long int factor) {
  struct factors *element = (struct factors *)malloc(sizeof(struct factors));
  element -> factor = factor;
  element -> next = NULL;
  return element;
}


void push_factor(struct factors **tail, long long int factor) {
  struct factors *new_element = new_factor(factor);
  (*tail) -> next = new_element;
  *tail = new_element;
}

void add_factor(struct factors **head, struct factors **current, long long int factor) {
  if (*head == NULL) {
    *head = new_factor(factor);
    *current = *head;
  } else {
    push_factor(current, factor);
  }
}

EMSCRIPTEN_KEEPALIVE
void print_factors(struct factors *head) {
  struct factors *current = head;
  printf("[ ");
  while (current != NULL) {
    printf("%lld, ", current -> factor);
    current = current -> next;
  }
  printf("]\n");
}

EMSCRIPTEN_KEEPALIVE
void free_factors(struct factors *head) {
  struct factors *current = head;
  struct factors *next = NULL;
  while (current != NULL) {
    next = current -> next;
    // printf("freeing %lld\n", current -> factor);
    free(current);
    current = next;
  }
}
