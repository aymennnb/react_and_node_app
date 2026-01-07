import React from 'react'

function NotFound() {
  return (
    <div className="notfound card">
          <h2>Page introuvable</h2>
          <p>La page demandée n'existe pas ou a été déplacée.</p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <Link to="/"><button className="button button--primary">Retour à l'accueil</button></Link>
          </div>
    </div>
  )
}

export default NotFound