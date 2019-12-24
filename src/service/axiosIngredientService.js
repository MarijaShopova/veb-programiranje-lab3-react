import axios from "../custom-axios/axios";

const IngredientService = {
    fetchIngredients: () => {
        return axios.get(`/api/ingredients`);
    },
    addIngredient: (ingredient) => {
        return axios.post(`/api/ingredients`, ingredient);
    },
    deleteIngredient: (id) => {
        return axios.delete(`/api/ingredients/${id}`);
    },
    fetchIngredient: (id) => {
        return axios.get(`/api/ingredients/${id}`);
    },
    fetchIngredientPizzas: (id) => {
        return axios.get(`/api/ingredients/${id}/pizzas`);
    },
    updateIngredient: (ingredient) => {
        return axios.patch(`/api/ingredients/${ingredient.id}`, ingredient);
    }
};

export default IngredientService;
