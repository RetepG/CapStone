import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllItemThunk } from "../../store/item";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => Object.values(state.item.items));
    const user = useSelector((state) => state.session.user);
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        dispatch(getAllItemThunk());
    }, [dispatch]);

    useEffect(() => {
        if (items.length > 0 && featuredItems.length === 0) {
            const randomItems = getRandomItems(items, 5);
            setFeaturedItems(randomItems);
        }
    }, [items, featuredItems]);

    const getRandomItems = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div className="landing-page-whole">
            <h1 className="Greeting">
                {user ? `Welcome back, ${user.username}!` : "Welcome to PawCo!"}
            </h1>
            <div className="Landing-Page-Container">
                {featuredItems.length > 0 ? (
                    <div className="Featured-Items-Container">
                        <h2 className="Featured-Title">Featured Items</h2>
                        <ul className="Featured-Items-List">
                            {featuredItems.map((item) => (
                                <li key={item.id}>
                                    <NavLink className="Redirect_ItemId" to={`/items/${item.id}`}>
                                        <img className="mainpic" src={item.mainimage} alt={item.name} />
                                        {/* <p className="price-landing">${item.price.toFixed(2)}</p> */}
                                        <p className="price-landing">${item.price}</p>
                                        <div className="landing-name">{item.name}</div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No featured items available</p>
                )}
                <div className="background-white">
                    {items.length > 0 ? (
                        <ul className="All-Items-List">
                            {items.map((item) => {
                                if (!featuredItems.some((featuredItem) => featuredItem.id === item.id)) {
                                    return (
                                        <li key={item.id}>
                                            <NavLink className="Redirect_ItemId" to={`/items/${item.id}`}>
                                                <img className="mainpic" src={item.mainimage} alt={item.name} />
                                                {/* <p className="price-landing">${item.price.toFixed(2)}</p> */}
                                                <p className="price-landing">${item.price}</p>
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    ) : (
                        <p>No items available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
