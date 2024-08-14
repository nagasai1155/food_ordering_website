import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Product from "./Product";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Added state for loading spinner
  const YOUR_APP_ID = "b678aa3f";
  const YOUR_APP_KEY = "ade2615bcd9174cec51b487e99ea4317";

  const SubmitHandler = (e) => {
    e.preventDefault();
    getResponse();
  };

  async function getResponse() {
    setLoading(true); // Start loading
    let response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=30&calories=591-722&health=alcohol-free`
    );
    let result = await response.json();
    setData(result.hits);
    setLoading(false); // Stop loading
  }

  return (
    <>
      {/* Fixed Navbar */}
      <div className="nav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              FoodApp Recipe
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#recipes">
                    Recipes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
              <form className="d-flex" onSubmit={SubmitHandler}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Recipes"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
        <div className="pt-5">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {data.length > 0 ? (
                <Product data={data} />
              ) : (
                <div className="text-center">
                  <h2>Welcome to FoodApp</h2>
                  <p className="lead mt-4">Search for recipes above to get started!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="bg-dark text-light text-center py-3 fixed-bottom">
        <div className="container">
          <p className="mb-0">© 2024 FoodApp Recipe. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
