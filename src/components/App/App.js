import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Header from "../Header/header";
import Pizzas from "../Pizzas/PizzaList/pizzas";
import Ingredients from "../Ingredients/IngredientList/ingredients";
import IngredientService from "../../service/axiosIngredientService";
import IngredientAdd from "../Ingredients/IngredientAdd/ingredientAdd";
import IngredientEdit from "../Ingredients/IngredientEdit/ingredientEdit";
import IngredientDetails from "../Ingredients/IngredientDetails/ingredientDetails";
import {Redirect} from "react-router";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    componentDidMount() {
        this.getIngredients();
    }

    getIngredients = () => {
        IngredientService.fetchIngredients().then(result => {
            this.setState(() => {
                return {
                    "ingredients": result.data.content
                }
            })
        });
    };

    addIngredient = (ingredient) => {
        IngredientService.addIngredient(ingredient).then(result => {
            const newIngredient = result.data;
            this.setState((prevState) => {
                const ingredients = [...prevState.ingredients, newIngredient];
                return {
                    "ingredients": ingredients
                }
            });
        });
    };

    onDelete = (id) => {
        IngredientService.deleteIngredient(id).then(() => {
            this.setState((prevState) => {
                const ingredients = prevState.ingredients.filter(i => i.id !== id);
                return {
                    "ingredients": ingredients
                }
            });
        });
    };

    onEdit = (ingredient) => {
        IngredientService.updateIngredient(ingredient).then(data => {
            const newIngredient = data.data;
            this.setState((prevState) => {
                const ingredients = prevState.ingredients.map(i => i.id === newIngredient.id ? newIngredient : i);
                return {
                    "ingredients": ingredients
                }
            });
        });
    };

    render() {
        const routing = (
            <Router>
                <Header/>
                <main role="main" className="mt-3">
                    <div className="container">
                        <Switch>
                            <Route path={"/"} exact><h2>Home page</h2></Route>
                            <Route path={"/pizzas"} exact><Pizzas/></Route>
                            <Route path={"/ingredients"} exact>
                                <Ingredients ingredients={this.state.ingredients} onDelete={this.onDelete}/>
                            </Route>
                            <Route path={"/ingredients/new"} exact>
                                <IngredientAdd onAddNewIngredient={this.addIngredient}/>
                            </Route>
                            <Route path={"/ingredients/:id/edit"} exact>
                                <IngredientEdit onEditIngredient={this.onEdit}/>
                            </Route>
                            <Route path={"/ingredients/:id/details"} exact>
                                <IngredientDetails/>
                            </Route>
                            <Redirect to={"/"}/>
                        </Switch>
                    </div>
                </main>
            </Router>
        );

        return (
            <div className="App">
                {routing}
            </div>
        )
    }
}

export default App;
