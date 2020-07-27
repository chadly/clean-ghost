import React from "react";
import { createUseStyles } from "react-jss";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { scale } from "../../theme";

import img404 from "./oatmeal-tumbeast-404.png";

const NotFoundPage = ({
	data: {
		authorFile: {
			childMdx: {
				author: { name, description }
			}
		}
	}
}) => {
	const classes = useStyles();

	return (
		<>
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>

			<div className={classes.container}>
				<h1 className={classes.siteTitle} title={description}>
					<Link to="/">{name}</Link>
				</h1>

				<Link to="/">
					<img
						src={img404}
						alt="404 Page Not Found"
						title="Go to the front page →"
						className={classes.image}
					/>
				</Link>
			</div>
		</>
	);
};

const useStyles = createUseStyles({
	container: {
		textAlign: "center",
		color: "var(--textNormal)"
	},
	siteTitle: {
		border: "none",
		...scale(0.2),
		marginLeft: 60, // because of the img drop shadow, this doesn't look centered otherwise
		"@media (max-width:500px)": {
			// at smaller viewports, it doesn't look right
			marginLeft: 40
		},

		"& a": {
			boxShadow: `none`,
			textDecoration: `none`,
			color: `inherit`
		}
	}
});

export default NotFoundPage;

export const pageQuery = graphql`
	query NotFoundQuery {
		authorFile: file(
			sourceInstanceName: { eq: "author" }
			extension: { eq: "mdx" }
		) {
			childMdx {
				author: frontmatter {
					name
					description
				}
			}
		}
	}
`;
