// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ImageUpload from '../../ImageUpload'

import React, { useEffect } from 'react'
import Select from 'react-select'
import { useState } from 'react'

const ProductForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    // Removing unneeded errors
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  // const selectionArray = []

  // const selectCategory = (e) => {
  //   console.log(e)
  //   for (let i = 0; i < e.length; i++) {
  //     selectionArray.push(e[i].value)
  //   }
  //   console.log(selectionArray)
  // }

  const [categoriesArray, setCategoriesArray] = useState([])
  let array = []

  const selectCategory = (e) => {
    array = []
    console.log('e', e)
    for (let i = 0; i < e.length; i++) {
      array.push(e[i].value)
    }
    setCategoriesArray(array)
  }

  useEffect(() => {
    console.log('categoriesArray', categoriesArray)
    setFormFields({ ...formFields, categories: categoriesArray })
  }, [categoriesArray])

  const options = [
    { value: '5', label: 'Tools' },
    { value: '11', label: 'Garden' },
    { value: '3', label: 'Leisure' },
    { value: '2', label: 'Kitchen' },
    { value: '4', label: 'Decoration' },
    { value: '6', label: 'Cars' },
    { value: '7', label: 'Motorbikes' },
    { value: '8', label: 'Clothes' },
    { value: '9', label: 'Shoes' },
    { value: '10', label: 'Makeup' },
    { value: '12', label: 'Others' },
    { value: '1', label: 'Sport' }
  ]


  return (
    <Container className='mt-4'>
      <Row>
        <div className='col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
          <form onSubmit={handleSubmit}>
            <h1>{formName}</h1>
            {/* Name */}
            <label htmlFor="name">Name<span>*</span></label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formFields.name}
              placeholder="Name"
              required
            />
            <label htmlFor="name">Description<span>*</span></label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formFields.description}
              placeholder="Description"
              required
            />
            <label htmlFor="name">Price<span>*</span></label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={formFields.price}
              placeholder="Price"
              required
            />
            <div className='post-cat'>
              <p>Categorize your ad:</p>
              <Select options={options} isClearable={true} isMulti onChange={selectCategory} />
            </div>
            {errors && errors.description && <small className='text-danger'>{errors.description}</small>}
            {/* Image */}
            <label>Upload an image for your ad:</label>
            <ImageUpload
              formFields={formFields}
              setFormFields={setFormFields}
            />
            {/* <label htmlFor="image">Image <span>*</span></label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              value={formFields.image}
              placeholder="Image"
              required
            /> */}
            {/* {errors && errors.image && <small className='text-danger'>{errors.image}</small>} */}
            {/* Generic Message Error */}
            {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
            {/* Submit */}
            <button className='btn-form'>Post my ad</button>
          </form>
        </div>
      </Row>
    </Container>
  )
}

export default ProductForm