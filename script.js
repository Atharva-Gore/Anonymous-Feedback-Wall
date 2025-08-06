const form = document.getElementById('feedbackForm');
const input = document.getElementById('feedbackInput');
const wall = document.getElementById('feedbackWall');

const colors = ['#fff7ae', '#c4f0c5', '#ffd6e0', '#d0e6ff', '#e1d7fc'];

let notes = JSON.parse(localStorage.getItem('feedbacks')) || [];

function saveNotes() {
  localStorage.setItem('feedbacks', JSON.stringify(notes));
}

function renderNotes() {
  wall.innerHTML = '';
  notes.forEach((text, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.style.backgroundColor = colors[index % colors.length];
    div.innerText = text;

    const delBtn = document.createElement('button');
    delBtn.innerText = '×';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      if (confirm("Delete this feedback?")) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      }
    };

    div.appendChild(delBtn);
    wall.appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const feedback = input.value.trim();
  if (feedback) {
    notes.push(feedback);
    input.value = '';
    saveNotes();
    renderNotes();
  }
});

renderNotes();
