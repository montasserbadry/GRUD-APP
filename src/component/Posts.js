import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from './redux/postsSlice'

function Posts() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDesc, setUpdateDesc] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(null)
    const posts = useSelector((state) => state.posts.items)
    const dispatch = useDispatch()


    return (
        <div>
            <div className='froms'>
                <input type="text"
                    value={title}
                    placeholder='Enter Post Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="text"
                    value={desc}
                    placeholder='Enter Post Desc '
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={() => {
                    dispatch(addPost({ id: posts.length + 1, title, desc }))
                    setTitle("");
                    setDesc("")
                }} >Add Post</button>
            </div>
            <div className='posts'>
                {posts.length > 0 ? posts.map(post => <div key={post.id} className='post'>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <button onClick={() => {
                        setIsEdit(true)
                        setId(post.id)
                    }}>Edit</button>
                    <button onClick={() => { dispatch(deletePost({ id: post.id })) }}>Delete</button>
                    <br />
                    {isEdit && id === post.id && (
                        <>
                            <input type="text"
                                placeholder='updated Title'
                                onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                            <input type="text"
                                placeholder='updated Desc'
                                onChange={(e) => setUpdateDesc(e.target.value)}
                            />
                            <button onClick={() => {
                                dispatch(updatePost({ id: post.id, title: updateTitle, desc: updateDesc }))
                                setIsEdit(false)
                            }}> Update</button>
                        </>
                    )}
                </div>
                )
                    : 'There Is No Posts'}
            </div>
        </div>
    );
}


export default Posts;