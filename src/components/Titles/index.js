import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
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
  const [titles, setTitles] = useState([]);
  const Fetchdata = () => {
    db.collection("titles").get().then((querySnapshot) => {
      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
        var data = element.data();
        setTitles(arr => [...arr, data]);
      });
    })
  }
  useEffect(() => {
    Fetchdata();
  }, [])
  return (
    <>
      <HeaderSection>
        <h1 className="display-3 text-white">
          Thư viện Rom-Com{" "}
          <span>completed with examples</span>
        </h1>
        <p className="lead text-white">
          The design system comes with four pre-built pages to
          help you get started faster. You can change the text and
          images and you're good to go.
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
                      <CardImg
                        top
                        width="100%"
                        src={t.coverURL}
                      />
                    </Col>
                    <Col className="pl-2">
                    <CardTitle tag="h5" className="mb-1">{t.title}</CardTitle>
                    {t.tags.map((tag) => <Badge color="success" tag={Link} to="#" className="mr-1">{tag}</Badge>)}
                    <CardText>{t.description?.length > 100 ? t.description?.slice(0,100) + "..." : t.description}</CardText>
                    <Button>Chi tiết</Button>
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
