import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";

import Genres from "./Genres";

import { TITLE_TYPES } from "Constants"
import Title from "..";

const TitleForm = ({ defaultValues, onSubmit, genres, handleChangeGenres }) => {
	const { handleSubmit, control, setValue } = useForm();
	useEffect(() => {
		console.log(defaultValues);
		const newTitle = {
			...defaultValues,
			author: defaultValues.author.join(";"),
			artist: defaultValues.artist.join(";"),
			coverArt: defaultValues.coverArt.join(";"),
			tags: defaultValues.tags.join(";"),
			links: {
			  ...defaultValues.links,
			  vi: defaultValues.links.vi.join(";")
			},
			genres
		  }
		Object.keys(newTitle).forEach(key => {
			setValue(key, newTitle[key]);
		})
	}, [defaultValues])
	return (
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
							name="coverArt"
							control={control}
							defaultValue=""
							render={({ field }) => <Input {...field} />}
						/>
					</FormGroup>
				</Col>
				<Col md="12">
					<FormGroup>
						<Label>Tác giả</Label>
						<Controller
							name="author"
							control={control}
							defaultValue=""
							render={({ field }) => <Input {...field} />}
						/>
					</FormGroup>
				</Col>
				<Col md="12">
					<FormGroup>
						<Label>Họa sĩ</Label>
						<Controller
							name="artist"
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
							render={({ field }) => <Input type="textarea" {...field} />}
						/>
					</FormGroup>
				</Col>
				<Col md="12">
					<Genres genres={genres} handleChangeGenres={handleChangeGenres} />
				</Col>
				<Col md="12">
					<FormGroup>
						<Label>Tags</Label>
						<Controller
							name="tags"
							control={control}
							defaultValue=""
							render={({ field }) => <Input {...field} />}
						/>
					</FormGroup>
				</Col>
				<Col md="6">
					<Label>ID Mangadex</Label>
					<Controller
						name="links.md"
						control={control}
						defaultValue=""
						render={({ field }) => <Input {...field} />}
					/>
				</Col>
				<Col md="6">
					<Label>ID Mangaupdates</Label>
					<Controller
						name="links.mu"
						control={control}
						defaultValue=""
						render={({ field }) => <Input {...field} />}
					/>
				</Col>
				<Col md="12">
					<Label>Link tiếng việt</Label>
					<Controller
						name="links.vi"
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
							{
								TITLE_TYPES.map(type =>

									<option key={type} value={type}>
										{type}
									</option>
								)
							}
						</Input>}
					/>

				</Col>
			</Row>
			<Button>Thêm mới</Button>
		</Form>
	)
}

export default TitleForm;