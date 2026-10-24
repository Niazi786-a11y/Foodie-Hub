
const foodPrices = {
    Pizza: 800,
    Burger: 450,
    Fries: 250,
    Pasta: 600,
    Pancakes: 400,
    BBQ: 1000
};

let cart = [];

const foodSelect = document.getElementById("food");
const quantityInput = document.getElementById("quantity");
const totalDisplay = document.getElementById("total");
const messageDisplay = document.getElementById("message");
const orderSummary = document.getElementById("orderSummary");

function calculateTotal() {
    let food = foodSelect.value;
    let quantity = Number(quantityInput.value);
    let total = foodPrices[food] * quantity;

    totalDisplay.textContent = "Selected Item Total: Rs. " + total;

    return total;
}

function createOrderCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const orderCounter = createOrderCounter();

function addOrder() {
    let food = foodSelect.value;
    let quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        messageDisplay.textContent =
            "Please enter quantity between 1 and 100.";
        return;
    }

    let existingItem = cart.find(item => item.food === food);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            food: food,
            price: foodPrices[food],
            quantity: quantity
        });
    }

    messageDisplay.textContent = food + " added to your order!";
    updateOrderList();
}

function updateOrderList() {
    let totalBill = 0;
    let list = "<ul>";

    cart.forEach(function(item) {
        let itemTotal = item.price * item.quantity;
        totalBill += itemTotal;

        list += "<li>" + item.food +
            " | Quantity: " + item.quantity +
            " | Price: Rs. " + item.price +
            " | Total: Rs. " + itemTotal + "</li>";
    });

    list += "</ul>";

    orderSummary.innerHTML = list +
        "<h3>Final Bill: Rs. " + totalBill + "</h3>";

    calculateTotal();
}

function doneOrder() {
    if (cart.length === 0) {
        messageDisplay.textContent = "Please add food to your order first.";
        return;
    }

    let orderNumber = orderCounter();
    let totalBill = 0;

    cart.forEach(function(item) {
        totalBill += item.price * item.quantity;
    });

    messageDisplay.textContent =
        "Your order is placed! Order No: " + orderNumber +
        ". Final Bill: Rs. " + totalBill;

    document.getElementById("addOrder").disabled = true;
    document.getElementById("doneOrder").disabled = true;
}

foodSelect.addEventListener("change", calculateTotal);
quantityInput.addEventListener("input", calculateTotal);

document.getElementById("addOrder").addEventListener("click", addOrder);
document.getElementById("doneOrder").addEventListener("click", doneOrder);

const selectedFood = new URLSearchParams(window.location.search).get("item");

if (selectedFood && Object.hasOwn(foodPrices, selectedFood)) {
    foodSelect.value = selectedFood;
}

calculateTotal();
