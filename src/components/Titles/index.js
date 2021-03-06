import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

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
  const [firstId, setFirstId] = useState();
  const [lastId, setLastId] = useState();
  const [isMin, setIsMin] = useState(true);
  const [isMax, setIsMax] = useState(false);

  const urlParams = new URLSearchParams(useLocation().search);
  
  let initQuery = () => {
    let initQuery = db.collection("titles").orderBy("id");
    const type = urlParams.get("type");
    console.log(type);
    if (type) initQuery = initQuery.where("type", "==", type);
    return initQuery;
  }

  const dispatch = useDispatch();
  const favoriteTitles = useSelector(state => state.favoriteTitles);
  
  const FetchPrevData = (firstId) => {
    let query = initQuery().endBefore(firstId);
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
    let query = initQuery();
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
          Th?? vi???n Rom-Com{" "}
          <span>c???a Zennomi</span>
        </h1>
        <p className="lead text-white">
          T???t t???n t???t nh???ng g?? t??i ???? ?????c su???t 20 n??m qua. Th???nh tho???ng l???t v??o v??i b??? non-romcom, nh??ng well, to??n romcom ???y m??
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
            <Button color="primary" size="sm" disabled={isMin} onClick={handlePrevBtn} ><i className="fa fa-arrow-circle-left" /> Tr?????c</Button>
            <Button color="primary" size="sm" disabled={isMax} onClick={handleNextBtn}>Sau <i className="fa fa-arrow-circle-right" /></Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Titles;
