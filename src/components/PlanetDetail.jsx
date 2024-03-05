import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useLocation } from "react-router-dom";
import ResidentsCard from "./ResidentsCard";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
function PlanetDetail() {
  const [recidentsList, setRecidentsList] = useState();

  const location = useLocation();
  const { planetData } = location.state;

  const fetchRecidentData = async () => {
    try {
      const results = await Promise.allSettled(
        planetData.residents.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return { url, response: data };
        })
      );

      const newData = results.map((result, index) => {
        if (result.status === "fulfilled") {
          return {
            url: planetData.residents[index],
            data: result.value.response,
          };
        } else {
          console.error(
            `Error fetching ${planetData.residents[index]}:`,
            result.reason.response
          );
          return { url: planetData.residents[index], error: result.reason };
        }
      });
      setRecidentsList(newData);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchRecidentData();
  }, []);

  return (
    <Container>
      <div className="py-3">
        <Link to={`/`}>
          {" "}
          <span className="breadcrum-link"> Home / </span>
        </Link>
        <span className="breadcrum"> Planet Detail </span>
      </div>
      {planetData ? (
        <div className="planet-details">
          <div className="card-heading px-5 py-4">{planetData.name}</div>
          <hr className="my-0" />

          <div className="details">
            <Container className="mt-5">
              <Row className="text-center">
                <Col lg={3}>
                  <div className="detail-subtext">rotation period</div>
                  <div className="detail-text">
                    {planetData.rotation_period !== "unknown"
                      ? planetData.rotation_period
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">orbital period</div>
                  <div className="detail-text">
                    {planetData.orbital_period !== "unknown"
                      ? planetData.orbital_period
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">diameter</div>
                  <div className="detail-text">
                    {planetData.diameter !== "unknown"
                      ? planetData.diameter
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">gravity</div>
                  <div className="detail-text">
                    {planetData.gravity !== "unknown"
                      ? planetData.gravity
                      : "-"}
                  </div>
                </Col>
              </Row>
              <Row className="text-center">
                <Col lg={3}>
                  <div className="detail-subtext">climate</div>
                  <div className="detail-text">
                    {planetData.climate !== "unknown"
                      ? planetData.climate
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">surface water</div>
                  <div className="detail-text">
                    {planetData.surface_water !== "unknown"
                      ? planetData.surface_water
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">terrain</div>
                  <div className="detail-text">
                    {planetData.terrain !== "unknown"
                      ? planetData.terrain
                      : "-"}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="detail-subtext">population</div>
                  <div className="detail-text">
                    {planetData.population !== "unknown"
                      ? planetData.population
                      : "-"}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <Container className="px-5 my-5">
            <div className="card-heading px-2">Recidents</div>
            {!recidentsList ? (
              <Row className="text-center py-5">
                <Col>
                  <Spinner
                    animation="border"
                    role="status"
                    className="text-center"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Col>
              </Row>
            ) : (
              <Row className="my-2 pb-5">
                {recidentsList.length > 0 ? (
                  recidentsList.map((ele) => {
                    return (
                      <Col className="my-2" key={ele.url} lg={3}>
                        <ResidentsCard resident={ele.data} />
                      </Col>
                    );
                  })
                ) : (
                  <h3 className="pb-5 mx-5"> Recidents data not available </h3>
                )}
              </Row>
            )}
          </Container>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlanetDetail;
