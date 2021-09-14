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

//extracts categories from the PRODUCTS array of objects and removes duplicates
const CATEGORIES = new Set(PRODUCTS.flatMap(el=>el.category));

//containers
const FILTLIST = document.querySelector('#filter-list');
const TABLE = document.querySelector('.main-table');


CATEGORIES.forEach(el => {//renders the filter names into html DOM
    FILTLIST.innerHTML += `
    <input type="checkbox" name="filter" id=${el.toLowerCase()} value=${el} class="check-list">
    <label for=${el.toLowerCase()} class="check-list">${el}</label><br>`;
});

//renders the prodcuts and details
PRODUCTS.forEach((el, i) => {
    TABLE.insertAdjacentHTML('beforeend', `
    <div class="table-row grid-container" id="${PRODUCTS[i].id}">
    <h6 class="table-item">${PRODUCTS[i].id}</h6>
    <h6 class="table-item">${PRODUCTS[i].name}</h6>
    <h6 class="table-item">${PRODUCTS[i].category.join(', ')}</h6></div>`);
});

//all input type of checkbox
const FILTERS = document.querySelectorAll('input[type="checkbox"]');
const ROWS = document.querySelectorAll('.table-row');
const ITEMS = document.querySelectorAll('.table-row');
const FILTERED = [];

// listens to each filter element when checked or unchecked and pushes or removes it into FILETERED array
FILTERS.forEach(el => {
    el.addEventListener('change', () => {
        for(let item of ITEMS) item.classList.add('no-display');
        if(el.checked) FILTERED.push(el.value);
        if(!el.checked) FILTERED.splice(FILTERED.indexOf(el.value), 1);
        console.log(FILTERED);
        displayFilter();
        undisplayFilter();

    });
});

//function to filter display
function displayFilter(){
    FILTERED.forEach((filter, index) => {
        
        for(let product of PRODUCTS){
            // console.log(`filter: ${filter}; categ1 = ${categ1}; categ2 = ${categ2}`);
            
            let categ1 = product.category[0];
            let categ2 = product.category[1];
            let item = ITEMS[product.id-1];

            if((filter === categ1 && filter != categ2) ||
            (filter != categ1 && filter === categ2)) {
                item.classList.remove('no-display');
            }

            console.log(`filter: ${filter}\ncateg1: ${categ1}\ncateg2: ${categ2}\n`);
            console.log(item);
        }
    });
}

function undisplayFilter(){
    for(let i = 0; i < FILTERS.length && FILTERS[i].checked === true; i++){}
    
}