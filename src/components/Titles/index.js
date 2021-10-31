import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
  Container
} from "reactstrap";

import { db } from "./../../firebase/config";

import HeaderSection from "../UI/HeaderSection";


const Titles = () => {
  const perPage = 10;

  const [titles, setTitles] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [lastId, setLastId] = useState();
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    Fetchdata(loadMore, lastId, isMax);
    setLoadMore(false);
  }, [loadMore]);


  const Fetchdata = (load, id, isMax) => {
    if (load && !isMax) {
      let query = db.collection("titles").orderBy("id");
      if (id) query = query.startAfter(id);
      query.limit(perPage).get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          setIsMax(true);
          return;
        }
        var data;
        querySnapshot.forEach(element => {
          data = { ...element.data(), id: element.id };
          setTitles(arr => [...arr, data]);
        });
        setLastId(data.id);
      })
    }
  }

  useEffect(() => {
    const scrollFunc = () => {
      if (window.scrollY + window.innerHeight === window.document.body.offsetHeight) {
        setLoadMore(true);
      }
    }
    window.addEventListener('scroll', scrollFunc);
    return () => {
      window.removeEventListener('scroll', scrollFunc);
    }
  }, [])

  useEffect(() => {
    Fetchdata();

    return () => {
      setTitles([]);
    }
  }, [])

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
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Row>
            {titles.map((t, i) => (
              <Col key={i} md="6" className="mb-2" key={i}>
                <Card className="p-2">
                  <Row noGutters>
                    <Col xs="4">
                      { t.coverArt &&
                        <CardImg
                        top
                        width="100%"
                        src={t.coverArt[1] || t.coverArt[0]}
                      />}
                    </Col>
                    <Col className="pl-2">
                      <CardTitle tag="h4" className="mb-1 text-primary">
                        {t.title.en}
                        {" "}
                        {t.type && <Badge size="sm" color="primary">{t.type}</Badge>}
                      </CardTitle>
                      {t.genres.map((tag, idx) => <Badge key={idx} color="secondary" tag={Link} to="#" className="mr-1">{tag}</Badge>)}
                      <CardText tag="small" className="mb-2 d-block">
                        {parse(t.description?.length > 150 ? t.description?.slice(0, 150) + "..." : t.description)}
                      </CardText>
                      <div className="mt-auto">
                        <Button color="success" size="sm" to={`/title/${t.id}`} tag={Link}>
                          <i className="fa fa-heart"/>
                          Chi tiết
                        </Button>
                        <Button color="danger" size="sm">
                          <i className="fa fa-heart"/>
                          Yêu thích
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Titles;
