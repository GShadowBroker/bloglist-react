import React from 'react'
import '../styles/Blog.css'
import { MdDelete } from 'react-icons/md'
import blogService from '../services/blog'

const Blog = ({ blog, updateBlogsAfterDelete }) => {
    
    const handleDelete = () => {
        let question = window.confirm(`Are you sure you want to delete '${blog.title}'?`)
        if (!question) return
        blogService
            .remove(blog.id)
            .then(data => {
                console.log(data)
                updateBlogsAfterDelete(blog)
            })
            .catch(err => {
                if (!err.response) {
                    alert('Server timeout')
                    return
                }
                alert('You are not allowed to delete another person\'s blog.')
            })
    }

    return (
        <li>
            { blog.title } | { blog.author } <MdDelete className="blog-icon" onClick={ handleDelete } />
        </li>
    )
}

export default Blog