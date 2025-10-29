/*
Exemplo de Database
Banco de Dados
└── Coleção: alunos
    ├── Documento: abc123
    │   ├── nome: "João"
    │   ├── idade: 15
    │   └── turma: "1A"
    ├── Documento: def456
    │   ├── nome: "Maria"
    │   ├── idade: 16
    │   └── turma: "2B"
    └── ...
*/

// #region Firestore Create Operations
async function CreateDoc(collection, data)
{
    alert("fireCRUD CreateDoc called");
    //return await firebase.firestore().collection(collection).add(data);
}

async function CreateDocWithId(collection, docId, data)
{
    return await firebase.firestore().collection(collection).doc(docId).set(data);
}

async function CreateDocs(collection, docs)
{
    const batch = firebase.firestore().batch();
    docs.forEach(doc => {
        const docRef = firebase.firestore().collection(collection).doc();
        batch.set(docRef, doc);
    });

    return await batch.commit();
}
// #endregion Firestore Create Operations

// #region Firestore Read Operations
async function GetCollection(collection)
{
    const snapshot = await firebase.firestore().collection(collection).get();
    return snapshot.docs.map(doc => doc.data());
}

async function GetDocByID(docId)
{
    const doc = await firebase.firestore().doc(docId).get();
    return doc.data();
}

async function GetDocByName(collection, docName)
{
    const snapshot = await firebase.firestore().collection(collection).where("name", "==", docName).get();
    return snapshot.docs.map(doc => doc.data());
}

async function GetDocByCondition(collection, field, operator, value)
{
    const snapshot = await firebase.firestore().collection(collection).where(field, operator, value).get();
    return snapshot.docs.map(doc => doc.data());
}
// #endregion Firestore Read Operations

// #region Firestore Update Operations
async function UpdateDocById(docId, data)
{
    return await firebase.firestore().doc(docId).update(data);
}

async function UpdateDocs(collection, updates)
{
    const batch = firebase.firestore().batch();
    updates.forEach(({ id, data }) => {
        const docRef = firebase.firestore().collection(collection).doc(id);
        batch.update(docRef, data);
    });

    return await batch.commit();
}

async function UpdateDocsByCondition(collection, field, operator, value, data)
{
    const snapshot = await firebase.firestore().collection(collection).where(field, operator, value).get();
    const batch = firebase.firestore().batch();

    snapshot.forEach(doc => {
        const docRef = firebase.firestore().collection(collection).doc(doc.id);
        batch.update(docRef, data);
    });

    return await batch.commit();
}
// #endregion Firestore Update Operations

//#region Firestore Delete Operations
async function DeleteDocById(docId)
{
    return await firebase.firestore().doc(docId).delete();
}

async function DeleteDocsByCondition(collection, field, operator, value)
{
    const snapshot = await firebase.firestore().collection(collection).where(field, operator, value).get();
    const batch = firebase.firestore().batch();

    snapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    return await batch.commit();
}
// #endregion Firestore Delete Operations