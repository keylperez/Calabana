const PRODUCTS=[
    {id:1,name:"Bacon",category:["Meat"]},
    {id:2,name:"Fish",category:["Seafood","Fresh"]},
    {id:3,name:"Chicken",category:["Poultry","Fresh"]},
    {id:4,name:"Beef",category:["Meat"]},
    {id:5,name:"Soy Sauce",category:["Sauce","Seasoning"]},
    {id:6,name:"Milk",category:["Dairy"]},
    {id:7,name:"Cheese",category:["Dairy"]},
    {id:8,name:"Frying Pan",category:["Utensil","Cookware"]},
    {id:9,name:"Egg",category:["Dairy"]},
    {id:10,name:"Plates",category:["Utensil"]},
    {id:11,name:"Pork",category:["Meat"]}];

const CATEGORIES = new Set(PRODUCTS.flatMap(el=>el.category));

console.log(CATEGORIES);

const FILTERLIST = document.querySelector('.filterList');

CATEGORIES.forEach(el => {
    FILTERLIST.innerHTML += `<input type="checkbox" name="filter" id=${el.toLowerCase()} value=${el.toLowerCase()} class="checkList"><label for=${el.toLowerCase()}>${el}</label><br>`
    console.log();
});


const FILTERS = document.querySelectorAll('input[type="checkbox"]');
const FILTERED = [];
console.log(FILTERS);

FILTERS.forEach(el => {
    el.addEventListener('change', () => {
        if(el.checked) FILTERED.push(el.value);
        if(!el.checked) FILTERED.pop(el.value);
        console.log(FILTERED);
    });
});