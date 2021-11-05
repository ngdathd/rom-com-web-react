import React from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import classNames from "classnames";


import {
	Row,
	Col,
	Card,
	CardImg,
	CardText,
	CardTitle,
	Button,
	Badge,

} from "reactstrap";

const TitleItem = ({ title, favoriteTitles, onLikeClick }) => {
	return (
		<Card className="p-2 shadow title-card">
			<Row noGutters className="h-100">
				<Col xs="4">
					{title.coverArt &&
						<CardImg
							top
							width="100%"
							src={title.coverArt[1] || title.coverArt[0]}
						/>}
				</Col>
				<Col className="pl-2 gradient-overlay h-100">

					<CardTitle tag="h4" className="mb-1 text-primary">
						{title.title.en}
						{" "}
						{title.type && <Badge size="sm" color="primary">{title.type}</Badge>}
					</CardTitle>
					<div className="mb-1">
						{title.genres.map((tag, idx) => <Badge key={idx} color="secondary" tag={Link} to="#" className="mr-1">{tag}</Badge>)}
					</div>
					<CardText tag="small" className="d-block h-100">
						{parse(title.description)}
					</CardText>
				</Col>
				<div className="btn-wrapper">
					<Button className="btn-icon" color="success" size="sm" to={`/title/${title.id}`} tag={Link}>
						<i className="fa fa-eye" /> Chi tiết
					</Button>
					<Button className="btn-icon" color={classNames({warning: favoriteTitles.includes(title.id)}, "danger")} size="sm" onClick={() => {onLikeClick(title.id)}}>
						{favoriteTitles.includes(title.id) ? (<><i className="fa fa-heart-broken" /> Hết thích</>) : (<><i className="fa fa-heart" /> Yêu thích</>) }
					</Button>
				</div>
			</Row>
		</Card>)
}

export default TitleItem;