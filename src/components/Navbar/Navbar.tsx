import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a href="/" className="btn btn-ghost normal-case text-xl">Weather Dashboard</a>
    </div>
    <div className="flex-none">
      <ThemeToggle />
    </div>
  </div>
  )
}

export default Navbar;
