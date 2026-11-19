const reminderForm = document.getElementById("reminderForm");
const remindersList = document.getElementById("remindersList");
reminderForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const date = document.getElementById("reminderDate").value;
    const description = document.getElementById("reminderDesc").value;
    const amount = document.getElementById("reminderAmount").value;
    if (!date || !description || !amount) {
        alert("Please fill in all fields!");
        return;
    }
    const reminder = saveReminder(date, description, amount);
    const html = `
        <div class="reminder-item" data-id="${reminder.id}">
            <div>
                <div class="item-label">Description</div>
                <div class="item-field">${description}</div>
            </div>
            <div>
                <div class="item-label">Amount</div>
                <div class="item-field">$${amount}</div>
            </div>
            <div>
                <div class="item-label">Date</div>
                <div class="item-field">${date}</div>
            </div>
            <div style="display:flex;gap:10px;">
                <i class="fas fa-check" onclick="toggleReminderDone(${reminder.id})" style="cursor:pointer;color:#10b981;"></i>
                <i class="fas fa-trash" onclick="deleteReminderItem(${reminder.id})" style="cursor:pointer;color:#ef4444;"></i>
            </div>
        </div>
    `;
    remindersList.insertAdjacentHTML("beforeend", html);
    reminderForm.reset();
});
function loadDashboardData() {
    loadRecentTransactions();
    loadReminders();
    updateDashboardStats();
}
function loadRecentTransactions() {
    const transactions = getTransactions();
    const recentTransactionsList = document.getElementById("recentTransactionsList");
    recentTransactionsList.innerHTML = '';
    const recentTransactions = transactions.slice(-5).reverse();
    for (let i = 0; i < recentTransactions.length; i++) {
        const transaction = recentTransactions[i];
        const html = `
        <div class="transaction-item">
            <div>
                <div class="item-label">Description</div>
                <div class="item-field">${transaction.description}</div>
            </div>
            <div>
                <div class="item-label">Amount</div>
                <div class="item-field" style="color:${transaction.type === 'income' ? '#10b981' : '#ef4444'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}
                </div>
            </div>
            <div>
                <div class="item-label">Date</div>
                <div class="item-field">${transaction.date}</div>
            </div>
            <div>
                <div class="item-label">Category</div>
                <div class="item-field">${transaction.category}</div>
            </div>
        </div>`;
        recentTransactionsList.insertAdjacentHTML("beforeend", html);
    }
    if (recentTransactions.length === 0) {
        recentTransactionsList.innerHTML = '<div class="transaction-item"><div class="item-field" style="grid-column: 1/-1; text-align: center;">No transactions yet</div></div>';
    }
}
function loadReminders() {
    const reminders = getReminders();
    remindersList.innerHTML = '';
    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i];
        const html = `
        <div class="reminder-item ${reminder.done ? 'done' : ''}" data-id="${reminder.id}">
            <div>
                <div class="item-label">Description</div>
                <div class="item-field">${reminder.description}</div>
            </div>
            <div>
                <div class="item-label">Amount</div>
                <div class="item-field">$${reminder.amount}</div>
            </div>
            <div>
                <div class="item-label">Date</div>
                <div class="item-field">${reminder.date}</div>
            </div>
            <div style="display:flex;gap:10px;">
                <i class="fas fa-check" onclick="toggleReminderDone(${reminder.id})" style="cursor:pointer;color:#10b981;"></i>
                <i class="fas fa-trash" onclick="deleteReminderItem(${reminder.id})" style="cursor:pointer;color:#ef4444;"></i>
            </div>
        </div>`;
        remindersList.insertAdjacentHTML("beforeend", html);
    }
}
function updateDashboardStats() {
    const transactions = getTransactions();
    const expenses = getExpenses();
    let totalIncome = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            totalIncome += transactions[i].amount;
        }
    }
    let totalExpense = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'expense') {
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
function toggleReminderDone(id) {
    toggleReminder(id); 
    loadReminders(); 
}
function deleteReminderItem(id) {
    deleteReminder(id); 
    loadReminders(); 
}
document.addEventListener('DOMContentLoaded', loadDashboardData);
