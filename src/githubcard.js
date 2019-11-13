import React from "react";

const Githubcard = props => {
  const githubcards = props.users.map(el => {
    return (
      <div className="col m4" key={el.id}>
        <div className="card">
          <a href={el.html_url} target="_blank">
            <div className="card-image waves-effect waves-block waves-light">
              <img alt={el.name} className="activator" src={el.avatar_url} />
            </div>
          </a>
          <div className="card-content">
            <span className="card-title grey-text text-darken-4">
              {el.name} &nbsp;
            </span>
            <p>{el.location}&nbsp;</p>
            <p>Followers: {el.followers}</p>
            <p>&nbsp;</p>
            <button
              onClick={() => props.deleteHandler(el.id)}
              className=" red darken-1 waves-effect waves-light btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  return <div>{githubcards}</div>;
};

export default Githubcard;
