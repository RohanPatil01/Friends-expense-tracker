// 📊 Expense tracker logic

// Initialize an array to store expenses
const expenses = [];

// Event listeners for buttons
document.getElementById('addExpense').addEventListener('click', addExpense);
document.getElementById('calculateBalance').addEventListener('click', calculateBalance);

// Function to add an expense
function addExpense() {
  // Get input values
  const expense = document.getElementById('expense').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const paidBy = document.getElementById('paidBy').value;
  const paidForRohan = document.getElementById('paidForRohan').checked;
  const paidForSid = document.getElementById('paidForSid').checked;
  const paidForShaggy = document.getElementById('paidForShaggy').checked;
  
  // Create an array to store individuals involved in the expense
  const paidFor = [];
  // Add individuals to the array based on checkbox status
  if (paidForRohan) paidFor.push('Rohan');
  if (paidForSid) paidFor.push('Sid');
  if (paidForShaggy) paidFor.push('Shaggy');

  // Check if all required fields are filled
  if (expense && amount && paidBy && paidFor.length > 0) {
    // Add the expense object to the expenses array
    expenses.push({ expense, amount, paidBy, paidFor });
    // Update the HTML to display the newly added expense
    document.getElementById('expenseList').innerHTML += `<li>${expense}: Rs. ${amount} (Paid by ${paidBy}, for ${paidFor.join(', ')})</li>`;
    // Clear input fields
    document.getElementById('expense').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('paidBy').value = '';
    document.getElementById('paidForRohan').checked = false;
    document.getElementById('paidForSid').checked = false;
    document.getElementById('paidForShaggy').checked = false;
  } else {
    // Alert the user if any required field is empty
    alert('Please enter expense, amount, who paid for it, and who it was paid for.');
  }
}

// Function to calculate balances
function calculateBalance() {
  // Object to store balances
  const balances = {};
  
  // Iterate through each expense
  expenses.forEach(({ amount, paidBy, paidFor }) => {
    // Calculate share amount for each individual involved
    const shareAmount = amount / paidFor.length;
    // Update balances for each individual
    paidFor.forEach(person => {
      if (person !== paidBy) {
        balances[person] = (balances[person] || 0) + shareAmount;
      }
    });
    balances[paidBy] = (balances[paidBy] || 0) - amount;
  });

  // Display balance result
  const result = document.getElementById('balanceResult');
  result.innerHTML = '';

  // Iterate through balances and display the result
  Object.keys(balances).forEach(person => {
    result.innerHTML += `<p>${person} owes Rs. ${balances[person]}</p>`;
  });
}
