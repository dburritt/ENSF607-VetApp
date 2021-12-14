/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AnimalFooter = ({ pageDispatch }) => {

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

    return (
        <>
            <div className="columns"
                css={css`position: relative;
                            height: 7vh;
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
        </>
    )
}

export default AnimalFooter;