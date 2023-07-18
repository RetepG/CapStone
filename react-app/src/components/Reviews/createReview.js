import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createReviewThunk } from "../../store/review"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux"

const CreateReview = ({itemId}) => {
    const user = useSelector(state => state.session.user)
    
}
