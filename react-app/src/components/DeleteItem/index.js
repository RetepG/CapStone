import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteItemThunk } from "../../store/item";
import { useHistory } from "react-router-dom";
import "./deleteitem.css"

function DeleteItem({ item_id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (shouldDelete) => {
        if (shouldDelete) {
            await dispatch(deleteItemThunk(item_id));
            history.push("/");
        }
        closeModal();
    };

    return (
        <div className="delete-item-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this Item?</p>
            <div className="delete-button-container">
                <button onClick={() => handleDelete(true)} className="delete-item-button">
                    Yes (Delete Item)
                </button>
                <button onClick={() => handleDelete(false)} className="cancel-item-button">
                    No (Keep Item)
                </button>
            </div>
        </div>
    );
}

export default DeleteItem;
