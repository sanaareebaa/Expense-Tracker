# PAYZEE - Personal Finance & Budget Tracker

**PAYZEE** is a full-featured personal finance and budget management web application designed to help users track transactions, monitor category-wise spending limits, plan savings, and manage financial reminders.

##  Features
- **User Authentication:** Secure user registration and login system powered by PHP and MySQL with password hashing and session management.
- **Interactive Dashboard:** Real-time overview of total income, expenses, and net balance.
- **Transaction Management:** Add, view, and categorize incoming and outgoing transactions.
- **Budget Monitoring:** Set budget limits across different categories with dynamic visual progress bars.
- **Debt & Savings Logger:** Track monthly debt items and savings goals.
- **Reminders & Wishlists:** Schedule financial reminders with completion tracking and organize future wishlist purchase targets.

##  Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS with `localStorage` state handling)
- **Backend:** PHP (Session management, form validation, and authentication routing)
- **Database:** MySQL (Relational user data management via MySQLi)
- **UI Libraries & Fonts:** Font Awesome, Google Fonts (*Plus Jakarta Sans*)

##  Project Structure
```text
payzee/
├── index.php           # Landing page with Login & Sign Up forms
├── dashboard.html      # Main user dashboard interface
├── budget.html         # Fixed expenses and budget category management
├── transaction.html    # Detailed transaction views
├── wishlist.html       # Savings and wishlist management
├── config.php          # Database connection configuration
├── login_register.php  # Backend authentication script
├── logout.php          # Session termination script
├── dashboard.js        # Dashboard state and UI controllers
├── budget.js           # Budget progress calculations and logic
├── index.js            # Form toggling logic
└── storage.js          # LocalStorage handlers for client-side data
```


