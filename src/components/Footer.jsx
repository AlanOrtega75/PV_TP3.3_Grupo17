import React from 'react';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Gestión de Proyectos</h3>
          <p>
            Una plataforma diseñada para organizar, planificar y realizar el seguimiento de tus proyectos y tareas con total claridad y eficiencia.
          </p>
        </div>
        
        <div className="footer-column">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Proyectos</a></li>
            <li><a href="#">Perfil</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Integrantes - Grupo 17</h3>
          <ul className="footer-members">
            <li>
              <a href="https://github.com/AlanOrtega75" target="_blank" rel="noopener noreferrer">
                Alan M. Ortega
              </a>
            </li>
            <li>
              <a href="https://github.com/Emanuel-J-Valeriano" target="_blank" rel="noopener noreferrer">
                Emanuel J. Valeriano
              </a>
            </li>
            <li>
              <a href="https://github.com/IgnacioG04" target="_blank" rel="noopener noreferrer">
                Ignacio V. Gutierrez
              </a>
            </li>
            <li>
              <a href="https://github.com/Barr09" target="_blank" rel="noopener noreferrer">
                Bárbara L. Alavar
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Información</h3>
          <p><strong>Materia:</strong> Programación Visual</p>
          <p><strong>Trabajo Practico:</strong> 3.3 React + Vite</p>
          <p><strong>Año:</strong> {new Date().getFullYear()}</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Grupo 17 - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;