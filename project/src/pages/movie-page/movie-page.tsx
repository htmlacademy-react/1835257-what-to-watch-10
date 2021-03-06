import Footer from '../../components/footer/footer';
import {Film} from '../../types/film';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import MoreLikeFilms from '../../components/more-like-films/more-like-films';
import Tabs from '../../components/tabs/tabs';
import NotFoundPage from '../not-found-page/not-found-page';

type MoviePageProps = {
  films: Film[];
}

function MoviePage({films}: MoviePageProps): JSX.Element {
  const navigate = useNavigate();
  const {id} = useParams();
  const film = films.find((item) => item.id === Number(id));

  if(!film) {
    return (
      <div>
        <NotFoundPage/>
      </div>
    );
  }

  const moreLikeFilms = films.filter((item) => {
    if(film && film !== item) {
      return item.genre === film.genre;
    }
    return false;
  }).slice(0, 4);

  const onPlayButtonClickHandler = () => {
    const path = `/player/${film.id}`;
    navigate(path);
  };

  const onMyListButtonClickHandler = () => {
    const path = '/mylist';
    navigate(path);
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href="#section" className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={onPlayButtonClickHandler}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={onMyListButtonClickHandler}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{films.length}</span>
                </button>
                <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs films={films}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoreLikeFilms moreLikeFilms={moreLikeFilms} />
        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
