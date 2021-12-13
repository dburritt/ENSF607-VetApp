/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import AnimalHeader from './AnimalHeader';

const AddImagePopup = ({ user, animal }) => {
    const [imageLocation, setImageLocation] = useState("");
    const [imageNotification, setImageNotification] = useState("");

    const addImage = () => {
        axios.post('http://localhost:8001/api/users/image', JSON.stringify({ animalId: animal.id, userId: user.userId, imageLocation: imageLocation }))
            .then((res) => {
                this.setState({ updatedAt: res.data.updatedAt })
                setImageNotification("Image successfully added")
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const imageLocationChangeHandler = (event) => {
        setImageLocation(event.target.value)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <input class="input" value={imageLocation} onChange={imageLocationChangeHandler} type="text" placeholder="Enter image location"></input>
                <button className="button" onClick={addImage}>Add</button>
                <p>{imageNotification}</p>
            </div>
        </div>
    );
}

const Pictures = ({ user, animal, pageDispatch }) => {
    const [images, setImages] = useState([]);
    const [addImagePopupOpen, setAddImagePopupOpen] = useState(false);
    const [imageLocation, setImageLocation] = useState("");

    const toggleAddImagePopup = () => {
        setAddImagePopupOpen(!addImagePopupOpen);
    }

    useEffect(() => {
        fetchAnimalImages()
        console.log(animal)
    }, []);

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }

    const navigationHandler = (event) => {
        if (event.target.value === "Animal Profile") {
            pageDispatch({
                nextPage: "animalProfile"
            });
        }
        if (event.target.value === "Weight Record") {
            pageDispatch({
                nextPage: "weightRecord"
            });
        }
        if (event.target.value === "Health Record") {
            pageDispatch({
                nextPage: "healthRecord"
            });
        }
        if (event.target.value === "Pictures") {
            pageDispatch({
                nextPage: "pictures"
            });
        }
        if (event.target.value === "Comments") {
            pageDispatch({
                nextPage: "comments"
            });
        }
    }

    const fetchAnimalImages = () => {
        axios.get(`http://localhost:8001/api/users/image?AnimalId=${animal.id}`)
            .then((res) => {
                setImages(res.data.images)
                console.log(res.data.images);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const PopulateAnimalImages = () => {
        const populatedImages = images.map(im => (
            <div className="column is-quarter">
                <div className="box">
                    <p><img src={`data:image/jpeg;base64,${im.imageData}`} /></p>
                </div>
            </div>
        ));

        return (populatedImages);
    }

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }

    return (
        <div className="column is-centered is-three-quarters">
            <div className="box">

                <AnimalHeader
                    user={user}
                    animal={animal} />

                <div className="column is-full">
                    <div className="box">

                        <div className="columns is-full">
                            <div className="column is-half">
                                Pictures
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success" onClick={toggleAddImagePopup}>Add Picture</button>
                                ) : null}
                                {addImagePopupOpen && <AddImagePopup user={user} animal={animal} />}
                            </div>
                        </div>

                        <div className="columns is-multiline">
                            {PopulateAnimalImages()}
                        </div>

                    </div>

                </div>

            </div>
            <div className="columns"
                css={css`position: relative;
                            width: 100%;
                            margin-right: auto;
                            margin-left: auto;
                            margin-bottom: 0.5rem;`}>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Animal Profile" onClick={navigationHandler}>Animal Profile</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Weight Record" onClick={navigationHandler}>Weight Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Health Record" onClick={navigationHandler}>Health Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Pictures" onClick={navigationHandler}>Pictures</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Comments" onClick={navigationHandler}>Comments</button>
                </div>
            </div>
            <div className="columns is-centered"
                css={css`position: relative;
                            width: 30%;
                            margin-left: auto;
                            margin-right: auto;`}>
                <div className="column">
                    <button className="button is-fullwidth is-small is-success" css={css`width: 90%;`} onClick={returnHandler}>Return to Search</button>
                </div>
            </div>
        </div>
    )

}

export default Pictures