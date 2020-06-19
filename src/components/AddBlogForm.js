import React from 'react'

const AddBlogForm = ({ title, author, url, handleTitle, handleAuthor, handleUrl, handleAddBlog }) => {

    return (
        <form onSubmit={ handleAddBlog }>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input type="text" value={title} onChange={handleTitle} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td>
                            <input type="text" value={author} onChange={handleAuthor} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Url</td>
                        <td>
                            <input type="text" value={url} onChange={handleUrl} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">create</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default AddBlogForm