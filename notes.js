console.log('Starting notes.js');

const fs = require('fs');

let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

let saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let logNote = (note) => {
  console.log(`\nTitle: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  };
};

let getAll = () => {
  return fetchNotes();

  // if (notes.length > 0) {
  //   for (i = 0; i < notes.length; i++){
  //     console.log(`\nTitle: ${notes[i].title}`);
  //     console.log(`Body: ${notes[i].body}`)
  //   }
  // } else {
  //   console.log('\nSorry, there are no notes to display.')
  // }
};

let getNote = (title) => {
  console.log('\nReading title', title);

  let notes = fetchNotes();

  let selectedNote = notes.filter((notes) => notes.title === title);
  return selectedNote[0];

  //return selectedNote[0].body;

  // let test = false;
  //
  // for (i = 0; i < notes.length; i++) {
  //   if (notes[i].title === title) {
  //     test = true;
  //     console.log(`\n Title: ${notes[i].title}`);
  //     console.log(` Body: ${notes[i].body}`);
  //   }
  // };
  // if (test === false) {
  //   console.log('\n Sorry, that title does not exist.')
  // }
};

let removeNote = (title) => {
  // console.log('--');
  // console.log('Removing title', title);

  let notes = fetchNotes();
  let filteredNotes = notes.filter((notes) => notes.title != title);
  saveNotes(filteredNotes);

  return notes.length != filteredNotes.length;

  // for (i = 0; i < notes.length; i++) {
  //   if (notes[i].title === title) {
  //     notes.splice(i, 1);
  //     saveNotes(notes);
  //     console.log('--');
  //     console.log('Successfully deleted: ', title);
  //   } else if (i === notes.length - 1) {
  //     console.log('--');
  //     console.log('Sorry, that title does not exist.');
  //   }
  // }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
