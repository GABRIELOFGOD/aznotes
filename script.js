// Select DOM elements
const noteInput = document.getElementById('note-input');
const saveNoteButton = document.getElementById('save-note');
const notesList = document.getElementById('notes-list');

// Get notes from localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Render notes
function renderNotes() {
    const notes = getNotes();
    notesList.innerHTML = notes.map((note, index) => `
        <div class=\"note-item\" data-index=\"${index}\">
            <p>${note}</p>
            <div class=\"note-actions\">
                <button class=\"edit-note\">Edit</button>
                <button class=\"delete-note\">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add a new note
function addNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) return alert('Please enter a note!');
    
    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);
    noteInput.value = '';
    renderNotes();
}

// Edit a note
function editNote(index) {
    const notes = getNotes();
    const newText = prompt('Edit your note:', notes[index]);
    if (newText !== null) {
        notes[index] = newText.trim();
        saveNotes(notes);
        renderNotes();
    }
}

// Delete a note
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

// Event listener for save button
saveNoteButton.addEventListener('click', addNote);

// Event listener for note actions
notesList.addEventListener('click', (e) => {
    const noteItem = e.target.closest('.note-item');
    if (!noteItem) return;

    const index = noteItem.dataset.index;
    if (e.target.classList.contains('delete-note')) {
        deleteNote(index);
    } else if (e.target.classList.contains('edit-note')) {
        editNote(index);
    }
});

// Initial render
renderNotes();
