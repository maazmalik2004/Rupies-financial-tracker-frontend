import React, { useState, useEffect } from "react";
import { useAppState } from "../AppStateContext";
import "./categories.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FloatingActionButtons from "./FloatingActionButtons";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Categories() {
  const [responseMessage, setResponseMessage] = useState("");

  const { incomeSources, setIncomeSources, expenseSources, setExpenseSources } =
    useAppState();
  const [formOpen, setFormOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    type: "",
    name: "",
    budget: "10000",
  });

  useEffect(() => {
    console.log("Updated incomeSources:", incomeSources);
  }, [incomeSources]);

  function handleAddCategory() {
    setFormOpen((prevFormOpen) => !prevFormOpen);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCategoryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (categoryForm.name.trim() === "") {
      setResponseMessage("name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/addcategory",
        categoryForm,
      );

      if (response.data.status) {
        setResponseMessage("Category added successfully");
      } else {
        setResponseMessage("Category addition failed");
      }
      reloadCategories()
    } catch (error) {
      setResponseMessage("Category addtion failed");
    }
  }

  async function handleDeleteCategory(index, type) {
    try {
        let categoryList;
        if (type === "income") {
            categoryList = incomeSources;
        } else if (type === "expense") {
            categoryList = expenseSources;
        }

        const categoryName = categoryList[index].name;

        const payload = {
            name: categoryName,
            type: type,
        };

        const response = await axios.post(
            "http://localhost:8000/deletecategory",
            payload
        );

        if (response.data && response.data.status) {
            setResponseMessage("Category deleted successfully");
        } else {
            setResponseMessage("Category deletion failed");
        }
        reloadCategories();
    } catch (error) {
        setResponseMessage("Category deletion failed");
    }
}


  async function reloadCategories() {
    try {
        const response = await axios.get("http://localhost:8000/reloadcategories");

        if (response.data) {
            const categories = response.data;

            const incomeCategories = categories.filter(category => category.type === "income" || category.type === "Income");
            const expenseCategories = categories.filter(category => category.type === "expense" ||category.type === "Expense");

            setIncomeSources(incomeCategories);
            setExpenseSources(expenseCategories);
        }
    } catch (error) {
        console.log("Failed to sync categories.");
    }
}

useEffect(() => {
  reloadCategories();
  console.log(incomeSources);
  console.log(expenseSources);
}, []);

  function handleClose() {
    setFormOpen(false);
  }

  return (
    <div className="container">
      <div className="pane">
        <div onClick={handleAddCategory}>
          {formOpen ? (
            <FloatingActionButtons icon={<CloseIcon />} />
          ) : (
            <FloatingActionButtons />
          )}
        </div>
        {formOpen && (
          <div className="categoryform">
            <form className="formstyle" onSubmit={handleSubmit}>
              <select
                name="type"
                value={categoryForm.type}
                onChange={handleChange}
                className="categoryinput"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="text"
                name="name"
                value={categoryForm.name}
                onChange={handleChange}
                className="categoryinput"
                placeholder="Name"
              />

              <input
                type="number"
                name="budget"
                value={categoryForm.budget}
                onChange={handleChange}
                className="categoryinput"
                placeholder="Budget"
              />
              <button type="submit" className="categorybutton">
                Add Category
              </button>
              <p style={{ color: "turquoise" }}>{responseMessage}</p>
            </form>
          </div>
        )}
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
