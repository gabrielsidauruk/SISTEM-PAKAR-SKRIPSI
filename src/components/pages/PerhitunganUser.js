import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import questionicon from "../../assets/img/question-mark-10935.png"

const PerhitunganUser = () => {
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        getQuest();
    }, []);

    const [users, setUser] = useState([]);
    const [quest, setQuest] = useState([]);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Laki-laki");
    const [kec1, setKec1] = useState(0);
    const [kec2, setKec2] = useState(0);
    const [kec3, setKec3] = useState(0);
    const [kec4, setKec4] = useState(0);
    const [kec5, setKec5] = useState(0);
    const [kec6, setKec6] = useState(0);
    const [kec7, setKec7] = useState(0);
    const [kec8, setKec8] = useState(0);
    const [kec9, setKec9] = useState(0);

    const navigate = useNavigate();
    const getUsers = async () => {
        const response = await axios.get('http://localhost:8000/users');
        setUser(response.data);
    }
    const getQuest = async () => {
        const response = await axios.get('http://localhost:8000/pertanyaan');
        setQuest(response.data)
    }
    const saveUser = async (e) => {
        e.preventDefault();
        const response = window.confirm("Apakah Anda yakin ingin mengumpulkan jawaban?");
        if (response) {
            if (users.find(e => e.email === email)) {
                try {
                    console.log("user already exist")
                    let b = users.find(e => e.email === email)
                    await axios.patch(`http://localhost:8000/users/${b.id}`, {
                        nama,
                        email,
                        gender,
                        kec1,
                        kec2,
                        kec3,
                        kec4,
                        kec5,
                        kec6,
                        kec7,
                        kec8,
                        kec9,
                        refer
                    });
                    getUsers();
                    navigate(`/resultuser/${b.id}`);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("email belum terdaftar")
                try {
                    await axios.post('http://localhost:8000/users', {
                        nama,
                        email,
                        gender,
                        kec1,
                        kec2,
                        kec3,
                        kec4,
                        kec5,
                        kec6,
                        kec7,
                        kec8,
                        kec9,
                        refer
                    });
                    getUsers();
                    console.log(users.find(e => e.email === email))
                    let c = users.find(e => e.email === email)
                    navigate(`/resultuser/${c.id}`);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("Cek kembali jawaban Anda!")

        }

    }
    const [checkedState, setCheckedState] = useState(
        new Array(109).fill(false)
    );
    const changecb = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        if (position < 13) {
            if (updatedCheckedState[position] === true) {
                setKec1(kec1 + 1)
            } else {
                setKec1(kec1 - 1)
            }
        } else if (position < 25) {
            if (updatedCheckedState[position] === true) {
                setKec2(kec2 + 1)
            } else {
                setKec2(kec2 - 1)
            }
        } else if (position < 37) {
            if (updatedCheckedState[position] === true) {
                setKec3(kec3 + 1)
            } else {
                setKec3(kec3 - 1)
            }
        } else if (position < 49) {
            if (updatedCheckedState[position] === true) {
                setKec4(kec4 + 1)
            } else {
                setKec4(kec4 - 1)
            }
        } else if (position < 61) {
            if (updatedCheckedState[position] === true) {
                setKec5(kec5 + 1)
            } else {
                setKec5(kec5 - 1)
            }
        } else if (position < 73) {
            if (updatedCheckedState[position] === true) {
                setKec6(kec6 + 1)
            } else {
                setKec6(kec6 - 1)
            }
        } else if (position < 85) {
            if (updatedCheckedState[position] === true) {
                setKec7(kec7 + 1)
            } else {
                setKec7(kec7 + 1)
            }
        } else if (position < 97) {
            if (updatedCheckedState[position] === true) {
                setKec8(kec8 + 1)
            } else {
                setKec8(kec8 - 1)
            }
        } else if (position < 109) {
            if (updatedCheckedState[position] === true) {
                setKec9(kec9 + 1)
            } else {
                setKec9(kec9 - 1)
            }
        }
    }
    const referArray = [
        {
            value: "A",
            name: "Bahasa Inggris"
        },
        {
            value: "B",
            name: "Matematika"
        },
        {
            value: "C",
            name: "Kedokteran"
        },
        {
            value: "D",
            name: "Teknik Mesin"
        },
        {
            value: "E",
            name: "Pendidikan Guru Sekolah Dasar"
        },
        {
            value: "F",
            name: "Psikologi"
        },
        {
            value: "G",
            name: "Desain Komunikasi Visual"
        },
        {
            value: "H",
            name: "Hubungan Internasional"
        },
        {
            value: "I",
            name: "Kimia"
        },
        {
            value: "J",
            name: "Farmasi"
        },
        {
            value: "K",
            name: "Teknik Arsitektur"
        },
        {
            value: "L",
            name: "Pendidikan Jasmani, Olahraga dan Kesehatan"
        },
        {
            value: "M",
            name: "Ilmu Sejarah"
        },
        {
            value: "N",
            name: "Seni Musik"
        }
    ];
    const [checkedRefer, setCheckedRefer] = useState([]);
    const changeRefer = e => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedRefer(prev => [...prev, value])
        } else {
            setCheckedRefer(prev => prev.filter(x => x !== value))
        }
    };
    const refer = checkedRefer.length ? checkedRefer.join("") : "";
    const [active1, setactive1] = useState(false)
    const [active2, setactive2] = useState()
    const [active3, setactive3] = useState()
    const [active4, setactive4] = useState()
    const [active5, setactive5] = useState()
    const [infoHover, setinfoHover] = useState(false);
    const infoMouseEnter = () => {
        setinfoHover(true);
    };
    const infoMouseLeave = () => {
        setinfoHover(false);
    };
    const infoStyle = {
        backgroundColor: infoHover ? "white" : "#D1464A",
        width: infoHover ? "" : "3%",
        position: "absolute"
    }
    return (

        <div className='column' style={{ backgroundColor: "#007873" }} >
            <div className='columns' style={{ backgroundColor: "#007873" }}>
                <div className='box column is-2 mt-6' style={infoStyle} onMouseEnter={infoMouseEnter} onMouseLeave={infoMouseLeave}>
                    {infoHover ? <div><b>
                        CARA MENGERJAKAN ?</b><br />
                        <ol className='ml-2 has-text-justified'>
                            <li>Masukkan kolom biodata sesuai dengan dirimu!</li>
                            <li>Centanglah box yang menurutmu sesuai dengan pernyataan berikut!</li>
                            <li>Terdapat 108 Pernyataan yang dibagikan ke beberapa slide. Tekanlah tombol "Next" untuk mengganti slide pernyataan!</li>
                            <li>Apabila sudah selesai, klik tombol "Submit" pada halaman terakhir untuk melihat hasil Tes!</li>
                        </ol>

                    </div>

                        : <img src={questionicon} alt="CARA MENGISI!" />}

                </div>
                <div className='box column  is-half is-offset-one-quarter my-2' style={{ backgroundColor: "#BCDAD9" }}>
                    <div className='column'>
                        <h1 className='is-size-1 has-text-justified'> TES MULTIPLE INTELLIGENCE berdasarkan karya Howard Gardner, Ph.D.</h1>
                    </div>
                    <form onSubmit={saveUser} className>
                        <div className='field'>
                            <label className='label'>Nama</label>
                            <div className="control">
                                <input
                                    autoFocus
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
                                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
                            <label className='label'>Referensi Jurusan (Pilih 3 yang menurutmu paling sesuai dengan kemampuanmu!)</label>
                            <div className='column' >
                                {`Item jurusan yang dipilih : ${refer}`}
                                <table>
                                    <br />
                                    <td style={{ paddingRight: "40px" }}>{referArray.slice(0, 7).map((item, index) => (
                                        <div key={index} >
                                            <input value={item.value} type="checkbox" onChange={changeRefer} />
                                            <span>{item.name}</span>
                                        </div>
                                    ))}</td>
                                    <td >{referArray.slice(7, 14).map((item, index) => (
                                        <div key={index} >
                                            <input value={item.value} type="checkbox" onChange={changeRefer} />
                                            <span>{item.name}</span>
                                        </div>
                                    ))}</td>
                                </table>
                            </div>
                        </div>
                        <div className='is-size-4'>
                            Centanglah box apabila anda setuju dengan pernyataan tersebut!
                        </div>
                        {active1 ? <div className={active2 ? "is-hidden" : ""}>
                            <progress class="progress is-info" value="20" max="100">20%</progress>
                            {quest.slice(0, 18).map((q) => {
                                return (
                                    <tr>
                                        <div className='checkbox-wrapper'>
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${q.id}`}
                                                name={q.Pertanyaan}
                                                value={q.Pertanyaan}
                                                checked={checkedState[q.id]}
                                                onChange={() => changecb(q.id)}
                                            />
                                            <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                        </div>
                                    </tr>
                                );
                            })}
                            <div className='buttons is-centered mt-2'>
                                <button
                                    type='button'
                                    className='button is-danger'
                                    onClick={() => setactive1(!active1)}>BACK
                                </button>
                                <button
                                    type='button'
                                    className='button is-info'
                                    onClick={() => setactive2(true)}>NEXT
                                </button>
                            </div>
                        </div> :
                            <div>
                                {quest.slice(18, 36).map((q) => {
                                    return (
                                        <div className='checkbox-wrapper'>
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${q.id}`}
                                                name={q.Pertanyaan}
                                                value={q.Pertanyaan}
                                                checked={checkedState[q.id]}
                                                onChange={() => changecb(q.id)}
                                            />
                                            <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                        </div>
                                    );
                                })}
                                <div className='buttons is-centered mt-2'>
                                    <button
                                        type='button'
                                        className='button is-info'
                                        value='Perhitungan'
                                        onClick={() => setactive1(!active1)}>NEXT
                                    </button>
                                </div>
                            </div>}

                        {active2 ? <div className={active3 ? "is-hidden" : ""} >
                            <progress class="progress is-info" value="40" max="100">40%</progress>
                            {quest.slice(36, 54).map((q) => {
                                return (
                                    <div className='checkbox-wrapper'>
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${q.id}`}
                                            name={q.Pertanyaan}
                                            value={q.Pertanyaan}
                                            checked={checkedState[q.id]}
                                            onChange={() => changecb(q.id)}
                                        />
                                        <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                    </div>
                                );
                            })}
                            <div className='buttons is-centered mt-2'>
                                <button
                                    type='button'
                                    className='button is-danger'
                                    onClick={() => setactive2(!active2)}>BACK
                                </button>
                                <button
                                    type='button'
                                    className='button is-info'
                                    value='Perhitungan'
                                    onClick={() => setactive3(true)}>NEXT
                                </button>
                            </div>
                        </div> : ""}
                        {active3 ? <div className={active4 ? "is-hidden" : ""}  >
                            <progress class="progress is-info" value="60" max="100">60%</progress>
                            {quest.slice(54, 72).map((q) => {
                                return (
                                    <tr>
                                        <div className='checkbox-wrapper'>
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${q.id}`}
                                                name={q.Pertanyaan}
                                                value={q.Pertanyaan}
                                                checked={checkedState[q.id]}
                                                onChange={() => changecb(q.id)}
                                            />
                                            <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                        </div>
                                    </tr>
                                );
                            })}
                            <div className='buttons is-centered mt-2'>
                                <button
                                    type='button'
                                    className='button is-danger'
                                    onClick={() => setactive3(!active3)}>BACK
                                </button>
                                <button
                                    type='button'
                                    className='button is-info'
                                    value='Perhitungan'
                                    onClick={() => setactive4(true)}>NEXT
                                </button>
                            </div>
                        </div> : ""}
                        {active4 ? <div className={active5 ? "is-hidden" : ""}  >
                            <progress class="progress is-info" value="80" max="100">80%</progress>
                            {quest.slice(72, 90).map((q) => {
                                return (
                                    <tr>
                                        <div className='checkbox-wrapper'>
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${q.id}`}
                                                name={q.Pertanyaan}
                                                value={q.Pertanyaan}
                                                checked={checkedState[q.id]}
                                                onChange={() => changecb(q.id)}
                                            />
                                            <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                        </div>
                                    </tr>
                                );
                            })}
                            <div className='buttons is-centered mt-2'>
                                <button
                                    type='button'
                                    className='button is-danger'
                                    onClick={() => setactive4(!active4)}> BACK
                                </button>
                                <button
                                    type='button'
                                    className='button is-info'
                                    value='Perhitungan'
                                    onClick={() => setactive5(true)}>NEXT
                                </button>
                            </div>
                        </div> : ""}
                        {active5 ? <div  >
                            <progress class="progress is-info" value="100" max="100">100%</progress>
                            {quest.slice(90, 108).map((q) => {
                                return (
                                    <tr>
                                        <div className='checkbox-wrapper'>
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${q.id}`}
                                                name={q.Pertanyaan}
                                                value={q.Pertanyaan}
                                                checked={checkedState[q.id]}
                                                onChange={() => changecb(q.id)}
                                            />
                                            <label htmlFor={`custom-checkbox-${q.id}`}>{q.Pertanyaan}</label>
                                        </div>
                                    </tr>
                                );
                            })}
                            <div className='buttons is-centered mt-2'>
                                <button
                                    type='button'
                                    className='button is-danger is-fullwidth'
                                    onClick={() => setactive5(!active5)}> BACK
                                </button>
                                <button type='submit' className='button is-success is-fullwidth' > SUBMIT </button>
                            </div>
                        </div> : ""}
                    </form>
                </div>
            </div>

        </div >
    )
}


export default PerhitunganUser