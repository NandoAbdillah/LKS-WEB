const Footer = () => {

    return (
        <footer className="text-center text-lg-start bg-dark text-muted">
            {/* Section Social Media */}
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
               {/* Left */}
               <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
               </div>


               {/* Right */}
               <div>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-instagram"></i>
                    </a>
               </div>


            </section>

            {/* Section Link */}
            <section className="">
              <div className="container text-center text-md-start mt-5">
                {/* Grid Row */}
                <div className="row mt-3">
                    {/* Grid Column */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        {/* Content */}
                        <h6 className="text-uppercase fw-bold mb-4">
                            <i className="fas fa-gem me-3"></i> 
                            Game Portal
                        </h6>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt,  ullamcorper, lorem ipsum dolor sit amet, consect
                        </p>
                    </div>

                    {/* Grid Column 2 */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Games</h6>

                        <p>
                            <a href="#!" className="text-reset">
                                Discover Games
                            </a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">
                                Publish Games
                            </a>
                        </p>
                    </div>

                    {/* Grid Column 3 */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">
                            Contact
                        </h6>

                        <p>
                            <i className="fas fa-home me-3"></i>
                            Jl.Mangga I No.19, Ds.Sruni, Kec.Gedangan, Kab.Sidoarjo, Jawa Timur, Indonesia
                        </p>
                        <p>
                            <i className="fas fa-envelope me-3">
                            </i>
                            nandoabdilah@gmail.com
                        </p>
                        <p>
                            <i className="fas fa-phone me-3"></i>
                            +62 812-3456-7890
                        </p>

                    </div>
                </div>
              </div>
            </section>

            {/* Copyright */}
            <div className="text-center p-4" style={{ backgroundClip :'rgba(0,0,0,0.5)' }}>
             &#169; 2025 Copyright
                <a href="#" className="text-reset fw-bold">  Game Portal</a>
            </div>
        </footer>
    )
}

export default Footer;