import { useState } from "react";

const BlogForm = ({ handleNewBlog }) =>{

    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [url,setUrl] = useState('');

    const addBlog = (event) =>{
        event.preventDefault();
        handleNewBlog({
            title,
            author,
            url
        })

        setTitle('');setAuthor('');setUrl('');
    }
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
            <p>title:<input value={title} onChange={ ({target}) => { setTitle(target.value) }}/></p>
            <p>author:<input value={author} onChange={ ({target}) => { setAuthor(target.value) }}/></p>
            <p>url:<input value={url} onChange={ ({target}) => { setUrl(target.value) }}/></p>
            <button type="submit">create</button>
            </form>
      </>
    )
}

export default BlogForm;