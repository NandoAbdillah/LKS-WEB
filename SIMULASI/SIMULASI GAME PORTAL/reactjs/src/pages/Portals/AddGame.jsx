export default function AddGames() {
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">
                        Manage Games - Gaming Portal
                    </h2>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <form>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="title" className="mb-1 text-muted">Title <span className="text-danger">*</span></label>
                                            <input id="title" type="text" placeholder="Title" className="form-control" name="title" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="description" className="mb-1 text-muted">Description <span className="text-danger">*</span></label>
                                            <textarea name="description" className="form-control" placeholder="Description" id="description" cols="30" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="thumbnail" className="mb-1 text-muted">Thumbnail <span className="text-danger">*</span></label>
                                            <input type="file" name="thumbnail" className="form-control" id="thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="game" className="mb-1 text-muted">File Game <span className="text-danger">*</span></label>
                                            <input type="file" name="game" className="form-control" id="game" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    <div className="col">
                                        <a href="manage-games.html" className="btn btn-danger w-100">Back</a>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}