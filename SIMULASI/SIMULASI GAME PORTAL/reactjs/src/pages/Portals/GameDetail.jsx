export default function GameDetail() {
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">
                        Demo Game 1
                    </h2>

                    <a href="profile.html" className="btn btn-success">By Dev1</a>
                    <div className="text-muted">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.
                    </div>
                    <h5 className="mt-2">Last Versions v2 (2024-04-09 22:45:41)</h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5>Top 10 Leaderboard</h5>
                                            <ol>
                                                <li>Player5 (3004)</li>
                                                <li>Player2 (2993)</li>
                                                <li>Player3 (2000)</li>
                                                <li>Player4 (1195)</li>
                                                <li><b>Player1 (1190)</b></li>
                                                <li>Player6 (1093)</li>
                                                <li>Player7 (1055)</li>
                                                <li>Player8 (1044)</li>
                                                <li>Player9 (1005)</li>
                                                <li>Player10 (992)</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src="../example_game/v1/thumbnail.png" alt="Demo Game 1 Logo" style="width: 100%" />
                                    <a href="../example_game/v1//game.zip" className="btn btn-primary w-100 mb-2 mt-2">Download Game</a>
                                </div>
                            </div>


                            <a href="discover-games.html" className="btn btn-danger w-100">Back</a>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}