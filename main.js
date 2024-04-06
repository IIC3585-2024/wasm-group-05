import './style.css'
import { run } from './findPrimes.js'

document.querySelector('#trigger').addEventListener('click', (e) => {
  run()
})
