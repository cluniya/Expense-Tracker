window.addEventListener('load', function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(function(expenseDetails) {
        showExpense(expenseDetails);
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    const amount = event.target.userexpenses.value;
    const description = event.target.expensedes.value;
    const category = event.target.category.value;

    const expenseDetails = {
        amount,
        description,
        category
    };

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expenseDetails);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    showExpense(expenseDetails);

    // Clear input fields after form submission
    event.target.userexpenses.value = '';
    event.target.expensedes.value = '';
    event.target.category.value = '';
}

function showExpense(expenseDetails) {
    const parentElem = document.getElementById('listOfitems');
    const listItem = document.createElement('li');

    // Creating delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.borderRadius = "5px";

    deleteButton.addEventListener('click', function() {
        removeExpense(expenseDetails);
        listItem.remove();
    });

    // Creating edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Expense';
    editButton.style.borderRadius = "5px"
    editButton.style.margin = "5px"
    editButton.addEventListener('click', function() {
        editExpense(expenseDetails);
        listItem.remove();
    });

    // Adding expense details, delete button, and edit button to list item
    listItem.textContent = `${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`;
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    parentElem.appendChild(listItem);
}

function removeExpense(expenseDetails) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.amount !== expenseDetails.amount && 
                                           expense.description !== expenseDetails.description && 
                                           expense.category !== expenseDetails.category);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function editExpense(expenseDetails) {
    // Populate input fields with existing values
    const amountInput = document.getElementById('userexpenses');
    const descriptionInput = document.getElementById('expensedes');
    const categoryInput = document.getElementById('category');

    amountInput.value = expenseDetails.amount;
    descriptionInput.value = expenseDetails.description;
    categoryInput.value = expenseDetails.category;
}

