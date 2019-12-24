import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import ingredientService from "../../../service/axiosIngredientService";
import {Link} from "react-router-dom";

const showIngredientDetails = () => {

    const {id} = useParams();
    const [ingredient, setIngredient] = useState({});
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        ingredientService.fetchIngredient(id).then((data) => {
            setIngredient(data.data);
        })
    }, []);

    useEffect(() => {
        ingredientService.fetchIngredientPizzas(id).then((data) => {
            const pizzas = data.data.map(pizza => pizza.name);
            setPizzas(pizzas);
        })
    }, []);

    const listPizzas = pizzas.map((pizza, index) => <li key={index}>{pizza}</li>);

    const ingredientDetails = () => {
        return (
            <div className="col-6">
                <h4>Characteristics: </h4>
                <hr/>
                <ul className="w-50">
                    <li>Amount: {ingredient.amount}g</li>
                    <li>Spicy:
                        <i className={ingredient.spicy ? "fa fa-check text-success ml-2" : "fa fa-times text-dark ml-2"}> </i>
                    </li>
                    <li>Veggie:
                        <i className={ingredient.veggie ? "fa fa-check text-success ml-2" : "fa fa-times text-dark ml-2"}> </i>
                    </li>
                </ul>
            </div>
        )
    };

    const pizzasIn = () => {
        if (pizzas.length) {
            return (
                <ol>{listPizzas}</ol>
            )
        } else {
            return (
                <div>Ingredient isn't used in any pizza.</div>
            )
        }
    };

    const showPizzas = () => {
        return (
            <div className="col-6">
                <h4>Pizzas in:</h4>
                <hr/>
                {pizzasIn()}
            </div>
        )
    };

    const backButton = () => {
        return (
            <Link to={"/ingredients"} className="btn btn-outline-secondary">
                <span><strong>Back</strong></span>
            </Link>
        )
    };

    return (
        <div className="container text-left">
            <h3 className="text-center">Ingredient {ingredient.name}</h3>
            <hr/>
            <div className="row">
                {ingredientDetails()}
                {showPizzas()}
            </div>
            {backButton()}
        </div>
    )
};

export default showIngredientDetails;
