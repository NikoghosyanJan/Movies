import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "./components/Loader";
const Home = lazy(() => import("./pages/home"))
const MovieDetails = lazy(() => import("./pages/movie-details"))
const PersonalRoutes = lazy(() => import("./pages/personal-page/PersonalRoutes"))

export default function Routers() {
    return (
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie-details" element={<MovieDetails />} />
                    <Route path="/personal-page/*" element={<PersonalRoutes />} />
                </Routes>
            </Suspense>
    )
}