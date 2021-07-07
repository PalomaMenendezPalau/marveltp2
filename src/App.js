import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import React, { Component } from "react";

//https://gateway.marvel.com:443/v1/public/comics?apikey=0ab62d508859b4c1816d0cb3df2cb862
// public key= 0ab62d508859b4c1816d0cb3df2cb862
// private key= 5719f612779bc4bb8753ba2ae757ab8f18ebd4e2
//timestamp = ts=1
//hash create = 15719f612779bc4bb8753ba2ae757ab8f18ebd4e20ab62d508859b4c1816d0cb3df2cb862

// "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=0ab62d508859b4c1816d0cb3df2cb862&hash=e9b691b8cecc7e90bde46a42a5fead91
function App() {
  const [comics, setComics] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=0ab62d508859b4c1816d0cb3df2cb862&hash=e9b691b8cecc7e90bde46a42a5fead91&limit=100&offset=100"
      )
      .then((res) => {
        setComics(res.data.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=0ab62d508859b4c1816d0cb3df2cb862&hash=e9b691b8cecc7e90bde46a42a5fead91&limit=100&offset=100"
      )
      .then((res) => {
        setCharacters(res.data.data.results);
      });
  }, []);

  console.log(comics);
  console.log(characters);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-light bg-light py-5">
          <span className="navbar-brand mb-0 h1"></span>
        </nav>
        <div className="btn-group">
          <button type="button" class="btn btn-dark">
            <Link to="/">COMICS</Link>
          </button>
          <button type="button" class="btn btn-dark">
            <Link to="/characters">CHARACTERS</Link>
          </button>
        </div>
        <Switch>
          <Route path="/characters">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {characters.map((char) => (
                <div className="col" key={char.id}>
                  <div className="card bg-dark" style={{ width: "15rem" }}>
                    <img
                      className="card-img-top"
                      src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{char.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Route>
          <Route path="/">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {comics.map((com) => (
                <div className="col" key={com.id}>
                  <div className="card bg-dark" style={{ width: "15rem" }}>
                    <img
                      className="card-img-top"
                      src={`${com.thumbnail.path}.${com.thumbnail.extension}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{com.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
