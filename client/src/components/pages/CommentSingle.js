import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom' // Importing useParams, we have access to any placeholders in the url
import axios from 'axios'
import { getToken } from '../../helpers/auth'
import { getPayload } from '../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const CommentSingle = () => {

  // ! State
  const [comment, setComment] = useState(null)
  const [errors, setErrors] = useState(false)

  // ! Location
  const { commentId } = useParams()
  console.log(commentId)
  const navigate = useNavigate()


  // ! Execution
  useEffect(() => {
    const getComment = async () => {
      try {
        const { data } = await axios.get(`/api/comments/${commentId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setComment(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getComment()
  }, [commentId])


  const [messageField, setMessageField] = useState({
    text: '',
  })

  const handleChange = (e) => {
    const updatedReviewField = {
      ...messageField,
      [e.target.name]: e.target.value,
      commentOwner: userId,
      productOwner: comment.commentOwner.id,
    }
    setMessageField(updatedReviewField)
    if (errors) setErrors('')
  }

  const payload = getPayload()
  const userId = payload.sub
  console.log('userId', userId)



  const handleClick = async (e) => {
    // console.log('product owner', product.owner.id)
    // console.log('message field', messageField)
    try {
      const { data } = await axios.post('/api/comments/', { ...messageField }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setMessageField({
        text: 'Message sent!',
      })
      navigate('/profile')
      console.log('review SUCCESS ->', data)
    } catch (err) {
      console.log('review FAIL ->', err)
      setErrors(err.response.data)
    }
  }

  return (
    <>
      <h1>Comment Single</h1>
      {comment ?
        <>
          <p>{comment.text}</p>
          <p>From {comment.commentOwner.username}, posted on {comment.created_at.toString().split('T').slice(0, 1).join()}</p>
          <input
            type="text"
            name="text"
            onChange={handleChange}
            value={messageField.text}
            placeholder="Type your message"
          />
          <button className="btn-post" onClick={handleClick}>Reply</button>
          <hr></hr>
          <Link to="/home" className='btn btn-main'>Back to home</Link>
        </>
        :
        errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
      }
    </>
  )
}

export default CommentSingle