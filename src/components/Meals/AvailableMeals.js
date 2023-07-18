import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase,ref,onValue } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "....firebaseio.com",
  projectId: "playground-5ab",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const mealRef=ref(db,'MealsData')

const AvailableMeals = () => {
  let mealsList
  let me
  onValue(mealRef,(snapshot)=>{
    if (snapshot.exists()){
      const meals=Object.entries(snapshot.val())
      // console.log(meals)
      // me=meals.map((ml)=>console.log(ml[1].description))
      mealsList = meals.map((meal) => (
        <MealItem
          key={meal[1].id}
          id={meal[1].id}
          name={meal[1].name}
          description={meal[1].description}
          price={meal[1].price}
        />
      ));

    }
  })

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
