let db;
let transactionVer;

const request = indexedDB.open('Transaction', transactionVer || 1);

request.onupgradeneeded = function (e) {

  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore('transactions', { autoIncrement: true });
  }
};

request.onerror = function (e) {
  console.log(e.target.errorCode);
};

function checkDatabase() {
  let transaction = db.transaction(['transactions'], 'readwrite');

  const store = transaction.objectStore('transactions');

  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length !== 0) {
            transaction = db.transaction(['transactions'], 'readwrite');

            const recent = transaction.objectStore('transactions');

            recent.clear();
          }
        });
    }
  };
}

request.onsuccess = function (e) {
  db = e.target.result;

  if (navigator.online) {
    checkDatabase();
  }
};

const save = (rec) => {
  const transaction = db.transaction(['transactions'], 'readwrite');

  const store = transaction.objectStore('transactions');

  store.add(rec);
};

window.addEventListener('online', checkDatabase);