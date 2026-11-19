const expenseAmountInput = document.getElementById("expenseAmount");
const expenseMonthInput = document.getElementById("expenseMonth");
const expenseList = document.querySelector(".expense-list");

const budgetAmountInput = document.getElementById("budgetAmount");
const budgetCategoryInput = document.getElementById("budgetCategory");
const budgetList = document.querySelector(".budget-list");

function logdebt() {
    if (expenseAmountInput.value === '' || expenseMonthInput.value === '') {
        alert('Please fill in all fields!');
        return;
    }
    const amount = expenseAmountInput.value;
    const month = expenseMonthInput.value;
    const expense = saveExpense('debt', amount, month);
    const html = `
        <div class="expense-item loan" data-id="${expense.id}">
            <div class="expense-content">
                <div class="expense-title">Debt</div>
                <div class="expense-subtitle">Month: ${month}</div>
            </div>
            <div class="expense-amount">$${amount}</div>
            <i class="fas fa-trash delete-expense" onclick="deleteExpenseItem(${expense.id})" style="cursor:pointer;color:#ef4444;"></i>
        </div>
    `;
    expenseList.insertAdjacentHTML("beforeend", html);
    expenseAmountInput.value = '';
    expenseMonthInput.value = '';
}

function logsavings() {
    if (expenseAmountInput.value === '' || expenseMonthInput.value === '') {
        alert('Please fill in all fields!');
        return;
    }
    const amount = expenseAmountInput.value;
    const month = expenseMonthInput.value;
    const expense = saveExpense('savings', amount, month);
    const html = `
        <div class="expense-item" data-id="${expense.id}">
            <div class="expense-content">
                <div class="expense-title">Savings</div>
                <div class="expense-subtitle">Month: ${month}</div>
            </div>
            <div class="expense-amount">$${amount}</div>
            <i class="fas fa-trash delete-expense" onclick="deleteExpenseItem(${expense.id})" style="cursor:pointer;color:#ef4444;"></i>
        </div>
    `;
    expenseList.insertAdjacentHTML("beforeend", html);
    expenseAmountInput.value = '';
    expenseMonthInput.value = '';
}

function logbudget() {
    if (budgetAmountInput.value === '' || budgetCategoryInput.value === '') {
        alert('Please fill in all fields!');
        return;
    }
    const amount = parseFloat(budgetAmountInput.value);
    const category = budgetCategoryInput.value;
    const existingBudgets = getBudgets();
    let budgetExists = false;
    for (let i = 0; i < existingBudgets.length; i++) {
        if (existingBudgets[i].category === category) {
            budgetExists = true;
            break;
        }
    }
    if (budgetExists) {
        alert('Budget for this category already exists!');
        return;
    }
    const budget = saveBudget(category, amount);
    const spent = calculateSpentForCategory(category);
    const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    const html = `
        <div class="budget-item" data-id="${budget.id}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="expense-title" style="font-size: 16px;">${category}</span>
                <span class="expense-subtitle">${percentage.toFixed(1)}% Spent</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(percentage, 100)}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700;">
                <span>$${spent.toFixed(2)}</span>
                <span style="color: #64748b;">Limit: $${budget.limit.toFixed(2)}</span>
            </div>
            <i class="fas fa-trash delete-budget" onclick="deleteBudgetItem(${budget.id})" style="cursor:pointer;color:#ef4444; position: absolute; top: 10px; right: 10px;"></i>
        </div>
    `;
    budgetList.insertAdjacentHTML("beforeend", html);
    budgetAmountInput.value = '';
    budgetCategoryInput.value = '';
}

function calculateSpentForCategory(category) {
    const transactions = getTransactions();
    let spent = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'expense' && transactions[i].category === category) {
            spent += transactions[i].amount;
        }
    }
    return spent;
}

function deleteExpenseItem(id) {
    deleteExpense(id);
    loadExpenses();
}

function deleteBudgetItem(id) {
    deleteBudget(id);
    loadBudgets();
}

function loadExpenses() {
    const expenses = getExpenses();
    expenseList.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const html = `
            <div class="expense-item ${expense.type === 'debt' ? 'loan' : ''}" data-id="${expense.id}">
                <div class="expense-content">
                    <div class="expense-title">${expense.type === 'debt' ? 'Debt' : 'Savings'}</div>
                    <div class="expense-subtitle">Month: ${expense.month}</div>
                </div>
                <div class="expense-amount">$${expense.amount}</div>
                <i class="fas fa-trash delete-expense" onclick="deleteExpenseItem(${expense.id})" style="cursor:pointer;color:#ef4444;"></i>
            </div>
        `;
        expenseList.insertAdjacentHTML("beforeend", html);
    }
}

function loadBudgets() {
    const budgets = getBudgets();
    budgetList.innerHTML = '';
    for (let i = 0; i < budgets.length; i++) {
        const budget = budgets[i];
        const spent = calculateSpentForCategory(budget.category);
        const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
        const html = `
            <div class="budget-item" data-id="${budget.id}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="expense-title" style="font-size: 16px;">${budget.category}</span>
                    <span class="expense-subtitle">${percentage.toFixed(1)}% Spent</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${Math.min(percentage, 100)}%;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700;">
                    <span>$${spent.toFixed(2)}</span>
                    <span style="color: #64748b;">Limit: $${budget.limit.toFixed(2)}</span>
                </div>
                <i class="fas fa-trash delete-budget" onclick="deleteBudgetItem(${budget.id})" style="cursor:pointer;color:#ef4444; position: absolute; top: 10px; right: 10px;"></i>
            </div>
        `;
        budgetList.insertAdjacentHTML("beforeend", html);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    loadBudgets();
});
