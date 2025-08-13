import { useState } from 'react';

const IngredientInput = ({ ingredients, setFormData }) => {
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Ingredients*</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-5">
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="col-span-1 flex items-center">
            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addIngredient}
        className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        + Add Ingredient
      </button>
    </div>
  );
};

export default IngredientInput;