import { useState } from "react";

//Card component used for books
//flag indicates if "add to bookshelf" button or not
export default function Card({ item , flag}) {

    const [addToBookShelf, setAddToBookShelf] = useState(flag);

    function handleOnClick(){
        setAddToBookShelf(true);
        localStorage.setItem(localStorage.length,JSON.stringify(item));
        console.log("added",localStorage.length);
    }

    return (
        <div className='card'>
            <p>
                <b>Book Title:  </b>{item.title}
            </p>
            <br />
            <br />
            <p>
                <b>Edition Count: </b>{item.editionCount}
            </p>
            <br />
            {
                    addToBookShelf ?
                    null
                    :<button style={{
                        color: 'white',
                        background: '#3cc33c',
                        border: 'none',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '7px',
                        paddingBottom: '7px',
                        borderRadius: '12px',
                    }} onClick={() => handleOnClick()}>Add to BookShelf</button>
            
            }        
        </div>
    );
}