import React, {FC, useEffect} from 'react';

import StarRatings from "react-star-ratings";

import css from "./MovieInfo.module.css";
import "../../../constants/var.css";
import {PosterPreview} from "../../PosterPreview";
import {GenreBadge} from "../../GenreBadge";
import {ActorList} from "../../actorsContainer";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loader} from "../../Loader";
import {ErrorPage} from "../../../pages/MoviesPage";

import {movieInfoActions} from "../../../redux/slices/movieInfoSlice";



const MovieInfo: FC = () => {

    // This code doesn't work, I'd really like to know why:
    // ====================================================================================
    // const {movieInfo,loadingMovieInfo} = useAppSelector(state => state.movieInfo);
    // if (loadingMovieInfo) return <Loader/>
    // ====================================================================================

    const {movieInfo,errors} = useAppSelector(state => state.movieInfo);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieInfoActions.setVisible(true));

        return ()=> {
            dispatch(movieInfoActions.setVisible(false))
        };
    }, [dispatch]);

    if(errors) return <ErrorPage/>;
    if(!movieInfo) return <Loader/>;


    const {poster_path, title, release_date, vote_average, genres, runtime, overview} = movieInfo;
    return (
        <div className={css.movie_info}>
                {/*<div className={css.chevron}>⬅</div>*/}
                <div className={css.wrap_image}>
                    <PosterPreview poster_path={poster_path} title={title}/>
                </div>



            <div className={css.title}>{title}</div>
            <div className={css.content}>{overview}</div>
            <StarRatings starRatedColor='var(--star-primary)'
                         starEmptyColor='var(--star-secondary'
                         numberOfStars={10}
                         starDimension={'25px'}
                         starSpacing={'1px'}
                         rating={vote_average}
            />
            <div className={css.genre_container}>
                {genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
            </div>
            <div className={css.content}>Duration {runtime} min</div>
            <div className={css.content}>Release date {release_date} </div>
            <ActorList/>

        </div>
    );
};

export {MovieInfo};