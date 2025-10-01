import { menuArray } from './data.js'
const cart = []
const orderSumm = document.getElementById("orders")
const sum = document.querySelector('.order-summary')
const modal = document.getElementById("modal");
const openBtn = document.getElementById("orderComplete");
const closeBtn = document.querySelector(".close");
const stars = document.querySelectorAll("#rating .star");
const ratingValue = document.getElementById("rating-value");




//Function to display add button click
function displayOrder(e) {
    document.getElementById('orderComplete').hidden = false

    sum.hidden = false

    const index = e.target.dataset.index;
    const item = menuArray[index]

    cart.push({ ...item });

    renderCart()
}
//Render Cart and rhandle remove operation
function renderCart() {

    //Count duplicates and sum prices fro display

    orderSumm.innerHTML = ' '
    const itemMap = {}
    let totalPrice = 0
    cart.forEach(item => {
        if (itemMap[item.name]) {
            itemMap[item.name].count += 1
            itemMap[item.name].totalPrice += item.price
        }
        else {
            itemMap[item.name] = { ...item, count: 1, totalPrice: item.price }
        }
        totalPrice += item.price


    })


    for (const key in itemMap) {
        const item = itemMap[key]
        orderSumm.innerHTML += `
        <div class="order-things">
        <div class="order-left">
        ${item.name} x ${item.count}
        <button class="remove-btn" data-name="${item.name}">remove</button>
        </div>
        <div class="order-right">$${item.totalPrice}</div>
        </div>
        `
    }

    //Apply 10% discount if total>50$
    let discount = 0
    if (totalPrice > 50) {
        discount = 0.10 * totalPrice
    }

    const finalPrice = totalPrice - discount


    orderSumm.innerHTML += `<hr style="border: 2px solid black;margin-top:2%;" />
        <div class="order-total">
        <div class="order-left"> Total Price: </div>
         <div class="order-right"> $${totalPrice}</div>
        </div>
`
    if (discount > 0) {
        orderSumm.innerHTML += `
        <div class="order-total">
            <div class="order-left">Discount (10%): </div>
            <div class="order-right">-$${discount.toFixed(2)}</div>
        </div>
        <div class="order-total">
            <div class="order-left">Final Price: </div>
            <div class="order-right">$${finalPrice.toFixed(2)}</div>
        </div>
        `
    }

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const idx = cart.findIndex(ci => ci.name === name);
            if (idx !== -1) {
                cart.splice(idx, 1);
                renderCart()
            }
        });
    })

    sum.scrollIntoView({ behavior: "smooth" })


}


function renderItems(menuArray) {
    const menuItem = document.getElementById('menu_items')
    let menu = ` `

    menuArray.forEach((item, index) => {

        menu += `
        <div class="item">
        <h1 class="item_img">${item.emoji}</h1>
        <div class="desc">
        <h1 id="name">${item.name}</h1>
        <h2 id="ing">${item.ingredients.join(", ")}</h2>
        <h3 id="price">$${item.price}</h3>
        </div>
        <button class="add" data-index = ${index}>+</button>
        </div>
        <hr/>
        `
    })

    menuItem.innerHTML = menu
    //Add event listeneres to all add buttons 

    const buttons = document.querySelectorAll('.add')
    buttons.forEach(button => {
        button.addEventListener('click', displayOrder)
    }
    )

}

// Show modal
openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close modal when clicking "x"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const form = document.getElementById("pay-form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    // At this point, the browser will automatically validate 'required' fields
    if (!form.checkValidity()) {
        // If any required field is empty, browser shows default error messages
        return;
    }

    // Close modal & reset form
    modal.style.display = "none"
    sum.style.display = "none"
    openBtn.style.display = "none"
    form.reset();
    document.getElementById('order-success').hidden = false
});

stars.forEach(star => {
    star.addEventListener("click", () => {
        const value = star.dataset.value;
        ratingValue.textContent = `You rated: ${value} / 5`;

        // Highlight selected stars
        stars.forEach(s => {
            s.textContent = s.dataset.value <= value ? '★' : '☆';
        });



        // Optionally: save rating to server or localStorage
    });
});


// Render all Menu items

renderItems(menuArray)





