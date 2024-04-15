# WASM

## Description
This is a finder of prime numbers. It is build to test WASM and the speed of C modules vs JS modules with different algorithms.
## Execution

In the case of wanting to run the program locally, the following steps must be followed:

1. Clone the repository
2. Open the terminal and navigate to the project folder
3. Install the dependencies with `bun install`
4. Run the program with `bun run dev`

### Local Development
#### Dependencies

- Install bun
- Install [emscripten](https://emscripten.org/docs/getting_started/downloads.html)

#### to rebuild C modules run

```bash
emcc ./find_prime_numbers.c -o find_prime_numbers.js -s NO_EXIT_RUNTIME=1 -s 'EXPORTED_RUNTIME_METHODS=["ccall"]'
```


## How to use

To use the web app, you must select the type of module, the algorithm you would like to use, write a number in the input field and then you have to click the "Find Prime Numbers" button, and the numbers will display in the screen

## Contributors

- [Bastian Marinkovic](https://github.com/BMarink512/)
- [Ignacio Porte](https://github.com/IgnacioPorte)
- [Maximiliano Torres](https://github.com/Maxi1805)
