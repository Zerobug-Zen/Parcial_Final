import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="p-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero">
        <h2 className="display-6">TasteFlow</h2>
        <p>Reseñas de restaurantes con estilo profesional</p>
      </motion.div>
    </div>
  )
}