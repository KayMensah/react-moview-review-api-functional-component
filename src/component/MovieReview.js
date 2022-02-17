import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const MovieReview = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const userDetails = async () => {
    const response = await axios.get(
      "https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=9oyEf2f4YbTkyMGkvKeR0vEZfWlbbxeN"
    );
    setUsers(response.data.results);
  };

  const searchMovie = async () => {
    const url =
      "https://api.nytimes.com/svc/movies/v2/reviews/all.json?query=" +
      query +
      "&api-key=9oyEf2f4YbTkyMGkvKeR0vEZfWlbbxeN";

      console.log(url);
    const response = await axios.get(
      url
    );
    setUsers(response.data.results);
  };

  useEffect(() => {
    userDetails();
    // console.log(users);
  }, []);

//   useEffect(() => {
//     searchMovie(query);
//   }, [query]);

  return (
    <div className="body-style">
      <div>
          <form
              onSubmit={(e) => {
                  e.preventDefault();
                  searchMovie()
              }}>
        <input className='style-input'
          type="text"
          placeholder="search movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
        <button type="submit" className="btn-style">Submit</button>
        </div>
        </form>
      </div>
      {users.map((user) => {
        return (
          <div key={user.display_title} className='style-movie'>
            <h3>{user.display_title}</h3>
            <h3>{user.byline}</h3>
            <h3>{user.headline}</h3>
            <h3>{user.critics_pick}</h3>
            <img src={user?.multimedia?.src} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieReview;
