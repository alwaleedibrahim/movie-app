import axiosiInstance from "../../api/axios"

export default async function moviesLoader(page) {
    try {
      const movies = await axiosiInstance.get(`movie/popular?page=${page}`)
      return movies
    } catch(err) {
      return Promise.reject(err)
    }
  }