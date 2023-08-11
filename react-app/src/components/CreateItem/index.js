import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createItemThunk } from "../../store/item";
import { useHistory } from "react-router-dom";
import "./createItem.css"

function CreateItem() {
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

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

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     const charCount = value.length;
    //     setFormValues(prevState => ({
    //         ...prevState,
    //         [name]: value,
    //         charCount,
    //     }));
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "description") {
            const charCount = value.length;
            setFormValues(prevState => ({
                ...prevState,
                [name]: value,
                charCount,
            }));
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
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

        if (name.trim().length === 0) {
            errorObj.name = "Name is required";
        } else if (name.length < 2 || name.length > 25) {
            errorObj.name = "Name must be between 2 and 25 characters";
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            errorObj.price = "Price must be a positive number";
        }

        if (description.trim().length === 0) {
            errorObj.description = "Description is required";
        } else if (description.length > 350) {
            errorObj.description = "Description must be at most 350 characters";
        }

        if (!mainimage) {
            errorObj.mainimage = "Main image is required";
        }

        if (!sideimage) {
            errorObj.sideimage = "Side image is required";
        }

        if (!sideimage2) {
            errorObj.sideimage2 = "Side image 2 is required";
        }

        if (!sideimage3) {
            errorObj.sideimage3 = "Side image 3 is required";
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj);
            return;
        }

        if (!currentUser) {
            return <h1>Please sign in</h1>;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("user_id", currentUser.id);
        for (const key in formValues) {
            if (key === "upload1" || key === "upload2" || key === "upload3" || key === "upload4") {
                continue;
            }
            formData.append(key, formValues[key]);
        }

        await dispatch(createItemThunk(formData));

        setIsLoading(false);
        history.push("/");
    };

    return (
        <div className="create-item-container">
            <form id="create-item-form" encType="multipart/form-data" onSubmit={handleSubmit} method="POST">
                <h1>Create Listing</h1>
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
                    <div>Description (Max 350 Characters)</div>
                    <textarea
                        rows={10}
                        className="item_description"
                        type="text"
                        name="description"
                        value={formValues.description}
                        placeholder="Item Description"
                        onChange={handleChange}
                    />
                    <div className="char-counter">
                        {formValues.charCount}/350 characters
                    </div>
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
                        </div>
                        {error.mainimage && <p className="error-message">{error.mainimage}</p>}
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
                <div className="submit_button-create-item">
                    <button className="Submit-create-item-button" type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateItem;
