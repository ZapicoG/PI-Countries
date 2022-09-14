import React from 'react';
import "../css/ActivityCard.css"



const ActivityDetail = (props) => {

    let difficulty = "";
    for (let i = 1; i <= props.difficulty; i++)
    {difficulty+= "★"}
  return (
      <div className="ActivityCard">
      <p>{props.name}</p>
      <p>Dificultad: {difficulty}</p>
      <p>Duracion: {props.length} h{props.length > 1 ? "s" : ""}</p>
      <p>Estacion: {props.season}</p>      
      </div>
  );
};

export default ActivityDetail;