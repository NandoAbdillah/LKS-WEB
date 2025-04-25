export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="index.html">Gaming Portal</a>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    <li><a href="discover-games.html" className="nav-link px-2 text-white">Discover Games</a></li>
                    <li><a href="manage-games.html" className="nav-link px-2 text-white">Manage Games</a></li>
                    <li><a href="profile.html" className="nav-link px-2 text-white">User Profile</a></li>
                    <li className="nav-item">
                        <a className="nav-link active bg-dark" href="#">Welcome, Player1</a>
                    </li>
                    <li className="nav-item">
                        <a href="../signin.html" className="btn bg-white text-primary ms-4">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>




    )
}

{/* <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="index.html">Administrator Portal</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
         <li><a href="admins.html" class="nav-link px-2 text-white">List Admins</a></li>
         <li><a href="users.html" class="nav-link px-2 text-white">List Users</a></li>
         <li class="nav-item">
           <a class="nav-link active bg-dark" href="#">Welcome, Administrator</a>
         </li> 
         <li class="nav-item">
          <a href="../signin.html" class="btn bg-white text-primary ms-4">Sign Out</a>
         </li>
       </ul> 
      </div>
    </nav> */}