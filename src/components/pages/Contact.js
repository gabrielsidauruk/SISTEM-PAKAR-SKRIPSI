import React from 'react'
import email from '../../assets/img/email.png'
import location from '../../assets/img/location.png'

const Contact = () => {
    return (
        <div className='column ' style={{ backgroundColor: "#007873" }}  >
            <div className='column is-3 is-size-4' style={{ color: "white" }}>
                <strong style={{ color: "white", textDecoration: "underline", textUnderlineOffset: "0.5em" }}>CONTACT</strong> <br />  <br />
                <p >Hubungi atau kunjungi saya di :</p>
                <div className='box is-2 mt-5' style={{ backgroundColor: "whitesmoke" }}>
                    <table>
                        <tr>
                            <th><a style={{ textDecoration: "none", color: 'inherit' }} target='_blank' href="mailto:gpratama796@gmail.com?subject=Hello, Gabriel! &body=Please send me a copy of your new program!">
                                <img src={email} alt='email' width='50px' height='50px' /></a></th>
                            <th className='is-size-3'> <a style={{ textDecoration: "none", color: 'inherit' }} target='_blank' href="mailto:gpratama796@gmail.com?subject=Hello, Gabriel! &body=">
                                &emsp;Email</a></th>
                        </tr>
                        <tr>
                            <th><img src={location} alt='location' width='50px' height='50px' /></th>
                            <th className='is-size-3'> <a style={{ textDecoration: "none", color: 'inherit' }} target='_blank' href="https://goo.gl/maps/7pXPuUy8nrKorHeN9">&emsp;Location</a> </th>
                        </tr>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default Contact