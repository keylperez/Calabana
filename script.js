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
const FILTLIST = document.querySelector('#filter-list');//element that contains the checkboxes and filters
const TABLE = document.querySelector('.main-table');//the table of products
const SBAR = document.querySelector('#search-element');//searchbar


CATEGORIES.forEach(el => {//renders the filter names into html
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

//placed after the methods above because elements have to be rendered first
const FILTERS = document.querySelectorAll('input[type="checkbox"]');//gets all the input elements that are checkbox type
const ITEMS = document.querySelectorAll('.table-row');//selects the row (div element)
const FILTERED = [];

// listens to each filter element when checked or unchecked and pushes or removes it into FILETERED array
FILTERS.forEach(el => {
    el.addEventListener('change', () => {

        //undisplays all the product items ready for filtering
        for(let item of ITEMS) {
            item.classList.add('no-display');
            item.classList.remove('filtered');
        }

        if(el.checked) FILTERED.push(el.value);//if filter is checked, push the its names into an array called FILTERED
        if(!el.checked) FILTERED.splice(FILTERED.indexOf(el.value), 1);//if filter is unchecked, remove from the array of checked filters
        
        displayFilter();//function to filter display. return value determines if any of the checkboxes are checked or not
        // console.log(FILTERED); 
    });
});


//listens to the searchbar pero character input para cool
SBAR.addEventListener('input', () => {
    displayFilter();
});


//function to filter display
function displayFilter(){
    let checks = false;//boolean to check if none of the filters are checked
    
    FILTERED.forEach(filter => {
        const FITEMS = document.querySelectorAll('.filtered');
        for(let product of PRODUCTS){
            // console.log(`filter: ${filter}; categ1 = ${product.category[0]}; categ2 = ${product.category[1]}`);
            // console.log(`filter: ${filter}\nprod cat: ${product.category}`);

            //since filter only checks 1 of the two categories, used an or statement. longer code for real world multiple category filtering 
            if(filter === product.category[0] || filter === product.category[1]) {
                if(SBAR.value === '' || SBAR.value.toLowerCase() === product.name.toLowerCase()){
                
                    displayStateOn(ITEMS[product.id-1]);
                    checks = true;//changes checks to true meaning at least 1 filter is checked
                }
                if(SBAR.value != product.name && SBAR.value != '') displayStateOff(ITEMS[product.id-1]);
            }

            if(product.category.length === 2 && (filter === product.category[0] && filter === product.category[1])) doDisplays(SBAR.value, checks, product.name.toLowerCase(), ITEMS[product.id-1]);
            if(product.category.length === 2 && (filter === product.category[0] || filter === product.category[1])) doDisplays(SBAR.value, checks, product.name.toLowerCase(), ITEMS[product.id-1]);
            if(product.category.length === 1 && (filter === product.category[0] || filter === product.category[1])) doDisplays(SBAR.value, checks, product.name.toLowerCase(), ITEMS[product.id-1]);
            
                
        }
        console.log('test');
    
    });
    for(let product of PRODUCTS) doDisplays(SBAR.value, checks, product.name.toLowerCase(), ITEMS[product.id-1]);
    for(let product of PRODUCTS) console.log(`sb value: ${SBAR.value.toLowerCase()}\nproductname: ${product.name.toLowerCase()}\nITEMS: ${ITEMS[product.id-1].classList}`);

    //if statement to display all elements if no filter is checked. This is determined by the checks boolean variable.
    if(!checks && SBAR.value === '') ITEMS.forEach(el => {
        console.log('last success');
        el.classList.remove('no-display');
        el.classList.remove('filtered');
    });
    // console.log(`sb value: ${SBAR.value}\nITEMS: ${ITEMS[product.id-1].classList}`);
}

function displayStateOn(el){
    el.classList.remove('no-display');//adds no-dipslay class to the item\
    el.classList.add('filtered');
}

function displayStateOff(el){
    el.classList.add('no-display');//adds no-dipslay class to the item\
    el.classList.remove('filtered');
}

function doDisplays(x, y, z, i){
    if(x != '' && y && x.toLowerCase() === z) displayStateOn(i);
    if(x != '' && y && x.toLowerCase() != z) displayStateOff(i);
    if(x != '' && !y && x.toLowerCase() != z) displayStateOff(i);
    if(x != '' && !y && x.toLowerCase() === z) displayStateOn(i);
}