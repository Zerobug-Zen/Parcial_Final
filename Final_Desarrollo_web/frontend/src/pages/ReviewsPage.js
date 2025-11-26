import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { motion } from 'framer-motion'
import ReviewModal from '../components/ReviewModal'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [show, setShow] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const res = await api.get('/api/reviews')
    setReviews(res.data.data)
  }

  useEffect(() => {
    load()
  }, [])

  const onCreate = () => {
    setEditing(null)
    setShow(true)
  }

  const onEdit = (r) => {
    setEditing(r)
    setShow(true)
  }

  const onDelete = async (id) => {
    await api.delete(`/api/reviews/${id}`)
    load()
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Mis reseñas de restaurantes</h3>
        <button className="btn btn-success soft-btn" onClick={onCreate}>Nueva reseña</button>
      </div>
      <div className="row g-4">
        {reviews.map((r) => (
          <div className="col-md-4" key={r._id}>
            <motion.div whileHover={{ scale: 1.02 }} className="card shadow-sm review-card">
              <div className="card-body">
                <h5 className="card-title">{r.restaurantName}</h5>
                <p className="card-text">Calificación: {r.rating}</p>
                <p className="card-text">Fecha de la visita: {new Date(r.visitDate).toLocaleDateString()}</p>
                <p className="card-text">Observaciones: {r.comments}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => onEdit(r)}>Editar</button>
                  <button className="btn btn-outline-danger" onClick={() => onDelete(r._id)}>Eliminar</button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <ReviewModal show={show} setShow={setShow} editing={editing} onSaved={load} />
    </div>
  )
}