import React from "react";

export const Son = ({ url, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <img src={url} alt={title} />
      </div>
    </div>
  );
};
