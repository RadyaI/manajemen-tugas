import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { db } from "../db/firebase"

export default function EditTask({ getEditData, setPopup }) {

    const [tugas, setTugas] = useState("")
    const [matkul, setMatkul] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")


    async function getEditTask() {
        try {
            const get = await getDoc(doc(db, 'tugas_h', getEditData))
            const data = get.data()
            setTugas(data.tugas)
            setMatkul(data.matkul)
            setDesc(data.matkul)
            setDate(data.deadline)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateTask() {
        try {
            const docRef = doc(db, 'tugas_h', getEditData)
            await updateDoc(docRef, {
                tugas: tugas,
                matkul: matkul,
                desc: desc,
                deadline: date
            })

            swal({
                icon: 'success',
                button: false,
                timer: 500,
            })
            setPopup(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEditTask()
    }, [getEditData])

    return (
        <>
            <Card>
                <p>Edit Tugas</p>
                <div className="form">
                    <label>Judul Tugas: </label> <br />
                    <input type="text" placeholder="Masukkan Judul Tugas..." value={tugas} onChange={(e) => setTugas(e.target.value)} /> <br /><br />

                    <label>Matkul: </label> <br />
                    <input type="text" placeholder="Masukkan Matkul..." value={matkul} onChange={(e) => setMatkul(e.target.value)} /> <br /><br />

                    <label>Deskripsi Tugas: </label> <br />
                    <input type="text" placeholder="Deskripsi Tugas..." value={desc} onChange={(e) => setDesc(e.target.value)} /> <br /><br />

                    <label>Tenggat: </label> <br />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> <br /><br />
                    <button onClick={() => updateTask()}>UPDATE</button>
                    <button className="close-btn" onClick={() => setPopup(false)}>CLOSE</button>
                    <br /><br />
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
    z-index: 99;
    background-color: #FFFBE6;
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

    .form .close-btn{
        margin-left: 10px;
        border: 1px solid red;
        color: red;
    }

    @media only screen and (max-width:700px){
        width: 80%;
    }
`