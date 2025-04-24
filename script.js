// Cargar usuarios desde localStorage o usar los predeterminados
let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "usuario123" },
  { username: "empleado", password: "empleado123" }
];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
  const tableBody = document.querySelector("#users-table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input value="${user.username}" onchange="updateUsername(${index}, this.value)"></td>
      <td><input type="password" value="${user.password}" onchange="updatePassword(${index}, this.value)"></td>
      <td>
        <button onclick="deleteUser(${index})">Eliminar</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function updateUsername(index, newUsername) {
  users[index].username = newUsername;
  saveUsers();
  alert("Nombre de usuario actualizado.");
}

function updatePassword(index, newPassword) {
  users[index].password = newPassword;
  saveUsers();
  alert("Contraseña actualizada.");
}

function deleteUser(index) {
  if (users[index].username === "admin") {
    alert("No se puede eliminar al administrador.");
    return;
  }

  if (confirm(`¿Estás seguro de eliminar a "${users[index].username}"?`)) {
    users.splice(index, 1);
    saveUsers();
    loadUsers();
  }
}

function addUser() {
  const newUsername = document.getElementById("new-username").value.trim();
  const newPassword = document.getElementById("new-password").value.trim();

  if (!newUsername || !newPassword) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  if (users.find(u => u.username === newUsername)) {
    alert("Ese nombre de usuario ya existe.");
    return;
  }

  users.push({ username: newUsername, password: newPassword });
  saveUsers();
  loadUsers();

  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";

  alert("Usuario agregado con éxito.");
}
