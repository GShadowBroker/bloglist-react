import React, { useEffect, useState } from 'react'
import './styles/App.css'
import blogService from './services/blog'
import loginService from './services/login'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
    // Notification
    const [notification, setNotification] = useState('')

    // Blogs state
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(null)

    // Add blog state
    const [isFormActive, setisFormActive] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    // Login state
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [stayLogged, setStayLogged] = useState(false)

    useEffect(() => {
        blogService
            .getAll()
            .then(data => {
                setBlogs(data)
                const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                setUser(loggedUser)
                blogService.setToken(loggedUser.token)
            })
            .catch(err => {
                setError(err)
                showNotification('Couldn\'t fetch blog list.')
            })
    }, [])

    const showNotification = (message) => {
        setTimeout(() => {
            setNotification('')
        }, 5000)
        setNotification(message)
    }

    // Login Form
    const handleLogin = (e) => {
        e.preventDefault()
        
        // Validation ...

        loginService
            .login({
                username,
                password
            })
            .then(data => {
                setUser(data)
                if (stayLogged) {
                    window.localStorage.setItem('loggedUser', JSON.stringify(data))
                }
            })
            .catch(err => {
                console.log(err.response)
                if (!err.response) {
                    alert('Server timed out. Please refresh page and try again.')
                    return
                } else if (err.response && err.response.status === 401) {
                    alert('Invalid username or password!')
                    return
                }
                alert('Woops! Something went wrong. Please refresh page and try again.')
            })
    }

    const handleLogout = () => {
        let question = window.confirm('Are you sure you want to logout?')
        if (!question) return
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    // Add Blog Form
    const handleAddBlog = (e) => {
        e.preventDefault()

        // Validation ...

        blogService
            .create({
                title,
                author,
                url
            })
            .then(data => {
                setBlogs([...blogs, data])
                setTitle('')
                setAuthor('')
                setUrl('')
                showNotification('New blog created successfully.')
            })
            .catch(err => {
                console.log(err.response)
                if (!err.response) {
                    showNotification('Server timed out. Please refresh page and try again.')
                    return
                } else if (err.response && err.response.status === 401) {
                    showNotification('Session token expired! Please try to login again.')
                    return
                }
                showNotification('Woops! Something went wrong. Please refresh page and try again.')
            })
    }

    const updateBlogsAfterDelete = (deletedBlog) => {
        setBlogs(blogs.filter(i => i.id !== deletedBlog.id))
        showNotification('Blog deleted successfully')
    }

    const handleTitle = ({ target }) => setTitle(target.value)
    const handleAuthor = ({ target }) => setAuthor(target.value)
    const handleUrl = ({ target }) => setUrl(target.value)

    const blogList = blogs
        ? blogs.map(blog => <Blog key={ blog.id } blog={ blog } updateBlogsAfterDelete={updateBlogsAfterDelete} />)
        : null

    if (!user) return (
        <Login 
            handleLogin={handleLogin}
            username={username}
            password={password}
            stayLogged={stayLogged}
            setUsername={setUsername}
            setPassword={setPassword}
            setStayLogged={setStayLogged}
        />
    )

    const addButton = isFormActive
                        ? <button onClick={() => setisFormActive(!isFormActive)}>-</button> 
                        : <button onClick={() => setisFormActive(!isFormActive)}>+</button>
    return (
        <div className="app">
            {
                notification
                    ? <Notification message={notification} />
                    : null
            }
            <div>
                <h1>Blogs</h1>
                <span>Logged in as <strong>{ user.username }</strong></span>
                <button style={{ marginLeft: 5 }} onClick={ handleLogout }>logout</button>
            </div>
            <div className="add-blog-form">
                <h3>Add blog { addButton }</h3>
                {
                    isFormActive
                    ? <AddBlogForm
                        title={title}
                        author={author}
                        url={url}
                        handleTitle={handleTitle}
                        handleAuthor={handleAuthor}
                        handleUrl={handleUrl}
                        handleAddBlog={handleAddBlog}
                    />
                : null
                }
                
            </div>

            <div id="blog-list">
                <ul>
                    { blogs ? blogList : <span>0 blogs</span> }
                </ul>
            </div>
        </div>
    )
}

export default App