const RegularCard = ({ imagePath, title, description, navigateCard}) => {
  return (
    <div
      className="card text-white card-bg-glass"
      style={{
        width: "13rem",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255,255,0.2)",
        maxWidth: "300px",
        padding : '0px'
      }}
    >
      <img src={imagePath} alt="..." className="card-img-top" style={{  
        maxHeight : '13rem',
        objectFit : 'cover',
        borderRadius : '10px',
        borderBottomLeftRadius : '0px',
        borderBottomRightRadius : '0px',
        }}   />
      <div className="card-body mt-2">
        <h5 className="card-title">{title}</h5>
        <p className="card-text " 
           style={{ minHeight : '60px' }}
        >{description}</p>
        <button className="btn btn-outline-primary w-100 btn-game" onClick={navigateCard} >
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default RegularCard;
