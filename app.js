// requires file system module
const fs = require('fs');
// requires lodash module
const _ = require('lodash')
// requires yargs
const yargs = require('yargs');

// require a user file for reference
const notes = require('./notes.js');
const titleOptions = {
  describe: 'Title of note:',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Enter a note body here.',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note.', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes.')
  .command('read', 'Read a note.', {
    title: titleOptions
  })
  .command('remove', 'Remove a note.', {
    title: titleOptions
  })
  .help()
  .argv;

let command = argv._[0];

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('\nNote successfully added!');
    notes.logNote(note);
  } else {
    console.log('\nSorry, this note title already exists, please choose another title.');
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`\nPrinting ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log('\nNote found!');
    notes.logNote(note);
  } else {
    console.log('\nSorry, that note does not exist.')
  }
} else if (command === 'remove') {
  let message = notes.removeNote(argv.title);
  console.log(message ? '\nNote successfully removed.' : '\nSorry, that note does not exist.');
} else {
  console.log('\nCommand not recognized');
}
