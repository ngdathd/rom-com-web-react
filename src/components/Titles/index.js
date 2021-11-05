import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Container
} from "reactstrap";

import { db } from "firebase/config";

import HeaderSection from "../UI/HeaderSection";
import TitleItem from "./TitleItem";
import { toggleFavoriteTitle } from "slices/title";


const Titles = () => {
  const perPage = 10;
  
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstId, setFirstId] = useState();
  const [lastId, setLastId] = useState();
  const [isMin, setIsMin] = useState(true);
  const [isMax, setIsMax] = useState(false);

  const dispatch = useDispatch();
  const favoriteTitles = useSelector(state => state.favoriteTitles);
  
  const FetchPrevData = (firstId) => {
    let query = db.collection("titles").orderBy("id").endBefore(firstId);
    query.limit(perPage).get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        setIsMin(true);
        return;
      }
      var data;
      setTitles([]);
      setIsMax(false);
      querySnapshot.forEach(element => {
        data = { ...element.data(), id: element.id };
        setTitles(arr => [...arr, data]);
      });

      setFirstId(querySnapshot.docs[0].id);
      setLastId(querySnapshot.docs[querySnapshot.size - 1].id);
      window.document.getElementById("titles-container").scrollIntoView();
    })
  }

  const FetchNextData = (id) => {
    let query = db.collection("titles").orderBy("id");
    if (id) query = query.startAfter(id);
    query.limit(perPage).get().then((querySnapshot) => {

      if (querySnapshot.size === 0) {
        setIsMax(true);
        return;
      }
      var data;
      setTitles([]);
      setIsMin(false);
      querySnapshot.forEach(element => {
        data = { ...element.data(), id: element.id };
        setTitles(arr => [...arr, data]);
      });

      setFirstId(querySnapshot.docs[0].id);
      setLastId(querySnapshot.docs[querySnapshot.size - 1].id);
      window.document.getElementById("titles-container").scrollIntoView();
    })
  }

  const handlePrevBtn = () => {
    if (!isMin) {
      FetchPrevData(firstId);
    }
  }

  const handleNextBtn = () => {
    if (!isMax) {
      FetchNextData(lastId);
    }
  }

  useEffect(() => {
    FetchNextData();
    return () => {
      setTitles([]);
    }
  }, [])

  const handleLikeClick = (id) => {
    dispatch(toggleFavoriteTitle(id));
  }
  return (
    <>
      <HeaderSection>
        <h1 className="display-3 text-white">
          Thư viện Rom-Com{" "}
          <span>của Zennomi</span>
        </h1>
        <p className="lead text-white">
          Tất tần tật những gì tôi đã đọc suốt 20 năm qua. Thỉnh thoảng lọt vào vài bộ non-romcom, nhưng well, toàn romcom ấy mà
        </p>
      </HeaderSection>
      <section className="section section-lg mt--200">
        <Container id="titles-container">
          <Row>
            {titles.map((title) => (
              <Col key={title.id} md="6" className="mb-2">
                <TitleItem title={title}
                onLikeClick={handleLikeClick} 
                favoriteTitles={favoriteTitles}
                />
              </Col>
            ))}
          </Row>
          <div className="btn-wrapper d-flex justify-content-between">
            <Button color="primary" size="sm" disabled={isMin} onClick={handlePrevBtn} ><i className="fa fa-arrow-circle-left" /> Trước</Button>
            <Button color="primary" size="sm" disabled={isMax} onClick={handleNextBtn}>Sau <i className="fa fa-arrow-circle-right" /></Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Titles;
