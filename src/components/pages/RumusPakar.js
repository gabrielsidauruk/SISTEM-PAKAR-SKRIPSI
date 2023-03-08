import React from 'react'
import { Link } from 'react-router-dom'
import Rumus from "../../assets/excel/RUMUS PAKAR DEMPSTER SHAFER SKRIPSI.xlsx"

const RumusPakar = () => {
    return (
        <div className='column mt-7' style={{
            backgroundColor: "#007873",
            color: "white"
        }}><p>
                Silahkan download rumus pakar dempster shafer di <Link to={Rumus} target="_blank" download >sini.</Link>
            </p></div>
    )
}

export default RumusPakar