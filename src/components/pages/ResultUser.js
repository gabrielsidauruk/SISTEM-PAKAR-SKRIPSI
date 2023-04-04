import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"


const ResultUser = () => {
    useEffect(() => {
        getUserById();
    }, [])
    useEffect(() => {
        val();
    })
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [kec1, setKec1] = useState("");
    const [kec2, setKec2] = useState("");
    const [kec3, setKec3] = useState("");
    const [kec4, setKec4] = useState("");
    const [kec5, setKec5] = useState("");
    const [kec6, setKec6] = useState("");
    const [kec7, setKec7] = useState("");
    const [kec8, setKec8] = useState("");
    const [kec9, setKec9] = useState("");
    const [refer, setRefer] = useState("");
    const [valid, setValid] = useState("");
    var valCheck;
    const { id } = useParams();

    const beliefJurusan1 = [];
    const beliefJurusan2 = [];

    const keyJurusan1 = ["AEFHM", "BCDEJ", "N",
        "BDGIK", "EL", "EF", "CEFHMN", "M", "F", "ø", "E", "BD", "EFHM"];

    const keyJurusan2 = ["AEFH", "BCDEGIJK", "N",
        "CDGIJKM", "LN", "EF", "CEFHL", "JM", "", "ø", "E", "CDGIJK", "EFH"
        , "CE", "C", "L", "J"];

    beliefJurusan2.push(belief(kec1), belief(kec2), belief(kec3), belief(kec4),
        belief(kec5), belief(kec6), belief(kec7), belief(kec8));

    beliefJurusan1.push(belief(kec1), belief(kec2), belief(kec3), belief(kec4),
        belief(kec5), belief(kec6), belief(kec7), belief(kec8), belief(kec9));
    console.log(beliefJurusan2);


    function pushbelief1pakar1(i, j, k) {
        beliefJurusan1[i] = beliefJurusan1[j] * (beliefJurusan1[k]);

        return Math.round(((beliefJurusan1[i])) * 100000) / 100000;

    }
    function pushbelief2pakar1(i, j) {
        beliefJurusan1[i] *= plausibility(beliefJurusan1[j]);

        return Math.round(beliefJurusan1[i] * 100000) / 100000;

    }
    function pushbelief3pakar1(i, j) {
        beliefJurusan1[i] *= plausibility(belief(j));
        return Math.round(beliefJurusan1[i] * 100000) / 100000;
    }

    function pushbelief1pakar2(i, j, k) {
        beliefJurusan2[i] = beliefJurusan2[j] * (beliefJurusan2[k]);

        return Math.round(((beliefJurusan2[i])) * 10000) / 10000;

    }
    function pushbelief2pakar2(i, j) {
        beliefJurusan2[i] *= plausibility(beliefJurusan2[j]);

        return Math.round(((beliefJurusan2[i])) * 10000) / 10000;

    }
    function pushbelief3pakar2(i, j) {
        beliefJurusan2[i] *= plausibility(belief(j));
        return Math.round(beliefJurusan2[i] * 100000) / 100000;
    }

    function tampil1(i) {
        return (
            <p>{keyJurusan1[i]}={beliefJurusan1[i]}<br></br></p>
        )
    }

    function tampil2(i) {
        return (
            <p>{keyJurusan2[i]}={beliefJurusan2[i]}<br></br></p>
        )
    }

    function belief(i) {

        if (i === 12) {
            window.bel = 0.95;
        } else if (i === 0) {
            window.bel = 0.05;
        }
        else {
            window.bel = Math.round((i / 12) * 10000) / 10000;
        }
        return window.bel
    }
    function plausibility(j) {
        let pla
        pla = Math.round((1 - j) * 10000) / 10000;


        return pla
    }
    function val() {
        setValid(valCheck)
    }
    function checkVAL() {
        setDisplayValid(true)
    }
    var valCheckTrue;
    function checkVALTrue() {
        setDisplayValidTrue(valCheckTrue)
    }
    function result(bel, key) {
        bel.splice(20);
        var belcopy = [...bel];
        belcopy.sort(function (a, b) { return b - a });
        let i = bel.indexOf(belcopy[0])
        let j = bel.indexOf(belcopy[1])
        var a = refer;
        let arr1 = key[i].split("");
        let arr2 = key[j].split("");
        for (let i = 0; i < 9; i++) {
            if (a.includes(arr1[i]) || a.includes(arr2[i])) {
                valCheck = "Yes1";
                valCheckTrue = true;

                break;
            }
            valCheck = "No1";
            valCheckTrue = false;
        }
        return (
            <p>{key[i]}={bel[i]}<br></br>
                {key[j]}={bel[j]}<br></br></p>
        )
    }

    const navigate = useNavigate();
    const postValidbyId = async () => {
        try {
            val();
            checkVAL();
            checkVALTrue();
            await axios.patch(`http://localhost:8000/users/${id}`, {
                valid
            });
        } catch (error) {
            console.log(error);
        }

    }

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8000/users/${id}`)
        setNama(response.data.nama);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setKec1(response.data.kec1);
        setKec2(response.data.kec2);
        setKec3(response.data.kec3);
        setKec4(response.data.kec4);
        setKec5(response.data.kec5);
        setKec6(response.data.kec6);
        setKec7(response.data.kec7);
        setKec8(response.data.kec8);
        setKec9(response.data.kec9);
        setRefer(response.data.refer);
        setValid(response.data.valid);
    }
    const [displayText, setDisplayText] = useState(true);
    const [displayValid, setDisplayValid] = useState(false);
    const [displayValidTrue, setDisplayValidTrue] = useState(false);

    return (
        <div style={{ backgroundColor: "#E6D2AA" }}>
            <div className='columns' style={{ backgroundColor: "#007873" }} >
                <div className=' box column is-5 ' style={{ backgroundColor: "#FCBF49" }}>
                    < div >
                        <p className='has-text-justified is-size-3'>Analisa Menggunakan Sistem Pakar Metode Dempster Shafer </p><br></br>
                    </div>
                    <div className='field'>
                        <label className='label'>Nama</label>
                        <div className="column is-9">
                            <input
                                type="text"
                                className='input is-rounded'
                                value={nama}
                                readOnly>
                            </input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className="column is-9">
                            <input
                                type="text"
                                className='input is-rounded'
                                value={email}
                                readOnly>
                            </input>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Gender</label>
                        <div className="column is-9">
                            <input
                                type="text"
                                className='input is-rounded'
                                value={gender}
                                readOnly>
                            </input>
                        </div>
                    </div>
                    <div className='column field'>
                        <button
                            type="button"
                            className='button is-info'
                            value='Perhitungan'
                            onClick={() => setDisplayText(!displayText)}>
                            {displayText ? "Perhitungan" : "Hasil"}
                        </button>
                    </div>
                </div>
                {/* column2 */}
                <div className='box column is-5' style={{ backgroundColor: "#2C74B3", overflowX: "auto" }}>
                    <table className='table is-bordered is-striped is-narrow mt-4 '>
                        <thead>
                            <tr >
                                <th className='has-text-centered'>Jenis Kecerdasan</th>
                                <th className='has-text-centered'>Skor Hasil</th>
                                <th className='has-text-centered'>Belief</th>
                                <th className='has-text-centered'>Plausibility</th>
                                <th className='has-text-centered'>Kode Jurusan Pakar 1</th>
                                <th className='has-text-centered'>Kode Jurusan Pakar 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>LINGUISTIC / VERBAL</td>
                                <td>{kec1}</td>
                                <td>{belief(kec1)}</td>
                                <td>{plausibility(window.bel)}</td>
                                <td> {keyJurusan1[0]}</td>
                                <td> {keyJurusan2[0]}</td>
                            </tr>
                            <tr>
                                <td>LOGICAL / MATHEMATICAL</td>
                                <td>{kec2}</td>
                                <td>{belief(kec2)}</td>
                                <td>{plausibility(belief(kec2))}</td>
                                <td> {keyJurusan1[1]}</td>
                                <td> {keyJurusan2[1]}</td>
                            </tr>
                            <tr>
                                <td>MUSICAL</td>
                                <td>{kec3}</td>
                                <td>{belief(kec3)}</td>
                                <td>{plausibility(belief(kec3))}</td>
                                <td> {keyJurusan1[2]}</td>
                                <td> {keyJurusan2[2]}</td>
                            </tr>
                            <tr>
                                <td>SPATIAL / VISUAL</td>
                                <td>{kec4}</td>
                                <td>{belief(kec4)}</td>
                                <td>{plausibility(belief(kec4))}</td>
                                <td> {keyJurusan1[3]}</td>
                                <td> {keyJurusan2[3]}</td>
                            </tr>
                            <tr>
                                <td>BODIL / KINESTHETIC</td>
                                <td>{kec5}</td>
                                <td>{belief(kec5)}</td>
                                <td>{plausibility(belief(kec5))}</td>
                                <td> {keyJurusan1[4]}</td>
                                <td> {keyJurusan2[4]}</td>
                            </tr>
                            <tr>
                                <td>INTRAPERSONAL</td>
                                <td>{kec6}</td>
                                <td>{belief(kec6)}</td>
                                <td>{plausibility(belief(kec6))}</td>
                                <td> {keyJurusan1[5]}</td>
                                <td> {keyJurusan2[5]}</td>
                            </tr>
                            <tr>
                                <td>INTERPERSONAL</td>
                                <td>{kec7}</td>
                                <td>{belief(kec7)}</td>
                                <td>{plausibility(belief(kec7))}</td>
                                <td> {keyJurusan1[6]}</td>
                                <td> {keyJurusan2[6]}</td>
                            </tr>
                            <tr>
                                <td>NATURALIST</td>
                                <td>{kec8}</td>
                                <td>{belief(kec8)}</td>
                                <td>{plausibility(belief(kec8))}</td>
                                <td> {keyJurusan1[7]}</td>
                                <td> {keyJurusan2[7]}</td>
                            </tr>
                            <tr>
                                <td>EXISTENTIAL</td>
                                <td>{kec9}</td>
                                <td>{belief(kec9)}</td>
                                <td>{plausibility(belief(kec9))}</td>
                                <td> {keyJurusan1[8]}</td>
                                <td> {keyJurusan2[8]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* columnn3 */}
                <div className='column' style={{ backgroundColor: "#FF7D7D" }}>
                    <p> Keterangan : <br />
                        <table>
                            <tbody>
                                <tr><td><b>A</b></td>
                                    <td>&ensp;Bahasa Inggris</td>
                                </tr>
                                <tr><td><b>B</b></td>
                                    <td>&ensp;Matematika</td>
                                </tr>
                                <tr><td><b>C</b></td>
                                    <td>&ensp;Kedokteran</td>
                                </tr>
                                <tr><td><b>D</b></td>
                                    <td>&ensp;Teknik Mesin</td>
                                </tr>
                                <tr><td><b>E</b></td>
                                    <td>&ensp;Pendidikan Guru Sekolah Dasar</td>
                                </tr>
                                <tr><td><b>F</b></td>
                                    <td>&ensp;Psikologi</td>
                                </tr>
                                <tr><td><b>G</b></td>
                                    <td>&ensp;Desain Komunikasi Visual</td>
                                </tr>
                                <tr><td><b>H</b></td>
                                    <td>&ensp;Hubungan Internasional</td>
                                </tr>
                                <tr><td><b>I</b></td>
                                    <td>&ensp;Kimia</td>
                                </tr>
                                <tr><td><b>J</b></td>
                                    <td>&ensp;Farmasi</td>
                                </tr>
                                <tr><td><b>K</b></td>
                                    <td>&ensp;Teknik Arsitektur</td>
                                </tr>
                                <tr><td><b>L</b></td>
                                    <td>&ensp;Pendidikan Jasmani, Olahraga dan Kesehatan</td>
                                </tr>
                                <tr><td><b>M</b></td>
                                    <td>&ensp;Ilmu Sejarah</td>
                                </tr>
                                <tr><td><b>N</b></td>
                                    <td>&ensp;Seni Musik</td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                </div>
            </div>
            <div className={displayText ? 'column is-half is-offset-one-quarter' : 'column is-three-fifths is-offset-one-fifth'} style={{ overflowX: "auto" }}>
                <div className={displayText ? 'mt-5 is-hidden' : 'mt-5 '} >
                    <table className='box  table is-fullwidth'>
                        <tbody>
                            <tr>
                                <td>Pakar 1</td>
                                <td>Pakar 2</td>
                            </tr>
                            <tr>
                                {/* pakar 1 */}
                                <td>
                                    <p> proses ke-1 <br></br>
                                        =========== <br></br>
                                        m[0]={keyJurusan1[0]}={beliefJurusan1[0]} <br></br>
                                        t[0]={plausibility(beliefJurusan1[0])} <br></br>
                                        m[1]={keyJurusan1[1]}={beliefJurusan1[1]} <br></br>
                                        t[1]={plausibility(beliefJurusan1[1])} <br></br><br></br></p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M1</td>
                                                <td>{keyJurusan1[1]}= {belief(kec2)}</td>
                                                <td>t[1]={plausibility(belief(kec2))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar1(10, 0, 1)}</td>
                                                <td>{pushbelief2pakar1(0, 1)}</td>
                                            </tr>
                                            <tr>
                                                <td>t[0]={plausibility(belief(kec1))}</td>
                                                <td>{pushbelief3pakar1(1, kec1)} </td>
                                                <td> {beliefJurusan1[9] = plausibility(kec1) * plausibility(kec2)
                                                    && Math.round((plausibility(belief(kec1)) * plausibility(belief(kec2))) * 1000) / 1000}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-2 <br></br>
                                        =========== <br></br>
                                        m[2]={keyJurusan1[2]}={beliefJurusan1[2]} <br></br>
                                        t[2]={plausibility(belief(kec3))} <br></br>
                                        {tampil1(10)}
                                        {tampil1(0)}
                                        {tampil1(1)}
                                        {tampil1(9)}
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M2</td>
                                                <td>{tampil1(2)}</td>
                                                <td>t[2]={plausibility(belief(kec3))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(20, 2, 0)} </td>
                                                <td>{pushbelief2pakar1(0, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(21, 2, 1)} </td>
                                                <td>{pushbelief2pakar1(1, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(10)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(22, 10, 2)}</td>
                                                <td>{pushbelief2pakar1(10, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)} </td>
                                                <td>{pushbelief1pakar1(2, 9, 2)}</td>
                                                <td>{pushbelief3pakar1(9, kec3)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-3 <br></br>
                                        =========== <br></br>
                                        m[3]={keyJurusan1[3]}={beliefJurusan1[3]} <br></br>
                                        t[3]={plausibility(beliefJurusan1[3])} <br></br>
                                        {keyJurusan1[10]}={beliefJurusan1[10] = beliefJurusan1[10] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[10] / (1 - (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M3</td>
                                                <td>{tampil1(3)}</td>
                                                <td>t[3]={plausibility(belief(kec4))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(20, 3, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 3)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(21, 3, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 3)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(22, 10, 3)} </td>
                                                <td>{pushbelief2pakar1(10, 3)}
                                                    <p hidden>{beliefJurusan1[11] = beliefJurusan1[21]}</p></td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(2)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(23, 2, 3)} </td>
                                                <td>{pushbelief2pakar1(2, 3)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(3, 9, 3)} </td>
                                                <td> {pushbelief3pakar1(9, kec4)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-4 <br></br>
                                        =========== <br></br>
                                        m[4]={keyJurusan1[4]}= {beliefJurusan1[4]} <br></br>
                                        t[4]={plausibility(beliefJurusan1[4])} <br></br>
                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[10]}={beliefJurusan1[10] = beliefJurusan1[10] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) &&
                                            Math.round(beliefJurusan1[10] / (1 - (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[23] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[23] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[20] + beliefJurusan1[23] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[3] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[20] + beliefJurusan1[22] + beliefJurusan1[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[20] + beliefJurusan1[23] + beliefJurusan1[22])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[20] + beliefJurusan1[23] + beliefJurusan1[22])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M4</td>
                                                <td>{keyJurusan1[4]}= {beliefJurusan1[4]}</td>
                                                <td>t[4]={plausibility(belief(kec5))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(20, 4, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 4)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(21, 4, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 4)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(22, 4, 10)}</td>
                                                <td>{pushbelief2pakar1(10, 4)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(2)} </td>
                                                <td className='has-background-info'>{pushbelief1pakar1(23, 4, 2)}</td>
                                                <td>{pushbelief2pakar1(2, 4)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(24, 4, 3)}</td>
                                                <td>{pushbelief2pakar1(3, 4)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(11)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(25, 4, 11)} </td>
                                                <td>{pushbelief2pakar1(11, 4)}  </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(4, 9, 4)} </td>
                                                <td>{pushbelief3pakar1(9, kec5)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-5 <br></br>
                                        =========== <br></br>
                                        m[5]={keyJurusan1[5]}= {beliefJurusan1[5]} <br></br>
                                        t[5]={plausibility(beliefJurusan1[5])} <br></br>
                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[10]}={beliefJurusan1[10] = (beliefJurusan1[10] + beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22]) / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[10] + beliefJurusan1[20] + beliefJurusan1[21] + beliefJurusan1[22]) / (1 -
                                                (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[3] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[4]}={beliefJurusan1[4] = beliefJurusan1[4] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[4] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M5</td>
                                                <td>{keyJurusan1[5]}= {beliefJurusan1[5]}</td>
                                                <td>t[5]={plausibility(belief(kec6))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(20, 5, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 5)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(21, 5, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 5)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(22, 5, 10)}</td>
                                                <td>{pushbelief2pakar1(10, 5)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(2)} </td>
                                                <td className='has-background-info'>{pushbelief1pakar1(23, 5, 2)}</td>
                                                <td>{pushbelief2pakar1(2, 5)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(24, 5, 3)}</td>
                                                <td>{pushbelief2pakar1(3, 5)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(11)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(25, 5, 11)} </td>
                                                <td>{pushbelief2pakar1(11, 5)}  </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(4)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(26, 5, 4)}</td>
                                                <td>{pushbelief2pakar1(4, 5)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(5, 9, 5)} </td>
                                                <td>{pushbelief3pakar1(9, kec6)} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-6 <br></br>
                                        =========== <br></br>
                                        m[6]={keyJurusan1[6]}= {beliefJurusan1[6]} <br></br>
                                        t[6]={plausibility(beliefJurusan1[6])} <br></br>

                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[10]}={beliefJurusan1[10] = (beliefJurusan1[10] + beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[26]) / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[10] + beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[26]) / (1 -
                                                (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[3] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[4]}={beliefJurusan1[4] = beliefJurusan1[4] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[4] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[5]}={beliefJurusan1[5] = (beliefJurusan1[5] + beliefJurusan1[20]) / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[5] + beliefJurusan1[20]) / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M6</td>
                                                <td>{keyJurusan1[6]}= {beliefJurusan1[6]}</td>
                                                <td>t[6]={plausibility(belief(kec7))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(20, 6, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 6)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(21, 6, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 6)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(22, 6, 10)}</td>
                                                <td>{pushbelief2pakar1(10, 6)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(2)} </td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(23, 6, 2)}</td>
                                                <td>{pushbelief2pakar1(2, 6)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(24, 6, 3)}</td>
                                                <td>{pushbelief2pakar1(3, 6)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(11)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(25, 6, 11)} </td>
                                                <td>{pushbelief2pakar1(11, 6)}  </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(4)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(26, 6, 4)}</td>
                                                <td>{pushbelief2pakar1(4, 6)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(5)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(27, 6, 5)}</td>
                                                <td>{pushbelief2pakar1(5, 6)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(6, 9, 6)} </td>
                                                <td>{pushbelief3pakar1(9, kec7)} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-7 <br></br>
                                        =========== <br></br>
                                        m[7]={keyJurusan1[7]}= {beliefJurusan1[7]} <br></br>
                                        t[7]={plausibility(beliefJurusan1[7])} <br></br>
                                        <p hidden>{beliefJurusan1[12] = beliefJurusan1[20]}</p>

                                        {keyJurusan1[12]}={beliefJurusan1[12] = beliefJurusan1[12] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[12] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[10]}={beliefJurusan1[10] = (beliefJurusan1[10] + beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[26]) / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[10] + beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[26]) / (1 -
                                                (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[2]}={beliefJurusan1[2] = (beliefJurusan1[2] + beliefJurusan1[23]) / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[2] + beliefJurusan1[23]) / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[3] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[4]}={beliefJurusan1[4] = beliefJurusan1[4] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[4] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[5]}={beliefJurusan1[5] = (beliefJurusan1[5] + beliefJurusan1[27]) / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round((beliefJurusan1[5] + beliefJurusan1[27]) / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[6]}={beliefJurusan1[6] = beliefJurusan1[6] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[6] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[24] + beliefJurusan1[25])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[24] + beliefJurusan1[25])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M7</td>
                                                <td>{keyJurusan1[7]}= {beliefJurusan1[7]}</td>
                                                <td>t[7]={plausibility(belief(kec8))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(20, 7, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 7)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(21, 7, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 7)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(22, 7, 10)}</td>
                                                <td>{pushbelief2pakar1(10, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(2)} </td>
                                                <td className='has-background-info'>{pushbelief1pakar1(23, 7, 2)}</td>
                                                <td>{pushbelief2pakar1(2, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(24, 7, 3)}</td>
                                                <td>{pushbelief2pakar1(3, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(11)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(25, 7, 11)} </td>
                                                <td>{pushbelief2pakar1(11, 7)}  </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(4)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(26, 7, 4)}</td>
                                                <td>{pushbelief2pakar1(4, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(5)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(27, 7, 5)}</td>
                                                <td>{pushbelief2pakar1(5, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(12)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(28, 7, 12)}</td>
                                                <td>{pushbelief2pakar1(12, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(6)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(29, 7, 6)}</td>
                                                <td>{pushbelief2pakar1(6, 7)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(7, 9, 7)} </td>
                                                <td>{pushbelief3pakar1(9, kec8)} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-8 <br></br>
                                        =========== <br></br>
                                        m[8]={keyJurusan1[8]}= {beliefJurusan1[8]} <br></br>
                                        t[8]={plausibility(beliefJurusan1[8])} <br></br>

                                        {keyJurusan1[12]}={beliefJurusan1[12] = beliefJurusan1[12] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[12] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[10]}={beliefJurusan1[10] = beliefJurusan1[10] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[10] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[3] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[4]}={beliefJurusan1[4] = beliefJurusan1[4] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[4] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[5]}={beliefJurusan1[5] = beliefJurusan1[5] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[5] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[6]}={beliefJurusan1[6] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[6] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[7]}={beliefJurusan1[7] = (beliefJurusan1[7] + beliefJurusan1[20] + beliefJurusan1[28] + beliefJurusan1[29]) / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round((beliefJurusan1[7] + beliefJurusan1[20] + beliefJurusan1[28] + beliefJurusan1[29]) / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[27])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M8</td>
                                                <td>{keyJurusan1[8]}= {beliefJurusan1[8]}</td>
                                                <td>t[8]={plausibility(belief(kec9))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(0)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(20, 8, 0)}</td>
                                                <td>{pushbelief2pakar1(0, 8)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(1)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(21, 8, 1)}</td>
                                                <td>{pushbelief2pakar1(1, 8)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(10)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(22, 8, 10)}</td>
                                                <td>{pushbelief2pakar1(10, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(2)} </td>
                                                <td className='has-background-info'>{pushbelief1pakar1(23, 8, 2)}</td>
                                                <td>{pushbelief2pakar1(2, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar1(24, 8, 3)}</td>
                                                <td>{pushbelief2pakar1(3, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td> {tampil1(11)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(25, 8, 11)} </td>
                                                <td>{pushbelief2pakar1(11, 8)}  </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(4)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(26, 8, 4)}</td>
                                                <td>{pushbelief2pakar1(4, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(5)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(27, 8, 5)}</td>
                                                <td>{pushbelief2pakar1(5, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(12)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(28, 8, 12)}</td>
                                                <td>{pushbelief2pakar1(12, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(6)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar1(29, 8, 6)}</td>
                                                <td>{pushbelief2pakar1(6, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(7)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar1(30, 8, 7)}</td>
                                                <td>{pushbelief2pakar1(7, 8)} </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil1(9)}</td>
                                                <td>{pushbelief1pakar1(8, 9, 8)} </td>
                                                <td>{pushbelief3pakar1(9, kec9)} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-9 <br></br>
                                        =========== <br></br>

                                        {keyJurusan1[12]}={beliefJurusan1[12] = beliefJurusan1[12] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[12] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[11]}={beliefJurusan1[11] = beliefJurusan1[11] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[11] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[10]}={beliefJurusan1[10] = beliefJurusan1[10] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[10] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[0]}={beliefJurusan1[0] = beliefJurusan1[0] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[0] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[1]}={beliefJurusan1[1] = beliefJurusan1[1] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[1] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[2]}={beliefJurusan1[2] = beliefJurusan1[2] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[2] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[3]}={beliefJurusan1[3] = beliefJurusan1[12] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[3] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[4]}={beliefJurusan1[4] = beliefJurusan1[4] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[4] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[5]}={beliefJurusan1[5] = beliefJurusan1[5] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[5] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[6]}={beliefJurusan1[6] = beliefJurusan1[6] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[6] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[7]}={beliefJurusan1[7] = beliefJurusan1[7] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[7] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[8]}={beliefJurusan1[8] = (beliefJurusan1[8] + beliefJurusan1[20] + beliefJurusan1[27] + beliefJurusan1[28] + beliefJurusan1[29]) / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round((beliefJurusan1[8] + beliefJurusan1[20] + beliefJurusan1[27] + beliefJurusan1[28] + beliefJurusan1[29]) / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        {keyJurusan1[9]}={beliefJurusan1[9] = beliefJurusan1[9] / (1 -
                                            (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) &&
                                            Math.round(beliefJurusan1[9] / (1 - (beliefJurusan1[21] + beliefJurusan1[22] + beliefJurusan1[23] + beliefJurusan1[24] + beliefJurusan1[25] + beliefJurusan1[26] + beliefJurusan1[30])) * 10000) / 10000}<br></br>

                                        <br></br>
                                    </p>
                                </td>



                                {/* pakar 2 */}
                                <td>
                                    <p> proses ke-1 <br></br>
                                        =========== <br></br>
                                        m[0]={keyJurusan2[0]}= {beliefJurusan2[0]} <br></br>
                                        t[0]={plausibility(beliefJurusan2[0])} <br></br>
                                        m[1]={keyJurusan2[1]}={beliefJurusan2[1]}<br></br>
                                        t[1]={plausibility(beliefJurusan2[1])} <br></br><br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M1</td>
                                                <td>{keyJurusan2[1]}={belief(kec2)}</td>
                                                <td>t[1]={plausibility(belief(kec2))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(10, 0, 1)}</td>
                                                <td> {pushbelief2pakar2(0, 1)}</td>
                                            </tr>
                                            <tr>
                                                <td>t[0]={plausibility(belief(kec1))}</td>
                                                <td>{pushbelief3pakar2(1, kec1)} </td>
                                                <td>
                                                    {beliefJurusan2[9] = plausibility(kec1) * plausibility(kec2)
                                                        && Math.round((plausibility(belief(kec1)) * plausibility(belief(kec2))) * 1000) / 1000}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-2 <br></br>
                                        =========== <br></br>
                                        m[2]={keyJurusan2[2]}= {beliefJurusan2[2]} <br></br>
                                        t[2]={plausibility(belief(kec3))} <br></br>
                                        {tampil2(10)}
                                        {tampil2(0)}
                                        {tampil2(1)}
                                        {tampil2(9)}
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M2</td>
                                                <td>{tampil2(2)}</td>
                                                <td>t[2]={plausibility(belief(kec3))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(20, 2, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(21, 2, 1)}</td>
                                                <td> {pushbelief2pakar2(1, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(22, 10, 2)}</td>
                                                <td> {pushbelief2pakar2(10, 2)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(2, 9, 2)}</td>
                                                <td> {pushbelief3pakar2(9, kec3)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-3 <br></br>
                                        =========== <br></br>
                                        m[3]={keyJurusan2[3]}= {beliefJurusan2[3]} <br></br>
                                        t[3]={plausibility(beliefJurusan2[3])} <br></br>
                                        {keyJurusan2[10]}={beliefJurusan2[10] = beliefJurusan2[10] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[10] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[0] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) * 10000) / 10000} <br></br>

                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[1] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[2]}={beliefJurusan2[2] = beliefJurusan2[2] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[2] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[9] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M3</td>
                                                <td>{tampil2(3)}</td>
                                                <td>t[3]={plausibility(belief(kec4))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(20, 3, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 3)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar2(21, 3, 1)}</td>
                                                <td>{pushbelief2pakar2(1, 3)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(22, 10, 3)} </td>
                                                <td>{pushbelief2pakar2(10, 3)} <p hidden>{beliefJurusan2[11] = beliefJurusan2[21]}</p></td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(2)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(23, 2, 3)} </td>
                                                <td>{pushbelief2pakar2(2, 3)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td>{pushbelief1pakar2(3, 9, 3)} </td>
                                                <td> {pushbelief3pakar2(9, kec4)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-4 <br></br>
                                        =========== <br></br>
                                        m[4]={keyJurusan2[4]}= {beliefJurusan2[4]} <br></br>
                                        t[4]={plausibility(beliefJurusan2[4])} <br></br>
                                        {keyJurusan2[11]}={beliefJurusan2[11] = beliefJurusan2[11] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) &&
                                            Math.round(beliefJurusan2[11] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[10]}={beliefJurusan2[10] = beliefJurusan2[10] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) &&
                                            Math.round(beliefJurusan2[10] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) &&
                                            Math.round(beliefJurusan2[0] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[23] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[1] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[2]}={beliefJurusan2[2] = beliefJurusan2[2] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[23] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[2] / (1 - (beliefJurusan2[20] + beliefJurusan2[23] + beliefJurusan2[22])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[3]}={beliefJurusan2[3] = beliefJurusan2[3] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) &&
                                            Math.round(beliefJurusan2[3] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23])) * 10000) / 10000}<br></br>
                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[23] + beliefJurusan2[22])) &&
                                            Math.round(beliefJurusan2[9] / (1 - (beliefJurusan2[20] + beliefJurusan2[23] + beliefJurusan2[22])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>
                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M4</td>
                                                <td>{tampil2(4)}</td>
                                                <td>t[4]={plausibility(belief(kec5))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(20, 4, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 4)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-info'>{pushbelief1pakar2(21, 4, 1)}</td>
                                                <td>{pushbelief2pakar2(1, 4)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(22, 4, 10)} </td>
                                                <td>{pushbelief2pakar2(10, 4)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(2)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(23, 2, 4)} </td>
                                                <td>{pushbelief2pakar2(2, 4)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(11)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(24, 11, 4)} </td>
                                                <td>{pushbelief2pakar2(11, 4)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(25, 3, 4)} </td>
                                                <td>{pushbelief2pakar2(3, 4)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td>{pushbelief1pakar2(4, 9, 4)} </td>
                                                <td> {pushbelief3pakar2(9, kec5)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-5 <br></br>
                                        =========== <br></br>
                                        m[5]={keyJurusan2[5]}= {beliefJurusan2[5]} <br></br>
                                        t[5]={plausibility(beliefJurusan2[5])} <br></br>

                                        {keyJurusan2[11]}={beliefJurusan2[11] = beliefJurusan2[11] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[11] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[10]}={beliefJurusan2[10] = beliefJurusan2[10] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[10] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[0] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[1] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[2]}={beliefJurusan2[2] = (beliefJurusan2[2] + beliefJurusan2[23]) / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round((beliefJurusan2[2] + beliefJurusan2[23]) / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[3]}={beliefJurusan2[3] = beliefJurusan2[3] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[3] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[4]}={beliefJurusan2[4] = beliefJurusan2[4] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[4] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 -
                                            (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[9] / (1 - (beliefJurusan2[20] + beliefJurusan2[21] + beliefJurusan2[22] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M5</td>
                                                <td>{tampil2(5)}</td>
                                                <td>t[5]={plausibility(belief(kec6))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(20, 5, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 5)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar2(21, 5, 1)}</td>
                                                <td>{pushbelief2pakar2(1, 5)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(22, 5, 10)} </td>
                                                <td>{pushbelief2pakar2(10, 5)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(2)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(23, 2, 5)} </td>
                                                <td>{pushbelief2pakar2(2, 5)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(11)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(24, 11, 5)} </td>
                                                <td>{pushbelief2pakar2(11, 5)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(3)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(25, 3, 5)} </td>
                                                <td>{pushbelief2pakar2(3, 5)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(4)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(26, 4, 5)} </td>
                                                <td>{pushbelief2pakar2(4, 5)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td>{pushbelief1pakar2(5, 9, 5)} </td>
                                                <td> {pushbelief3pakar2(9, kec6)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p> proses ke-6 <br></br>
                                        =========== <br></br>
                                        m[6]={keyJurusan2[6]}= {beliefJurusan2[6]} <br></br>
                                        t[6]={plausibility(beliefJurusan2[6])} <br></br>

                                        {keyJurusan2[11]}={beliefJurusan2[11] = beliefJurusan2[11] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[11] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[10]}={beliefJurusan2[10] = (beliefJurusan2[10] + beliefJurusan2[21] + beliefJurusan2[22]) / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round((beliefJurusan2[10] + beliefJurusan2[21] + beliefJurusan2[22]) / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[0] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[1] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[2]}={beliefJurusan2[2] = beliefJurusan2[2] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[2] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[3]}={beliefJurusan2[3] = beliefJurusan2[3] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[3] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[4]}={beliefJurusan2[4] = beliefJurusan2[4] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[4] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[5]}={beliefJurusan2[5] = (beliefJurusan2[5] + beliefJurusan2[20]) / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round((beliefJurusan2[5] + beliefJurusan2[20]) / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 -
                                            (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) &&
                                            Math.round(beliefJurusan2[9] / (1 - (beliefJurusan2[26] + beliefJurusan2[23] + beliefJurusan2[24] + beliefJurusan2[25])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M6</td>
                                                <td>{tampil2(6)}</td>
                                                <td>t[6]={plausibility(belief(kec7))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(20, 6, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 6)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar2(21, 6, 1)}</td>
                                                <td>{pushbelief2pakar2(1, 6)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(22, 6, 10)} </td>
                                                <td>{pushbelief2pakar2(10, 6)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(2)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(23, 2, 6)} </td>
                                                <td>{pushbelief2pakar2(2, 6)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(11)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(24, 11, 6)} </td>
                                                <td>{pushbelief2pakar2(11, 6)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(3)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(25, 3, 6)} </td>
                                                <td>{pushbelief2pakar2(3, 6)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(4)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(26, 4, 6)} </td>
                                                <td>{pushbelief2pakar2(4, 6)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(5)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(27, 5, 6)} </td>
                                                <td>{pushbelief2pakar2(5, 6)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td>{pushbelief1pakar2(6, 9, 6)} </td>
                                                <td> {pushbelief3pakar2(9, kec7)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-7 <br></br>
                                        =========== <br></br>
                                        m[7]={keyJurusan2[7]}= {beliefJurusan2[7]} <br></br>
                                        t[7]={plausibility(beliefJurusan2[7])} <br></br>

                                        {keyJurusan2[15]}={beliefJurusan2[15] = beliefJurusan2[26] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[26] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[14]}={beliefJurusan2[14] = (beliefJurusan2[24] + beliefJurusan2[25]) / (1 - beliefJurusan2[23]) &&
                                            Math.round((beliefJurusan2[24] + beliefJurusan2[25]) / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[13]}={beliefJurusan2[13] = beliefJurusan2[21] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[21] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[12]}={beliefJurusan2[12] = beliefJurusan2[20] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[20] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[11]}={beliefJurusan2[11] = beliefJurusan2[11] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[11] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[10]}={beliefJurusan2[10] = (beliefJurusan2[10] + beliefJurusan2[22]) / (1 - beliefJurusan2[23]) &&
                                            Math.round((beliefJurusan2[10] + beliefJurusan2[22]) / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[0] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[1] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[2]}={beliefJurusan2[2] = beliefJurusan2[2] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[2] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[3]}={beliefJurusan2[3] = beliefJurusan2[3] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[3] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[4]}={beliefJurusan2[4] = beliefJurusan2[4] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[4] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[5]}={beliefJurusan2[5] = (beliefJurusan2[5] + beliefJurusan2[27]) / (1 - beliefJurusan2[23]) &&
                                            Math.round((beliefJurusan2[5] + beliefJurusan2[27]) / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[6]}={beliefJurusan2[6] = beliefJurusan2[6] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[6] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>

                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 - beliefJurusan2[23]) &&
                                            Math.round(beliefJurusan2[9] / (1 - beliefJurusan2[23]) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                    <table className='table is-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>Tabel M7</td>
                                                <td>{tampil2(7)}</td>
                                                <td>t[7]={plausibility(belief(kec8))}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(0)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(20, 7, 0)}</td>
                                                <td>{pushbelief2pakar2(0, 7)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(1)}</td>
                                                <td className='has-background-danger-dark'>{pushbelief1pakar2(21, 7, 1)}</td>
                                                <td>{pushbelief2pakar2(1, 7)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(10)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(22, 7, 10)} </td>
                                                <td>{pushbelief2pakar2(10, 7)}</td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(2)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(23, 2, 7)} </td>
                                                <td>{pushbelief2pakar2(2, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(11)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(24, 11, 7)} </td>
                                                <td>{pushbelief2pakar2(11, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(3)}</td>
                                                <td className='has-background-danger-dark'> {pushbelief1pakar2(25, 3, 7)} </td>
                                                <td>{pushbelief2pakar2(3, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(4)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(26, 4, 7)} </td>
                                                <td>{pushbelief2pakar2(4, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(5)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(27, 5, 7)} </td>
                                                <td>{pushbelief2pakar2(5, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(6)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(28, 6, 7)} </td>
                                                <td>{pushbelief2pakar2(6, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(12)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(29, 12, 7)} </td>
                                                <td>{pushbelief2pakar2(12, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(13)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(30, 13, 7)} </td>
                                                <td>{pushbelief2pakar2(13, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(14)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(31, 14, 7)} </td>
                                                <td>{pushbelief2pakar2(14, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(15)}</td>
                                                <td className='has-background-info'> {pushbelief1pakar2(32, 15, 7)} </td>
                                                <td>{pushbelief2pakar2(15, 7)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{tampil2(9)}</td>
                                                <td>{pushbelief1pakar2(7, 9, 7)} </td>
                                                <td> {pushbelief3pakar2(9, kec8)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p> proses ke-8 <br></br>
                                        =========== <br></br>

                                        {keyJurusan2[16]}={beliefJurusan2[16] = (beliefJurusan2[21] + beliefJurusan2[24]) / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round((beliefJurusan2[21] + beliefJurusan2[24]) / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[15]}={beliefJurusan2[15] = beliefJurusan2[15] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[15] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[14]}={beliefJurusan2[14] = beliefJurusan2[14] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[14] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[13]}={beliefJurusan2[13] = beliefJurusan2[13] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[13] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[12]}={beliefJurusan2[12] = beliefJurusan2[12] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[12] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[11]}={beliefJurusan2[11] = beliefJurusan2[11] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[11] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[10]}={beliefJurusan2[10] = beliefJurusan2[10] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[10] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[0]}={beliefJurusan2[0] = beliefJurusan2[0] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[0] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[1]}={beliefJurusan2[1] = beliefJurusan2[1] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[1] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[2]}={beliefJurusan2[2] = beliefJurusan2[2] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[2] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[3]}={beliefJurusan2[3] = beliefJurusan2[3] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[3] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[4]}={beliefJurusan2[4] = beliefJurusan2[4] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[4] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[5]}={beliefJurusan2[5] = beliefJurusan2[5] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[5] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[6]}={beliefJurusan2[6] = beliefJurusan2[6] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[6] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[7]}={beliefJurusan2[7] = (beliefJurusan2[7] + beliefJurusan2[25]) / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round((beliefJurusan2[7] + beliefJurusan2[25]) / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>

                                        {keyJurusan2[9]}={beliefJurusan2[9] = beliefJurusan2[9] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                            + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) &&
                                            Math.round(beliefJurusan2[9] / (1 - (beliefJurusan2[20] + beliefJurusan2[22] + beliefJurusan2[23] + beliefJurusan2[26]
                                                + beliefJurusan2[27] + beliefJurusan2[28] + beliefJurusan2[29] + beliefJurusan2[30] + beliefJurusan2[31] + beliefJurusan2[32])) * 10000) / 10000}<br></br>
                                        <br></br>
                                    </p>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table className='table is-bordered is-fullwidth'>
                    <thead>
                        <tr>
                            <th className='has-text-centered'>Pakar 1</th>
                            <th className='has-text-centered'>Pakar 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{result(beliefJurusan1, keyJurusan1)}</td>
                            <td>{result(beliefJurusan2, keyJurusan2)}</td>
                        </tr>
                        <tr>
                            {console.log(valid)}
                            <td colSpan='2'><p>Referensi Jurusanmu : {refer} ({displayValid ? displayValidTrue ? "Sesuai dengan referensi pilihan" : "Tidak sesuai dengan referensi pilihan" : "Belum divalidasi"}) </p>
                                <button
                                    className="button is-success is-small"
                                    type="button"
                                    value='Validasi'
                                    onClick={() => postValidbyId()}> Cek Validasi
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <br />
                </table>
            </div>

        </div >
    )

}

export default ResultUser;