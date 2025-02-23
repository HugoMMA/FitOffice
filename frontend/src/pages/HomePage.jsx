import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10 animate-fade-in">
      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm shadow-xl border border-white/20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
          Bienvenido a FitOffice
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
          Gestiona tus clientes y sus rutinas de entrenamiento de forma fácil y moderna.
        </p>
        <Link
          to={`/clientes/`}
          className="inline-block mt-6 pl-6 pr-6 pb-3 btn-primary text-2xl">
            Clientes
        </Link>
      </div>
    </div>
  );
}
  
  export default HomePage;
  