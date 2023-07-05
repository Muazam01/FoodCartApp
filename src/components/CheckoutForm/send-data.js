

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase,ref,push} from "firebase/database";


// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: ""
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dataRef=ref(db,'FormData')

const SendData=(props)=>{
    if (!props.name || !props.address || !props.number) {
        // Handle invalid or empty form data
        return;
    }
    const formData={
        name:props.name,
        address:props.address,
        number:props.number
    }
    push(dataRef,formData)


    
}

export default SendData




