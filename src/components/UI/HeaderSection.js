import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function HeaderSection({ children, background = "primary" }) {
	return (
		<div className="position-relative">
			{/* shape Hero */}
			<section className="section section-lg section-shaped pb-250">
				<div className={"shape shape-style-1 shape-default bg-gradient-" + background}>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
				<Container className="py-lg-md d-flex">
					<div className="px-0">
						{children}
					</div>
				</Container>
				{/* SVG separator */}
				<div className="separator separator-bottom separator-skew">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						version="1.1"
						viewBox="0 0 2560 100"
						x="0"
						y="0"
					>
						<polygon
							className="fill-white"
							points="2560 0 2560 100 0 100"
						/>
					</svg>
				</div>
			</section>
			{/* 1st Hero Variation */}
		</div>
	)
}