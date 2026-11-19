function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function saveTransaction(type, amount, category, date, description) {
    const transactions = getData("transactions");
    const transaction = {
        id: Date.now(),
        type: type,
        amount: parseFloat(amount),
        category: category,
        date: date,
        description: description,
    };
    transactions.push(transaction);
    saveData("transactions", transactions);
    return transaction;
}
function getTransactions() {
    return getData("transactions");
}
function deleteTransaction(id) {
    let transactions = getTransactions();
    transactions = transactions.filter((t) => t.id !== id);
    saveData("transactions", transactions);
}
function saveReminder(date, desc, amount) {
    const reminders = getData("reminders");
    const reminder = {
        id: Date.now(),
        date: date,
        description: desc,
        amount: parseFloat(amount),
        done: false,
    };
    reminders.push(reminder);
    saveData("reminders", reminders);
    return reminder;
}
function getReminders() {
    return getData("reminders");
}
function toggleReminder(id) {
    let reminders = getReminders();
    for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].id === id) {
            reminders[i].done = !reminders[i].done;
        }
    }
    saveData("reminders", reminders);
}
function deleteReminder(id) {
    let reminders = getReminders();
    reminders = reminders.filter((r) => r.id !== id);
    saveData("reminders", reminders);
}
function saveBudget(category, amount) {
    const budgets = getData("budgets");
    const budget = {
        id: Date.now(),
        category: category,
        limit: parseFloat(amount),
    };
    budgets.push(budget);
    saveData("budgets", budgets);
    return budget;
}
function getBudgets() {
    return getData("budgets");
}
function deleteBudget(id) {
    let budgets = getBudgets();
    budgets = budgets.filter((b) => b.id !== id);
    saveData("budgets", budgets);
}
function saveWishlist(date, desc, targetAmount, savedAmount) {
    const wishlists = getData("wishlists");
    const wishlist = {
        id: Date.now(),
        date: date,
        description: desc,
        target: parseFloat(targetAmount),
        saved: parseFloat(savedAmount),
    };
    wishlists.push(wishlist);
    saveData("wishlists", wishlists);
    return wishlist;
}
function getWishlists() {
    return getData("wishlists");
}
function updateWishlist(id, date, desc, targetAmount, savedAmount) {
    let wishlists = getWishlists();
    for (let i = 0; i < wishlists.length; i++) {
        if (wishlists[i].id === id) {
            wishlists[i].date = date;
            wishlists[i].description = desc;
            wishlists[i].target = parseFloat(targetAmount);
            wishlists[i].saved = parseFloat(savedAmount);
        }
    }
    saveData("wishlists", wishlists);
}
function deleteWishlist(id) {
    let wishlists = getWishlists();
    wishlists = wishlists.filter((w) => w.id !== id);
    saveData("wishlists", wishlists);
}
function saveExpense(type, amount, month) {
    const expenses = getData("expenses");
    const expense = {
        id: Date.now(),
        type: type,
        amount: parseFloat(amount),
        month: parseInt(month),
    };
    expenses.push(expense);
    saveData("expenses", expenses);
    return expense;
}
function getExpenses() {
    return getData("expenses");
}
function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter((e) => e.id !== id);
    saveData("expenses", expenses);
}
