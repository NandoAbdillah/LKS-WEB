import Navbar from "../../components/Navbar";

export default function ManageGames() {
    return (
        <div>
            <Navbar />

            <main>

                <div className="hero py-5 bg-light">
                    <div className="container">
                        <a href="manage-games-form.html" className="btn btn-primary">
                            Add Game
                        </a>
                    </div>
                </div>

                <div className="list-form py-5">
                    <div className="container">
                        <h6 className="mb-3">List Games</h6>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th width="100">Thumbnail</th>
                                    <th width="200">Title</th>
                                    <th width="500">Description</th>
                                    <th width="180">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 1 Logo" style="width: 100%" /></td>
                                    <td>Demo Game 1</td>
                                    <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                                    <td>
                                        <a href="detail-games.html" className="btn btn-sm btn-primary">Detail</a>
                                        <a href="manage-games-form-update.html" className="btn btn-sm btn-secondary">Update</a>
                                        <a href="#" className="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 2 Logo" style="width: 100%" /></td>
                                    <td>Demo Game 2</td>
                                    <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                                    <td>
                                        <a href="detail-games.html" className="btn btn-sm btn-primary">Detail</a>
                                        <a href="manage-games-form-update.html" className="btn btn-sm btn-secondary">Update</a>
                                        <a href="#" className="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 3 Logo" style="width: 100%" /></td>
                                    <td>Demo Game 3</td>
                                    <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                                    <td>
                                        <a href="detail-games.html" className="btn btn-sm btn-primary">Detail</a>
                                        <a href="manage-games-form-update.html" className="btn btn-sm btn-secondary">Update</a>
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