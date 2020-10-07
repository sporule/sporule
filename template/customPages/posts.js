import React from "react";
import {Link} from "react-router-dom"

const Posts = (props) => {
    var prev;
    var next;
    var categories;
    var tags;
    if (props.prev) {
        prev = <span className="prev">
            <a href="#" className="prev" onClick={props.prev}>
                ← Previous Page
        </a>
        </span>;
    }
    if (props.next) {
        next = <span className="next">
            <a href="#" className="next" onClick={props.next}>
                Next Page →
        </a>
        </span>;
    }
    if (props.categories.length > 0) {
        categories = <div>
            Categories: {props.categories.join(",")}
        </div>
    }
    if (props.tags.length > 0) {
        tags = <div>
            Tags: {props.tags.join(",")}
        </div>
    }
    return (
        <div id="main" role="main" className="wrapper-content">
            <div className="container">
                {categories}
                {tags}
                <div className="posts">
                    {props.posts.items.map((md, index) => {
                        return (
                            <article key={index} className="post">
                                <h1>
                                    <Link to={md.link}>{md.title}</Link>
                                </h1>

                                <div className="meta">
                                    <span className="date">
                                        {md.metas.date}
                                    </span>
                                    {md.metas.categories.map((category, index) => {
                                        return (
                                            <span className="category" key={index}>
                                                <Link to={"/categories/" + category}>{category}</Link>
                                            </span>
                                        );
                                    })}
                                    <ul className="tag">
                                        {md.metas.tags.map((tag, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={"/?tags=" + tag}>
                                                        {tag}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {
                                    md.metas.coverimage.length > 0 ?
                                        (
                                            <div className="thumbnail">
                                                <img src={md.metas.coverimage} />
                                            </div>
                                        )
                                        : (
                                            <div className="thumbnail">
                                            </div>
                                        )
                                }


                                <div className="entry">
                                    <p>{md.excerpt}</p>
                                </div>

                                <Link to={md.link} className="read-more">Read More</Link>
                            </article>
                        );
                    })}
                </div>
                <div className="pagination">
                    {prev}
                    {next}
                </div>
            </div>
        </div>
    );
}


export default Posts