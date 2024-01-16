import {useState} from 'react'
import './App.css'

function App() {

    return (
        <>
            <Header/>
            <GridSelect/>
            <Footer/>
        </>
    )
}

function Header() {
    return (
        <h1 className="text-2xl uppercase py-3 fixed top-0 left-0 right-0">bingo</h1>)
}

function Footer() {
    return (
        <footer>
            <div className="flex space-x-5 items-center justify-center w-1100 py-8">
                <a>Ivo</a>
            </div>
        </footer>
    )
}

function GridSelect() {
    return (
        <div className="flex-col bg-white p-5 text-black">
            <form className="flex flex-col gap-3.5">
                <input className="px-2" type="number" name="boxValue" placeholder="Enter Bingo"/>
                <button type="button">Create</button>
            </form>
        </div>)
}

function BingoGrid() {
    return (
        <div className="grid grid-cols-3 gap-3.5">
            <Box/>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
        </div>

    )
}

function Box() {
    return <div
        className="flex flex-col text-lg place-content-center bg-gray-600 p-2 rounded-md h-32 w-32 hover:bg-sky-700 hover:cursor-pointer">
        <input className="px-2" type="text" name="boxValue" placeholder="Enter text"/>
    </div>
}

export default App