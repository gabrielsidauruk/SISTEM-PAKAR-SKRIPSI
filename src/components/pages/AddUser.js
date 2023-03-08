import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const AddUser = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Laki-laki");
    const navigate = useNavigate();
    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://api-skripsi.vercel.app/users', {
                nama,
                email,
                gender,
            });
            navigate("/user");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='column is-centered ' style={{ backgroundColor: "#007873" }}  >
            <div className='box column is-half is-offset-one-quarter' style={{ backgroundColor: "#7869F4" }}>
                <form onSubmit={saveUser}>
                    <div className='field'>
                        <label className='label'>Nama</label>
                        <div className="control">
                            <input
                                type="text"
                                className='input'
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder='Nama'>
                            </input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className="control">
                            <input
                                type="text"
                                className='input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'></input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Gender</label>
                        <div className="control">
                            <div className='select is-fullwidth'>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                    <option value="Laki-laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <button type='submit' className='button is-success'> Simpan </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser