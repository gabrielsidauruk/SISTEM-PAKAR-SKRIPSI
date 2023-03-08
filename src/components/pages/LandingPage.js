import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {

    return (
        <section className='backgroundimg'>
            <section className='column is-full' >
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia"></link>
                <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap" rel="stylesheet"></link>

                <div className='column is-5 is-offset-7'><br /><br /><br />
                    <p className='is-size-3 has-text-right' ><strong style={{
                        color: "#F9F54B", fontFamily: "'Baloo Bhaijaan 2', cursive",
                        fontSize: "50px"
                    }}><i>WELCOME BACK,</i></strong></p>
                    <p className='is-size-1 has-text-justified' ><strong style={{
                        color: "white",
                        fontFamily: "'Tilt Neon', cursive", fontSize: "70px"
                    }}>
                        MULAI TENTUKAN JURUSANMU !</strong></p>

                    <Link className='button is-rounded is-success is-large mt-6' to='/perhitungan'>MULAI</Link>
                </div>
                <br /><br /><br /><br />
            </section>
        </section >
    )
}

export default LandingPage