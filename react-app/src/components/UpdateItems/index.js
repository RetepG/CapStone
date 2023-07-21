import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getItemIdThunk, updateItemThunk } from "../../store/item";
import { useParams, useHistory } from 'react-router-dom';
import "./updateItem.css"

function UpdateItem() {
    const { itemId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const item = useSelector((state) => state.item.items[itemId]);

    const [formValues, setFormValues] = useState({
        name: '',
        price: 0,
        description: '',
        mainimage: null,
        sideimage: null,
        sideimage2: null,
        sideimage3: null,
        upload1: "No file uploaded",
        upload2: "No file uploaded",
        upload3: "No file uploaded",
        upload4: "No file uploaded",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getItemIdThunk(itemId));
    }, [dispatch, itemId]);

    useEffect(() => {
        if (item) {
            setFormValues({
                name: item.name,
                price: item.price,
                description: item.description,
                mainimage: null,
                sideimage: null,
                sideimage2: null,
                sideimage3: null,
                upload1: "No file uploaded",
                upload2: "No file uploaded",
                upload3: "No file uploaded",
                upload4: "No file uploaded",
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddImage = (name, e) => {
        const file = e.target.files[0];
        setFormValues(prevState => ({
            ...prevState,
            [name]: file,
            [name.replace('image', 'fileUpload')]: file ? file.name : "No file uploaded"
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, description, mainimage, sideimage, sideimage2, sideimage3 } = formValues;

        const errorObj = {};

        if (!name || name.trim().length === 0) {
            errorObj.name = "Name is required";
        } else if (name.length < 2 || name.length > 30) {
            errorObj.name = "Name must be between 2 and 30 characters";
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            errorObj.price = "Price must be a positive number";
        }

        if (!description || description.trim().length === 0) {
            errorObj.description = "Description is required";
        } else if (description.length > 150) {
            errorObj.description = "Description must be at most 150 characters";
        }

        if (!mainimage) {
            errorObj.mainimage = "Main Image is required";
        }

        if (!sideimage) {
            errorObj.sideimage = "Side Image is required";
        }

        if (!sideimage2) {
            errorObj.sideimage2 = "Side Image 2 is required";
        }

        if (!sideimage3) {
            errorObj.sideimage3 = "Side Image 3 is required";
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj);
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("user_id", currentUser.id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("mainimage", mainimage);
        formData.append("sideimage", sideimage);
        formData.append("sideimage2", sideimage2);
        formData.append("sideimage3", sideimage3);

        await dispatch(updateItemThunk(formData, itemId));

        setIsLoading(false);
        history.push("/");
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <h1>Please sign in</h1>;
    }

    if (item.user.id !== currentUser.id) {
        return <h1>You do not have permission to edit this item.</h1>;
    }
    console.log(`${currentUser.id}@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
    console.log(`${item.user_id}@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)

    return (
        <div className="update-item-container">
            <form id="update-item-form" encType="multipart/form-data" onSubmit={handleSubmit} method="POST">
                <h1>Update Listing</h1>
                <label>
                    Name
                    <input
                        className="item_name"
                        type="text"
                        name="name"
                        value={formValues.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    {error.name && <p className="error-message">{error.name}</p>}
                </label>
                <label>
                    Price
                    <input
                        className="item_price"
                        type="number"
                        name="price"
                        value={formValues.price}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    {error.price && <p className="error-message">{error.price}</p>}
                </label>
                <label>
                    <div>Description</div>
                    <textarea
                        rows={10}
                        className="item_description"
                        type="text"
                        name="description"
                        value={formValues.description}
                        placeholder="Item Description"
                        onChange={handleChange}
                    />
                    {error.description && <p className="error-message">{error.description}</p>}
                </label>
                <div className="img_upload_area">
                    <div className="img_upload_test">
                        Main Image
                        <div className="file-input-upload">
                            <input
                                className="main-img-create"
                                type="file"
                                name="mainimage"
                                accept="image/*"
                                onChange={(e) => handleAddImage("mainimage", e)}
                            ></input>
                            <div className="uploaded">{formValues.upload1}</div>
                            {error.mainimage && <p className="error-message">{error.mainimage}</p>}
                        </div>
                    </div>
                    <div className="img_upload_test">
                        Side Image
                        <div className="file-input-upload">
                            <input
                                className="side_img_create"
                                type="file"
                                name="sideimage"
                                accept="image/*"
                                onChange={(e) => handleAddImage("sideimage", e)}
                            ></input>
                            <div className="uploaded">{formValues.upload2}</div>
                            {error.sideimage && <p className="error-message">{error.sideimage}</p>}
                        </div>
                    </div>
                    <div className="img_upload_test">
                        Side Image 2
                        <div className="file-input-upload">
                            <input
                                className="side_img_create"
                                type="file"
                                name="sideimage2"
                                accept="image/*"
                                onChange={(e) => handleAddImage("sideimage2", e)}
                            ></input>
                            <div className="uploaded">{formValues.upload3}</div>
                            {error.sideimage2 && <p className="error-message">{error.sideimage2}</p>}
                        </div>
                    </div>
                    <div className="img_upload_test">
                        Side Image 3
                        <div className="file-input-upload">
                            <input
                                className="side_img_create"
                                type="file"
                                name="sideimage3"
                                accept="image/*"
                                onChange={(e) => handleAddImage("sideimage3", e)}
                            ></input>
                            <div className="uploaded">{formValues.upload4}</div>
                            {error.sideimage3 && <p className="error-message">{error.sideimage3}</p>}
                        </div>
                    </div>
                </div>
                <div className="submit_button-update-item">
                    <button className="Submit-update-item-button" type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateItem;
