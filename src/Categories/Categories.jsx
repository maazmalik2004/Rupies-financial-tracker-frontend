import React, { useState, useEffect } from "react";
import { useAppState } from "../AppStateContext";
import axios from "axios";
import "./categories.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButtons from "./FloatingActionButtons";
import CategoryForm from "./CategoryForm";

function Categories() {
  const { incomeSources, setIncomeSources, expenseSources, setExpenseSources } =
    useAppState();
  const [formOpen, setFormOpen] = useState(false); // Initialize with false

  useEffect(() => {
    // This effect will run whenever incomeSources changes
    console.log("Updated incomeSources:", incomeSources);
  }, [incomeSources]); // Only re-run the effect if incomeSources changes

  function handleDeleteCategory(index, type) {
    if (type === "income") {
      const updatedIncomeSources = [...incomeSources];
      updatedIncomeSources.splice(index, 1);
      setIncomeSources(updatedIncomeSources);
    } else if (type === "expense") {
      const updatedExpenseSources = [...expenseSources];
      updatedExpenseSources.splice(index, 1);
      setExpenseSources(updatedExpenseSources);
    }
  }

  function handleAddCategory() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }
  const handleSubmit = (formData) => {
    console.log('inside handle Submit');
    if (formData.type == 'income') {
      console.log('inside income');
      setIncomeSources(prevIncomeSources => [...prevIncomeSources, { name: formData.name, budget: formData.budget }]);
    } else if (formData.type === 'expense') {
      setExpenseSources(prevExpenseSources => [...prevExpenseSources, { name: formData.name, budget: formData.budget }]);
    }
  };

  return (
    <div className="container">
      <div className="pane">
        {formOpen && (
          <CategoryForm onClose={handleClose} onSubmit={handleSubmit} />
        )}
        <div onClick={handleAddCategory}>
          <FloatingActionButtons />
        </div>
      </div>
      <div className="income-sources-pane">
        {incomeSources.map((source, index) => (
          <div className="income-card" key={index}>
            <DeleteIcon
              style={{ color: "white" }}
              onClick={() => handleDeleteCategory(index, "income")}
            />
            {source.name}
          </div>
        ))}
      </div>
      <div className="expense-sources-pane">
        {expenseSources.map((source, index) => (
          <div className="expense-card" key={index}>
            <DeleteIcon
              style={{ color: "white" }}
              onClick={() => handleDeleteCategory(index, "expense")}
            />
            {source.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
