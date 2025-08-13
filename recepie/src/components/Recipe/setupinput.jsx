import { useState } from 'react';

const StepInput = ({ steps, setFormData }) => {
  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const removeStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Steps*</label>
      {steps.map((step, index) => (
        <div key={index} className="flex mb-2">
          <span className="mr-2 font-bold mt-2">{index + 1}.</span>
          <div className="flex-grow">
            <textarea
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="2"
              required
            />
          </div>
          {steps.length > 1 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="ml-2 text-red-500 hover:text-red-700 mt-2"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        + Add Step
      </button>
    </div>
  );
};

export default StepInput;