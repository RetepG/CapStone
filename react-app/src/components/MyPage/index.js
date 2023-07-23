import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteOpenModalButton from "../DeleteModalButton";
import DeleteItem from "../DeleteItem";
import { getAllItemThunk } from "../../store/item";
import "./MyPage.css";

const MyPage = () => {
    const user = useSelector((state) => state.session.user);
    const items = useSelector((state) => Object.values(state.item.items));
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItemThunk());
    }, [dispatch]);

    if (!items) return <p>Loading</p>;
    if (!user) return <h2>Please login to view your profile</h2>;

    const myitems = Object.values(items).filter((item) => item.user.id === user.id);

    return (
        <>
            <h1 className="MyPage-title">My Store</h1>
            <h2 className="MyPage-items">Items</h2>
            <div className="MyPage-wrapper">
                {myitems.map((item) => (
                    <div className="MyPage-item-container" key={item.id}>
                        <NavLink style={{ textDecoration: 'none' }} className="MyPage-items" exact to={`/items/${item.id}`}>
                            <p className="MyPage-name">{item.name}</p>
                            <div className="MyPage-mainimage-container">
                                <img className="MyPage-mainimage" src={`${item.mainimage}`} alt={item.name} />
                            </div>
                        </NavLink>
                        <div className="Mypage-buttons">
                            <button className="Mypage-update-item" onClick={() => history.push(`/items/${item.id}/update`)}>
                                Update
                            </button>
                            <DeleteOpenModalButton
                                className="Mypage-delete-item"
                                buttonText={`Delete item`}
                                modalComponent={<DeleteItem item_id={item.id} />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyPage;
