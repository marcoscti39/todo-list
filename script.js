// global variables
const input = document.querySelector("input")
const submit = document.querySelector(".btn-submit")
const containerItems = document.querySelector(".container-items")
const main = document.querySelector("main")
const removeAll = document.querySelector(".btn-clear")
const warning = document.querySelector(".modification-warning")
let indexReplace = 0



// Local Storage
const ITEMS = localStorage.getItem("items") ?
 JSON.parse(localStorage.getItem("items")): []

const itemStorage =  () => localStorage.setItem("items", JSON.stringify(ITEMS))


// Run App
ITEMS.map((item, index) => createItem(item, index))
const removeItem = document.querySelectorAll(".remove-item")



// event clickers
main.addEventListener("click", (itemClicked)=>{
    let target = itemClicked.target;
    let removeWasClicked = target.classList.contains("remove-item");
    let editWasClicked = target.classList.contains("rename-item");
    let index = target.parentElement.parentElement.dataset.index;
    let getNameItem = target.parentElement.parentElement.textContent.trim();

    if(removeWasClicked){
        ITEMS.forEach((item) =>{
            if(item == getNameItem){
                ITEMS.splice(index, 1)
            }
        })
        refresh()
        warningGenerator(warning, "red", "item removed")
    }
    else if(editWasClicked){
        indexReplace =  index
        submit.textContent = "edit"
        input.value = ITEMS[index]
        refresh()

    }
})


submit.addEventListener("click", addItem)

removeAll.addEventListener("click", clearAllItems)


// functions 

function addItem(){
    let itemData = input.value;
    const isEditing = submit.textContent === "edit";
    const isSubmiting = submit.textContent === "submit";
    const notFilled = itemData == "";
    const clearInput = () => input.value = "";


    if (notFilled) return warningGenerator(warning, "red", "blank field")

    if(!notFilled){
        if(isEditing){
            ITEMS.splice(indexReplace, 1, itemData)
            warningGenerator(warning, 'rgb(78, 240, 78)', "item edited")
            clearInput() 
            submit.textContent = "submit";


        }
        else if(isSubmiting){
            ITEMS.push(itemData)
            warningGenerator(warning, 'rgb(78, 240, 78)', "Item added")
            clearInput()


        }
    } 
    refresh();
}


function createItem(itemInfo, arrayIndex){
    let article = document.createElement("article")
    article.setAttribute("data-index", arrayIndex)
    article.innerHTML = itemHtml(itemInfo, arrayIndex)
    containerItems.appendChild(article)
    
}


function itemHtml(nameItem){
    return `<span class="item-name"> ${nameItem} </span>
            <div class="items-edit"> 
                <div class="rename-item"> </div>
                <div class="remove-item"> </div>
            </div>`
}

function refresh(){
    containerItems.innerHTML = ""
    ITEMS.map((item, index) => createItem(item, index))
    itemStorage()
}


function clearAllItems(){
    ITEMS.splice(0, ITEMS.length)
    warningGenerator(warning, "red", "total item cleaning")
    refresh()
}

function warningGenerator(element, color, message){
    element.style.display = "block";
    element.style.backgroundColor = color;
    element.textContent = message;
    setTimeout(() =>{
        element.style.display = "none"
    }, 1000)
}