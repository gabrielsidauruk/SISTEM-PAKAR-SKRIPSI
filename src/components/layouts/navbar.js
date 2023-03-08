import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isClick, setClick] = useState(false);
    return (
        <nav class="navbar is-primary is-size-5" role="navigation" aria-label="main navigation" style={{
            background: "#009B95"
        }}>
            <div class="navbar-brand" >
                <a class="navbar-item" href="/">
                    <p className='is-size-5 has-text-centered' style={{ color: "white" }}> <b>DEMPSTER SHAFER <br /> REKOMENDASI JURUSAN</b></p>
                </a>

                <a onClick={() => setClick(!isClick)} role="button" class={isClick ? "navbar-burger is-active" : "navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class={isClick ? "navbar-menu is-active" : "navbar-menu"} >
                <div class="navbar-start is-size-5" >
                    <a class="navbar-item" href='/rumuspakar'>
                        Rumus Pakar Dempster Shafer
                    </a>
                    <a class="navbar-item" href="/perhitungan">
                        Pengujian
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" href='/about'>
                                About
                            </a>
                            <a class="navbar-item" href='/contact'>
                                Contact
                            </a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <Link to="user" style={{ color: "white" }} >
                                <a class="button is-primary" >
                                    <strong >ADMINISTRATOR</strong>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar

