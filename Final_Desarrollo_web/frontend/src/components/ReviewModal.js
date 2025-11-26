import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ReviewModal({ show, setShow, editing, onSaved }) {
  const [restaurantName, setRestaurantName] = useState('')
  const [rating, setRating] = useState(0)
  const [visitDate, setVisitDate] = useState('')
  const [comments, setComments] = useState('')

  useEffect(() => {
    if (editing) {
      setRestaurantName(editing.restaurantName)
      setRating(editing.rating)
      setVisitDate(editing.visitDate?.slice(0, 10))
      setComments(editing.comments || '')
    } else {
      setRestaurantName('')
      setRating(0)
      setVisitDate('')
      setComments('')
    }
  }, [editing])

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { restaurantName, rating: Number(rating), visitDate, comments }
    if (editing) {
      await api.put(`/api/reviews/${editing._id}`, payload)
    } else {
      await api.post('/api/reviews', payload)
    }
    setShow(false)
    onSaved()
  }

  if (!show) return null
  return (
    <div className="modal d-block" role="dialog" aria-modal="true" aria-label="Modal reseña">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editing ? 'Editar reseña' : 'Nueva reseña'}</h5>
            <button className="btn-close" onClick={() => setShow(false)} aria-label="Cerrar"></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="restaurant" className="form-label">Restaurante</label>
                <input id="restaurant" className="form-control" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Calificación (0-5)</label>
                <input id="rating" type="number" min="0" max="5" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Fecha de visita</label>
                <input id="date" type="date" className="form-control" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="comments" className="form-label">Observaciones</label>
                <textarea id="comments" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}