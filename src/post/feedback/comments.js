import React from "react";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { rhythm, scale } from "../../theme";

const CommentsRoot = ({ comments, ...props }) => {
	const classes = useStyles();

	if (!comments || !comments.length) return null;

	return (
		<div {...props}>
			<p>
				<strong>
					{comments.totalCount} Comment{comments.totalCount != 1 ? "s" : ""}
				</strong>
			</p>
			<Comments comments={comments} classes={classes} />
		</div>
	);
};

const Comments = ({ comments, classes }) => {
	if (!comments || !comments.length) return null;

	return (
		<ol className={classes.root}>
			{comments.map(c => {
				const date = moment(c.date);

				return (
					<li key={c.id} className={classes.container}>
						<img
							src={c.author.photo}
							alt={c.author.name}
							className={classes.avatar}
						/>
						<div className={classes.body}>
							<span className="name">
								<strong>
									{c.url ? (
										<a href={c.url}>{c.author.name}</a>
									) : c.author.url ? (
										<a href={c.author.url}>{c.author.name}</a>
									) : (
										c.author.name
									)}
								</strong>
							</span>
							<time
								dateTime={c.date}
								title={date.format("MMMM Do, YYYY h:mm a")}
							>
								{date.fromNow()}
							</time>
							<div
								dangerouslySetInnerHTML={{
									__html: c.message
								}}
							/>

							<Comments comments={c.comments} classes={classes} />
						</div>
					</li>
				);
			})}
		</ol>
	);
};

const useStyles = createUseStyles({
	root: {
		margin: 0
	},
	container: {
		display: "block",
		marginBottom: rhythm(1.5)
	},
	avatar: {
		float: "left",
		boxShadow: "0 0 0 6px hsla(0,0%,100%,.1)",
		background: "#e3e9ed",
		borderRadius: "100%",
		objectFit: "cover",
		width: rhythm(2),
		height: rhythm(2)
	},
	body: {
		marginLeft: rhythm(3),
		"& .name": {
			display: "inline-block",
			margin: 0,
			marginRight: rhythm(0.25)
		},
		"& time": {
			color: "var(--textMuted)",
			...scale(-0.5)
		}
	},
	meta: {
		"& h3": {
			marginTop: rhythm(0.25),
			marginBottom: rhythm(0.25)
		}
	},
	bio: {
		"& p": {
			marginBottom: 0
		}
	}
});

export default CommentsRoot;
