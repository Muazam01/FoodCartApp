import classes from './Checkout.module.css'
import { useReducer, useState } from "react"
import SendData from './send-data'

// const { useState, useReducer } = require("react")

const defaultDetails=()=>{
    return{
        nameVal:'',addressVal:'',numberVal:'',valid:false
    }
}

const detailsReducer=(state,action)=>{
    if (action.type==='NAME' && action.valid){
        return{
            ...state,
            nameVal:action.value
        }

    }
    else if (action.type==='ADDRESS' && action.valid){
        return{
            ...state,
            addressVal:action.value
        }
        
    }
    else if (action.type==='NUMBER' && action.valid){
        return{
            ...state,
            numberVal:action.value
        }
        
    }
    else if(action.type==='clear'){
        return{
            ...state,
            nameVal:'',addressVal:'',numberVal:''
        }
    }
    return state
}

const CheckoutForm=(props)=>{
    const [confirmed,setconfirmed]=useState(false)
    const [submitted,setsubmitted]=useState(false)
    const [details,dispatchDetails]=useReducer(detailsReducer,defaultDetails)

    const nameHandler=(evt)=>{
        dispatchDetails({
            type:'NAME',value:evt.target.value,valid:evt.target.value!==''
        })

    }
    const addressHandler=(evt)=>{
        dispatchDetails({type:'ADDRESS',value:evt.target.value,valid:evt.target.value!==''})
        
    }
    const numberHandler=(evt)=>{
        dispatchDetails({type:'NUMBER',value:evt.target.value,valid:evt.target.value!==''})
    }
    const handleSubmit=(evt)=>{
        evt.preventDefault()
        
        const nameVal = details.nameVal ? details.nameVal.trim() : '';
        const addressVal = details.addressVal ? details.addressVal.trim() : '';
        const numberVal = details.numberVal ? details.numberVal.trim() : '';
      
        if (nameVal === '' || addressVal === '' || numberVal === '') {
          alert("Input fields cannot be empty")
          return;
        }

        setsubmitted(true)
        dispatchDetails({type:'clear'})
        props.onFormSubmit()
        setconfirmed(true)
        alert("Order Confirmed")

        // console.log("submitted")
        // console.log(details.nameVal)
        // console.log(details.addressVal)
        // console.log(details.numberVal)
    }

    return(
        <div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label>Name</label>
                    <input value={details.nameVal} type="text" onChange={nameHandler}></input>
                </div>
                <div className={classes.control}>
                    <label>Address</label>
                    <input value={details.addressVal} type="text" onChange={addressHandler}></input>
                </div>
                <div className={classes.control}>
                    <label>Phone Number</label>
                    <input value={details.numberVal} type="tel" onChange={numberHandler}></input>
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={props.onClose}>Cancel</button>
                    <button type='submit' className={classes.submit}>Confirm</button>
                </div>
                
            </form>
            {submitted?<SendData name={details.nameVal} address={details.addressVal} number={details.numberVal}/>:null}
            {confirmed?<p>Done</p>:null}
       
        </div>
    )
}

export default CheckoutForm