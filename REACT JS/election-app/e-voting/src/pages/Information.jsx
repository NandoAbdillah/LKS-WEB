export default function Information() {
  return (
    <div className="col-10 mx-auto">
      <h2 className=" text-center mb-5">Informasi Seputar Pemilu</h2>

      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">Informasi Umum</div>

            <div className="card-body">
              <h5 className="card-title">
                Petunjuk pemilihan Presiden dan Wakil Presiden
              </h5>
              <p className="card-text">Berisi petunjuk dan aturan</p>
              <a href="#" className="btn btn-primary">
                Baca Petunjuk
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">Informasi Umum</div>

            <div className="card-body">
              <h5 className="card-title">
                Petunjuk pemilihan Dewan Perwakilan Rakyat
              </h5>
              <p className="card-text">Berisi petunjuk dan aturan</p>
              <a href="#" className="btn btn-primary">
                Baca Petunjuk
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">Informasi Umum</div>

            <div className="card-body">
              <h5 className="card-title">
                Petunjuk pemilihan  Dewan Perwakilan Daerah 
              </h5>
              <p className="card-text">Berisi petunjuk dan aturan</p>
              <a href="#" className="btn btn-primary">
                Baca Petunjuk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
