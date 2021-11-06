import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "reactstrap";

import HeaderSection from "components/UI/HeaderSection";
import shortid from "shortid";

import { db } from "firebase/config";

import TitleForm from "./TitleForm";

import { DEFAULT_TITLE } from "Constants";

const AddEditTitle = () => {
  const history = useHistory();
  const { id } = useParams();


  const [genres, setGenres] = useState([]);

  const [defaultValues, setDefaultValues] = useState(DEFAULT_TITLE);

  const Fetchdata = (id) => {
    db.collection("titles").doc(id).get().then((doc) => {
      setDefaultValues(doc.data());
      setGenres(doc.data().genres);
    })
  }

  useEffect(() => {
    if (id) {
      Fetchdata(id);
    }
    return () => {
      setDefaultValues(DEFAULT_TITLE);
      setGenres([]);
    }
  }, [])

  const onSubmit = (data) => {
    console.log(data);
    const newTitle = {
      ...defaultValues,
      ...data,
      id: data.id || shortid.generate(),
      author: data.author.split(";"),
      artist: data.artist.split(";"),
      coverArt: data.coverArt.split(";"),
      tags: data.tags.split(";"),
      links: {
        ...data.links,
        vi: data.links.vi.split(";")
      },
      genres
    }
    console.log(newTitle);
    db.collection("titles").doc(newTitle.id).set(newTitle, { merge: true }).then(function () {
      history.push(`/title/${newTitle.id}`)
    });
  };

  const handleChangeGenres = (t) => {
    if (genres.includes(t)) {
      setGenres((prevState) => [
        ...prevState.filter((item) => item !== t)
      ]);
    } else {
      setGenres((prevState) => [...prevState, t]);
    }
  }



  return (
    <>
      <HeaderSection>
        <h1 className="text-white">Thêm mới</h1>
      </HeaderSection>
      <section className="section section-lg">
        <Container>
          <TitleForm defaultValues={defaultValues} onSubmit={onSubmit} genres={genres} handleChangeGenres={handleChangeGenres} />
        </Container>
      </section>
    </>
  );
};

export default AddEditTitle;
