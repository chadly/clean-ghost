import React from "react";
import moment from "moment";

const Hero = ({
	cover = "/lodyas.png",
	headerClass,
	title,
	description,
	date
}) => {
	const descEl = description ? <h2>{description}</h2> : null;
	const dateEl = date ? (
		<time datetime={moment(date).format("YYYY-MM-DD")} itemprop="datePublished">
			<i className="fa fa-calendar"></i>
			{" "}
			{moment(date).format("MMMM DD, YYYY")}
		</time>
	) : null;

	const style = {
		"backgroundImage": `url(${cover})`
	};

	return (
		<header style={style} className={headerClass}>
			<div className="container">
				<section>
					<h1>{title}</h1>
					{descEl}
					{dateEl}
				</section>
			</div>
		</header>
	);
};

module.exports = Hero;