import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Title = ({ match }) => {
	console.log("detail", match);
	const initTitle = {
		title: "",
		tags: [],
		coverURL: "img/theme/img-1-1200x1000.jpg",
		links: {
			md: ""
		}
	}
	const [title, setTitle] = useState(initTitle);
	const Fetchdata = () => {
		db.collection("titles").doc(match.params.id).get().then((doc) => {
			setTitle(doc.data());
		})
	}
	useEffect(() => {
		Fetchdata();
		return () => {
			setTitle(initTitle);
		}
	}, [])

	return (
		<>
			<HeaderSection background="success">
				<Row>
					<Col md="4">
						<Row>
							<Col xs="9" md="12" className="mx-auto">
								<img className="img-fluid rounded shadow w-100 mx-auto"
									src={title.coverURL}
								/>
								<Button
									className="d-block mx-auto shadow btn-icon"
									color="danger"
									style={{ marginTop: -50 }}
								>
									<span className="btn-inner--icon">
										<i className="fa fa-heart" />
									</span>
									<span className="btn-inner--text">Yêu thích</span>
								</Button>
							</Col>
						</Row>

					</Col>
					<Col>
						<div className="h1 text-white font-weight-bold text-xs-center text-md-left">
							{title.title}
						</div>
						{title.tags.map((tag) => <Badge color="secondary" tag={Link} to="#" className="mr-1">{tag}</Badge>)}
						<p className="lead text-white">
							{title.description}
						</p>
					</Col>
				</Row>
			</HeaderSection>
			<section className="section section-lg pt-lg-0 mt--200">
				<Container>
					<div className="btn-wrapper">
						{title.links.md && <Button
							href={`https://mangadex.org/title/${title.links.md}`}
							target="_blank"
							className="btn-icon"
							color="warning"
						>
							<span className="btn-inner--icon">
								<i className="fa fa-cat" />
							</span>
							<span className="btn-inner--text">Mangadex</span>
						</Button>}
					</div>
				</Container>
			</section>
		</>
	);
};

export default Title;
