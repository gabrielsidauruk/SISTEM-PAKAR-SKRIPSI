import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/adminlogo.png'

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        // const response = await axios.get('https://api-skripsi.vercel.app/users');
        const response = await axios.get('http://localhost:8000/users');
        setUser(response.data);
    }

    const deleteUser = async (id) => {
        try {
            // await axios.delete(`https://api-skripsi.vercel.app/users/${id}`);
            await axios.delete(`http://localhost:8000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }
    const [displayText, setDisplayText] = useState(false);
    const [uname, setUname] = useState('');
    const [passw, setPass] = useState('');
    const cekLogin = async (e) => {
        e.preventDefault();
        if (uname === 'gabriel' && passw === 'admin123') {
            setDisplayText(!displayText)
        } else {
            window.alert("AUTHORIZED ACCESS ONLY!")
            window.location.reload(true);
        }
    }

    return (
        <div className="column" style={{ backgroundColor: "#007873" }}>
            <section onSubmit={cekLogin} className={displayText ? 'is-hidden' : 'hero '}>
                <div className='hero-body'>
                    <div class="container has-text-centered">
                        <div class="columns is-centered">
                            <form className='box' style={{ backgroundColor: "#D1FFF3" }}>
                                <div className='is-size-2 has-text-success is-family-monospace'><b>WELCOME BACK!</b></div>
                                <img src={logo} className='image is-128x128' alt='Logo' style={{ margin: '0 auto' }} />
                                <div class="field">
                                    <div class="control">
                                        <input autoFocus class="input is-medium is-rounded" type="text" placeholder="username" value={uname} onChange={(e) => setUname(e.target.value)} required />
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium is-rounded" type="password" placeholder="password" value={passw} onChange={(e) => setPass(e.target.value)} required />
                                    </div>
                                </div>
                                <br />
                                <button class="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit">
                                    Login
                                </button>
                            </form>
                            <br></br>
                        </div>
                    </div>
                </div>
            </section>
            <div className={displayText ? 'column is-centered' : 'is-hidden'} style={{ overflowX: "auto" }}>
                <Link to={`adduser`} className='button is-small is-success'>Tambah User</Link>
                <table className='table is-striped is-narrow is-bordered is-hoverable'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Kec1</th>
                            <th>Kec2</th>
                            <th>Kec3</th>
                            <th>Kec4</th>
                            <th>Kec5</th>
                            <th>Kec6</th>
                            <th>Kec7</th>
                            <th>Kec8</th>
                            <th>Kec9</th>
                            <th>Referensi</th>
                            <th>Valid</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} >
                                <td>{index + 1}</td>
                                <td>{user.nama}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.kec1}</td>
                                <td>{user.kec2}</td>
                                <td>{user.kec3}</td>
                                <td>{user.kec4}</td>
                                <td>{user.kec5}</td>
                                <td>{user.kec6}</td>
                                <td>{user.kec7}</td>
                                <td>{user.kec8}</td>
                                <td>{user.kec9}</td>
                                <td>{user.refer}</td>
                                <td>{user.valid}</td>
                                <td>
                                    <Link to={`/edituser/${user.id}`} className='button is-small is-info is-rounded'> Edit</Link> &ensp;
                                    <button onClick={() => deleteUser(user.id)} className='button is-small is-danger is-rounded'> Delete</button> &ensp;
                                    <Link to={`/resultuser/${user.id}`} className='button is-small is-primary is-rounded'> Result</Link >
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList