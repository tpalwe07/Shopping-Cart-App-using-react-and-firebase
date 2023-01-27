import { setDoc, doc, collection, getDoc } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (testdata) => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically

    let data = {
        items: testdata
    }

    try {
        let myDocument = doc(ref, "items");
        setDoc(myDocument, data)
    } catch (err) {
        console.log(err)
    }
}

const getAllItems = async()=> {
    const ref = doc(firestore, "test_data", "items");
    const docSnap = await getDoc(ref)

    if(docSnap.exists()){
        // console.log("We got the DATA", docSnap.id, docSnap.data().items );
        return docSnap.data().items;
    } else {
        console.log("No we didn't get the data");
        return [];
    }
}

export {handleSubmit, getAllItems};