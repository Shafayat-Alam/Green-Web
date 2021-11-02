import React, { useState, useRef, useEffect } from 'react'
// import CARD from './CARD'
import "./CARD_CONTAINER.css"
import './CARD.css'

import firebase from "../firebase.js";
import "firebase/firestore"
// import * as firebase from 'firebase';
import { v4 as uuidv4 } from "uuid";

import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function CARD_CONTAINER() {

    // const ref = firebase.firestore().collection('Entries')

    const entryCard = useRef()
    const [cardModal, setcardModal] = useState(false)
    // const [emptyTitle, setemptyTitle] = useState(false)

    const [cards, setcards] = useState([])
    // const [entries, setentries] = useState([])
    const [title, settitle] = useState("")
    const [titleEmpty, settitleEmpty] = useState(true)
    const [description, setdescription] = useState("")
    const [descriptionEmpty, setdescriptionEmpty] = useState(true)
    // const [category, setcategory] = useState("")
    // const [categoryEmpty, setcategoryEmpty] = useState(true)
    const [submit, setsubmit] = useState(false)
    const [loading, setloading] = useState(false)

    const [entries, setentries] = useState([])
    const entriesCollectionRef = collection(db, "entries");

    const createEntry = async () => {
        await addDoc(entriesCollectionRef, { 
            title: title, 
            titleEmpty: titleEmpty,
            submit: submit,
            description: description,
            descriptionEmpty: descriptionEmpty
        });

        window.location.reload();
    };

    const updateTitle = async ( id, title, titleEmpty) => {

        const entryDoc = doc(db, "entries", id);
        // const newFields = { age: age + 1 };
        const newTitle = {title: title}
        const newTitleEmpty = {titleEmpty: titleEmpty}
        await updateDoc(entryDoc, newTitle);
        await updateDoc(entryDoc, newTitleEmpty)
    };
    const updateDescription = async ( id, description, descriptionEmpty) => {

        const entryDoc = doc(db, "entries", id);
        // const newFields = { age: age + 1 };
        const newDescription = {description: description}
        const newDescriptionEmpty = {descriptionEmpty: descriptionEmpty}
        await updateDoc(entryDoc, newDescription);
        await updateDoc(entryDoc, newDescriptionEmpty)
    };

    
    // const deleteUser = async (id) => {
    //     const EntriesDoc = doc(db, "Entries", id);
    //     await deleteDoc(EntriesDoc);
    // };
    
    useEffect(() => {
        const getEntries = async () => {
          const data = await getDocs(entriesCollectionRef);
          setentries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getEntries();
    }, []);

    useEffect(() => {
        
    }, [])

    function handleClick(){
        // const cardModal = document.querySelector('card-modal')
        setcardModal(!cardModal)
    }
    function handleTitleClick({ title }){
        settitle(title)
    }
    
    function handleSubmitClick(){
        window.location.reload();
    }

    return (
        <>
        <div className = "card-container">
            <button className = "add-card-button" onClick = {createEntry}>
                <div className="vertical-line"></div>
                <div className="horizontal-line"></div>
            </button>
            {/* {cards.map( (i) => { 
                return i
            })} */}
            {entries.map((entry) => (
                 <div ref = {entryCard} className = "entry-card" onClick = {handleClick}>
                    <div className="title" >{
                            (entry.titleEmpty === false) ?
                            <div>{entry.title}</div>
                            :
                            <input 
                                className = "entered-title-input"
                                placeholder = "Enter Title"
                                onChange = {(event) => (
                                    settitle(event.target.value),
                                    settitleEmpty(false),
                                    updateTitle(entry.id, event.target.value, false)
                            )}
                            />
                            
                        }
                    </div>
                    <div className="description">{ 
                            (entry.descriptionEmpty === false) ?
                            <div className="entered-description">{entry.description}</div> :
                            <textarea
                                type = "text"
                                className="entered-description"
                                placeholder = "Enter Description"
                                onChange = {(event) => (
                                    setdescription(event.target.value),
                                    settitleEmpty(false),
                                    updateDescription(entry.id, event.target.value, false)
                                )}
                            ></textarea>
                        }
                    </div>
                    <div className="submit-container">
                        {/* <button className="delete-button" onClick = {handleDeleteClock(entry.id)}>Delete</button> */}
                        <button className="submit-button" onClick = {handleSubmitClick}>Submit</button>
                    </div>
                    {/* <div className={cardModal ? "card-modal active" : "card-modal"}>
                         <div className="close-button" onClick = {handleClick}>{entry.description}</div>
                    </div> */}
                    {/* ^^Doesn't work^^ */}
                </div>
            ))}
        </div>
        </>
    )
}
