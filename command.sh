#!/bin/bash

emcc module/find_prime_numbers.c -O3 \
     module/factors.c \
     -s WASM=1 \
     -s EXPORTED_FUNCTIONS=_find_prime_factors,_free,_malloc,_print_factors,_free_factors,_find_prime_factors_trivial_extended,_find_prime_factors_wheel \
     -s EXPORTED_RUNTIME_METHODS=ccall,getValue  \
     -s NO_EXIT_RUNTIME=1 \
     -s WASM_BIGINT \
     -fsanitize=leak \
     -o module/find_prime_numbers.js