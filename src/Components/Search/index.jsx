import { useState, useEffect } from "react";
import Suggestions from "./suggestions";
import './Style.css'


export default function Search() {

    const [books, setBooks] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(false);
    

    //Calls the API
    async function fetchListOfBooks() {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchParam}&limit=10&page=1`)
            const data = await response.json();
            console.log(data);

            if (data && data.docs && data.docs.length) {
                setBooks(data.docs.map((dataItem) => ({
                    title: dataItem.title,
                    editionCount: dataItem.edition_count,
                })));
            }

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        fetchListOfBooks();
    }, [])

    //filters data from API based on our search
    function handleChange(event) {
        const query = event.target.value.toLowerCase();
        setSearchParam(query);
        console.log(searchParam);
        if (query.length > 1) {
            const filteredData =
                books && books.length
                    ? books.filter((item) => item.title.toLowerCase().indexOf(query) > -1)
                    : [];
            setFilteredBooks(filteredData);
            console.log(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
        fetchListOfBooks();
    }

    function handleClick(event) {
        setShowDropdown(false)
        setSearchParam(event.target.innerText)
        setFilteredBooks([])
    }


    // displays my bookshelf page
    if(bookshelf){
        var stored = [];
        for(let i=0;i<localStorage.length;++i){
            stored.push(JSON.parse(localStorage.getItem(i)));
            console.log(JSON.parse(localStorage.getItem(i)));
            console.log(stored);
        }

        return(
           <div>
            <h1>My Bookshelf</h1>
            <Suggestions data = {stored} flag={true}/>
           </div> 
        );
    }

    return (
        //displays main page 
        <div>

            <div className="top">
                <div>
                    <h1>Search by book name:</h1>
                    <input value={searchParam}
                        type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className="right">
                    <button style={{
                        color: 'white',
                        background: '#3cc33c',
                        border: 'none',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '7px',
                        paddingBottom: '7px',
                        fontSize: 'medium',
                        borderRadius: '12px',
                    }} onClick={() => setBookshelf(true)}>My Bookshelf</button>
                </div>
            </div>


            <div>
                {showDropdown && <Suggestions handleClick={handleClick} data={filteredBooks} flag={false} />}
            </div>
        </div>
    );
}