export default function AddUser() {
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">
                        Manage User - Administrator Portal
                    </h2>
                    <div className="text-muted">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </div>
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
                                            <label htmlFor="username" className="mb-1 text-muted">Username <span className="text-danger">*</span></label>
                                            <input id="username" type="text" placeholder="Username" className="form-control" name="username" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="password" className="mb-1 text-muted">Password <span className="text-danger">*</span></label>
                                            <input id="password" type="password" placeholder="Password" className="form-control" name="userpasswordname" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    <div className="col">
                                        <a href="users.html" className="btn btn-danger w-100">Back</a>
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