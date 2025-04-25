import Navbar from "../../components/Navbar";

export default function ManageUsers() {

    return (

        <div>
            <Navbar />
            <main>

                <div className="hero py-5 bg-light">
                    <div className="container">
                        <a href="users-form.html" className="btn btn-primary">
                            Add User
                        </a>
                    </div>
                </div>

                <div className="list-form py-5">
                    <div className="container">
                        <h6 className="mb-3">List Users</h6>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Created at</th>
                                    <th>Last login</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="../Gaming Portal/profile.html" target="_blank">player1</a></td>
                                    <td>2024-04-05 20:55:40</td>
                                    <td>2024-04-05 20:55:40</td>
                                    <td><span className="bg-success text-white p-1 d-inline-block">Active</span></td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Lock
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button type="submit" className="dropdown-item" name="reason" value="spamming">Spamming</button>
                                                </li>
                                                <li>
                                                    <button type="submit" className="dropdown-item" name="reason" value="cheating">Cheating</button>
                                                </li>
                                                <li>
                                                    <button type="submit" className="dropdown-item" name="reason" value="other">Other</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href="users-form.html" className="btn btn-sm btn-secondary">Update</a>
                                        <a href="#" className="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="../Gaming Portal/profile.html" target="_blank">player2</a></td>
                                    <td>2024-04-13 20:55:40</td>
                                    <td>2024-04-28 20:55:40</td>
                                    <td><span className="bg-danger text-white p-1 d-inline-block">Blocked</span></td>
                                    <td>
                                        <button type="submit" className="btn btn-primary btn-sm">Unlock</button>
                                        <a href="users-form.html" className="btn btn-sm btn-secondary">Update</a>
                                        <a href="#" className="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </main>
        </div>
    )
}