let notes = [];
let editingNoteId = null;
const dialog = document.getElementById("noteDialog");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const saveButton = document.getElementById("saveNote");
const cancelButton = document.getElementById("cancelNote");
const notesContainer = document.getElementById("notesContainer");
const noteForm = document.getElementById("noteForm");
const dialogTitle = document.getElementById("dialogTitle");

loadThemePreference();
loadNotesFromLocalStorage();

document.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeNoteDialog();
  }
});

noteForm.addEventListener("submit", saveNote);

function saveNote(event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (editingNoteId) {
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title,
      content: content,
    };
  } else {
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
    });
  }

  titleInput.value = "";
  contentInput.value = "";
  saveNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  closeNoteDialog();
}

function generateId() {
  return Date.now().toString();
}

function openNoteDialog(noteId = null) {
  dialog.showModal();
  titleInput.focus();
  if (noteId) {
    const note = notes.find((note) => note.id === noteId);
    editingNoteId = noteId;
    dialogTitle.textContent = "Edit Note";
    titleInput.value = note.title;
    contentInput.value = note.content;
  } else {
    editingNoteId = null;
    dialogTitle.textContent = "Add Note";
    titleInput.value = "";
    contentInput.value = "";
  }
}

function closeNoteDialog() {
  dialog.close();
}
function renderNotes() {
  if (notes.length === 0) {
    notesContainer.innerHTML = `
    <div class='empty-state'>
      <h2>No notes yet</h2>
      <p >Create your first note by clicking the </p>
      <button class= 'add-note-btn' onclick="openNoteDialog()" id='add-note-btn'>Add Note</button>
    </div>`;

    return;
  }
  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div class= "note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z"/></svg></button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
      </div>
    </div>
  `,
    )
    .join("");
}

function modeChange() {
  const body = document.body;
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "🌙";
  } else {
    body.classList.add("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "☀️";
  }
  saveThemePreference();
}

function loadNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    renderNotes();
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
}

function saveThemePreference() {
  const isDarkMode = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

function loadThemePreference() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "🌙";
  }
}
