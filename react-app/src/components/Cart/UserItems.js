import { useState, useEffect } from "react";
import { updateCartThunk, getUserCartThunk, removeOneThunk } from "../../store/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllItemThunk } from "../../store/item";

function CartItems({ item }) {
    const items = useSelector((state) => Object.values(state.item.items));
}
