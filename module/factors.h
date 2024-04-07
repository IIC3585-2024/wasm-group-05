struct factors {
  long long int factor;
  struct factors *next;
};

struct factors* new_factor(long long int factor);
void push_factor(struct factors **tail, long long int factor);
void add_factor(struct factors **head, struct factors **current, long long int factor);
void print_factors(struct factors *head);
void free_factors(struct factors *head);