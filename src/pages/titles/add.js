import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const tagsList = [
  {
    id: 1,
    name: "romance"
  },
  {
    id: 2,
    name: "comedy"
  },
  {
    id: 3,
    name: "drama"
  },
  {
    id: 4,
    name: "netorare"
  }
];

const AddTitle = (props) => {
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
      {tagsList.map((t) => (
        <FormGroup check>
          <Input
            type="checkbox"
            value={tags.includes(t.id)}
            onChange={() => {
              if (tags.includes(t.id)) {
                setTags((prevState) => [
                  ...prevState.filter((item) => item !== t.id)
                ]);
              } else {
                setTags((prevState) => [...prevState, t.id]);
              }
            }}
          />{" "}
          <Label check>{t.name}</Label>
        </FormGroup>
      ))}

      <Button>Thêm mới</Button>
    </Form>
  );
};

export default AddTitle;
