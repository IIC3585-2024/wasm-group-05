#!/bin/bash

emcc module/find_prime_numbers.c module/factors.c -s WASM=1 -s EXPORTED_FUNCTIONS=_find_prime_factors,_free,_malloc,_print_factors,_free_factors -s EXPORTED_RUNTIME_METHODS=ccall,getValue -o module/find_prime_numbers.js -s WASM_BIGINT -s EMULATE_FUNCTION_POINTER_CASTS=1