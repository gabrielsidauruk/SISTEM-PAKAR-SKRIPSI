import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom"


const EditUser = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://api-skripsi.vercel.app/${id}`, {
                nama,
                email,
                gender,
            });
            navigate("/user");
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8000/users/${id}`)
        setNama(response.data.nama);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

    return (
        <div className='column is-centered ' style={{ backgroundColor: "#007873" }}  >
            <div className='box column is-half is-offset-one-quarter ' style={{ backgroundColor: "#C8FD57" }} >
                <form onSubmit={updateUser}>
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
                        <button type='submit' className='button is-success'> Update </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditUser;