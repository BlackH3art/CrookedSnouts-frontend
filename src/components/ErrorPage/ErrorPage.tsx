import { FC } from "react";
import { Link } from 'react-router-dom';
import error404 from '../../images/404.svg'


const ErrorPage: FC = () => {
  return (
    <>
      <section className="error-page min-h-[60vh] bg-gray-100 flex justify-center">

        <div className="">

          <h2 className="title text-center font-bold text-3xl md:text-4xl lg:text-5xl">
            Yo! Crooked Snout!
          </h2>
          <h2 className="title text-center font-bold text-2xl md:text-3xl lg:text-4xl pt-5">
            Page not found
          </h2>

          <Link className="link" to="/">
            <h2 className="title text-center font-bold text-2xl md:text-3xl lg:text-4xl">
              Go back to main page
            </h2>
          </Link>

          <img src={error404} alt="404 image" />

        </div>

      </section>
    </>
  );
}

export default ErrorPage;