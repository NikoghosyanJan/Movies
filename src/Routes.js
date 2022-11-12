import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/Loader";
const Home = lazy(() => import("./pages/home"))
const MovieDetails = lazy(() => import("./pages/movie-details"))

export default function Routers() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie-details" element={<MovieDetails />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}