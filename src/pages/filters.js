
import dishes from './dishes.js';

export var mainFive = dishes.sort((first, second) => first.title.localeCompare(second.title)).slice(0,5);

export var dishesSorted = dishes.filter(item => item.main).sort((first, second) => first.title.localeCompare(second.title));
export var dessertsSorted = dishes.filter(item => item.dessert).sort((first, second) => first.title.localeCompare(second.title));