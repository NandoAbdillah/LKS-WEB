import Navbar from "../../components/Navbar";

export default function ListAdmins() {
    return (
        <div>
            <Navbar />

            <main>

                <div className="list-form py-5">
                    <div className="container">
                        <h6 className="mb-3">List Admin Users</h6>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Created at</th>
                                    <th>Last login</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>admin1</td>
                                    <td>2024-04-05 20:55:40</td>
                                    <td>2024-04-05 20:55:40</td>
                                </tr>
                                <tr>
                                    <td>admin2</td>
                                    <td>2024-04-13 20:55:40</td>
                                    <td>2024-04-28 20:55:40</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </main>
        </div>
    )
}