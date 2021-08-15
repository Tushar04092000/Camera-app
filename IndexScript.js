let request = indexedDB.open("camera", 1);
let db;
request.onsuccess = function (e) {
    //  if exist then will get db from here 
    db = request.result;
}
request.onerror = function (err) {
    console.log(err)
}
request.onupgradeneeded = function () {
    // 1st  create 
    db = request.result;
    db.createObjectStore("img", { keyPath: "mid" });
    db.createObjectStore("video", { keyPath: "mid" });
}
function addMediaToDB(data, table) {
    if (db) {
        // you need to get transaction
        let tx = db.transaction(table, "readwrite");
        // get table refer
        let store = tx.objectStore(table);
        // add
        store.add({ mid: Date.now(), media: data });

    } else {
        alert("db is loading")
    }
}