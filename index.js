let editingRow = null;

const form = document.getElementById('form');

document.addEventListener('DOMContentLoaded', () => {
  loadTableData(); 
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('Username');
  const email = document.getElementById('Email');
  const mobileNumber = document.getElementById('mobileNumber');
  const date = document.getElementById('date');
  const genderMale = document.getElementById('genderMale');
  const genderFemale = document.getElementById('genderFemale');
  const genderOthers = document.getElementById('genderOthers');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const numberError = document.getElementById('numberError');
  const dateError = document.getElementById('dateError');
  const genderError = document.getElementById('genderError');

  let valid = true;

  // Username validation

  if (username.value.trim() === "") {
    nameError.textContent = 'Username is not required*';
    nameError.style.color = "red";
    nameError.style.fontSize = "12px";
    valid = false;
  } else {
    nameError.textContent = '';
  }

  // Email validation

  if (email.value.trim() === "") {
    emailError.textContent = 'Email is not required*';
    emailError.style.color = "red";
    emailError.style.fontSize = "12px";
    valid = false;
  } else {
    emailError.textContent = '';
  }

  // Mobile number validation

  if (mobileNumber.value.trim() === "") {
    numberError.textContent = 'Mobile Number is not required*';
    numberError.style.color = "red";
    numberError.style.fontSize = "12px";
    valid = false;
  } else {
    numberError.textContent = '';
  }

  // Date of birth validation

  if (date.value.trim() === "") {
    dateError.textContent = 'Date is not required*';
    dateError.style.color = "red";
    dateError.style.fontSize = "12px";
    valid = false;
  } else {
    dateError.textContent = '';
  }

  // Gender validation
  
  let selectedGender = '';
  if (genderMale.checked) {
    selectedGender = genderMale.value;
  } else if (genderFemale.checked) {
    selectedGender = genderFemale.value;
  } else if (genderOthers.checked) {
    selectedGender = genderOthers.value;
  } else {
    genderError.textContent = 'Gender is not required*';
    genderError.style.color = "red";
    genderError.style.fontSize = "12px";
    valid = false;
  }
  if (selectedGender) {
    genderError.textContent = '';
  }

  if (valid) {
    const rowData = {
      username: username.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
      date: date.value,
      gender: selectedGender
    };

    if (editingRow) {

        
      // Update existing row


      editingRow.cells[0].innerHTML = rowData.username;
      editingRow.cells[1].innerHTML = rowData.email;
      editingRow.cells[2].innerHTML = rowData.mobileNumber;
      editingRow.cells[3].innerHTML = rowData.date;
      editingRow.cells[4].innerHTML = rowData.gender;

      updateLocalStorage();
      editingRow = null;
    } else {

      // Add new row

      let tableBody = document.getElementById('table-body');
      let row = `
        <tr>
          <td>${rowData.username}</td>
          <td>${rowData.email}</td>
          <td>${rowData.mobileNumber}</td>
          <td>${rowData.date}</td>
          <td>${rowData.gender}</td>
          <td>
            <button class="btn bg-success edit-btn">Edit</button>
            <button class="btn bg-danger delete-btn">Delete</button>
          </td>
        </tr>`;

      tableBody.innerHTML += row;
      updateLocalStorage();
    }

    form.reset(); 
    
  }
});

// Edit Button

document.getElementById('table-body').addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-btn')) {
    const row = event.target.closest('tr');

    document.getElementById('Username').value = row.cells[0].innerHTML;
    document.getElementById('Email').value = row.cells[1].innerHTML;
    document.getElementById('mobileNumber').value = row.cells[2].innerHTML;
    document.getElementById('date').value = row.cells[3].innerHTML;
    if (row.cells[4].innerHTML === 'Male') {
      document.getElementById('genderMale').checked = true;
    } else if (row.cells[4].innerHTML === 'Female') {
      document.getElementById('genderFemale').checked = true;
    } else {
      document.getElementById('genderOthers').checked = true;
    }

    editingRow = row;
  }

  // Delete Button


  if (event.target.classList.contains('delete-btn')) {
    const row = event.target.closest('tr');
    row.remove();
    updateLocalStorage();
  }
});


// Save table data to local storage


function updateLocalStorage() {
  const tableBody = document.getElementById('table-body');
  const rows = tableBody.querySelectorAll('tr');
  const tableData = [];

  rows.forEach((row) => {
    const rowData = {
      username: row.cells[0].innerHTML,
      email: row.cells[1].innerHTML,
      mobileNumber: row.cells[2].innerHTML,
      date: row.cells[3].innerHTML,
      gender: row.cells[4].innerHTML
    };
    tableData.push(rowData);
  });

  localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Load table data from local storage


function loadTableData() {
  const storedData = localStorage.getItem('tableData');
  if (storedData) {
    const tableData = JSON.parse(storedData);
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    tableData.forEach((rowData) => {
      let row = `
        <tr>
        
          <td>${rowData.username}</td>
          <td>${rowData.email}</td>
          <td>${rowData.mobileNumber}</td>
          <td>${rowData.date}</td>
          <td>${rowData.gender}</td>
          <td>
            <button class="btn bg-success edit-btn">Edit</button>
            <button class="btn bg-danger delete-btn">Delete</button>
          </td>
        </tr>`;
      tableBody.innerHTML += row;
    });
  }
}





