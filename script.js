document.addEventListener('DOMContentLoaded', () => {
    let expenseForm=document.getElementById("expense-form")
    let expenseNameInput=document.getElementById("expense-name")
    let expenseAmountInput=document.getElementById("expense-amount")
    let expenseList=document.getElementById("expense-list")
    let totalAmountDisplay=document.getElementById("total-amount")

    let expenses= JSON.parse(localStorage.getItem('expenses'))||[ ]
    let totalAmount= calculateTotal()
    renderExpenses();

     expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name=expenseNameInput.value.trim();
        let amount=parseFloat(expenseAmountInput.value.trim())
        
        if(name !=="" && !  isNaN(amount) && amount > 0){
            let newExpense= {
                id:Date.now(),
                name:name,
                amount:amount
            }
            expenses.push(newExpense)
            saveExpensesTolocal()
            renderExpenses()
            updateTotal()
            //clear input
            expenseNameInput.value="";
            expenseAmountInput.value="";
        }
     });

function renderExpenses(){
    expenseList.innerHTML=""
    expenses.forEach(expense => {
        let li= document.createElement('li')
      li.innerHTML = `<span>${expense.name} - $${expense.amount}</span><button data-id="${expense.id}">Delete</button>`;
        expenseList.appendChild(li);
    })
}

  function calculateTotal(){
 return expenses.reduce((sum,expense) => sum +expense.amount, 0)
  }

  function saveExpensesTolocal(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

function updateTotal(){
    totalAmount=calculateTotal();
    totalAmountDisplay.textContent=totalAmount.toFixed(2);
}
expenseList.addEventListener('click', (e) =>{
    if(e.target.tagName === 'BUTTON'){
        let expenseId=parseInt(e.target.getAttribute('data-id'))
        expenses=expenses.filter(expense => expense.id !== expenseId)
        saveExpensesTolocal();
        renderExpenses();
        updateTotal();
    }
})
})