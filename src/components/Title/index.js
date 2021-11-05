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

const Title = ({ match }) => {
	const initTitle = {
		title: {
			en: ""
		},
		genres: [],
		tags: [],
		coverArt: ["/img/theme/img-1-1200x1000.jpg"],
		links: {
			md: "",
			vi: []
		},
		description: ""
	}
	const [title, setTitle] = useState(initTitle);
	const [showMore, setShowMore] = useState(false);

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
				<Container>

					<div className="h2 text-white font-weight-bold text-xs-center text-md-left">
						{title.title.en}
					</div>
					<Row noGutters className="text-white">
						{
							title.author &&
							<Col>
								<i class="fas fa-user"></i> {title.author.join("; ")}
							</Col>
						}
						{
							title.artist &&
							<Col>
								<i class="fas fa-user-edit"></i> {title.artist.join("; ")}
							</Col>
						}
					</Row>
					<div className="mb-1">
						{title.genres && title.genres.map((tag) => <Badge color="secondary" tag={Link} to="#" className="mr-1">{tag}</Badge>)}
					</div>

				</Container>
			</HeaderSection>
			<section className="section section-lg pt-0 title-section mt--200">
				<Container>

					<Row>
						<Col xs="4" md="3" className="mb-2">
							<img className="img-fluid rounded shadow w-100 mx-auto"
								src={title.coverArt[1] || title.coverArt[0]}
							/>
						</Col>
						<Col>
							<div className="btn-wrapper d-flex justify-content-around flex-wrap">
								<Button
									className="shadow btn-icon mb-1"
									color="danger"
								>
									<span className="btn-inner--icon">
										<i className="fa fa-heart" />
									</span>
									<span className="btn-inner--text d-none d-md-inline">Yêu thích</span>
								</Button>
							</div>
							<div className="btn-wrapper d-flex justify-content-around flex-wrap">
								{title.links.vi &&
									title.links.vi.map((l) =>
										<Button
											className="shadow btn-icon mb-1"
											color={l.includes("blogtruyen.vn") ? "info" : "danger"}
											href={l}
											target="_blank"
										>
											<span className="btn-inner--icon">
												{l.includes("blogtruyen.vn") ? <img src="/img/icons/blt.ico" /> : <i className="fa fa-star text-yellow" />}

											</span>
											<span className="btn-inner--text d-none d-md-inline">{l.includes("blogtruyen.vn") ? "Blogtruyen" : "Tiếng Việt"}</span>
										</Button>
									)
								}
								{title.links.md &&
									<Button
										className="shadow btn-icon mb-1"
										color="warning"
										href={"https://mangadex.org/title/" + title.links.md}
										target="_blank"
									>
										<span className="btn-inner--icon">
											<i className="fa fa-cat" />
										</span>
										<span className="btn-inner--text d-none d-md-inline">Mangadex</span>
									</Button>
								}

								{title.links.raw &&
									<Button
										className="shadow btn-icon mb-1"
										color="white"
										href={title.links.raw}
										target="_blank"
									>
										<span className="btn-inner--icon">
											<i className="fa fa-circle text-red" />
										</span>
										<span className="btn-inner--text d-none d-md-inline">Raw</span>
									</Button>
								}
								{title.links.mu &&
									<Button
										className="shadow btn-icon mb-1"
										color="default"
										href={"https://www.mangaupdates.com/series.html?id="+title.links.mu}
										target="_blank"
									>
										<span className="btn-inner--icon">
											<img src="/img/icons/mu.svg" />
										</span>
										<span className="btn-inner--text d-none d-md-inline">MangaUpdates</span>
									</Button>
								}
								{title.links.mal &&
									<Button
										className="shadow btn-icon mb-1"
										color="default"
										href={"https://myanimelist.net/manga/" + title.links.mal}
										target="_blank"
									>
										<span className="btn-inner--icon">
											<img src="/img/icons/mal.ico" />
										</span>
										<span className="btn-inner--text d-none d-md-inline">MyAnimeList</span>
									</Button>
								}
							</div>
						</Col>


						<Col xs="12">

							<p>
								<Card className="shadow">
									<CardBody>
										<div className="text-success h5">Tóm tắt</div>

										{parse(title.description)}
										<br />
										{title.tags && title.tags.map((tag) => <Badge color="success" tag={Link} to="#" className="mr-1 badge-pill">{tag}</Badge>)}

									</CardBody>
								</Card>
							</p>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Title;
