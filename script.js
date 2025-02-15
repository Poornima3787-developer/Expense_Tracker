document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseTable = document.getElementById("expenseTable");
  loadExpensesFromLocalStorage();

  // Function to add a new expense
  function addExpense(event) {
    event.preventDefault();
    let expenseName = document.getElementById("expenseName").value;
    let expenseAmount = document.getElementById("expenseAmount").value;
    let expenseCategory = document.getElementById("expenseCategory").value;

    const obj = {
      expenseName,
      expenseAmount,
      expenseCategory,
    };

    localStorage.setItem(expenseName, JSON.stringify(obj));


    addusertoList(expenseName, expenseAmount,expenseCategory);
    // Clear input fields after adding
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "Movies";
  }
  function addusertoList(expenseName, expenseAmount,expenseCategory) {
    const userList = document.getElementById("userList");
    const li = document.createElement("li");
    li.id = expenseName;
    li.style.padding = "10px";
    li.style.marginBottom = "8px";
    li.style.border = "1px solid #ccc";
    li.style.borderRadius = "5px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.background = "#f9f9f9";
  
    const textNode = document.createTextNode(`📌 ${expenseName} → 💵 $${expenseAmount} | 🏷️ ${expenseCategory} `);

    li.appendChild(textNode);
  
    // Create Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Expense";
    editButton.style.marginLeft = "10px";
    editButton.style.padding = "5px 10px";
    editButton.style.background = "#007bff";
    editButton.style.color = "white";
    editButton.style.border = "none";
    editButton.style.borderRadius = "3px";
    editButton.style.cursor = "pointer";
    editButton.style.transition = "0.3s";
    editButton.addEventListener("mouseover", function () {
      editButton.style.background = "#0056b3";
    });
    editButton.addEventListener("mouseout", function () {
      editButton.style.background = "#007bff";
    });
    editButton.addEventListener("click", function () {
      editUser(expenseName);
    });
  
    // Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Expense";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.background = "#dc3545";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "3px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.transition = "0.3s";
    deleteButton.addEventListener("mouseover", function () {
      deleteButton.style.background = "#b02a37";
    });
    deleteButton.addEventListener("mouseout", function () {
      deleteButton.style.background = "#dc3545";
    });
    deleteButton.addEventListener("click", function () {
      DeleteUser(expenseName);
    });
  
    // Append buttons to the list item
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    userList.appendChild(li);
  }
  
  expenseForm.addEventListener("submit", addExpense);

  function DeleteUser(expenseName) {
    localStorage.removeItem(expenseName);
    let userLi = document.getElementById(expenseName);
    userLi.remove();
  }

  function editUser(expenseName) {
    let user = JSON.parse(localStorage.getItem(expenseName));
    DeleteUser(expenseName);
    document.getElementById("expenseName").value = user.expenseName;
    document.getElementById("expenseAmount").value = user.expenseAmount;
  }
  function loadExpensesFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let storedExpense = JSON.parse(localStorage.getItem(key));
      if (storedExpense) {
        addusertoList(storedExpense.expenseName, storedExpense.expenseAmount);
      }
    }
  }

  document.getElementById("clearExpensesBtn").addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("userList").innerHTML = ""; 
  });
  
});