import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight transition-colors">
          <Link to="/">FitOffice</Link>
        </div>
        <div className="space-x-12">
          <Link to="/" className="transition-all text-xl hover:scale-105 inline-block">
            Inicio
          </Link>
        </div>
        <div className="text-2xl font-bold cursor-default tracking-tight transition-colors opacity-0">
          FitOffice
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
