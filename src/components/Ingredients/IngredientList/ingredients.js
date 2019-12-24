import React from "react";
import IngredientRow from "../IngredientRow/ingredient";
import {Link} from "react-router-dom";

const getIngredients = (props) => {

    const ingredients = props.ingredients.map((ingredient, index) =>
        <IngredientRow ingredient={ingredient} key={index} onDelete={props.onDelete}/>
    );

    const headers = () => {
        return (
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Spicy</th>
                <th scope="col">Veggie</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
        )
    };

    const tableWithIngredients = () => {
        return (
            <div className="table-responsive">
                <table className="table tr-history table-striped small">
                    {headers()}
                    <tbody>{ingredients}</tbody>
                </table>
            </div>
        )
    };

    const noIngredients = () => {
        return (
            <div className={"col-12 mt-4 p-0 text-left mb-5"}>There are no ingredients yet.</div>
        )
    };

    const showIngredients = () => {
        if (props.ingredients.length) {
            return tableWithIngredients();
        }
        return noIngredients();
    };

    const addIngredient = () => {
        return (
            <Link to={"/ingredients/new"} className="btn btn-outline-secondary">
                <span><strong>Add new ingredient</strong></span>
            </Link>
        )
    };

    return (
        <div className="row">
            <h4 className="text-upper text-left">Ingredients</h4>
            {showIngredients()}
            {addIngredient()}
        </div>
    )

};

export default getIngredients;

