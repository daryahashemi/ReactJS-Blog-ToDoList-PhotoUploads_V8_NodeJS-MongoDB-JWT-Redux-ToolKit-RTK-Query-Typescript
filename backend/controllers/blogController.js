import Blog from '../models/blog.js'
import mongoose from 'mongoose'

const dateFormat = (blog) => {
  const dateraw = blog.createdAt
  const date1 = dateraw.toString().slice(4,7)
  const date2 = dateraw.toString().slice(8,10)
  const date3 = dateraw.toString().slice(11,15)
  const date = `${date2} ${date1} ${date3}` 
  blog.createdAt = date
  return {...blog.toJSON(), createdAt: date}
 }

const get_allblogs = (req, res) => { 
  Blog.find().sort({ createdAt: -1 })
  .then(result => {
    const newAllBlogs = result.map(dateFormat)
    res.status(200).json(newAllBlogs)
  })
  .catch(err => {
    console.log(err)
  })
}

const get_details = (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog id'})
  }

  Blog.findById(id)
  .then(result => {
    if (!result) {
      return res.status(404).json({error: 'No such blog'})
    }
    let newBlog = dateFormat(result)
    res.status(200).json(newBlog)
  })
  .catch(err => {
    console.log(err)
  })
}

const post_newblog = (req, res) => {
  console.log(req.body)
  const blog = new Blog(req.body)

  blog.save()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(400).json({ error: err.message })
  })
}

const update_blog = (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog id'})
  }

  Blog.findByIdAndUpdate(id, { ...req.body })
  .then((result) => {
    if(result) {
      res.status(200).json(result)
      // res.json({ msg: 'Blog has been successfully updated.' })
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

const delete_blog = (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog id'})
  }

  Blog.findByIdAndDelete(id)
  .then(result => {
    if(result) {
      res.status(200).json(result)
      // res.json({ msg: 'Blog has been successfully deleted.' })
    }
  })
  .catch(err => {
    console.log(err);
  })
}

export default {
  get_allblogs, 
  get_details, 
  post_newblog,
  update_blog,
  delete_blog
}