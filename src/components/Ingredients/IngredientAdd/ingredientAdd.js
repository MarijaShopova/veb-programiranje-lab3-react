import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';

const ingredientAdd = (props) => {

    const history = useHistory();
    const [ingredient, setIngredient] = useState({});
    const clearState = {
        name: "",
        amount: "",
        spicy: false,
        veggie: false
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newIngredient = {
            "name": e.target.name.value,
            "amount": e.target.amount.value,
            "spicy": e.target.spicy.checked,
            "veggie": e.target.veggie.checked
        };
        props.onAddNewIngredient(newIngredient);
        history.push("/ingredients");
    };

    const onReset = () => {
        setIngredient(clearState);
    };

    const onChangeHandler = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setIngredient({...ingredient, [paramName]: paramValue});
    };

    const onChangeCheckedHandler = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.checked;
        setIngredient({...ingredient, [paramName]: paramValue});
    };


    const ingredientNameField = () => {
        return (
            <div className="form-group row">
                <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Ingredient name</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="ingredient"
                           name="name"
                           placeholder="Ingredient name"
                           required
                           maxLength={50}
                           value={ingredient.name}
                           onChange={onChangeHandler}/>
                </div>
            </div>
        )
    };

    const ingredientAmountField = () => {
        return (
            <div className="form-group row">
                <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="amount"
                           name="amount"
                           placeholder="Amount"
                           required
                           maxLength={50}
                           value={ingredient.amount}
                           onChange={onChangeHandler}/>
                </div>
            </div>
        )
    };

    const ingredientVeggieField = () => {
        return (
            <div className="col-sm-4 offset-sm-1 ">
                <label htmlFor="veggie" className="text-left mr-2">Veggie</label>
                <input type="checkbox"
                       id="veggie"
                       name="veggie"
                       checked={ingredient.veggie}
                       onChange={onChangeCheckedHandler}/>
            </div>
        )
    };

    const ingredientSpicyField = () => {
        return (
            <div className="col-sm-4 offset-sm-1">
                <label htmlFor="spicy" className="text-left mr-2">Spicy</label>
                <input type="checkbox"
                       id="spicy"
                       name="spicy"
                       checked={ingredient.spicy}
                       onChange={onChangeCheckedHandler}/>
            </div>
        )
    };

    const saveButton = () => {
        return (
            <div className="offset-sm-1 col-sm-3  text-center">
                <button type="submit"
                        className="btn btn-primary text-upper"
                        disabled={!ingredient.name || !ingredient.amount}>
                    Save
                </button>
            </div>
        )
    };

    const resetButton = () => {
        return (
            <div className=" col-sm-3  text-center">
                <button type="button" className="btn btn-warning text-upper" onClick={onReset}>
                    Reset
                </button>
            </div>
        )
    };

    const cancelButton = () => {
        return (
            <div className=" col-sm-3  text-center">
                <Link to={"/ingredients"} className="btn btn-danger text-upper">
                    Cancel
                </Link>
            </div>
        )
    };

    const buttons = () => {
        return (
            <div className="form-group row">
                {saveButton()}
                {resetButton()}
                {cancelButton()}
            </div>
        )
    };

    return (
        <div className="row">
            <form className="card" onSubmit={onSubmit}>
                <h4 className="text-upper text-left p-4">Add Ingredient</h4>
                {ingredientNameField()}
                {ingredientAmountField()}
                <div className="form-group row">
                    {ingredientVeggieField()}
                    {ingredientSpicyField()}
                </div>
                {buttons()}
            </form>
        </div>
    )
};

export default ingredientAdd;
