import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";

import { GENRES } from "Constants";

const rows = [...Array(Math.ceil(GENRES.length / 4))];
const tagRows = rows.map((row, idx) => GENRES.slice(idx * 4, idx * 4 + 4));

const Genres = ({ genres, handleChangeGenres }) => {
	return (
		<>
			{tagRows.map((row, idx) => (
				<Row key={idx}>
					{row.map((t) =>
						<Col key={t}>
							<div className="custom-control custom-checkbox mb-3">
								<input
									className="custom-control-input"
									id={"customCheck" + t}
									type="checkbox"
									onChange={() => {
										handleChangeGenres(t);
									}}
									checked={genres.includes(t)}
								/>
								<label className="custom-control-label" htmlFor={"customCheck" + t}>
									{t}
								</label>
							</div>
						</Col>
					)}
				</Row>)
			)}
		</>
	)

}

export default Genres;