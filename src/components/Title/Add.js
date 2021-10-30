import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";
import HeaderSection from "../UI/HeaderSection";

import {db} from "./../../firebase/config";

import { TAGS } from "./../../Constants";

const AddTitle = () => {
  const history = useHistory();

  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [tags, setTags] = useState([]);

  const onSubmit = (data) => {
    console.log({ ...data, tags });
    db.collection("titles").add({
      ...data, tags
    }).then(function(docRef) {
      history.push(`/title/${docRef.id}`)
  });
  };

  const rows = [...Array(Math.ceil(TAGS.length / 4))];
  // chunk the products into the array of rows
  const tagRows = rows.map((row, idx) => TAGS.slice(idx * 4, idx * 4 + 4));

  const tagPlacer = tagRows.map((row, idx) => (
    <Row key={idx}>
      {row.map((t, i) =>
        <Col key={i}>
          <div className="custom-control custom-checkbox mb-3">
            <input
              className="custom-control-input"
              id={"customCheck" + t}
              type="checkbox"
              onChange={() => {
                if (tags.includes(t)) {
                  setTags((prevState) => [
                    ...prevState.filter((item) => item !== t)
                  ]);
                } else {
                  setTags((prevState) => [...prevState, t]);
                }
              }}
              value={tags.includes(t)}
            />
            <label className="custom-control-label" htmlFor={"customCheck" + t}>
              {t}
            </label>
          </div>
        </Col>
      )}
    </Row>)

  );

  return (
    <>
      <HeaderSection>
      </HeaderSection>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <h1 className="text-white">Thêm mới</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Tựa Anh</Label>
                  <Controller
                    name="title.en"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input {...field} />}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Tựa Việt</Label>
                  <Controller
                    name="title.vi"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input {...field} />}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Tựa Gốc</Label>
                  <Controller
                    name="title.ja"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input {...field} />}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Link Ảnh</Label>
                  <Controller
                    name="coverURL"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input {...field} />}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Tóm tắt</Label>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input type="textarea" {...field} />}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                {tagPlacer}
              </Col>
              <Col md="6">
                <Label>Link Mangadex</Label>
                <Controller
                  name="links.md"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="6">
                <Label>Loại</Label>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input
                    id="exampleSelect"
                    type="select"
                    {...field}
                  >
                    <option value="manga">
                      manga
                    </option>
                    <option value="novel">
                      novel
                    </option>
                    <option value="anime">
                      anime
                    </option>
                  </Input>}
                />

              </Col>
            </Row>
            <Button>Thêm mới</Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default AddTitle;
