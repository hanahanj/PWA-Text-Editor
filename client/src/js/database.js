import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// DONE: Add logic to a method that accepts some content and adds it to the database

  export const putDb = async (content) => {
    console.log('PUT to the database');

  // Create a connection to the database and specify the version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update an entry
  const request = store.put({ id: 1, content });

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
    };

// DONE: Add logic for a method that gets all the content from the database

export const getAllDb = async () => {
  console.log('GET all from the database');

  const db = await initdb();

  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  
  // Return the content if data exists
  return result.length ? result[0].content : null;
};

initdb();
