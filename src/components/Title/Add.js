import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";

import HeaderSection from "../UI/HeaderSection";

import { TAGS } from "./../../Constants"

const AddTitle = () => {
  console.log("add");
  const [name, setName] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      imgUrl,
      description,
      tags
    });
  };
  return (
    <>
      <HeaderSection>
        <h1>Thêm mới</h1>
      </HeaderSection>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Tên tựa đề</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Link Ảnh</Label>
            <Input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Tóm tắt</Label>
            <Input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          {TAGS.map((t) => (
            <FormGroup check>
              <Input
                type="checkbox"
                value={tags.includes(t)}
                onChange={() => {
                  if (tags.includes(t)) {
                    setTags((prevState) => [
                      ...prevState.filter((item) => item !== t)
                    ]);
                  } else {
                    setTags((prevState) => [...prevState, t]);
                  }
                }}
              />{" "}
              <Label check>{t.name}</Label>
            </FormGroup>
          ))}

          <Button>Thêm mới</Button>
        </Form>
      </Container>
    </>
  );
};

export default AddTitle;
