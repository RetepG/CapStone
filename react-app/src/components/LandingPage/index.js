import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getAllItemThunk, deleteItemThunk } from "../../store/item"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"

function LandingPage() {
    const dispatch = useDispatch()
    const items = useSelector(state => Object.values(state.item.items));

    useEffect(() => {
        dispatch(getAllItemThunk());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteItemThunk(id));
    };

    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Item List</h1>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.name}>
                            {item.name /* Replace with actual property name */}
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}

export default LandingPage
