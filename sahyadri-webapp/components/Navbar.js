export default function Navbar() {
    return (
      <nav className="flex flex-row justify-between text-lg font-bold text-black">
        <img src="https://www.sahyadri.edu.in/images/logo.svg" width={200} />
        <div className="flex flex-row space-x-5">
          <a>About</a>
          <a>Academics</a>
          <a>Admissions</a>
          <a>Life at Sahyadri</a>
          <a>Placement</a>
          <a>Recruitment</a>
        </div>
      </nav>
    );
  }
  