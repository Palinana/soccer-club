import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = <div className="tag"
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add
        }}
    >
        {props.children}
    </div>

    if(props.link) {
        return (
            <Link to={props.linkTo}>{template}</Link>
        )
    }
    else {
        return template
    }
}

export const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=> {
        data.push({
            ...childSnapshot.val(), //adding all the values for each key 
            id: childSnapshot.key
        })
    });
    return data;
}

export const reverseArray = (arr) => {
    let reversedArr = [];
    
    for(let i=arr.length-1;i>=0;i--){
        reversedArr.push(arr[i]);
    }
    return reversedArr;
}


export const validate = (element) => {
    let error = [true, ''];

    if(element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error; 
    }

    if(element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
}