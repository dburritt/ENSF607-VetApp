import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import 'bulma/css/bulma.css';

const AdvancedSearchView = () => {

    return (
        <div>
            <header>
                <span>Advanced Search</span>
            </header>

            <div>
                <div class="box">
                    <input class="input" type="text" placeholder="Enter keywords"></input>
                </div>
            </div>

            <div class="box">
                <div class="select is-multiple">
                    <select multiple size="5">
                        <option>Filter Option 1</option>
                        <option>Filter Option 2</option>
                        <option>Filter Option 3</option>
                        <option>Filter Option 4</option>
                        <option>Filter Option 5</option>
                        <option>Filter Option 6</option>
                    </select>
                </div>
            </div>

            <div>
                <button class="button">Search</button>
            </div>
        </div>
    )
}

export default AdvancedSearchView