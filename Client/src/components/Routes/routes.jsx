import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"
import HomePage from "../Pages/Home/Home.jsx"
import About from "../Pages/About/About.jsx"
import Adoption from "../Pages/Adoption/Adoption"
import Login from "../Pages/Login/Login"
import Logout from "../Pages/Login/logout"
import Sub from "../Pages/newUser/subscribe"
import Pet from "../Pages/pet/pet"
import Petadmin from "../Pages/Admin/NewPets/pet"
import Forgot from "../Pages/Forgot/forgot"
import App from '../../App'
import NewPet from "../Pages/pet/newpet"
import NewProduct from "../Pages/Products/newprod"
import Product from "../Pages/Products/Product"
import Settings from "../Pages/Settings/settings"
import Adminpets from "../Pages/Admin/NewPets/NewPets"
import AdminProducts from "../Pages/Admin/NewProducts_Services/NewProducts"
import Productadmin from "../Pages/Admin/NewProducts_Services/OneProductAdmin"
import Services from "../Pages/Services/allservices"
import Products from "../Pages/Products/AllProducts"
import ServiceUniq from "../Pages/Services/Service"
import Questiopns from "../Pages/Questions/questions.jsx"


import { Topbar } from '../TopBar/TopBar'
import { TopPage } from '../TopPage/TopPage'

import React, { useContext } from "react"

import { AuthProvider, AuthContext } from "../Contexts/auth"


export default function AppRoutes() {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        } else {
            return children
        }
    };
    const Logged = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return children
        } else {
            return <Navigate to="/" />
        }
    };


    return (
        <BrowserRouter>
            <AuthProvider>
                <TopPage></TopPage>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />About
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/login" element={<Logged><Login /></Logged>} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="/forgot" element={<Forgot />} />
                    <Route exact path="/subscription" element={<Sub />} />
                    <Route exact path="/pets" element={<Adoption />} />
                    <Route exact path="/pet" element={<Pet />} />
                    <Route exact path="/petadmin/:idpet" element={<Petadmin />} />
                    <Route exact path="/settings" element={<Settings />} />
                    <Route exact path="/release" element={<Adminpets />} />
                    <Route exact path="/releaseProducts" element={<AdminProducts />} />
                    <Route exact path="/services" element={<Services />} />
                    <Route exact path="/services/:idService" element={<ServiceUniq />} />
                    <Route exact path="/produtos" element={<Product />} />
                    <Route exact path="/produtos/:idProduct" element={<Product />} />
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/productadmin/:idProduct" element={<Productadmin />} />
                    <Route exact path="/pet/:idPet" element={<Pet />} />
                    <Route exact path="/newpet" element={<Private><NewPet /></Private>} />
                    <Route exact path="/newproduct" element={<Private><NewProduct /></Private>} />
                    <Route exact path="/perguntas-frequentes" element={<Questiopns/>}/>
                </Routes>
                <Topbar />
                
            </AuthProvider>
        </BrowserRouter>
    )
};