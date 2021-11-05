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

const FavoriteTitles = () => {
	console.log("hello");
	const dispatch = useDispatch();
	const favoriteTitles = useSelector(state => state.favoriteTitles);

	const [titles, setTitles] = useState([]);

	const FetchData = () => {
		let query = db.collection("titles").where("id", "in", favoriteTitles);
		query.get().then((querySnapshot) => {
			var data;
			setTitles([]);
			querySnapshot.forEach(element => {
				data = { ...element.data(), id: element.id };
				setTitles(arr => [...arr, data]);
			});
		})
	}

	useEffect(() => {
		if (favoriteTitles.length > 0) {
			FetchData();
		}
	}, [favoriteTitles])

	const handleLikeClick = (id) => {
		dispatch(toggleFavoriteTitle(id));
	}

	return (
		<>
			<HeaderSection>
				<h1 className="display-3 text-white">
					Thư viện Rom-Com{" "}
					<span>của bạn</span>
				</h1>
				<p className="lead text-white">
					Của bạn, test Redux
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
				</Container>
			</section>
		</>
	)
}

export default FavoriteTitles;