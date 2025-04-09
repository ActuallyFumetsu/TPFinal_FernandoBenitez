let users = [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "usuario123" }
];

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    if (user.username === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "usuario.html";
    }
  } else {
    errorMsg.textContent = "Usuario o contraseña incorrectos.";
    errorMsg.style.color = "red";
  }
}

function loadUsers() {
  const tableBody = document.querySelector("#users-table tbody");
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input value="${user.username}" onchange="updateUsername(${index}, this.value)"></td>
      <td><input type="password" value="${user.password}" onchange="updatePassword(${index}, this.value)"></td>
      <td><button onclick="deleteUser(${index})">Eliminar</button></td>
    `;

    tableBody.appendChild(row);
  });
}

function updateUsername(index, newUsername) {
  users[index].username = newUsername;
  alert("Usuario actualizado");
}

function updatePassword(index, newPassword) {
  users[index].password = newPassword;
  alert("Contraseña actualizada");
}

function deleteUser(index) {
  if (users[index].username === "admin") {
    alert("No se puede eliminar al administrador");
    return;
  }
  users.splice(index, 1);
  loadUsers();
}
