import axios from 'axios'

const ImageUpload = ({ formFields, setFormFields }) => {

  const handleChange = async (event) => {
    try {
      const formData = new FormData()
      // File field on the formData we're creating
      formData.append('file', event.target.files[0])
      // Upload preset
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      // Sending data as an axios request to the cloudinary API
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      setFormFields({ ...formFields, image: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="image-upload-div">
      {formFields.image ?
        <img src={formFields.image} alt="Product Image" />
        :
        <input
          className="input"
          type="file"
          onChange={handleChange}
        />
      }
    </div>
  )
}

export default ImageUpload