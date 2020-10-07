import React from "react"
import {Link} from "react-router-dom"

const PostTemplate = (props) => {
    return (
        <React.Fragment>
            <aside className="toc">
                {props.toc}
            </aside>
            <div id="main" role="main" className="wrapper-content withtoc">
                <div className="container">
                    <article className="posts">
                        <h1>{props.post.title}</h1>
                        <div clsss="meta">
                            <span className="date">
                                {props.post.metas.date}
                            </span>
                            {props.post.metas.categories.map((category, index) => {
                                return (
                                    <span className="category" key={index}>
                                        <Link to={"/categories/" + category}>{category}</Link>
                                    </span>
                                );
                            })}
                            <ul className="tag">
                                {props.post.metas.tags.map((tag, index) => {
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
                        <div className="entry">
                            {props.content}
                        </div>
                        {props.disqus}
                    </article>
                </div>
            </div>
        </React.Fragment>
    );
}


export default PostTemplate