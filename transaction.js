const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const expenseButton = document.getElementById("exp");
const incomeButton = document.getElementById("inc");
const transactionList = document.querySelector(".transaction-list");
expenseButton.addEventListener("click", (event) => {
    addTransaction(event, "expense");
});
incomeButton.addEventListener("click", (event) => {
    addTransaction(event, "income");
});
function addTransaction(event, type) {
    event.preventDefault();
    if (!amountInput.value || !categoryInput.value || !dateInput.value || !descriptionInput.value) {
        alert("Please fill in all fields!");
        return;
    }
    const transaction = {
        type: type, 
        amount: parseFloat(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };
    saveTransaction(type, amountInput.value, categoryInput.value, dateInput.value, descriptionInput.value);
    if (type === "income") {
        updateBudgetForIncome(categoryInput.value, parseFloat(amountInput.value));
    }
    if (type === "expense") {
        deductFromWishlist(parseFloat(amountInput.value));
    }
    displayTransaction(transaction);
    clearInputs();
    updateStats();
}
function displayTransaction(transaction) {
    const html = `
    <div class="transaction-row">
        <div class="transaction-field">
            <div class="field-label">Description</div>
            <div class="field-value">${transaction.description}</div>
        </div>
        <div class="transaction-field">
            <div class="field-label">Category</div>
            <div class="field-value">${transaction.category}</div>
        </div>
        <div class="transaction-field">
            <div class="field-label">Date</div>
            <div class="field-value">${transaction.date}</div>
        </div>
        <div class="transaction-field">
            <div class="field-label">Amount</div>
            <div class="field-value" style="color:${transaction.type === 'income' ? '#10b981' : '#ef4444'}">
                $${transaction.amount}
            </div>
        </div>
    </div>`;
    const element = document.createElement("div");
element.innerHTML = html;
transactionList.appendChild(element);
}
function updateStats() {
    const transactions = getTransactions();
    const expenses = getExpenses();
    let totalIncome = 0;
    let totalExpense = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "income") {
            totalIncome += transactions[i].amount;
        } else {
            totalExpense += transactions[i].amount;
        }
    }
    let fixedExpenseTotal = 0;
    for (let i = 0; i < expenses.length; i++) {
        fixedExpenseTotal += expenses[i].amount;
    }
    totalExpense += fixedExpenseTotal;
    const balance = totalIncome - totalExpense;
    document.getElementById("income").textContent = "$" + totalIncome;
    document.getElementById("expense").textContent = "$" + totalExpense;
    document.getElementById("balance").textContent = "$" + balance;
}
function clearInputs() {
    amountInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
}
function updateBudgetForIncome(category, amount) {
    const budgets = getBudgets();
    for (let i = 0; i < budgets.length; i++) {
        if (budgets[i].category === category) {
            budgets[i].limit += amount;
            localStorage.setItem('budgets', JSON.stringify(budgets));
            break;
        }
    }
}
function deductFromWishlist(amount) {
    const wishlists = getWishlists();
    let remainingAmount = amount;
   for (let i = 0; i < wishlists.length; i++) {
        if (remainingAmount > 0 && wishlists[i].saved > 0) {
            const deductAmount = Math.min(remainingAmount, wishlists[i].saved);
            wishlists[i].saved -= deductAmount;
            remainingAmount -= deductAmount;
        }
    }
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
}
function loadTransactions() {
    const transactions = getTransactions();
    for (let i = 0; i < transactions.length; i++) {
        displayTransaction(transactions[i]);
    }
    updateStats();
}
document.addEventListener("DOMContentLoaded", loadTransactions);
