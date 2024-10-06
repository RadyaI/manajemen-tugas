import { useState } from "react"
import styled, { keyframes } from "styled-components"
import swal from "sweetalert"

import { addDoc, collection, Timestamp } from "firebase/firestore"
import { db } from "../db/firebase"

export default function AddTask({setPopup}) {

    const [tugas, setTugas] = useState("")
    const [matkul, setMatkul] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")


    async function add() {
        if (tugas == '' || matkul == '' || desc == '' || date == '') {
            swal({
                icon: "warning",
                title: "Masih ada inputan yang kosong tuh",
                button: "Oalah"
            })
        } else {
            await addDoc(collection(db, 'tugas_h'), {
                tugas: tugas,
                matkul: matkul,
                desc: desc,
                deadline: date,
                time: Timestamp.now().toMillis()
            })

            setTugas("")
            setMatkul("")
            setDesc("")
            setDate("")
            setPopup(false)
            
            swal({
                icon: 'success',
                title: 'Berhasil Menambah Tugas',
                button: "Woke"
            })
        }
    }


    return (
        <>
            <Card>
                <p>Tambah Tugas</p>
                <div className="form">
                    <label>Judul Tugas: </label> <br />
                    <input type="text" placeholder="Masukkan Judul Tugas..." onChange={(e) => setTugas(e.target.value)} /> <br /><br />

                    <label>Matkul: </label> <br />
                    <input type="text" placeholder="Masukkan Matkul..." onChange={(e) => setMatkul(e.target.value)} /> <br /><br />

                    <label>Deskripsi Tugas: </label> <br />
                    <input type="text" placeholder="Deskripsi Tugas..." onChange={(e) => setDesc(e.target.value)} /> <br /><br />

                    <label>Tenggat: </label> <br />
                    <input type="date" onChange={(e) => setDate(e.target.value)} /> <br /><br />
                    <button onClick={add}>TAMBAH</button><br /><br />
                </div>
            </Card>
        </>
    )
}

const appear = keyframes`
    0%{
        width: 420px;
        height: 320px;
    }
    50%{
        width: 470px;
        height: 370px;
    }
    100%{
        width: 450px;
        height: 350px;
    }
`

const Card = styled.div`
    border: 2px solid #C0EBA6;
    border-radius: 10px;
    width: 450px;
    height: 350px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${appear} 0.5s;

    p{
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        color: #347928;
    }

    .form{
        margin-top: 20px;
        width: 100%;
        height: 80%;
        overflow: auto;
    }

    .form::-webkit-scrollbar{
        width: 10px;
    }

    .form::-webkit-scrollbar-thumb{
        width: 10px;
        border-radius: 50px;
        background-color: #C0EBA6;
    }

    .form input{
        background-color: #C0EBA6;
        color: #347928;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        outline: none;
        padding: 0 10px;
        width: 70%;
        height: 40px;
    }

    .form button{
        cursor: pointer;
        background-color: #C0EBA6;
        color: #347928;
        border: none;
        border-radius: 5px;
        height: 40px;
        padding: 0 20px;
        font-weight: bold;
    }

    @media only screen and (max-width:700px){
        width: 80%;
    }
`