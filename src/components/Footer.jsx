import perfil from "../assets/IMG_0092.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <img
          src={perfil}
          alt="Maria Eduarda"
          className="footer-avatar"
        />

        <div className="footer-info">
          <h4>Maria Eduarda</h4>
          <p>Desenvolvedora Front-end</p>
          <span>
            Construindo soluções simples e eficientes 🚀
          </span>

          <div className="footer-links">
            <a href="https://linkedin.com/in/seu-perfil" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}