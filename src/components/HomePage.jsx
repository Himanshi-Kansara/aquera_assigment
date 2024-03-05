import React, { useEffect, useState, Suspense } from "react";
import Container from "react-bootstrap/Container";
import PlanetCard from "./PlanetCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/esm/Spinner";


function HomePage() {
  const [planetList, setPlanetList] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  const getPlanetList = async () => {
    const res = await fetch(
      `https://swapi.dev/api/planets/?page=${page}&format=json`
    );
    const data = await res.json();
    if (data && data.results) {
      settotalPages(data.count / 10);
      setPlanetList(data.results);
    }
  };

  useEffect(() => {
    getPlanetList();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="home-page">
      <Container>
        <div className="pagination-bar my-3">
          {planetList && planetList.length > 0 && (
            <div className="pagination">
              <span
                onClick={() => selectPageHandler(page - 1)}
                className={page > 1 ? "" : "pagination__disable"}
              >
                ◀
              </span>

              {[...Array(totalPages)].map((_, i) => {
                return (
                  <span
                    key={i}
                    className={page === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandler(i + 1)}
                  >
                    {i + 1}
                  </span>
                );
              })}

              <span
                onClick={() => selectPageHandler(page + 1)}
                className={page < totalPages ? "" : "pagination__disable"}
              >
                ▶
              </span>
            </div>
          )}
        </div>
        {!planetList ? (
          <Row className="text-center py-5">
            <Col>
              <Spinner
                animation="border"
                role="status"
                className="text-center"
                style={{ color: "white" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          <Row>
            {planetList && planetList.length > 0
              ? planetList.map((ele) => {
                  return (
                    <Col className="my-2" key={ele.created} lg={3}>
                      <PlanetCard planet={ele} />
                    </Col>
                  );
                })
              : ""}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
