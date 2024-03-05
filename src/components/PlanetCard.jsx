import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import people from "../assets/people.png";
import water from "../assets/water.png";
import climate from "../assets/climate.png";
import { Link } from "react-router-dom";

function PlanetCard({ planet }) {
  
  function shortenNumber(number) {
    if (number > 0) {
      const absNumber = Math.abs(number);
      const suffixes = ["", "k", "M", "B", "T"];
      let suffixIndex = 0;
      let shortenedNumber = absNumber;
      while (shortenedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
        shortenedNumber /= 1000;
        suffixIndex++;
      }
      const roundedNumber = Math.round(shortenedNumber * 100) / 100;
      const result =
        (number < 0 ? "-" : "") + roundedNumber + " " + suffixes[suffixIndex];
      return result;
    }
    return 0;
  }

  return (
    <div className="planet-card m-2">
      <div className="card-heading">{planet.name}</div>
      <Row className="my-4">
        <Col className="text-center px-0">
          <img src={people} alt="Population" className="card-icon"></img>
          <div className="card-subheading">
            {shortenNumber(planet.population)}
          </div>
        </Col>
        <Col className="text-center px-0">
          <img src={water} alt="Surface Water" className="card-icon"></img>
          <div className="card-subheading">
            {planet.surface_water > 0 ? planet.surface_water : 0}
          </div>
        </Col>
        <Col className="text-center px-0">
          <img src={climate} alt="Climate" className="card-icon"></img>
          <div className="card-subheading">
            {planet.climate && planet.climate.split(",").length > 1 ? (
              <span>{planet.climate.split(",")[0]}... </span>
            ) : (
              <span>{planet.climate}</span>
            )}
          </div>
        </Col>
      </Row>
      <Link
        key={planet.created}
        to={`/planet-Detail/${planet.name}`}
        state={{ planetData: planet }}
      >
        <button className="card-button">More Detail</button>
      </Link>
    </div>
  );
}

export default PlanetCard;
