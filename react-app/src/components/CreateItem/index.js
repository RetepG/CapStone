import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createItemThunk } from "../../store/item";

const imageUploadState = {
    mainimage: null,
    sideimage: null,
    sideimage2: null,
    sideimage3: null,
};

function CreateItem() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [imgUpload, setImgUpload] = useState(imageUploadState);
    const [errors, setErrors] = useState([]);

    const handleAddImage = (e, imageKey) => {
        const file = e.target.files[0];
        setImgUpload((prevState) => ({
            ...prevState,
            [imageKey]: file,
        }));
    };

    const handleImgSubmission = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setErrors(["Sign In to continue"]);
            return;
        }

        const errorObj = {};
        if (name.length === 0) {
            errorObj.name = "Name is required";
        } else if (name.length < 2 || name.length > 30) {
            errorObj.name = "Name must be between 2 and 30 characters";
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            errorObj.price = "Price must be a positive number";
        }

        if (description.length === 0) {
            errorObj.description = "Description is required";
        } else if (description.length > 150) {
            errorObj.description = "Description must be at most 150 characters";
        }

        const imageKeys = Object.keys(imgUpload);
        let counter = 0;
        for (const key of imageKeys) {
            if (imgUpload[key]) {
                counter++;
            }
        }
        if (counter < 4) {
            errorObj.image = "Must upload at least 4 images minimum.";
        }

        setErrors(errorObj);
        if (Object.keys(errorObj).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", parsedPrice.toFixed(2).toString());
        formData.append("description", description);
        formData.append("user_id", currentUser.id);
        imageKeys.forEach((key) => {
            const file = imgUpload[key];
            if (file) {
                formData.append(key, file);
            }
        });

        dispatch(createItemThunk(formData))
            .then(() => {
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="create-container">
            <form
                className="Create-listing-form"
                encType="multipart/form-data"
                onSubmit={handleImgSubmission}
                method="POST"
            >
                <div>
                    <h1>Create Listing</h1>
                    <label>
                        Name
                        <input
                            className="create-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p className="errors">{errors.name}</p>}
                    <label>
                        Price
                        <input
                            className="create-price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {errors.price && <p className="errors">{errors.price}</p>}
                    <label>
                        Description
                        <textarea
                            className="create-text"
                            type="text"
                            rows={15}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {errors.description && (
                        <p className="errors">{errors.description}</p>
                    )}
                    <div className="img-upload-container">
                        {Array.from({ length: 4 }, (_, index) => index + 1).map((num) => (
                            <div className="img_upload_test" key={num}>
                                <div>
                                    {num === 1 ? "Main" : `Side ${num - 1}`} Image
                                </div>
                                <div className="imgInputAndFileStatus">
                                    <input
                                        className="upload-img"
                                        type="file"
                                        name={`item_img${num}`}
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleAddImage(e, `item_img${num}`)
                                        }
                                    />
                                    <div className="fileStatus">
                                        {imgUpload[`item_img${num}`]
                                            ? imgUpload[`item_img${num}`].name
                                            : "No file uploaded"}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="submit_button">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateItem;
