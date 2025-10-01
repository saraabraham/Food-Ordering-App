import { menuArray } from './data.js'


function renderItems(menuArray) {
    const menuItem = document.getElementById('menu_items')
    let menu = ` `
    for (let item of menuArray) {
        menu += `
        <div class="item">
        <h1 class="item_img">${item.emoji}</h1>
        <div class="desc">
        <h1 id="name">${item.name}</h1>
        <h2 id="ing">${item.ingredients}</h2>
        <h3 id="price">$${item.price}</h3>
        </div>
        <button class="add">+</button>
        </div>
        <hr/>
        `
    }

    menuItem.innerHTML = menu




}

renderItems(menuArray)



