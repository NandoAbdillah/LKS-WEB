export default function AboutUs()
{

    return (
     
        <footer id="footer" className="footer-area bg_cover">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-2 col-lg-4 col-md-6">
                        <div className="footer-widget wow fadeInUp" data-wow-delay=".3s">
                          
                            <h4>Tentang Kami</h4>
                            <ul>
                                
                                <li className="my-2">
                                   
                                    <a href="https://aplikasitoko.com/tentang-kami/"  >
                                        Tentang Kami
                                    </a>
                                </li>
                                <li className="my-2">
                                    <a href="https://aplikasitoko.com/faq/" >
                                        FAQ
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6  ">
                        <div className="footer-widget wow fadeInUp" data-wow-delay=".3s">
                            <h4>Hubungi Kami</h4>
                            <p className="mb-35">Anda dapat menghubungi kami melalui alamat media sosial di bawah ini </p>
                            <ul className="social-links">
                                
                                <li className="my-2  d-flex">
                                    <span>
                                    <a href="https://www.instagram.com/itbrainindonesia/" className="instagram ps-3 pt-2">
                                        <i className="lni lni-instagram">  </i>
                                       
                                    </a>
                                       <p className=" d-inline-block ms-2">  @itbrainindonesia</p></span>
                                </li>
                                <li className="my-2">
                                    <a href="https://wa.me/+6282142401405"  className="whatsapp ps-3 pt-2">
                                        <i className="lni lni-whatsapp"> </i>
                                    </a>
                                    <p className=" d-inline-block ms-2">  0813-5791-1226</p>
                                </li>
                                <li className="my-2">
                                    <span>
                                    <a href="mailto:aplikasitokomurah@gmail.com"  className="email  p-2">
                                        <i className="lni icon-email">
                                            <img src="./assets/images/email.svg" alt="icon" />
                                        </i>
                                    </a>

                                    <p className=" d-inline-block ms-2">  aplikasitokomurah@gmail.com</p>
                                </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="footer-widget wow fadeInUp" data-wow-delay=".5s">
                            <h4>Alamat</h4>
                            <p>Perumahan Graha Kuncara Blok H-29 Kemiri, Sidoarjo – Jawa Timur</p>
                            <br />
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d46815.702557597535!2d112.729507!3d-7.436838999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e6a505d1cc59%3A0x6e42e8fdd3614be0!2sAplikasi%20Toko%20Kasir%20Murah%20%7C%20iTBrain%20Indonesia!5e1!3m2!1sen!2sus!4v1734419751003!5m2!1sen!2sus" width="400" height="300" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}